var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');

// var amoutUserOwes;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Buzzer123#",
    database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    displayItems();
});

//function displays all of the items that are in stock to the user
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        
        for (var i = 0; i < res.length; i++) {
            console.log(
                "ID: " + res[i].item_id + 
                " |Item Name: " + res[i].product_name + 
                " | Department: " + res[i].department_name + 
                " | Current Price: $" + res[i].price + 
                " | Quantity left: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------".magenta);
        whatItemDoesUserWant();
    });
}

//function allows user to select the item and quantity they want 
function whatItemDoesUserWant() {
    inquirer
        .prompt([{
                //promp user to select what item they want
                type: "input",
                name: "ID",
                message: colors.green("Please enter the ID of the item you would you like to purchase?")
            },
            {
                //prompt user tp enter the quantity of the item they want
                type: "input",
                name: "Quantity",
                message: colors.green("How many would you like to purchase?")
            }
        ])

        .then(function (input) {
            //variable that takes in the ID of the item the user wishes to purchase
            var itemIDRequestedByUser = input.ID;
            //variable that takes in the quantity of the item the user wants to purchase
            var userRequestedQuantity = input.Quantity;
            //setting parameters for the purchase
            makePurchaseIfEnoughInStock(itemIDRequestedByUser, userRequestedQuantity);
        })
}

//this function checks if there are enough of the item in stock and if there is allows user to select item and how many they want
function makePurchaseIfEnoughInStock(ID, Quantity) {
    connection.query('SELECT * FROM products WHERE item_id = ' + ID, function (err, res) {
        //checks to see if the Quantity the user wants is less then or equal to the amount of the item that is in stock
        if (Quantity <= res[0].stock_quantity) {
            //if there is enough of the item then user is notified that their purchase went through
            console.log("Item has been purchased!");
            //caluclating the users bill
            totalCost = res[0].price * Quantity;
            //telling the user their bill
            console.log("Order total cost: $" + totalCost);
            console.log("-----------------------------------".magenta);
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + Quantity + ' WHERE item_id = ' + ID);
            //calling this function from below which will give user option to continue shopping or complete their order
            wantToRestart();
        //this will run if the user requests to purchase more of an item then bamazon has in stock
        } else {
            console.log("Sorry, we dont have enough of this item in stock.".grey);
            console.log("-----------------------------------".magenta);
            //calling this function from below which will give user option to continue shopping or complete their order
            wantToRestart();
        }
    })
}

//this function allows the user to select if they want to purchase another item of complete their order
function wantToRestart() {
    inquirer
        .prompt({
            name: "yesOrNo",
            type: "rawlist",
            message: colors.green("Would you like to buy something else?"),
            choices: ["Yes", "No"]
        })
        .then(function (answer) {
            // based on their answer, either call the yes or the no functions
            //if the user wants to continue shopping
            if (answer.yesOrNo === "Yes") {
                //display items available 
                displayItems();
            } else {
                //end the purchase
                console.log("Have a nice day!".grey);
            }
        });
}

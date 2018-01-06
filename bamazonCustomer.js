var mysql = require("mysql");
var inquirer = require("inquirer");

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

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " |Item Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Current Price: $" + res[i].price + " | Quantity left: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        whatItemDoesUserWant();
    });
}

function whatItemDoesUserWant() {
    inquirer
        .prompt([{
            //promp user to select what item they want
                type: "input",
                name: "item_id",
                message: "Please enter the ID of the item you would you like to purchase?"
            },
            {
            //prompt user tp enter the quantity of the item they want
                type: "input",
                name: "item_quantity",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function(input) {
           connection.query("SELECT * FROM products WHERE id = ?", [input.item_id], function(err, res) {
                if(input.item_quantity > res[0].stock_quantity) {
                    console.log("Sorry, there is not enough of this item in stock.");
                    console.log("Please refer the quantity left to see how many of this item left.");
                }
           }) 
        })
}
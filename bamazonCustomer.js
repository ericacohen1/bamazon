var mysql = require("mysql");
var inquirer = require("inquirer");

// var amoutUserOwes;

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
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
                name: "ID",
                message: "Please enter the ID of the item you would you like to purchase?"
            },
            {
                //prompt user tp enter the quantity of the item they want
                type: "input",
                name: "Quantity",
                message: "How many would you like to purchase?"
            }
        ])

        .then(function(input) {
            var itemIDRequestedByUser = input.item_id;
            var userRequestedQuantity = input.item_quantity;
            makePurchaseIfEnoughInStock();
        })
        // .then(function (input) {
        //     connection.query("SELECT * FROM products WHERE id = ?", [input.item_id], function (err, res) {
        //         if (input.item_quantity > res[0].stock_quantity) {
        //             console.log("Insufficent Quantity!");
        //             displayItems();
        //         } else {
        //             amoutUserOwes = res[0].price * answer.itemQuantity;
        //             console.log("Your purchase is complete");
        //         }
        //     })
        // })
}

function makePurchaseIfEnoughInStock(ID, Quantity) {
    connection.query('SELECT * FROM products WHERE item_id = ' + ID, function(err, res){
        if (Quantity <= res[0].stock_quantity) {
            console.log("Item has been purchased!");
            totalCost = res[0].price * Quantity;
            console.log("Order total cost: $" + totalCost);
            displayItems();
            connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + Quantity + 'WHERE item_id = ' + ID);
        } else {
            console.log("We dont have enough of this item.")
            displayItems();
        }
    })
}
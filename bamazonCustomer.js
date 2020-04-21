var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    password: "Bmxrider1",
    database: "bamazon",
    insecureAuth: true
});

connection.connect(function(err) {
    if (err) throw err;
    afterConnection();
    
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "    " + res[i].product_name + "        " + res[i].price + "\n");
        }
        startApp();
    })
}

function startApp() {
    inquirer.prompt([

        {
          type: "input",
          name: "ProductChoice",
          message: "Choose a product (please enter ID number)"
        },

        {
            type: "input",
            name: "Quantity",
            message: "How many would you like?"
          },
          ]).then(function(user) { 
              var userChoice = user.ProductChoice;
              var quantity = user.Quantity;

              connection.query("SELECT * FROM products WHERE item_id = " + userChoice, function(err, res) {
              if (err) throw err;
              console.log(res);
              var stockCount = res[0].stock_quantity;
              
              connection.end();
              


            
          })
        
        })
}
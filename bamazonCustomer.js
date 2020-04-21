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

function updateInventory(id) {
connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity},{item_id : id}])
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
              var price = res[0].price;
              var itemName = res[0].product_name;
              
              
              

              if (stockCount < quantity) {
                  console.log("Insufficient Quantity")
                  connection.end();
              } else {
                var total = price * quantity;
                console.log(itemName + " x " + quantity);
                console.log("Your total is " + total);
                newQuantity = stockCount - quantity;

                inquirer.prompt([
                {
                  type: "list",
                  name: "totalConfirm",
                  message: "Is this total correct?",
                  choices: ["Yes", "No"]
                  },

                ]).then(function(response) {
                    if (response.totalConfirm == "No") {
                        console.log("try ordering again!")
                        
                    } else {


                        console.log("thanks for your order!")
                        connection.query("UPDATE products SET ? WHERE ?", [
                            {stock_quantity: newQuantity},{item_id: userChoice}
                        ], function(err, res) {
                            console.log(res.affectedRows);
                            connection.end();
                           
                        }
                        )



                    }
                })

               
                
              }
              
              


            
          })
        
        })
}
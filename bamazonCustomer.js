var mysql = require("mysql");

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
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(i = 0; i < res.length; i++) {
            console.log(res[i].item_id + "    " + res[i].product_name + "        " + res[i].price + "\n");
        }
        
        connection.end()
    })
}
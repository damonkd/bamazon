var mysql = require("mysql");
var inquirer = require("inquirer");

var stockQuantity =0;
var newStockQuantity = 0;
var priceArray = [];
var price;
var numLeft = [];

//create connection to sql server
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});


//make connection
connection.connect(function(err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
    
    // calls afterconnection function that shows items for sale
    afterConnection();
  });

  function afterConnection() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {

        console.log("");
            for (var i = 0; i < res.length; i++) {
              console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || quantity " + res[i].stock_quantity);
              
              //fills two arrays with stock quantity and price for calculations done in purchased function
              numLeft[i] = (res[i].stock_quantity);
              priceArray[i] = (res[i].price);
            }  
    if (err) throw err;
    console.log("");
      
      //connection.end();
      purchase();
    });
  }

// inquier function to allow selection and purchase of items
  function purchase() {
    inquirer
      .prompt([
        {
          name: "id",
          type: "number",
          message: "select product id ",
         
        },
        {
          name: "quantity",
          type: "number",
          message: "Enter number to purchase: ",
         
        }
      ])
      
      //function in wich purchase takes place
      .then(function(purchased) {

       // checks that purchsed quantity is an integer 
       if(!Number.isInteger(purchased.quantity) ){
            
            console.log("");
            console.log("selection not available")
           afterConnection();
           return;
       }

       //checks if purchase id is an int and between 1 and 10
       if(!Number.isInteger(purchased.id)  || purchased.id < 1 || purchased.id > 10 ){
        
        console.log("");
        console.log("selection not available")
        afterConnection();
        return;
    }

        //get stock quantity from array
        stockQuantity = numLeft[(purchased.id - 1)];
        
        // calculate new quantity after purchase
        newStockQuantity = stockQuantity - purchased.quantity;
        
        //get price from array
        price = priceArray[(purchased.id - 1)];
        
        //for debugging
        //console.log("price: " + price);
        //console.log("stock quantity: " + stockQuantity);
        //console.log("New stock quantity: " + newStockQuantity)
            
        //checks if there are enough left to purchase, if not indicates as much and starts from the beggining
        if (newStockQuantity < 0){
            
            // prints out not enough stock message
            console.log("");
            console.log("there are not enough left for your purchase");
            console.log("//////////////////");
            console.log("");
            
            afterConnection();
            return;
        }
        
        

       
        // updates new stock in database and prints out purchase message. restarts from beginning
        connection.query( "UPDATE products SET stock_quantity = " + newStockQuantity + " Where item_id = " + purchased.id , function(err,res) { 
            if (err) throw err;
          
          // for debugging  
          //console.log("out of function stock quantity" + newStockQuantity);
          
            //prints out purchase info
            console.log("");
            console.log("Purchase successful!");
            console.log("Your total is: " + price * purchased.quantity );
            console.log("////////////////////");
            console.log("");
          
            afterConnection();
        });
    });
//end purchased        
}
     
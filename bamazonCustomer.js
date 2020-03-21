var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

function validateInput(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
      return true;
  } else {
      return 'Please enter a whole non-zero number.';
  }
}

function promptUserPurchase() {
  inquirer.prompt([
    {
        type: 'input',
        name: 'item_id',
        message: 'Please enter the item ID of the item you want to buy.',
        validate: validateInput,
        filter: Number
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many units do you want to buy?',
        validate: validateInput,
        filter: Number
    }

    ]).then(function (input) {
      var item = input.item_id;
      var quantity = input.quantity;
 
      var queryStr = 'SELECT * FROM products WHERE ?';
  
        connection.query(queryStr, { item_id: item }, function (err, data) {
          if (err) throw err;

          if (data.length === 0) {
            console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
            displayStockQty();
          } else {
            var productData = data[0];

            if (quantity <= productData.stock_quantity) {
              console.log('Congratulations, there is enough stock available! Placing order!');

              var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

              connection.query(updateQueryStr, function (err, data) {
                if (err) throw err;

                console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                console.log('Your order will be ready for you to pick up in 5 business days.  Thank you for shopping EZ Wholesale!');
                console.log("\n---------------------------------------------------------------------\n");

                connection.end();
                    })
                } else {
                    console.log('Sorry, there is not enough product in stock, your order cannot be placed as is.');
                    console.log('Please modify your order quantity.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayStockQty();
                }
            }
        })
    })
}


function displayStockQty() {
  // console.log('___ENTER displayInventory___');

  // Construct the db query string
  queryStr = 'SELECT * FROM products';

  // Make the db query
  connection.query(queryStr, function (err, data) {
      if (err) throw err;

      console.log('Here are the products in stock today: ');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n');

      var strOut = '';
      for (var i = 0; i < data.length; i++) {
          strOut = '';
          strOut += 'Item ID: ' + data[i].item_id + '  //  ';
          strOut += 'Product name & size: ' + data[i].product_name + '  //  ';
          strOut += 'Stock Quantity: ' + data[i].stock_quantity + '  //  ';
          strOut += 'Price: $' + data[i].price + '\n';

          console.log(strOut);
      }

      console.log("---------------------------------------------------------------------\n");

      //Prompt the user for item/quantity they would like to purchase
      promptUserPurchase();
  })
}

// runBamazon will execute the main application logic
function runBamazon() {
  // console.log('___ENTER runBamazon___');

  // Display the available inventory
  displayStockQty();
}

// Run the application logic
runBamazon();



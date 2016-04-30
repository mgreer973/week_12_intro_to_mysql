var mysql  = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mymgap30#',
  database : 'bamazon'
});

function displayData() {
  connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' );
        return;
    }
  });

  connection.query('SELECT * from products', function(err, rows, fields) {
    if (err) throw err;
    var lenRows = rows.length;
//    console.log('length is ', lenRows);
    for (var i = 0; i < rows.length; i++) {
     console.log('Item Id: ' + rows[i].item_id + ' Product Name: ' + rows[i].product_name + ' Department Name: ' + rows[i].department_name + ' Stock Quanity: ' + rows[i].stock_quanity + ' price: ' + rows[i].price);
     }
  promptForInput();
  });
}

function promptForInput() {
  var schema = {
    properties: {
      item_id: {
        description: 'Enter the item_id from above of the product you want',
        required: true
      },
      quanity_buy: {
        description: 'Enter the quanity you want to buy',
        required: true
      }
    }
  };  
  
  prompt.start();
  prompt.get(schema, function (err, result) {

    var selBuy = "SELECT * FROM products WHERE item_id = " + result.item_id  + ';'; 

//      connection.query("SELECT * FROM products WHERE item_id = 3", function(errb, selBuyRows, fields) {
      connection.query(selBuy, function(errb, selBuyRows, fields) {
        if (errb) throw errb;
        var stk_qty = selBuyRows[0].stock_quanity;
        var purPrice = selBuyRows[0].price;
        if (stk_qty >= result.quanity_buy ) {
            console.log('you can buy this');
            var purchasePrice = result.quanity_buy * purPrice;
            console.log('purchase price is $', purchasePrice.toFixed(2) );
            var qtyLeft = stk_qty - result.quanity_buy;
            updateProducts(qtyLeft, result.item_id );
        }else { console.log('not enough stock'); 

        }
      });
//      connection.end();
  });
}

function updateProducts(qtyLeft,id) {
  connection.query('UPDATE products SET stock_quanity = ? Where item_id = ?', [qtyLeft, id], function (err, result) {
    if (err) throw err;
    console.log('Changed ' + result.changedRows + ' rows');
  });
  connection.end();

}

displayData();

var mysql  = require('mysql');
var prompt = require('prompt');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mymgap30#',
  database : 'bamazon'
});
prompt.start();

/*
	* List a set of menu options: 1) View Products for Sale 2) View Low Inventory 3) Add to Inventory 4) Add New Product

	* If a manager selectis option 1 it should list all of the products available for sale: the item IDs, names, prices, and quantities.

	* If a manager selects option 2 it should list all items for which the quantity available in stores is less than 5. 

	* If a manager selects option 3 it should provide the manager with the ability to "add more" of any item currently in the store. 

	* If a manager selects option 4 it should provide the manager with the ability to add a completely new product to the store.

*/

var managerView = {
	managerMenu : function() {
		console.log("Please select what you want to do...");
		console.log(" ");
		console.log("Enter (1): ------>", "View Products for sale.");
		console.log(" ");
		console.log("Enter (2): ------>", "View Low Inventory.");
		console.log(" ");
		console.log("Enter (3): ------>", "Add to Inventory.");
		console.log(" ");
		console.log("Enter (4): ------>", "Add New Product.");
		console.log(" ");
		console.log("Enter (5): ------>", "Quit and do nothing.");
	},
	pickManager : function(input_scope) {
		var self;
		if (!input_scope) {
			self = this;
		}else{
			self = input_scope;
		};
//		console.log('self', self);
		var self = this;
		prompt.get('manager_initial', function(err, result) {
		switch (result.manager_initial){
  		case '1':
  			self.viewProducts();
    		break;
		  case '2':
		  	self.lowProducts();
		  	break;
		  case '3':
		  	self.addInventory(self);
		  	break;
		  case '4':
		    self.addNewInventory(self);
		  	break;
		  case '5':
		  	self.exit();
		  	break;
		  default:
				console.log("your entry is not valid.");
        break;
    }
		});
	},
	viewProducts : function() {
	  connection.query('SELECT * from products', function(err, rows, fields) {
    if (err) throw err;
    var lenRows = rows.length;
//    console.log('length is ', lenRows);
    for (var i = 0; i < rows.length; i++) {
    console.log('Item Id: ' + rows[i].item_id + ' Product Name: ' + rows[i].product_name + ' Department Name: ' + rows[i].department_name + ' Stock Quanity: ' + rows[i].stock_quanity + ' price: ' + rows[i].price);
     }
   	});
   	connection.end();
	},

	lowProducts : function() {
	  connection.query('SELECT * from products where stock_quanity < 5', function(err, rows, fields) {
    if (err) throw err;
    var lenRows = rows.length;
//    console.log('length is ', lenRows);
    if (lenRows > 0) {
    	for (var i = 0; i < rows.length; i++) {
    		console.log('Item Id: ' + rows[i].item_id + ' Product Name: ' + rows[i].product_name + ' Department Name: ' + rows[i].department_name + ' Stock Quanity: ' + rows[i].stock_quanity + ' price: ' + rows[i].price);
     	} }else {
     		console.log('All stock quantity is above the minimum of 5')
     	}
   	});
   	connection.end();
	},

	addInventory : function(input_scope) {
	  var schema = {
	    properties: {
	      idAdd: {
	        description: 'Enter the item_id of product to add quantity',
	        required: true
	      },
	      qtyAdd: {
	        description: 'Enter the quanity you want to add',
	        required: true
	      }
	    }
  	};  

		var currentScope = input_scope;
		prompt.get(schema, function(err, result) {

			connection.query('UPDATE products SET stock_quanity = stock_quanity + ? Where item_id = ?', [result.qtyAdd, result.idAdd], function (err, result) {
   		if (err) throw err;
    	console.log('Changed ' + result.changedRows + ' rows');
  	});
  	connection.end();

		});
	},

	addNewInventory : function(input_scope) {
	  var schema2 = {
	    properties: {
	      prodNew: {
	        description: 'Enter new product name',
	        required: true
	      },
	      deptNew: {
	        description: 'Enter department name of new product',
	        required: true
	      },
	      priceNew: {
	        description: 'Enter price of new product',
	        pattern:  /^\$?[0-9]+(\.[0-9][0-9])?$/,
	        message: 'Please enter correct format 99.99',
	        required: true
	      },
	      qtyNew: {
	        description: 'Enter quanity of new product',
	        required: true
	      }
	    }
  	};  

		var currentScope = input_scope;
		prompt.get(schema2, function(err, result) {

			connection.query('INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES (?,?,?,?)', [ result.prodNew, result.deptNew, result.priceNew, result.qtyNew], function (err, result) {
   		if (err) throw err;
  	});
  	connection.end();

		});
	},

	start : function() {
		console.log("Welcome to Manager View!");
		this.managerMenu();
		this.pickManager();
	},
	exit: function() {
		console.log("Thank you for using Manager Bamazon, good bye~!");
		process.exit();
	}
};

managerView.start();
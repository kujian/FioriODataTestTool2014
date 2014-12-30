sap.ui.jsview("2014-12-30-fioriodatatest.JsonDemo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf 2014-12-30-fioriodatatest.JsonDemo
	*/ 
	getControllerName : function() {
		return "2014-12-30-fioriodatatest.JsonDemo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf 2014-12-30-fioriodatatest.JsonDemo
	*/ 
	createContent : function(oController) {
		// Create instance of JSON model
        var oModel = new sap.ui.model.json.JSONModel();
      // Load JSON in model
         oModel.loadData("json/Item.json");

         // Create instance of table control
         var oTable = new sap.ui.table.Table({
                title : "Computer Accessories",
                visibleRowCount : 6,
                firstVisibleRow : 0
         });
         // First column "Manufacturer"
         oTable.addColumn(new sap.ui.table.Column({
                label : new sap.ui.commons.Label({
                      text : "Make"
                }),
                template : new sap.ui.commons.TextView().bindProperty("text",
                             "Manufacturer"),
                width : "100px"
         }));
         // Second column "Type"
         oTable.addColumn(new sap.ui.table.Column({
                label : new sap.ui.commons.Label({
                      text : "Model"
                }),
                template : new sap.ui.commons.TextView().bindProperty("text",
                             "Type"),
                width : "100px"
         }));

         // Third column "Price"
         oTable.addColumn(new sap.ui.table.Column({
                label : new sap.ui.commons.Label({
                      text : "Amount"
                }),
                template : new sap.ui.commons.TextView().bindProperty("text",
                             "Price"),
                width : "100px"
         }));

         // Bind model to table control
         oTable.setModel(oModel);
         oTable.bindRows("/Item");
         oTable.placeAt("content");
	}

});

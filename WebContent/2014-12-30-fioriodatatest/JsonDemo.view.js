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
	
	createTable: function() {

        var oTable = new sap.ui.table.Table({
               title : "Opportunity notes",
               visibleRowCount : 6,
               firstVisibleRow : 0
        });
        // First column 
        oTable.addColumn(new sap.ui.table.Column({
               label : new sap.ui.commons.Label({
                     text : "Creator"
               }),
               template : new sap.ui.commons.TextView().bindProperty("text",
                            "Creator"),
               width : "100px"
        }));
        
        // Second column 
        oTable.addColumn(new sap.ui.table.Column({
               label : new sap.ui.commons.Label({
                     text : "Created Time"
               }),
               template : new sap.ui.commons.TextView().bindProperty("text",
                            "CreatedAt"),
               width : "100px"
        }));

        // Third column 
        oTable.addColumn(new sap.ui.table.Column({
               label : new sap.ui.commons.Label({
                     text : "Content"
               }),
               template : new sap.ui.commons.TextView().bindProperty("text",
                            "Content"),
               width : "100px"
        }));
        
        return oTable;
	},
	
	createTextAreaJsonModel: function() {
		this.oTextModel = new sap.ui.model.json.JSONModel();
		return this.oTextModel;
	},
	
	createTableJsonModel:function() {
		this.oTableModel = new sap.ui.model.json.JSONModel({OpportunityNotesSet: {}});
		return this.oTableModel;
	},
	
	createContent : function(oController) {

         /*var oModel = new sap.ui.model.json.JSONModel();
         oModel.loadData("json/Item.json");*/

         var oTable = this.createTable();
         var oTableModel = this.createTableJsonModel();
         oTable.setModel(oTableModel);
         //oTable.bindRows("/Item");
         oTable.bindRows("/OpportunityNotesSet");
         
         
         // handle with text Area
         /*
         oInput = new sap.ui.commons.TextArea('input1');
         oInput.bindProperty("value","jsontext>/Description");
         oInput.setTooltip("This is a tooltip");
         oInput.setRows(5);
         
         var textModel = this.createTextAreaJsonModel();
         oInput.setModel(textModel, "jsontext");
         
         oInput.attachChange(function(){alert('Text changed to :'+ oInput.getValue());});
         this._oInput = oInput;*/
         var oLayout = new sap.ui.layout.VerticalLayout("Layout1", {
         	//content: [oTable, oInput]
        	 content:[oTable]
         });
         oLayout.placeAt("content");
	}
});

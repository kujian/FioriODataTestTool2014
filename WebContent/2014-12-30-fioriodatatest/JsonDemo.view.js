jQuery.sap.require("2014-12-30-fioriodatatest.reuselib.reuse");
jQuery.sap.require("2014-12-30-fioriodatatest.control.AutoCompleteValueHolder");

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
               visibleRowCount : '{/length}',
               firstVisibleRow : 0
        });
        // First column 
        
        var oCreatorColumn = new sap.ui.table.Column({
            label : new sap.ui.commons.Label({ text : "Creator"}),
            //template : new sap.ui.commons.TextView().bindProperty("text", "Creator"),
            template: new sap.ui.commons.TextView({
    					text: {
    						path : "Creator", 
    						formatter : function dateShort(name){
    							var newName = "(" + name + ")";
    							 return newName;
    						},
    					},
    				}),
            sortProperty: "Creator",       
            filterProperty: "Creator",
            width : "100px" });
        jQuery.sap.addColumnSorterAndFilter(oCreatorColumn, jQuery.sap.sort);
        oTable.addColumn(oCreatorColumn);
        
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
        var sortedColumn = new sap.ui.table.Column({
            label : new sap.ui.commons.Label({
                text : "Content"
          }),
          template : new sap.ui.commons.TextView().bindProperty("text", "Content"),
          sortProperty: "Content",       
          filterProperty: "Content",    
          width : "100px" });
        oTable.addColumn(sortedColumn);
        
        jQuery.sap.addColumnSorterAndFilter(sortedColumn, jQuery.sap.sort);
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
         
         var oAutoModel = new sap.ui.model.json.JSONModel();
         oAutoModel.setData({values: [
         {code: '0001', description: 'Elem 1'},
         {code: '0002', description: 'Elem 2'},
         {code: '0003', description: 'Elem 3'},
         {code: '0004', description: 'Elem 4'},
         {code: '0005', description: 'Elem 5'}
         ]});
       
         var field = new AutoCompleteValueHolder('field', {            
     			layoutData: new sap.ui.commons.form.GridElementData({hCells: "10"}),
               model: oAutoModel,
               path: '/values',
               codePropertyName: 'code',
               descriptionPropertyName: 'description',
               selectedItem: function (event) {
                 alert('selectedItem event:'+event.mParameters.allItems);
     			  },
     			  deletedItem: function (event) {
       				alert('deletedItem event:'+event.mParameters.allItems);
     			  },
     			  deletedAllItems: function (event) {
       				alert('deletedAllItems event');
       		  }
     		});         
         
         var oLayout = new sap.ui.layout.VerticalLayout("Layout1", {
         	//content: [oTable, oInput]
        	 content:[oTable, field]
         });
         oLayout.placeAt("content");
	}
});

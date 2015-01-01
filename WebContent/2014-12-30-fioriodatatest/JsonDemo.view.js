jQuery.sap.require("2014-12-30-fioriodatatest.reuselib.reuse");

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
               visibleRowCount : 60,
               firstVisibleRow : 0
        });
        // First column 
        
        var oCreatorColumn = new sap.ui.table.Column({
            label : new sap.ui.commons.Label({ text : "Creator"}),
            template : new sap.ui.commons.TextView().bindProperty("text", "Creator"),
            sortProperty: "Creator",       
            filterProperty: "Creator",
            width : "100px" });
        this.addColumnSorterAndFilter(oCreatorColumn, jQuery.sap.sort);
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
        
        this.addColumnSorterAndFilter(sortedColumn, jQuery.sap.sort);
        return oTable;
	},
	
	addColumnSorterAndFilter: function (oColumn, comparator) {  
		var oCustomMenu = new sap.ui.commons.Menu();  
		oCustomMenu.addItem(new sap.ui.commons.MenuItem({  
			text: 'Sort ascending',  
			select:function() {  
				var oTable = oColumn.getParent();  
				var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);  
				oSorter.fnCompare=comparator;  
				oTable.getBinding("rows").sort(oSorter);  
				for (var i=0;i<oTable.getColumns().length; i++) {
					oTable.getColumns()[i].setSorted(false); 
				}
				oColumn.setSorted(true);  
				oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);  
			}}));
		
		oCustomMenu.addItem(new sap.ui.commons.MenuItem({  
			text: 'Sort descending',  
			select:function(oControlEvent) {  
				var oTable = oColumn.getParent();  
				var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);  
				oSorter.fnCompare = comparator;  
				oTable.getBinding("rows").sort(oSorter);  
				for (var i=0;i<oTable.getColumns().length; i++) {
					oTable.getColumns()[i].setSorted(false);  
				}
				oColumn.setSorted(true);  
				oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);  
			}}));  

			oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({  
				text: 'Filter',  
				select: function(oControlEvent) {  
					var oTable = oColumn.getParent();  
					var filterValue = oControlEvent.getParameters().item.getValue();  
					var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;  
					var filters = [];  
					if (filterValue.trim() != '') {  
						var oFilter1 = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.Contains, filterValue);  
						filters = [oFilter1];      
					}  
					oTable.getBinding("rows").filter(filters, sap.ui.model.FilterType.Application);  
				}}));  
			oColumn.setMenu(oCustomMenu);  
			return oColumn;  
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

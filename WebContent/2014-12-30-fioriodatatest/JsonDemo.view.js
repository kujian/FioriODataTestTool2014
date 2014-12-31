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
        
     // fourth column "Options"

        // Create a DropdownBox
        var oDropdownBox3 = new sap.ui.commons.DropdownBox("DropdownBox3");
        //oDropdownBox3.bindProperty("tooltip", "/tooltip");
        //oDropdownBox3.bindProperty("editable", "/editable");
        var oItemTemplate1 = new sap.ui.core.ListItem();
        oItemTemplate1.bindProperty("text", "device");
        oItemTemplate1.bindProperty("enabled", "enabled");
        oDropdownBox3.bindItems("hardware", oItemTemplate1);

        oTable.addColumn(new sap.ui.table.Column({
               label : new sap.ui.commons.Label({
                     text : "Options"
               }),
               template : oDropdownBox3,
               width : "100px"
        }));
        
        // another drop down list <<<<<<<< 5 >>>>>>>>>>>>>
        /*
        var oDropdownBox4 = new sap.ui.commons.DropdownBox("DropdownBox4");
        var oDropdownModel4 = new sap.ui.model.json.JSONModel();
        oDropdownModel4.setData({
        	hardware:[
        		{device:"PC", enabled:true},
        		{device:"Monitor", enabled:true},
        		{device:"Keyboard", enabled:false},
        		{device:"Mouse", enabled:true},
        		{device:"Speaker", enabled:false},
        		{device:"Printer", enabled:true}],
        	editable: true, 
        	tooltip: "Device"});
        oDropdownBox4.bindProperty("tooltip", "/tooltip");
        oDropdownBox4.bindProperty("editable", "/editable");
        oDropdownBox4.setModel(oDropdownModel4);
        var oItemTemplate2 = new sap.ui.core.ListItem();
        oItemTemplate2.bindProperty("text", "device");
        oItemTemplate2.bindProperty("enabled", "enabled");
        oDropdownBox4.bindItems("/hardware", oItemTemplate2);

        oTable.addColumn(new sap.ui.table.Column({
               label : new sap.ui.commons.Label({
                     text : "Options2"
               }),
               template : oDropdownBox4,
               width : "100px"
        }));
        */
        return oTable;
	},
	
	createTextAreaJsonModel: function() {
		this.oTextModel = new sap.ui.model.json.JSONModel();
		return this.oTextModel;
	},
	
	createContent : function(oController) {
		// Create instance of JSON model
		
         var oModel = new sap.ui.model.json.JSONModel();
         
         oModel.loadData("json/Item.json");

         var oTable = this.createTable();

         // Bind model to table control
         oTable.setModel(oModel);
         oTable.bindRows("/Item");
         
         
         // handle with text Area
         /*oInput = new sap.ui.commons.TextArea('input1');
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

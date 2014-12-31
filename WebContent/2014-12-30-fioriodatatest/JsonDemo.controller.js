sap.ui.controller("2014-12-30-fioriodatatest.JsonDemo", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf 2014-12-30-fioriodatatest.JsonDemo
*/
	onInit: function() {
		var baseURL = "/sap/opu/odata/sap/CRM_OPPORTUNITY/";
		var Opp_GUID_5576QHD504 = "Opportunities(guid'3440B5B1-73AE-1EE4-A2B1-7DA4E5BD5129')";
		var oConfig = { json: true, loadMetadataAsync: false };
		var oModel = new sap.ui.model.odata.ODataModel(baseURL, oConfig);
		this.sPath = Opp_GUID_5576QHD504;
		
		var controller = this;
		
		/* OData read of Notes belongings to given Opportunity */
		oModel.read(
				this.sPath,
				null,
				[ "$expand=Notes" ],
				true,
				jQuery.proxy(function(odata, response) {
					// response.body is a json stream
					console.log("OData response: " + response.body);
					var view = controller.getView();
					var oInput = view._oInput;
					var oTextModel = view.oTextModel;
					oTextModel.oData = response.data;
					//oTextModel.setData(response.body);
					oTextModel.updateBindings();                           
					//console.log(oInput);
				},this),
				jQuery.proxy(function(oError){
					
					console.error("OData error occurred: " + oError);
				},this));

	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf 2014-12-30-fioriodatatest.JsonDemo
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf 2014-12-30-fioriodatatest.JsonDemo
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf 2014-12-30-fioriodatatest.JsonDemo
*/
//	onExit: function() {
//
//	}

});
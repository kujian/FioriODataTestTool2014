jQuery.sap.require("2014-12-30-fioriodatatest.reuselib.reuse");
jQuery.sap.require("2014-12-30-fioriodatatest.util.schema");

sap.ui.controller("2014-12-30-fioriodatatest.JsonDemo", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf 2014-12-30-fioriodatatest.JsonDemo
*/
	ODATA_BASEURL:"/sap/opu/odata/sap/CRM_OPPORTUNITY/",
	
	onInit: function() {
		this.testNoteRead();
	},
	
	testOppheaderUpdate: function() {
		var baseURL = "/sap/opu/odata/sap/CRM_OPPORTUNITY/";
		var Opp_GUID_5576QHD504 = "Opportunities(guid'3440B5B1-73AE-1EE4-A2B1-7DA4E5BD5129')";
		var oConfig = { json: true, loadMetadataAsync: false };
		this.oModel = new sap.ui.model.odata.ODataModel(baseURL, oConfig);
		this.sBackendVersion = SchemaUtil._getServiceSchemaVersion(this.oModel,
			"Opportunity");	 
		this.sPath = Opp_GUID_5576QHD504;
		
		this.oModel.clearBatch();
		var nBackendVersion = parseFloat(this.sBackendVersion);
	    var oETag = null;
	    // hard code ETAG
	    var tag = "W/" + "\"" + "'F8473B351669B7222ABB93C923227B5639D2E9A5'" + "\"";
	    if(nBackendVersion >= 4.0) {
			oETag = {sETag : tag};
		}
	    else{
	    	console.log("backend not available!!!");
	    }
	    this.requestNumber = 0;
		this.bBasketUpdate = false;
		var changeSet = []; 
		var headerGuid = "FA163EEF-573D-1EE4-A0DA-B5AB963752D5"; // 888 in AG3/001
		var entry = {
				Guid : headerGuid,
				Description: "Jerry"
		};
		var batchOperation = this.oModel.createBatchOperation("Opportunities(guid'"+headerGuid+"')","MERGE",entry,oETag);
		
		changeSet.push(batchOperation);
		this.oModel.addBatchChangeOperations(changeSet);
		var x = this.oModel.submitBatch(function(oResponses){
			console.log("response: " + oResponses);
		},
		function(oError){
			console.log("error: " + oError);						
		});
	},
	
	testNoteUpdate: function() {
		var baseURL = "/sap/opu/odata/sap/CRM_OPPORTUNITY/";
		var Opp_GUID_5576QHD504 = "Opportunities(guid'3440B5B1-73AE-1EE4-A2B1-7DA4E5BD5129')";
		var oConfig = { json: true, loadMetadataAsync: false };
		this.oModel = new sap.ui.model.odata.ODataModel(baseURL, oConfig);
		this.sBackendVersion = SchemaUtil._getServiceSchemaVersion(this.oModel,
			"Opportunity");	 
		this.sPath = Opp_GUID_5576QHD504;
		
		this.oModel.clearBatch();
		var nBackendVersion = parseFloat(this.sBackendVersion);
	    var oETag = null;
	    // hard code ETAG
	    var tag = "W/" + "\"" + "'20150120084735'" + "\"";
	    
	    var newTag;
	    if(nBackendVersion >= 4.0) {
			oETag = {sETag : tag};
		}
	    else{
	    	console.log("backend not available!!!");
	    }
	    this.requestNumber = 0;
		this.bBasketUpdate = false;
		var changeSet = []; 
		var headerGuid = "3440B5B1-72DE-1ED4-A2D1-EE7101F391CB"; // 2025 in AG3/001
		var entry = {
				HeaderGuid : headerGuid,
				Content: "Jerry"
		};
		var noteType = "A002";
		var language = "ZH";
		var updatePath = "/Opportunities(guid'" + headerGuid + "')" + "/OpportunityComplexNotesSet("
        + "TextObjectID='" + noteType + "',TextLanguageID='" + language + "')";

		var newPath = "/OpportunityComplexNotesSet(HeaderGuid=guid'" + headerGuid + "',TextObjectID='" + 
		noteType + "'" + ",TextLanguageID='" + language + "')";
		// name must be entitySet: OpportunityComplexNotesSet
		//var batchOperation = this.oModel.createBatchOperation(newPath,"MERGE",entry,oETag);
		var batchOperation = this.oModel.createBatchOperation(newPath,"MERGE",entry, oETag);
		
		changeSet.push(batchOperation);
		this.oModel.addBatchChangeOperations(changeSet);
		var x = this.oModel.submitBatch(function(oResponses){
			console.log("response: " + oResponses);
		},
		function(oError){
			console.log("error: " + oError);						
		});
	},
	
	testNoteRead: function () {
		var baseURL = "/sap/opu/odata/sap/CRM_OPPORTUNITY/";
		var Opp_GUID_5576QHD504 = "Opportunities(guid'3440B5B1-72DE-1ED4-A2D1-EE7101F391CB')";
		var oConfig = { json: true, loadMetadataAsync: false };
		var oModel = new sap.ui.model.odata.ODataModel(baseURL, oConfig);
		this.sPath = Opp_GUID_5576QHD504;
		
		var controller = this;
		oModel.read(
				this.sPath,
				null,
				[ "$expand=ComplexNotes" ],
				true,
				jQuery.proxy(function(odata, response) {
					// response.body is a json stream
					console.log("OData response: " + response.body);
					var view = controller.getView();
					/*var oInput = view._oInput;
					var oTextModel = view.oTextModel;
					oTextModel.oData = response.data;
					oTextModel.updateBindings();   */  
					
					var oTableModel = view.oTableModel;
					var oData = oTableModel.oData;
			        oData.OpportunityNotesSet = response.data.ComplexNotes.results;
					oTableModel.updateBindings();
					jQuery.sap.JerryTrace("2015-01-01");
				
				},this),
				jQuery.proxy(function(oError){
					
					console.error("OData error occurred: " + oError);
				},this));
	},
	
	testBackendSearch:function () {

		var Opp_Search_5576QHD504 = "Opportunities?$skip=0&$top=1&$filter=substringof(%275576%27,Description)";
		var oConfig = { json: true, loadMetadataAsync: false };
		var oModel = new sap.ui.model.odata.ODataModel(this.ODATA_BASEURL, oConfig);
		this.sPath = Opp_Search_5576QHD504;
		oModel.read(
				this.sPath,
				null,
				null,
				true,
				jQuery.proxy(function(odata, response) {
					// response.body is a json stream
					console.log("OData response: " + response.body);
				},this),
				jQuery.proxy(function(oError){
					
					console.error("OData error occurred: " + oError);
				},this));
	},
	
	testBatchRequest: function() {
		var Opp_batch_5576QHD504 = "Opportunities(guid'3440B5B1-73AE-1EE4-A2B1-7DA4E5BD5129')";
		var oConfig = { json: true, loadMetadataAsync: false };
		this.oModel = new sap.ui.model.odata.ODataModel(this.ODATA_BASEURL, oConfig);
		
		this.sPath = Opp_batch_5576QHD504;
		this.oModel.clearBatch();
		this.oModel.addBatchReadOperations([this.oModel.createBatchOperation(this.sPath + "?$expand=ChangeDocs,Competitors,OpportunityLogSet","GET")]);
        this.oModel.addBatchReadOperations([this.oModel.createBatchOperation(this.sPath + "/Products","GET")]);

        this.oModel.submitBatch(jQuery.proxy(function(aResponses) {
        	console.log("Response: " + aResponses.__batchResponses.length );
        },this),
        
        jQuery.proxy( function() {
        	console.log("error occurred during batch request");
        },this))
	}
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
jQuery.sap.declare("scn_exercise.Component");

sap.ui.core.UIComponent.extend("scn_exercise.Component", {

	createContent : function() {

		// create root view
		// Jerry 2015-02-18 14:02PM
		var oView = sap.ui.view({
			id : "app11", // Jerry test
			viewName : "scn_exercise.view.App",
			type : "JS",
			viewData : { component : this, jerryTest: "Jerrytest" }
		});
		
		// set i18n model
		var i18nModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : "scn_exercise/i18n/messageBundle.properties"
		});
		oView.setModel(i18nModel, "i18n");
		
		

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("scn_exercise/model/mock.json");
		oView.setModel(oModel);
		
		// set device model
		var deviceModel = new sap.ui.model.json.JSONModel({
			isPhone : jQuery.device.is.phone,
			listMode : (jQuery.device.is.phone) ? "None" : "SingleSelectMaster",
			listItemType : (jQuery.device.is.phone) ? "Active" : "Inactive"
		});
		deviceModel.setDefaultBindingMode("OneWay");
		oView.setModel(deviceModel, "device");
		

		return oView;
	}
});
jQuery.sap.declare("scn_exercise.Component");

sap.ui.core.UIComponent.extend("scn_exercise.Component", {

	createContent : function() {

		// create root view
		var oView = sap.ui.view({
			id : "app",
			viewName : "scn_exercise.view.App",
			type : "JS",
			viewData : { component : this }
		});

//		// Using OData model to connect against a real service
//		var url = "/proxy/http/<server>:<port>/sap/opu/odata/sap/ZGWSAMPLE_SRV/";
//		var oModel = new sap.ui.model.odata.ODataModel(url, true, "<user>", "<password>");
//		oView.setModel(oModel);

		// Using a local model for offline development
		var oModel = new sap.ui.model.json.JSONModel("scn_exercise/model/mock.json");
		oView.setModel(oModel);

		// done
		return oView;
	}
});
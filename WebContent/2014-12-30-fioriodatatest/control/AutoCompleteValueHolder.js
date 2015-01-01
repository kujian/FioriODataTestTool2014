jQuery.sap.require("sap.ui.model.json.JSONModel");
jQuery.sap.declare("2014-12-30-fioriodatatest.control.AutoCompleteValueHolder");

sap.ui.core.Control.extend("AutoCompleteValueHolder", { 
    metadata : {
		properties: {
		   /* means this control has property <code> and <description> */
		   "codePropertyName": {type : "string", defaultValue: "code"},
		   "descriptionPropertyName": {type : "string", defaultValue: "description"},
           "path": {type : "string", defaultValue: "/"},
           "model": {type : "any", defaultValue: new sap.ui.model.json.JSONModel()},
		   "suggestValues": {type : "any", defaultValue: []}
		},
        aggregations: {
        	// layout aggregation: configuration object
            "_layout" : {type : "sap.ui.layout.HorizontalLayout", multiple : false, visibility: "hidden"}
        },
        events: {
        	"selectedItem": {},
        	"deletedItem": {},
        	"deletedAllItems": {}
        }
    },

    init: function() {     
    	var oControl = this;
    	// composite control has inner ui field AutoComplete 
    	// populate Autocomplete ID field
    	var searchField = new sap.ui.commons.AutoComplete(this.getId() + '-searchField',{
        	maxPopupItems: 5,
        	displaySecondaryValues: true,        	
            items: { // built-in items aggregation
                path: "/", 
                // do property binding, here we didn't hard code property name "code" and 
                // "description", but use the passed in value
                template: new sap.ui.core.ListItem({text: "{"+this.getDescriptionPropertyName()+"}", 
                	additionalText: "{"+this.getCodePropertyName()+"}"})
        	},
        	change: function change(event) { 
        		if (event.mParameters.selectedItem != null) {
        			var layout = event.getSource().getParent().getParent().mAggregations._layout;
	    			var content = layout.getContent();
	    			var repeated = false;
	    	    	if (content != null && content.length > 1) {
	    	    		for (var i=0; i<content.length-1; i++) {
	    	    			var model = content[i].getContent()[0].getModel();
	    	    			var path = content[i].getContent()[0].getBindingContext().sPath;
	    	    			var item = model.getProperty(path);
	    	    			if (eval('item.'+event.getSource().getParent().getParent().mProperties.codePropertyName) == event.mParameters.selectedItem.mProperties.additionalText) 
	    	    				repeated = true;
	    	    		}
	    	    	}
	    			
	    			if (!repeated) {
	        			var newValueField = new sap.ui.commons.FormattedTextView({
		        			width: '100px'
		        		});
		        		newValueField.setModel(event.getSource().getModel());
		        		newValueField.bindProperty("htmlText", event.getSource().getParent().getParent().mProperties.descriptionPropertyName, function(value) {
		        		    return "<div title=\"" +value+ "\" class=\"autoCompleteValueHolder_valueFieldDiv\">"+value+"</div>";
		        		});	        		
		        		newValueField.bindElement(event.mParameters.selectedItem.oBindingContexts.undefined.sPath);        		
		        		newValueField.addStyleClass('autoCompleteValueHolder_valueField');
		        		
		        		var newValueImage = new sap.ui.commons.Image({
		        			src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIKEw06nF/eLQAAAb9JREFUKM9lkkFIFHEUxn//mf3TrJVOLjvu7phBBB0M3VyNTYg85CU6ZLfqmpAwRVBseqg1CI0OzZ47ePRkh9xQiAgWgqIOXUpNhHbBDGdFSxYX2m3+HZoNpe/yHt/73oP3vgfADHsxI8T/XCOZDuIkGHO9SWcMZKM2CnL+VMqZAGO3lgkw8rFDBe/+qMrbllsFsQhiNhZxy9kxlbetwmTQpANcgesnhy6MSF+iW9H0sw2vWtwf7u8aOHsvrCRmsvNI+e2H9Vl4rwOcgI/11dJBX5I+IJtQLU3nTCs6aDVH+L72lYVXr3NLlZ1Hb8DXp4A74C9Xay+P/9zaEeLXoFnXCdcV3nqR4ufFuw/LP7LP4fcUECrJENTqfAKqvo+/+o2atw2AsJqpKsVysOtmWxsCYAjkmXjkcVqoWx0b28xHTUBw3tuiZJm8U1puac3LPIUaALeP2c6Xnk5VAfXicEJdam3JXGw1M3MdtqqAWulLqlxvyvlnymUw3PZEYSHVpa4l4i4gADEcj7krfT3qSXu8MBCclXFNA+AqGDeP2je6dxkHyOnT/U437AMYF+Ivm5WhPW8wrGmMBIMaeBCI/wB5M5PywZXUzgAAAABJRU5ErkJggg==',
		        			press: function(event){
		        				var valueLayout = event.getSource().getParent();
		        				var autoCompleteHolderLayout = event.getSource().getParent().getParent().getParent().mAggregations._layout;  
		        				autoCompleteHolderLayout.removeContent(valueLayout);
		        				
		        				oControl.fireDeletedItem({
				        			allItems: oControl.getSelectedValues()
				        		});
		    				},
		    				width: '12px'
		        		});        		        		        		        		  
		        		newValueImage.addStyleClass('autoCompleteValueHolder_valueImage');        		
		        		
		        		var valueLayout = new sap.ui.layout.HorizontalLayout({content: [newValueField, newValueImage]});
		        		valueLayout.addStyleClass('autoCompleteValueHolder_valueLayout');
		        		
		        		layout.insertContent(valueLayout, 0);
		        		var content = layout.getContent();
		        		
		        		oControl.fireSelectedItem({
		        			newItem: {
		        				code: event.mParameters.selectedItem.mProperties.additionalText, 
		        				description: event.mParameters.selectedItem.mProperties.text
		        			},
		        			allItems: oControl.getSelectedValues()
		        		});
	    			}

	        		var search = content[content.length-1];
	        		search.setValue('');
        		}
        	}
        });
    	searchField.setModel(this.getModel());
    	searchField.addStyleClass('autoCompleteValueHolder_search');
    	
    	var layout = new sap.ui.layout.HorizontalLayout(this.getId() + '-valuesLayout',{allowWrapping: true});    	    	
    	// if there is other ui field, just add them to the layout container
    	var label = new sap.ui.commons.Label({ text : "Jerry test"});
    	//layout.addContent(label);
    	layout.addContent(searchField);
    	layout.addStyleClass('autoCompleteValueHolder_valuesLayout');
    	
        this.setAggregation("_layout", layout);
    },
    
    renderer : {    	 
        render : function(oRm, oControl) {
    		var layout = oControl.getAggregation("_layout");    		
            layout.getContent()[0].setModel(oControl.getModel());
            var template = new sap.ui.core.ListItem({
                                                     text: "{"+oControl.getDescriptionPropertyName()+"}", 
                                                     additionalText: "{"+oControl.getCodePropertyName()+"}"
                                                   });
            layout.getContent()[0].bindItems(oControl.getPath(), template);

    		oRm.renderControl(layout);    		
        }
    },
    
    getSelectedValues: function() {
    	var content = this.getAggregation("_layout").getContent();
    	var result = [];
    	if (content != null && content.length > 1) {
    		for (var i=0; i<content.length-1; i++) {
    			var model = content[i].getContent()[0].getModel();
    			var path = content[i].getContent()[0].getBindingContext().sPath;
    			result.push(model.getProperty(path));
    		}
    	}
    	return result;
    },
  
    clearSelectedValues: function() {
    	if (this.getAggregation("_layout").getContent() != null && this.getAggregation("_layout").getContent().length > 1) {
    		while (this.getAggregation("_layout").getContent().length > 1) {
    			this.getAggregation("_layout").removeContent(0);
    		}
    		this.fireDeletedAllItems({});
    	}
    },
    
    updateModel : function (newModel, newPath, codePropertyName, descriptionPropertyName) {
    	this.setModel(newModel);
    	this.setPath(newPath);
    	this.setCodePropertyName(codePropertyName);
    	this.setDescriptionPropertyName(descriptionPropertyName);
    	
    	var layout = this.getAggregation("_layout");    		
        layout.getContent()[0].setModel(this.getModel());
        
        var template = new sap.ui.core.ListItem({
                                                 text: "{"+this.getDescriptionPropertyName()+"}", 
                                                 additionalText: "{"+this.getCodePropertyName()+"}"
                                               });
        layout.getContent()[0].bindItems(this.getPath(), template);     
    }
});
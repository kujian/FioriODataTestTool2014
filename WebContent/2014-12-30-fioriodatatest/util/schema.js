jQuery.sap.declare("2014-12-30-fioriodatatest.util.schema");

SchemaUtil = {
		
		_getEntityAnnotation : function(oModel, sAnnotationName,
				sEntityName) {
			// retrieve the metadata of the passed OData model
			var oModelMetadata = oModel.getServiceMetadata();
			// check for proper metadata structure
			if ((oModelMetadata != null)
					&& (oModelMetadata.dataServices != null)
					&& (oModelMetadata.dataServices.schema != null)
					&& (oModelMetadata.dataServices.schema.length > 0)
					&& (oModelMetadata.dataServices.schema[0].entityType != null)) {
				// determine the annotation by name using the first
				// annotated entity
				var entityTypes = oModelMetadata.dataServices.schema[0].entityType;
				// loop the entities
				for ( var i = 0; i < entityTypes.length; i++) {
					if (sEntityName === entityTypes[i].name
							&& entityTypes[i].extensions != null)
						// loop the annotations of the the entity
						for ( var j = 0; j < entityTypes[i].extensions.length; j++) {
							if (entityTypes[i].extensions[j].name === sAnnotationName)
								return entityTypes[i].extensions[j].value;
						}

				}
			}
			return null;
		},

		_getServiceSchemaVersion : function(oModel, sEntityName) { 
			var version = this._getEntityAnnotation(oModel,
					"service-schema-version", sEntityName);
			// defaults to initial service schema version (1)
			return (version != null) ? version : "1";
		},

		_getServiceVersion : function(oModel, sEntityName) {
			var version = this._getEntityAnnotation(oModel,
					"service-version", sEntityName);
			// defaults to initial service version (1)
			return (version != null) ? parseInt(version) : 1;
		},
      
		_getPropertyInfoOfEntity : function(oModel,sEntityName, sPropertyName) {
			var oMMd = oModel.getServiceMetadata();
			if (oMMd && oMMd.dataServices && oMMd.dataServices.schema
					&& oMMd.dataServices.schema.length > 0
					&& oMMd.dataServices.schema[0].entityType) {
				var aEntityTypes = oMMd.dataServices.schema[0].entityType;
				for ( var i = -1, oCurEntity; oCurEntity = aEntityTypes[++i];)
					if (sEntityName === oCurEntity.name && oCurEntity.property)
						for ( var j = -1, oCurProperty; oCurProperty = oCurEntity.property[++j];)
							if (oCurProperty.name === sPropertyName)
								return oCurProperty;
			}
			return null;
		},
		
		_getFS : function(oModel) {
			return this._getPropertyInfoOfEntity(oModel, "Account", "fullName") ? "fullName"
					: "name1";
			// return oCUS._getEntityAnnotation(oCUS.getModel(),
			// "service-schema-version", "Account") ? "fullName" : "name1";
		},

		getFilterString : function(oModel) {
			if (!this._sFilterString)
				this._sFilterString = this._getFS(oModel);
			return this._sFilterString;
		},
		
};
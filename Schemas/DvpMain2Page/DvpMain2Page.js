define("DvpMain2Page", [], function() {
	return {
		entitySchemaName: "DvpMain",
		attributes: {
			"IsNew": {
				dataValueType: BPMSoft.DataValueType.BOOLEAN,
				type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			"VisibleButton": {
				dataValueType: BPMSoft.DataValueType.BOOLEAN,
				type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: false
			},
			 "NumberOfRecords": {
				dataValueType: BPMSoft.DataValueType.INTEGER,
				type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: 0
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "DvpMainFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "DvpMain"
				}
			},
			
			"DvpSchemaFlowers": {
				"schemaName": "DvpSchema22fe91f1Detail",
				"entitySchemaName": "Dvp_flower",
				"filter": {
					"detailColumn": "DvpDvpMain",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"DvpInteger1": {
				"5ece1016-9bb4-4744-bec2-89ebdc4817cf": {
					"uId": "5ece1016-9bb4-4744-bec2-89ebdc4817cf",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "DvpString1"
							},
							"rightExpression": {
								"type": 0,
								"value": "Строитель",
								"dataValueType": 1
							}
						}
					]
				},
				"b77fed34-d44a-4ab0-8df8-4d33606730a2": {
					"uId": "b77fed34-d44a-4ab0-8df8-4d33606730a2",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "DvpLookup1"
							},
							"rightExpression": {
								"type": 0,
								"value": "422bc2e3-2537-4c74-8b25-3b1f08b1be8d",
								"dataValueType": 10
							}
						}
					]
				},
				"8be54e1f-5baa-4760-9217-a8db2cce39d0": {
					"uId": "8be54e1f-5baa-4760-9217-a8db2cce39d0",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 1,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "DvpBoolean1"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
		
		save: function(){
			//this.isNew - new card
			this.set("IsNew",this.isNew);
			this.callParent(arguments);
		},
			
		hideButton: function(){
			//this.callParent(arguments);
			this.set("VisibleButton",false);
			
			console.log('метод hideButton');
		},
		showButton: function(){
			//this.callParent(arguments);
			this.set("VisibleButton",true);
			console.log('метод showButton');
		},
		/*
		onSaved: function() {
			this.callParent(arguments);
			
			console.log('метод onSaved');
			
			console.log(this.get(''));
			
			if (this.get("IsNew")){
				console.log('Сохранили новую карточку: ' + this.get('Id'));
				
			}
		},
		*/
			onSaved: function() {
        this.callParent(arguments);

        console.log('метод onSaved');

        if (this.get("IsNew")){
        console.log('Сохранили новую карточку: ' + this.get('Id'));
        this.addDetail(this, 0);
        }else{
         this.compldexAddDetail(this);
        //  this.showNumberOfRecords(this)
        }
      },
      showNumberOfRecords:function(thisObject) {
        thisObject.set("NumberOfRecords", 0);
        var esq = this.Ext.create(BPMSoft.EntitySchemaQuery, {
          rootSchemaName: "Dvp_flower"
        });
        esq.addColumn("DvpDvpMain");
        var filters = this.Ext.create("BPMSoft.FilterGroup");
            filters.addItem(esq.createColumnFilterWithParameter(BPMSoft.ComparisonType.NOT_EQUAL, "DvpDvpMain",
              thisObject.get("Id")));
               esq.filters = filters;
        esq.execute(function(response) {
          if (response.success) {
            if (response.collection.collection) {
              
                          var total = 0
                          var list  = []
                          var mega =  response.collection.collection.items
						  for (let i = 0; i< mega.length; i++){
                             if(!list.includes(mega[i].get("DvpDvpMain").value)){
                                 list.push(mega[i].get("DvpDvpMain").value)
                             }
                              
                          }
                          console.log(list)
                           debugger
                          for(var i = 0; i< list.length; i++){
                              var count = 0
                for(var j = 0; j < mega.length; j++){
                                
                                if(list[i] === mega[j].get("DvpDvpMain").value){
                                    count++
                                }
                              }
                              if(count === 3){
                                  total++
                              }
                          }

              
               BPMSoft.showInformation(
                Ext.String.format(
                thisObject.get("Resources.Strings.SuperMessage"),
                total.toLocaleString())

              );   
                          
                          
                          console.log(total)
                          console.log(response.collection.collection.items);
                      }}})
        
        
      },
      compldexAddDetail: function(thisObject) {
        var esq = this.Ext.create(BPMSoft.EntitySchemaQuery, {
          rootSchemaName: "Dvp_flower"
        });
        esq.addColumn("DvpDvpMain");
            var filters = this.Ext.create("BPMSoft.FilterGroup");
            filters.addItem(esq.createColumnFilterWithParameter(BPMSoft.ComparisonType.EQUAL, "DvpDvpMain",
              thisObject.get("Id")));
               esq.filters = filters;
              thisObject.set("Count", 0);
        esq.execute(function(response) {
          debugger
        
          if (response.success) {
            if (response.collection.collection) {
              var count = response.collection.collection.items.length;
              thisObject.set("Count", count);
              console.log(count);
              console.log(response.collection.collection.items);
              
              
              if(thisObject.get("Count") > 3){
                thisObject.deleteAllDetails(thisObject);  
                  count = 1;
              }else{
                thisObject.addDetail(thisObject, thisObject.get("Count"));      
                   count++;
              }   
              
              if(count === 3){
                thisObject.showNumberOfRecords(thisObject)
              }
            }
          }
        }, this);
        
      },
      
      
      addDetail: function(thisObject, count) {
        var insert = Ext.create('BPMSoft.InsertQuery', {
                  rootSchemaName: 'Dvp_flower'
                });
                insert.setParameterValue('Id', "",
                  BPMSoft.DataValueType.GUID);
insert.setParameterValue('DvpName', "AutoGenerated " + count,
                  BPMSoft.DataValueType.TEXT);

insert.setParameterValue('DvpDvpMain', thisObject.get("Id"),
                  BPMSoft.DataValueType.GUID);
                insert.execute();
        console.log("addDetail");
        
      },
      deleteAllDetails: function(thisObject) {
        console.log("deleteAllDetails")
        var query1 = Ext.create("BPMSoft.DeleteQuery", {
          rootSchemaName: 'Dvp_flower'
        });

      var filter = BPMSoft.createColumnFilterWithParameter(BPMSoft.ComparisonType.EQUAL, "DvpDvpMain", thisObject.get("Id"));
      query1.filters.addItem(filter);

      query1.execute( function(response){
        thisObject.addDetail(thisObject, thisObject.get("Count"));
      });
	  },
		getActions: function() {
				/* Вызов базовой реализации метода для получения проиниализированных действий страницы. */
				var actions = this.callParent(arguments);
				/* Добавление линии-разделителя между вкладками действий. */
				actions.addItem(this.getButtonMenuItem({
					Type: "BPMSoft.MenuSeparator",
					Caption: ""
				}));
				/* Добавление кастомного пункта в список действий. */
				actions.addItem(this.getButtonMenuItem({
					/* Привязка заголовка действия к локализуемой строке. */
					"Tag": "myActionClick",
					"Caption": {"bindTo": "Resources.Strings.MyActionCaption"},	
					"Enabled": {"bindTo": "getActionEnabled"},
					"Click" : {"bindTo": "showButton"}
				}));
			
				/* Возвращение коллекции действий страницы. */
				return actions;
			},
			
			
				  
			getActionEnabled: function(){
        		//this.set("visible", true)
				return true;
      		},
		
      
      		myActionClick: function(){
        		/**BPMSoft.showInformation(
          			Ext.String.format(
            		this.get("Resources.Strings.MyActionMessage"),
            		new Date().toLocaleString())
					
        );   */
				//this.set("visible", false)
				return true;
				
      },
	},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
                         /* Выполняется операция добавления элемента на страницу. */
                         "operation": "insert",
                         /* Наименование родительского контейнера, в который добавляется кнопка. */
                         "parentName": "LeftContainer",
                         /* Кнопка добавляется в коллекцию элементов родительского элемента. */
                         "propertyName": "items",
                         /* Наименование кнопки. */
                         "name": "VisibleButton1",
                         "values": {
                               /* Тип добавляемого элемента — кнопка. */
                               "itemType": BPMSoft.ViewItemType.BUTTON,
                               /* Привязка заголовка кнопки к локализуемой строке схемы. */
                               "caption": { bindTo: "Resources.Strings.BpmVisibleButton" },
                               /* Привязка обработчика события нажатия кнопки. */
                               "click": { bindTo: "hideButton" },
                               /* Привязка свойства доступности кнопки. */
                              "visible": { bindTo: "VisibleButton" },
                               /* Стиль отображения кнопки. */
                               "style": BPMSoft.controls.ButtonEnums.style.DEFAULT,
							 /* Настройка расположения кнопки. */
							   "layout": {
							 /* Номер колонки. */
							   		"column": 13, 
							 /* Номер строки. */
							   		"rowSpan": 2, 
							 /* Количество занимаемых колонок. */
							   		"colSpan": 30,
								    "layoutName": "ProfileContainer"
							   }

                         }
                   },
			{
				"operation": "insert",
				"name": "DvpName53a02db2-54f9-402f-9fd9-9e7414f4d2f4",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "DvpName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DATETIMEf3c013db-3508-4eb8-a0c8-59944790176e",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "DvpDatetime1",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "DvpType393a7b02-98bc-46d7-bf42-b4a60cf3bffd",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 11,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "DvpType"
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "STRING93cbc339-4811-4da5-9c9a-c10ace6a5683",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "DvpString1",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUPd7d0c449-cf3f-4718-bb80-59d3aae2b9a5",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "DvpLookup1",
					"enabled": true,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "INTEGERdb74e536-7a1e-4c5c-9867-efa7afb66b55",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "DvpInteger1",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "BOOLEANac8bc99f-b926-4bf3-b6da-25f946aa9702",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "DvpBoolean1",
					"labelConfig": {
						"caption": {
							"bindTo": "Resources.Strings.BOOLEANac8bc99fb9264bf3b6da25f946aa9702LabelCaption"
						}
					},
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "DvpNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			
			{
				"operation": "insert",
				"name": "DvpSchemaFlowers",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});




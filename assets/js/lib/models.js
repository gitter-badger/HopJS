'use strict'

var Backbone = require('backbone');

//=====================================================
//=============================== Backbone Model update
//=====================================================

  Backbone.Model.prototype.update = function (key, val, options) {
    
    if (undefined == val) {
      console.warn("You are setting undefined as a value!");
    }
    
    options = options || {};
    options.validate = options.validate || true;
    options.key = key;
    return !!this.set(key, val, options);
  };

//=====================================================
//========================= WaterLine Model TO BackBone
//=====================================================

function waterLine2BackBone (Model){
  
  var bluePrint = {
    defaults: {},
    url:'',
    // initialize:function(){},
    // validate:function(){},
    // toJSON:function(){}
  }
  //console.log("modle",Object.forEach);
 // Model.attributes.forEach(function(typeObj, name){
 for (var name in Model.attributes){
 var typeObj = Model.attributes[name];
    
    typeObj = ("object" == typeof typeObj) ? typeObj : { type : typeObj }
    
    if (typeObj.defaultsTo) {
      
      bluePrint.defaults[name] = typeObj.defaultsTo;
    
    } else if (typeObj.model) {
      // model ID
    
      
    } else{
      switch(typeObj.type.toLowerCase()) {
          case "string":
          case "text":
          case "email":
            bluePrint.defaults[name] = ''
              break;
          case "integer":
          case "float":
            bluePrint.defaults[name] = 0
              break;
          case "date":
          case "datetime":
            bluePrint.defaults[name] = null
              break;
          case "boolean":
            bluePrint.defaults[name] = false
              break;
          case "binary":
            bluePrint.defaults[name] = null
              break;
          case "array":
            bluePrint.defaults[name] = []
              break;
          case "json":
            bluePrint.defaults[name] = {}
              break;
          default:
              throw new Error("Model type unknown. "+typeObj.type);
      } 
    }
    bluePrint.defaults[name];
  }//)
  //console.log(bluePrint);
  return Backbone.Model.extend(bluePrint);
}

//=====================================================
//============================ WaterLine Model to SHARE
//=====================================================

var Collections = {};

var settings = require("./../settings");

var models = {}
  

for (var modelName in settings.models){
  models[modelName] = waterLine2BackBone(settings.models[modelName])
}

module.exports = models;

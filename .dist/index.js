"use strict";
module.exports = function HashList(idProperty) {
  var list = [],
      hash = {};
  idProperty = idProperty || '_self';
  if (idProperty == '_self') {
    this.push = function(obj) {
      list.push(obj);
      hash[obj] = {
        id: obj,
        index: list.length - 1,
        obj: obj
      };
    };
    this.removeObject = function(obj) {
      this.removeByID(obj);
    };
    this.removeByID = function(id) {
      var hObj = hash[id];
      if (hObj === undefined)
        return ;
      list.splice(hObj.index, 1);
      delete hash[id];
      var length = list.length;
      for (var i = hObj.index; i < length; i++) {
        hash[list[i]].index = i;
      }
    };
  } else if (idProperty) {
    this.push = function(obj) {
      list.push(obj);
      hash[obj[idProperty]] = {
        id: obj[idProperty],
        index: list.length - 1,
        obj: obj
      };
    };
    this.removeObject = function(obj) {
      var id = obj[idProperty];
      this.removeByID(id);
    };
    this.removeByID = function(id) {
      var hObj = hash[id];
      if (hObj === undefined)
        return ;
      list.splice(hObj.index, 1);
      delete hash[id];
      var length = list.length;
      for (var i = hObj.index; i < length; i++) {
        var obj = hash[list[i][idProperty]];
        if (obj === undefined)
          console.log('uh oh');
        else
          obj.index = i;
      }
    };
  }
  this.length = function() {
    return list.length;
  };
  this.getByID = function(id) {
    var record = hash[id];
    return record ? record.obj : undefined;
  };
  this.indexOf = function(id) {
    var record = hash[id];
    return record ? record.index : -1;
  };
  this.at = function(index) {
    return list[index];
  };
  this.asList = function() {
    return list;
  };
  this.asHash = function() {
    return hash;
  };
  this.forEach = function(fn) {
    var length = list.length;
    for (var i = 0; i < length; i++)
      fn(list[i]);
  };
};

//# sourceMappingURL=index.js.map
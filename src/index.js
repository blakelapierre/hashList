module.exports = function HashList(idProperty) {
  // A HashList stores data in both an array, and a dictionary/hashmap
  // We do this
  const list = [],
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
      const hObj = hash[id];

      if (hObj === undefined) return;

      list.splice(hObj.index, 1);
      delete hash[id];

      const length = list.length;
      for (let i = hObj.index; i < length; i++) {
        hash[list[i]].index = i;
      }
    };
  }
  else if (idProperty) {
    this.push = function(obj) {
      list.push(obj);
      hash[obj[idProperty]] = {
        id: obj[idProperty],
        index: list.length - 1,
        obj: obj
      };
    };

    this.removeObject = function(obj) {
      const id = obj[idProperty];
      this.removeByID(id);
    };

    this.removeByID = function(id) {
      const hObj = hash[id];

      if (hObj === undefined) return;

      list.splice(hObj.index, 1);
      delete hash[id];

      const length = list.length;
      for (let i = hObj.index; i < length; i++) {
        const obj = hash[list[i][idProperty]];

        if (obj === undefined) console.log('uh oh');
        else obj.index = i;
      }
    };
  }

  this.length = function() {
    return list.length;
  };

  this.getByID = function(id) {
    const record = hash[id];
    return record ? record.obj : undefined;
  };

  this.indexOf = function(id) {
    const record = hash[id];

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
    const {length} = list;
    for (let i = 0; i < length; i++) fn(list[i]);
  };
};
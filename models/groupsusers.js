'use strict';
module.exports = (sequelize, DataTypes) => {
  var groupsusers = sequelize.define('groupsusers', {
    name: DataTypes.STRING
  }, {});
  groupsusers.associate = function(models) {
    // associations can be defined here
  };
  return groupsusers;
};
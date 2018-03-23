'use strict';
module.exports = (sequelize, DataTypes) => {
  var groups = sequelize.define('groups', {
    name: DataTypes.STRING
  }, {});
  groups.associate = function(models) {
    // associations can be defined here
  };
  return groups;
};
var DataTypes = require("sequelize").DataTypes;
var _INV_LINEAS = require("./INV_LINEAS");

function initModels(sequelize) {
  var INV_LINEAS = _INV_LINEAS(sequelize, DataTypes);


  return {
    INV_LINEAS,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

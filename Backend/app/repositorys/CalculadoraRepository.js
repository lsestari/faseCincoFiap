var connection = require("../../config/connection");


function CalculadoraRepository(){

    this._collectionName = "calculadora";
};

CalculadoraRepository.prototype.save = function(calculadora,callback){

    connection.insert(calculadora, this._collectionName,callback);

}

module.exports = function(){

    return CalculadoraRepository;
}


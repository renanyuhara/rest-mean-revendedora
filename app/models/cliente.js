var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var clienteSchema = new Schema({
	nome: String,
	sobrenome: String,
	telefone : String,
	email : String
});

module.exports = mongoose.model('Cliente', clienteSchema);
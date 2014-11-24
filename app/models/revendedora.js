var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var revendedoraSchema = new Schema({
	nome: String,
	sobrenome: String,
	senha : String
});

module.exports = mongoose.model('Revendedora', revendedoraSchema);
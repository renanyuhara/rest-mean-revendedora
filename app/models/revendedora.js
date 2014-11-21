var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var revendedoraSchema = new Schema({
	nome: String
});

module.exports = mongoose.model('Revendedora', revendedoraSchema);
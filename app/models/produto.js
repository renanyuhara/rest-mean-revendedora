var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var produtoSchema = new Schema({
	nome: String,
	imagem: String,
	sku : String
});

module.exports = mongoose.model('Produto', produtoSchema);
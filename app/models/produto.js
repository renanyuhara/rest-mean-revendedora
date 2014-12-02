var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var produtoSchema = new Schema({
	nome: String,
	full_img_url: String,
	sku : String,
	preco : Number
});

module.exports = mongoose.model('Produto', produtoSchema);
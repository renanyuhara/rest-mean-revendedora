var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pedidovendaitem = new Schema({
	id_cliente: mongoose.Schema.Types.ObjectId,
	id_produto: mongoose.Schema.Types.ObjectId,
	preco: Number
});

module.exports = mongoose.model('PedidoVendaItem', pedidovendaitem);
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pedidovendaitem = new Schema({
	id_cliente: {type : Schema.Types.ObjectId, ref : 'Cliente'},
	id_produto: {type : Schema.Types.ObjectId, ref : 'Produto'}
});

module.exports = mongoose.model('PedidoVendaItem', pedidovendaitem);
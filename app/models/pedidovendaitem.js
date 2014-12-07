var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pedidovendaitem = new Schema({
	produto: {type : Schema.Types.ObjectId, ref : 'Produto'},
	pedidovenda : {type : Schema.Types.ObjectId, ref : 'PedidoVenda'},
	quantidade: Number
});

module.exports = mongoose.model('PedidoVendaItem', pedidovendaitem);
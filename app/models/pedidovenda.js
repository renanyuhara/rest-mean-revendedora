var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var pedidovenda = new Schema({
	cliente: {type : Schema.Types.ObjectId, ref : 'Cliente'},
	revendedora: {type : Schema.Types.ObjectId, ref : 'Revendedora'},
	efetivado : Boolean,
	data : { type: Date, default : Date.now }
});

module.exports = mongoose.model('PedidoVenda', pedidovenda);
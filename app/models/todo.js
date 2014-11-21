var mongoose = require('mongoose');

module.exports = mongoose.model('Todos', {
	nome : {type : String, default: ''}
});
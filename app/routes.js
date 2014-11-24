var Revendedora = require('./models/revendedora');

function getRevendedoras(res) {
	Revendedora.find(function(err, revendedoras) {
		// se der erro, retorna erro
		if (err)
			res.send(err);
		res.json(revendedoras); //retorna todas as revendedoras em formato JSON
	});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// Busca todas as revendedoras
	app.get('/api/revendedoras', function(req, res) {
		getRevendedoras(res); //usa mongoose para retornar todas as revendedoras
	});

	//cria a revendedora e retorna todas as revendedoras
	app.post('/api/revendedoras', function(req, res) {
		// Cria a Revendedora, informação vem de requisição AJAX do Angular
		Revendedora.create({
			nome : req.body.nome,
			sobrenome : req.body.sobrenome,
			senha : req.body.senha
		}, function(err, revend) {
			if (err)
				res.send(err);
			getRevendedoras(res);
		})
	});

	//Altera revendedora
	app.put('/api/revendedoras/:revend_id', function(req,res) {
		Revendedora.update({
			_id : req.params.revend_id,
			nome : req.body.nome,
			sobrenome : req.body.sobrenome,
			senha : req.body.senha
		}, function(err, revend) {
			if (err)
				res.send(err);
			getRevendedoras(res);
		});
	});

	//Exclui revendedora
	app.delete('/api/revendedoras/:revend_id', function(req, res) {
		Revendedora.remove({
			_id : req.params.revend_id
		}, function(err, revend) {
			if (err)
				res.send(err);
			getRevendedoras(res);
		});
	});

	app.get('/revendedoras/cadastro', function(req, res) {
		res.sendfile('./public/cadastro.html');
		return;
	});	

	app.get('/revendedoras', function(req,res) {
		res.sendfile('./public/login.html');
		return;
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


};
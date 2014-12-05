var Revendedora = require('./models/revendedora');
var Cliente = require('./models/cliente');
var Produto = require('./models/produto');
var PedidoVendaItem = require('./models/pedidovendaitem');

function getRevendedoras(res) {
	Revendedora.find(function(err, revendedoras) {
		if (err)
			res.send(err);
		res.json(revendedoras); //retorna todas as revendedoras em formato JSON
	});
};

function getProdutos(res) {
	Produto.find(function(err, produtos) {
		if (err)
			res.send(err);
		//res.status(666).json(produtos);
		res.json(produtos); //retorna todas as revendedoras em formato JSON
		
	});	
}

function getPedidoVendaItens(res) {
	PedidoVendaItem.find(function(err, pedidovendaitens) {
		if (err)
			res.send(err);
		res.json(pedidovendaitens);
	});
}

module.exports = function(app) {

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});	

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

	// Produtos
	app.get('/api/produtos/init', function(req,res) {
		Produto.create({
			nome : "Camisa",
			full_img_url : "",
			sku : "89239812371",
			preco : 1.43
		}, function(err, revend) {
			if (err)
				res.send(err);
			Produto.create({
				nome : "Meia",
				full_img_url : "",
				sku : "758459374",
				preco : 25.99
			}, function(err, revend) {
				if (err)
					res.send(err);
				getProdutos(res);
			});
		})
		
	});
	app.get('/api/produtos', function(req,res) {
		getProdutos(res);
	});
	app.post('/api/produto', function(req,res) {
		
		if (req.body.nome == undefined) {
			res.json({ error: "Nome não informado" });
			return;
		}
		
		if (req.body.nome == "") {
			res.json( { error: "Nome não informado" });
			return;
		}

		Produto.create({
			nome : req.body.nome,
			full_img_url : req.body.full_img_url,
			sku : req.body.sku,
			preco : req.body.preco
		}, function(err, revend) {
			if (err)
				res.send(err);
			getProdutos(res);
		})
	});

	app.put('/api/produto/:id', function(req,res) {
		Produto.update({
			_id : req.params.id,
			nome: req.body.nome,
			full_img_url: req.body.full_img_url,
			sku : req.body.sku,
			preco : req.body.preco
		}, function(err, prod) {
			if (err)
				res.send(err);
			getProdutos(res);
		});
	});
	app.delete('/api/produto/:id', function(req,res) {
		Produto.remove({
			_id : req.params.id
		}, function(err, produto) {
			if (err)
				res.send(err);
			getProdutos(res);
		});		
	});
	// Fim Produtos

	//Pedido Venda Itens
	app.get('/api/pedidovendaitens', function(req,res) {
		getPedidoVendaItens(res);
	});
	app.post('/api/pedidovendaitens', function(req,res) {
		//req.body.nome_cliente
		//req.body.id_produto
		PedidoVendaItem.create({

		}, function(err, pedvenditem) {
			if (err)
				res.send(err);
			getPedidoVendaItens(res);
		})
	});
	// Fim Pedido Venda Itens

	app.get('/revendedoras/cadastro', function(req, res) {
		res.sendfile('./public/cadastro.html');
		return;
	});	

	app.get('/revendedoras', function(req,res) {
		res.sendfile('./public/login.html');
		return;
	});

	app.get('/produtos', function(req,res) {
		res.sendfile('./public/produtos.html');
		return;
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/login.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


};
var Revendedora = require('./models/revendedora');
var Cliente = require('./models/cliente');
var Produto = require('./models/produto');
var PedidoVenda = require('./models/pedidovenda');
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

function getPedidoVenda(res) {

	PedidoVenda.find().populate('cliente').populate('revendedora').exec(function(err, results) {
		if (err)
			res.send(err);
		res.json(results);
	});
}

function getPedidoVendaItens(res) {
	console.log("Entrou 1");
	PedidoVendaItem.find().populate('pedidovenda').populate('produto').exec(function(err, results) {
		if (err)
			res.send(err);
		res.json(results);
	});
/*
	PedidoVendaItem.find(function(err, pedidovendaitens) {
		if (err)
			res.send(err);
		var arraypedido = [];
		for (var i = 0; i < pedidovendaitens.length; i++) {
			console.log(pedidovendaitens[i]);
		};
		res.json(pedidovendaitens);
	});
*/
}

function getPedidoVendaItensPed(res, pedvenda) {
	console.log("Entrou 2 : " + pedvenda);
	if (pedvenda == undefined) {
		getPedidoVendaItens(res);
		return;
	}
	PedidoVendaItem.find({pedidovenda : pedvenda}).populate('pedidovenda').populate('produto').exec(function(err, results) {
		if (err)
			res.send(err);
		res.json(results);
	});
}

function getClientes(res) {
	Cliente.find(function(err, clientes) {
		if (err)
			res.send(err);
		res.json(clientes);
	});
}

function insertPedidoVendaItem(req, res) {
		PedidoVendaItem.create({
			id_cliente : req.body.id_cliente,
			id_produto : req.body.id_produto

		}, function(err, pedvenditem) {
			if (err)
				res.send(err);
			getPedidoVendaItens(res);
		});
}

module.exports = function(app) {

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
  next();
});	

	// api ---------------------------------------------------------------------
	// Busca todas as revendedoras
	app.get('/api/revendedoras', function(req, res) {
		getRevendedoras(res); //usa mongoose para retornar todas as revendedoras
	});

	app.get('/api/revendedoras/:id', function(req,res) {
		Revendedora.findOne({_id : req.params.id}, function(err, cliente) {
			if (err)
				res.send(err);
			res.json(cliente);
		});	
	});

	//cria a revendedora e retorna todas as revendedoras
	app.post('/api/revendedoras', function(req, res) {
		if (req.body.nome == undefined) {
			res.send({ erro : "Nome da revendedora não informado"});
			return;
		}
		if (req.body.senha == undefined) {
			res.send({erro:"Senha da revendedora não informada"});
			return;
		}
		if (req.body.sobrenome == undefined) {
			req.body.sobrenome = "";
		}

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
		var revendedora = {};
		if (req.body.nome == undefined) {
			res.send({erro: "Nome não informado"});
			return;
		}
		revendedora["_id"] = req.params.revend_id;
		revendedora["nome"] = req.body.nome;
		
		if (req.body.sobrenome != undefined) {
			revendedora["sobrenome"] = req.body.sobrenome;
		}
		if (req.body.senha != undefined) {
			revendedora["senha"] = req.body.senha;
		}
		Revendedora.update(revendedora, function(err, revend) {
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

	app.get('/api/produto/:id', function(req,res) {
		Produto.findOne({_id : req.params.id}, function(err, produto) {
			if (err)
				res.send(err);
			res.json(produto);
		});
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
		if (req.body.full_img_url == undefined) {
			req.body.full_img_url = "http://rpgcenter.com.br/revendedora/img/produto-sem-imagem.gif";
		}
		if (req.body.sku == undefined) {
			req.body.sku = "SEM SKU";
		}
		if (req.body.preco == undefined) {
			req.body.preco = 1;
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

	app.get('/api/pedidovenda', function(req,res) {
		getPedidoVenda(res);
	});

	app.get('/api/pedidovenda/:id', function(req, res) {
		PedidoVenda.findOne({_id : req.params.id}, function(err, pedidovenda) {
			if (err)
				res.send(err);
			res.json(pedidovenda);
		});
	});

	app.post('/api/pedidovenda', function(req,res) {
		var nome_cliente = req.body.nome_cliente;
		if (req.body.id_revendedora == undefined) {
			res.send({ erro : "ID da revendedora não informado" });
			return;
		}
		if (req.body.id_cliente == undefined) {
			res.send({ erro : "ID do cliente não informado" });
			return;
		}

		PedidoVenda.create({ cliente : req.body.id_cliente, revendedora : req.body.id_revendedora, efetivado: false }, function(err) {
			if (err)
				res.send(err);
			getPedidoVenda(res);
		});
/*
		Cliente.findOne( {nome : req.body.nome_cliente }, '_id', function(err, cliente) {
			if (err)
				res.send(err);
			if (cliente == null) {

				Cliente.create({nome : nome_cliente}, function(err) {
					if (err)
						res.send(err);
					
					Cliente.findOne({nome : nome_cliente}, function(err, cliente) {
						if (err)
							res.send(err);
						if (cliente == null) {
							res.send({erro : "Erro ao criar cliente"});
						}
						req.body.id_cliente = cliente.id;
						insertPedidoVendaItem(req,res);				
					});

				});
			} else {
				req.body.id_cliente = cliente.id;
				insertPedidoVendaItem(req,res);
			}
		});
		*/
	});

	//Pedido Venda Itens
	app.get('/api/pedidovendaitens', function(req,res) {
		getPedidoVendaItens(res);
	});

	app.get('/api/pedidovendaitens/:id', function(req,res) {
		PedidoVendaItem.findOne({_id : req.params.id}, function(err, pedidovendaitem) {
			if (err)
				res.send(err);
			res.json(pedidovendaitem);
		});
	});

	app.post('/api/pedidovendaitens', function(req,res) {

		if (req.body.id_pedido_venda == undefined) {
			res.send({erro: "ID do pedido de venda não informado"});
			return;
		}

		if (req.body.id_produto == undefined) {
			res.send({erro: "ID do produto não informado"});
			return;
		}

		if (req.body.quantidade == undefined) {
			req.body.quantidade = 1;
		}

		PedidoVendaItem.findOne({pedidovenda : req.body.id_pedido_venda, produto : req.body.id_produto}, function(err, pedidovendaitem) {
			if (err)
				res.send(err);
			if (pedidovendaitem == null) {
				PedidoVendaItem.create({ 
					pedidovenda : req.body.id_pedido_venda, 
					produto : req.body.id_produto, 
					quantidade : req.body.quantidade }, function(err) {
					if (err)
						res.send(err);
					getPedidoVendaItens(res, req.body.id_pedido_venda);
				});
			} else {
				req.body.quantidade = parseFloat(pedidovendaitem.quantidade) + parseFloat(req.body.quantidade);
				PedidoVendaItem.update({ 
					pedidovenda : req.body.id_pedido_venda, 
					produto : req.body.id_produto 
				}, { 
						quantidade : req.body.quantidade 
					}, function(err, numberAffected, raw) {
					if (err)
						res.send(err);
					getPedidoVendaItens(res, req.body.id_pedido_venda);
				});
			}
		});	
	});

	app.put('/api/pedidovendaitem/:id', function(req, res) {
		if (req.params.id == undefined) {
			res.send({ erro : "ID do Item do Pedido de Venda não informado"});
		}

		if (req.body.quantidade == undefined) {
			req.body.quantidade = 1;
		}		
		PedidoVendaItem.findOneAndUpdate({_id : req.params.id }, {quantidade : req.body.quantidade}, function(err, pedidovendaitem) {
			if (err)
				res.send(err);
			getPedidoVendaItens(res, pedidovendaitem.pedidovenda);
		});
	});

	app.delete('/api/pedidovendaitem/:id', function(req, res) {
		if (req.params.id == undefined) {
			res.send({ erro : "ID do Item do Pedido de Venda não informado" });
		}
		PedidoVendaItem.findOneAndRemove({_id : req.params.id }, function(err) {
			if (err)
				res.send(err);
			getPedidoVendaItens(res);
		});
	});
	// Fim Pedido Venda Itens

	app.get('/api/clientes', function(req, res) {
		getClientes(res);
	});

	app.get('/api/cliente/:id', function(req,res) {
		Cliente.findOne({_id : req.params.id}, function(err, cliente) {
			if (err)
				res.send(err);
			res.json(cliente);
		})
	})

	app.post('/api/cliente', function(req,res) {
		if (req.body.nome == undefined) {
			res.send({erro : "Nome não informado"});
		}
		if (req.body.sobrenome == undefined) {
			req.body.sobrenome = "";
		}
		if (req.body.telefone == undefined) {
			req.body.telefone = "";
		}
		if (req.body.email == undefined) {
			req.body.email = "";
		}

		Cliente.create({
			nome: req.body.nome,
			sobrenome: req.body.sobrenome,
			telefone: req.body.telefone,
			email : req.body.email
		}, function(err, cliente) {
			if (err)
				res.send(err);
			getClientes(res);
		});
	});

	app.put('/api/cliente/:id', function(req,res) {
		var cli = {};
		if (req.body.nome != undefined) {
			cli["nome"] = req.body.nome;
		}
		if (req.body.sobrenome != undefined) {
			cli["sobrenome"] = req.body.sobrenome;
		}
		if (req.body.telefone != undefined) {
			cli["telefone"] = req.body.telefone;
		}
		if (req.body.email != undefined) {
			cli["email"] = req.body.email;
		}
		
		Cliente.findOneAndUpdate({_id : req.params.id}, cli, function(err, cliente) {
			if (err)
				res.send(err);
			getClientes(res);
		});
	});

	app.delete('/api/cliente/:id', function(req,res) {
		Cliente.remove({_id : req.params.id}, function(err, cliente) {
			if (err)
				res.send(err);
			getClientes(res);
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

	app.get('/produtos', function(req,res) {
		res.sendfile('./public/produtos.html');
		return;
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/login.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


};
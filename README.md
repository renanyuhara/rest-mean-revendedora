# REST MEAN.io Revendedora

Aplicação REST utilizando padrão MEAN.io.

## Requisitos

- [Node e npm](http://nodejs.org)

## Instalação

1. Clonar o repositorio: `git clone git@github.com/renanyuhara/rest-mean-revendedora.git`
2. Instale a aplicação: `npm install`
3. Inicie o servico: `node server.js`
4. Visualize no browser em `http://localhost:8080`

## Documentacao REST

### Produtos

####/api/produtos
__GET :__ 

__Requisicao:__

Nenhuma

__Retorno:__ 
```
* _id : ObjectId (String)
* nome : String
* full_img_url : String
* sku : String
* preco : Number
```
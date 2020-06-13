const express = require("express")
const server = express()

//pegar o db
const db = require('./database/db')

//pasta publica
server.use(express.static("public"))

//habilitar o uso do Req.body

server.use(express.urlencoded({extended: true}))

//utilizando o template nunjucks

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache:true,
})

//configurando caminhos
//pagina inicial
server.get("/", (req, res)=>{
   return res.render("index.html",{title:"Um Título"})
})
//
server.get("/create-point", (req, res)=>{
  return  res.render("create-point.html")

//req.query: query string da URL
//console.log(req.query)
})
server.post("/save-point", (req, res)=>{

//console.log(req.body)
//inserir os dados no banco de dados

  const query = `
  INSERT INTO places (
  image,
  name,
  address,
  address2,
  state,
  city,
  itens
  ) VALUES(?,?,?,?,?,?,?)
  `

  const values = [
      req.body.image,
      req.body.name,
      req.body.address, 
      req.body.address2,
      req.body.state,
      req.body.city,
      req.body.itens

  ]

  function afterInsertData(err){
      if(err){
          console.log(err)
          return req.send("Erro no Cadastro")
      } 
      console.log("cadastrado com sucesso")   
      console.log(this)

      return res.render("create-point.html", {saved:true})
  }


 db.run(query,values, afterInsertData)

})
//
server.get("/search", (req, res)=>{
  const search=req.query.search

  if(search==""){
 
    return  res.render("search-results.html",{total:0})
    
  }

  //pegar os dados do Banco de dados

db.all(`select * from places where city like '%${search}%'`, function(err, row){
  if(err){
      return console.log(err)
  }
   console.log("aqui estão os dados:")
  //console.log(row)

  const total = row.length
//mostrar a pasta html com os dados do banco
  return  res.render("search-results.html",{places:row, total:total})
})


    
  })

//ligando
server.listen(3000)

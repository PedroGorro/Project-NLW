// importando a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")
module.exports = db
//utilizar o objeto do banco de dados, para nossas operações
db.serialize(()=>{
 /*   //criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            itens TEXT
        );
    `)

    //inserir dados na tab
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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardin América",
        "Numero 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        } 
        console.log("cadastrado com sucesso")   
        console.log(this)
    }


   // db.run(query,values, afterInsertData)
    //consultar dados da tab
/*db.all(`select * from places`, function(err, row){
    if(err){
        return console.log(err)
    } console.log("aqui estão os dados:")
    console.log(row)

})
    //deletar dados da tabe
    db.run(`delete from places where id = 2`, function(err, row){
        if(err){
            return console.log(err)
        } console.log("Registros apagados")
        
    
    })
*/
})
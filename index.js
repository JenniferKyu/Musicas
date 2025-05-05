const express = require("express")
const bp = require("body-parser")
const cors = require("cors")
const app = express()
const sqlite3 = require("sqlite3")
const path = require("path")

app.use(bp.json())
app.use(bp.urlencoded())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

const db = new sqlite3.Database("./db.sqlite")

app.listen(1234)

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Musicas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo VARCHAR(50) NOT NULL,
        imagem VARCHAR(100),
        audio VARCHAR(100)
        )`)
})

app.get("/musica", (req, res) => {
    db.all(`SELECT * FROM Musicas`, [], (err, rows) => {
        res.json(rows)
    })
})

app.delete("/musica/:id", (req,res)=>{
    db.run(`DELETE FROM Musicas WHERE  id ==(?)`, [req.params.id])
})

app.post("/musica", (req, res) => {
    console.log(req.body)
    db.run(`INSERT INTO Musicas (titulo,imagem,audio) VALUES(?,?,?)`, [req.body.titulo,"2871307.png","16-bits-musica-294099.mp3"])
})

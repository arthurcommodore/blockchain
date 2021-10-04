const bodyParser = require('body-parser')
const express = require('express')
const Blockchain = require('./model/blockchain')
const P2pServer = require('./P2pserver')

const app = express()

const HTTP_PORT =  process.env.HTTP_PORT || 3022
const bc = new Blockchain
const p2pServer = new P2pServer(bc)

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))


app.get('/chain', (req,res) => {
    res.json(bc.chain)
})

app.post('/mine', (req, res) => {
    console.log(req.body.data)
    const block = bc.addBlock(req.body.data) 
    console.log(`New Block added: ${block.toString()}`)

    res.redirect('/chain')
})

app.listen(HTTP_PORT, () => console.log('work'))
p2pServer.listen()
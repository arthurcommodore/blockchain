const express = require('express')
const Blockchain = require('./model/blockchain')
const app = express()

const HTTP_PORT =  3001
const bc = new Blockchain

app.use(express.json())

app.get('/chain', (req,res) => {
    res.json(bc.chain)
})

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data) 
    console.log(`New Block added: ${block.toString()}`)

    res.redirect('/chain')
})

app.listen(HTTP_PORT, () => console.log('work'))

Blockchain = require('./model/blockchain')
Block = require('./model/block')

bc = new Blockchain
bc2 = new Blockchain

bc2.addBlock('500')
bc.isValidChain(bc2.chain)
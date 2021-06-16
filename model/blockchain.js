const Block = require('../model/block')

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data)
        this.chain.push(block)

        return block
    }

    isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis))
            return false

        for(let i = 1; i < chain.length; i++) {
            const block = chain[i] 
            const lastBlock = chain[i - 1]

            if(block.lasHash != lastBlock.hash || block.hash != Blockchain.blockHash(block))
                return false;
        }
        return true
    }

    static blockHash(block) {
        const {timestamp, lastHash, data} = block;
        return Block.hash(timestamp, lastHash, data)
    }
}



module.exports = Blockchain
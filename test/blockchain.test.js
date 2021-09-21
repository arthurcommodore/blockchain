const Block = require('../model/block')
const Blockchain = require('../model/blockchain')

describe('Blockchain', () => {
    let bc
    let bc2

    beforeEach(() => {
        bc = new Blockchain
        bc2 = new Blockchain
    })

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    it('adds a new block', () => {
        const data = 'arquivo.pdf'
        bc.addBlock(data)

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    })

    it('validates a valid chain', () => {
        bc2.addBlock('500U$')

        expect(bc.isValidChain(bc2.chain)).toBe(true)
    })

    it('invalidates a chain with a currupt genesis block ', () => {
        bc2.chain[0].data = 'lalalalalalala'
        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('invalidades a currupt chain', () => {
        bc2.addBlock('200U$')
        bc2.chain[bc2.chain.length - 1].data = '0U$'
        expect(bc.isValidChain(bc2.chain)).toBe(false)
    })

    it('replaces the chain a valid chain', () => {
        bc2.addBlock('900U$')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).toEqual(bc2.chain)
    })

    it('does not replace the chain with one of less or equal legth', () => {
        bc.addBlock('370U$')
        bc.replaceChain(bc2.chain)

        expect(bc.chain).not.toEqual(bc2.chain)
    })
})
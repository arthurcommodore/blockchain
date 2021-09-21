const webSocket = require('ws')
const P2P_PORT = process.env.P2P_PORT
const peers = process.env.PEERSo ? process.env.PEERS.split(',') : []

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain
        this.socket = []
    }
    listen() {
        const server = new WebSocket.Server({port: P2P_PORT})
        server.on('connection')
    }
}



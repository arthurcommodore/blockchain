const P2P_PORT = process.env.P2P_PORT || 5001
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []
const WebSocket = require('ws')
class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain
        this.sockets = []
    }

    listen() {
        const server = new WebSocket.Server({port: P2P_PORT})
        server.on('connection', socket => {
            this.connectSocket(socket)
        })

        this.connectToPeers()
        console.log(`Listening for peer-to-peer connections on ${P2P_PORT}`)

    }

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new WebSocket(peer)
            socket.on('open', () => this.connectSocket(socket))
        })
    }

    connectSocket(socket) {
        this.sockets.push(socket)
        console.log('Socket conectado')
    }

}

module.exports = P2pServer

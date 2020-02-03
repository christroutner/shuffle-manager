/*
  Controls access to Electron Cash.
*/

const axios = require('axios')

let _this

const LOCALHOST = `http://localhost:5001`
const FUSIONHOST = `http://192.168.0.235:5001`
const THRESHOLD = 0.01

class ElectronCash {
  constructor() {
    _this = this

    _this.axios = axios
  }

  // Get all UTXOs in the wallet.
  async getUtxos() {
    try {
      const options = {
        method: 'GET',
        url: `${LOCALHOST}/ec/utxos`,
        headers: {
          Accept: 'application/json'
        }
      }

      const result = await axios(options)
      const data = result.data

      return data
    } catch(err) {
      console.error(`Error in ec.js/getUtxos()`)
      throw err
    }
  }

  // Get all the UTXOs that are under the threshold.
  async getSmallUtxos() {
    try {
      const options = {
        method: 'GET',
        url: `${LOCALHOST}/ec/utxos`,
        headers: {
          Accept: 'application/json'
        }
      }

      const result = await axios(options)
      const data = result.data.utxos

      const smallUtxos = []
      for(let i=0; i < data.length; i++) {
        const thisUtxo = data[i]

        const value = Number(thisUtxo.value)

        if(value < THRESHOLD)
          smallUtxos.push(thisUtxo)
      }

      return smallUtxos
    } catch(err) {
      console.error(`Error in ec.js/getSmallUtxos()`)
      throw err
    }
  }

  // Get an unused address from the Fusion wallet server.
  async getFusionAddr() {
    try {
      const options = {
        method: 'GET',
        url: `${FUSIONHOST}/ec/address`,
        headers: {
          Accept: 'application/json'
        }
      }

      const result = await axios(options)
      const addr = result.data.address
      // console.log(`addr: ${addr}`)

      return addr
    } catch(err) {
      console.error(`Error in ec.js/getFusionAddr()`)
      throw err
    }
  }

  async sendUtxo(toAddr, fromAddr) {
    try {
      const options = {
        method: 'post',
        url: `${LOCALHOST}/ec/utxo`,
        data: {
          toAddr,
          fromAddr
        }
      }

      let result = await axios(options)
      // console.log(`result.data: ${JSON.stringify(result.data, null, 2)}`)

      return result.data.data.hex
    } catch(err) {
      console.error(`Error in ec.js/sendUtxo`)
      throw err
    }
  }

  // Broadcast a hex string transaction to the network.
  async broadcast(hex) {
    try {
      const options = {
        method: 'post',
        url: `${LOCALHOST}/ec/broadcast`,
        data: {
          hex
        }
      }

      let result = await axios(options)
      // console.log(`result.data: ${JSON.stringify(result.data, null, 2)}`)

      return result.data.txid
    } catch(err) {
      console.error(`Error in ec.js/broadcast()`)
      throw err
    }
  }
}

module.exports = ElectronCash

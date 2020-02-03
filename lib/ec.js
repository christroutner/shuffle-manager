/*
  Controls access to Electron Cash.
*/

const axios = require('axios')

let _this

const LOCALHOST = `http://localhost:5001`
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
}

module.exports = ElectronCash

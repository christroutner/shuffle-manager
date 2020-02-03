/*
  A daemon for sending small BCH coins to CashFusion for consolidation.
*/

'use strict'

const ElectronCash = require('./lib/ec')
const electronCash = new ElectronCash()

setInterval(function() {
  checkWallet()
}, 30000)
checkWallet()


async function checkWallet() {
  try {
    const data = await electronCash.getSmallUtxos()
    console.log(`data: ${JSON.stringify(data,null,2)}`)

    // For each utxo found under the threshold, send it to the CashFusion wallet.
    // for(let i=0; i < data.length; i++) {
    for(let i=0; i < 1; i++) {
      const thisUtxo = data[i]

      const toAddr = await electronCash.getFusionAddr()
      console.log(`fusion addr: ${toAddr}`)

      const fromAddr = thisUtxo.address
      console.log(`Sending UTXOs at this address: ${fromAddr}`)

      const hex = await electronCash.sendUtxo(toAddr, fromAddr)
      // console.log(`hex: ${hex}`)

      const txid = await electronCash.broadcast(hex)
      console.log(`Transaction broadcast with TXID: ${txid}`)

      console.log(`Sent utxo ${i}`)
      console.log(' ')
    }

  } catch(err) {
    console.log(`Error in checkWallet(): `, err)
  }
}

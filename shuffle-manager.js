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
  } catch(err) {
    console.log(`Error in checkWallet(): `, err)
  }
}

/*
  A daemon for sending small BCH coins to CashFusion for consolidation.
*/

"use strict";

const ElectronCash = require("./lib/ec");
const electronCash = new ElectronCash();

setInterval(function() {
  checkWallet()
}, 60000 * 10)
checkWallet();

async function checkWallet() {
  try {
    const data = await electronCash.getSmallUtxos();
    // console.log(`data: ${JSON.stringify(data, null, 2)}`);
    console.log(`There are ${data.length} UTXOs to transfer.`)
    console.log(' ')

    // Exit if there are no UTXOs to transfer.
    if(data.length < 1) return

    // For each utxo found under the threshold, send it to the CashFusion wallet.
    // for (let i = 0; i < data.length; i++) {
      for(let i=0; i < 1; i++) {
      const thisUtxo = data[i];

      const toAddr = await electronCash.getFusionAddr();
      console.log(`fusion addr: ${toAddr}`);

      const fromAddr = thisUtxo.address;
      console.log(`Sending UTXOs at this address: ${fromAddr}`);

      try {
        const hex = await electronCash.sendUtxo(toAddr, fromAddr);
        // console.log(`hex: ${hex}`)

        const txid = await electronCash.broadcast(hex);
        console.log(`Transaction broadcast with TXID: ${txid}`);

        console.log(`Sent utxo ${i}`);
      } catch (err) {
        console.log(`Error trying to send UTXO ${i} with address ${fromAddr}`);
      }

      console.log(" ");

      await sleep(5000);
    }
  } catch (err) {
    console.log(`Error in checkWallet(): `, err);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

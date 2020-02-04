# shuffle-manager

This is a daemon app for managing an Electron Cash wallet that uses CashShuffle. The app periodically checks the UTXOs in the wallet. Any that are less than a threshold get sent to a separate CashFusion wallet for consolidation.

The end goal of this application is to end up with large, anonymous UTXOs in your CashShuffle wallet.

## Requirements
* node __^10.15.1__
* npm __^6.7.0__

## Installation
```bash
git clone https://github.com/christroutner/shuffle-manager
cd shuffle-manager
npm install
npm start
```
## License
MIT

# shuffle-manager

This is a daemon app for managing an Electron Cash wallet that uses CashShuffle. The app periodically checks the UTXOs in the wallet. Any that are less than a threshold get sent to a separate CashFusion wallet for consolidation.

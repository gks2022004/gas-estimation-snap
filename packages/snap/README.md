# Gas Fee Estimator

This project aims to fetch current gas fee estimation through the `wallet_invokeSnap` JSON-RPC request and display it to the user through MetaMask's UI. We will start by configuring the basic Snaps environment, then proceed to fetch real-time gas fee data by calling external APIs, and finally utilize the `snap_dialog` method provided by MetaMask to show information to the user.

## Testing

The snap comes with some basic tests, to demonstrate how to write tests for
snaps. To test the snap, run `yarn test` in this directory. This will use
[`@metamask/snaps-jest`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-jest)
to run the tests in `src/index.test.ts`.

import React from 'react'
import ReactDOM from 'react-dom'
import { ChainId, DAppProvider } from '@usedapp/core'
import { App } from './App'

const config = {
  rpc: {
    // 1: RPC_URLS[1],
    // 4: RPC_URLS[4],
    56: 'https://bsc-dataseed1.binance.org'
  },
  qrcode: true,
  pollingInterval: 15000
}
     

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

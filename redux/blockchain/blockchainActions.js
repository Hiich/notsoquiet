// constants
import Web3EthContract from 'web3-eth-contract'
import Web3 from 'web3'
// log
import { fetchData } from '../data/dataActions'
import config from '@/modules/config'

const connectRequest = () => {
  return {
    type: 'CONNECTION_REQUEST',
  }
}

const connectSuccess = (payload) => {
  return {
    type: 'CONNECTION_SUCCESS',
    payload: payload,
  }
}

const connectFailed = (payload) => {
  return {
    type: 'CONNECTION_FAILED',
    payload: payload,
  }
}

const updateAccountRequest = (payload) => {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload,
  }
}

export const connect = () => {
  return async (dispatch) => {
    console.log('Connecting')
    dispatch(connectRequest())
    const abiResponse = await fetch('/config/abi.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const abi = await abiResponse.json()

    const { ethereum } = window
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask
    if (metamaskIsInstalled) {
      Web3EthContract.setProvider(ethereum)
      let web3 = new Web3(ethereum)
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })

        const networkId = await ethereum.request({
          method: 'net_version',
        })
        if (networkId == config.NETWORK.ID) {
          const SmartContractObj = new Web3EthContract(
            abi,
            config.CONTRACT_ADDRESS
          )
          SmartContractObj.options.address = config.SMART_CONTRACT

          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            })
          )
          // Add listeners start
          ethereum.on('accountsChanged', (accounts) => {
            dispatch(updateAccount(accounts[0]))
          })
          ethereum.on('chainChanged', () => {
            window.location.reload()
          })
          // Add listeners end
        } else {
          dispatch(connectFailed(`Change network to ${config.NETWORK.NAME}.`))
        }
      } catch (err) {
        dispatch(connectFailed('Something went wrong.'))
      }
    } else {
      dispatch(connectFailed('Install Metamask.'))
    }
  }
}

export const setContract = () => {
  return async (dispatch) => {
    console.log('Initializing contract')
    dispatch(connectRequest())
    const abiResponse = await fetch('/config/abi.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const abi = await abiResponse.json()

    const { ethereum } = window

    Web3EthContract.setProvider(ethereum)
    let web3 = new Web3(ethereum)
    try {
      const networkId = await ethereum.request({
        method: 'net_version',
      })
      if (networkId == config.NETWORK.ID) {
        const SmartContractObj = new Web3EthContract(
          abi,
          config.CONTRACT_ADDRESS
        )
        SmartContractObj.options.address = config.SMART_CONTRACT
        dispatch(fetchData())
        dispatch(
          connectSuccess({
            account: null,
            smartContract: SmartContractObj,
            web3: web3,
          })
        )
        console.log(SmartContractObj)
        // Add listeners end
      } else {
        dispatch(connectFailed(`Change network to ${config.NETWORK.NAME}.`))
      }
    } catch (err) {
      dispatch(connectFailed('Something went wrong.'))
    }
  }
}

export const updateAccount = (account) => {
  return async (dispatch) => {
    dispatch(updateAccountRequest({ account: account }))
    dispatch(fetchData(account))
  }
}

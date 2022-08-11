// log
import store from '../store'

const fetchDataRequest = () => {
  return {
    type: 'CHECK_DATA_REQUEST',
  }
}

const fetchDataSuccess = (payload) => {
  return {
    type: 'CHECK_DATA_SUCCESS',
    payload: payload,
  }
}

const fetchDataFailed = (payload) => {
  return {
    type: 'CHECK_DATA_FAILED',
    payload: payload,
  }
}

export const fetchData = () => {
  console.log('fetching data...')
  return async (dispatch) => {
    dispatch(fetchDataRequest())
    try {
      let patronSupply = await store
        .getState()
        .blockchain.smartContract.methods.lastTokenId(2)
        .call()
      let benefactorMinted = await store
        .getState()
        .blockchain.smartContract.methods.lastTokenId(1)
        .call()
      let benefactorSupply = benefactorMinted - 8400

      console.log('Supply', benefactorSupply)
      dispatch(
        fetchDataSuccess({
          benefactorSupply,
          patronSupply,
        })
      )
    } catch (err) {
      console.log(err)
      dispatch(fetchDataFailed('Could not load data from contract.'))
    }
  }
}

export const stakeTokens = (genNumber, tokensIds) => {
  return async (dispatch) => {
    const configResponse = await fetch('/config/config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const CONFIG = await configResponse.json()
    const account = await store.getState().blockchain.account
    await store
      .getState()
      .blockchain.smartContract.methods.stakeNFT(genNumber, tokensIds)
      .send({
        // gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: account,
      })
      .once('error', (err) => {
        console.log(err)
      })
      .then((receipt) => {
        // add your success message
      })
  }
}

export const unstakeAll = () => {
  return async (dispatch) => {
    const configResponse = await fetch('/config/config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const CONFIG = await configResponse.json()
    const account = await store.getState().blockchain.account
    await store
      .getState()
      .blockchain.smartContract.methods.unstakeAll()
      .send({
        // gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: account,
      })
      .once('error', (err) => {
        console.log(err)
        setFeedback('Sorry, something went wrong please try again later.')
        setClaimingNft(false)
      })
      .then((receipt) => {
        // add your success message
      })
  }
}

export const unstakeNFTByGen = (genNumber) => {
  return async (dispatch) => {
    const configResponse = await fetch('/config/config.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    const CONFIG = await configResponse.json()
    const account = await store.getState().blockchain.account
    await store
      .getState()
      .blockchain.smartContract.methods.unstakeNFTByGen(genNumber)
      .send({
        // gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: account,
      })
      .once('error', (err) => {
        console.log(err)
        setFeedback('Sorry, something went wrong please try again later.')
        setClaimingNft(false)
      })
      .then((receipt) => {
        // add your success message
      })
  }
}

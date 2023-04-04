import abi from '@/artifacts/contracts/DappLottery.sol/DappLottery.json'
import address from '@/artifacts/contractAddress.json'
import { walletActions } from '@/store/wallet_reducer'
import { store } from '@/store'
import { ethers } from 'ethers'

const { updateWallet } = walletActions
const contractAddress = address.address
const contractAbi = abi.abi
let tx, ethereum

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

const toWei = (num) => ethers.utils.parseEther(num.toString())
const connectedAccount = () => store.getState().walletState.wallet

const getEtheriumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      store.dispatch(updateWallet(accounts[0].toLowerCase()))
      await isWallectConnected()
    })

    if (accounts.length) {
      store.dispatch(updateWallet(accounts[0].toLowerCase()))
    } else {
      notifyUser('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    store.dispatch(updateWallet(accounts[0].toLowerCase()))
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  console.log(error.message)
}

const notifyUser = (msg) => {
  console.log(msg)
}

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

export { isWallectConnected, connectWallet, truncate }

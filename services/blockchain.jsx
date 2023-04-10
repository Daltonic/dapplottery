import abi from '@/artifacts/contracts/DappLottery.sol/DappLottery.json'
import address from '@/artifacts/contractAddress.json'
import { globalActions } from '@/store/global_reducer'
import { store } from '@/store'
import { getLuckyNumbers, getParticipants } from '@/services/blockchain.srr'
import { ethers } from 'ethers'

const { updateWallet, setLuckyNumbers, setParticipants } = globalActions
const contractAddress = address.address
const contractAbi = abi.abi
let tx, ethereum

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

const toWei = (num) => ethers.utils.parseEther(num.toString())

const getEthereumContract = async () => {
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
      store.dispatch(updateWallet(accounts[0]?.toLowerCase()))
      await isWallectConnected()
    })

    if (accounts.length) {
      store.dispatch(updateWallet(accounts[0]?.toLowerCase()))
    } else {
      store.dispatch(updateWallet(''))
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
    store.dispatch(updateWallet(accounts[0]?.toLowerCase()))
  } catch (error) {
    reportError(error)
  }
}

const createJackpot = async ({ title, description, imageUrl, prize, ticketPrice, expiresAt }) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const connectedAccount = store.getState().globalState.wallet
    const contract = await getEthereumContract()
    tx = await contract.createLottery(
      title,
      description,
      imageUrl,
      toWei(prize),
      toWei(ticketPrice),
      expiresAt,
      {
        from: connectedAccount,
      }
    )
    await tx.wait()
  } catch (error) {
    reportError(error)
  }
}

const buyTicket = async (id, luckyNumberId, ticketPrice) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const connectedAccount = store.getState().globalState.wallet
    const contract = await getEthereumContract()
    tx = await contract.buyTicket(id, luckyNumberId, {
      from: connectedAccount,
      value: toWei(ticketPrice),
    })
    await tx.wait()
    const lotteryParticipants = await getParticipants(id)
    store.dispatch(setParticipants(lotteryParticipants))
  } catch (error) {
    reportError(error)
  }
}

const exportLuckyNumbers = async (id, luckyNumbers) => {
  try {
    if (!ethereum) return notifyUser('Please install Metamask')
    const connectedAccount = store.getState().globalState.wallet
    const contract = await getEthereumContract()
    tx = await contract.importLuckyNumbers(id, luckyNumbers, {
      from: connectedAccount,
    })
    await tx.wait()
    const lotteryNumbers = await getLuckyNumbers(id)
    store.dispatch(setLuckyNumbers(lotteryNumbers))
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

export { isWallectConnected, connectWallet, createJackpot, exportLuckyNumbers, buyTicket, truncate }

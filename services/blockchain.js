import { store } from '@/store'
import { ethers } from 'ethers'
import { globalActions } from '@/store/globalSlices'
import address from '@/artifacts/contractAddress.json'
import abi from '@/artifacts/contracts/DappLottery.sol/DappLottery.json'

const { setWallet, setPurchasedNumbers, setLuckyNumbers, setJackpot, setResult, setParticipants } =
  globalActions
const contractAddress = address.address
const contractAbi = abi.abi
let tx, ethereum

if (typeof window !== 'undefined') {
  ethereum = window.ethereum
}

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const csrEthereumContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

const ssrEthereumContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545/')
  const wallet = ethers.Wallet.createRandom()
  const signer = provider.getSigner(wallet.address)
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

const connectWallet = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    store.dispatch(setWallet(accounts[0]))
  } catch (error) {
    reportError(error)
  }
}

const monitorWalletConnection = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      store.dispatch(setWallet(accounts[0]))
      await monitorWalletConnection()
    })

    if (accounts.length) {
      store.dispatch(setWallet(accounts[0]))
    } else {
      store.dispatch(setWallet(''))
      reportError('Please, connect wallet, no accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getLotteries = async () => {
  const contract = await ssrEthereumContract()
  const lotteries = await contract.getLotteries()
  return structureLotteries(lotteries)
}

const getLottery = async (id) => {
  const contract = await ssrEthereumContract()
  const lottery = await contract.getLottery(id)
  return structureLotteries([lottery])[0]
}

const getLuckyNumbers = async (id) => {
  const contract = await ssrEthereumContract()
  const luckyNumbers = await contract.getLotteryLuckyNumbers(id)
  return luckyNumbers
}

const getPurchasedNumbers = async (id) => {
  const contract = await ssrEthereumContract()
  const participants = await contract.getLotteryParticipants(id)
  return structuredNumbers(participants)
}

const getParticipants = async (id) => {
  const contract = await ssrEthereumContract()
  const participants = await contract.getLotteryParticipants(id)
  return structuredParticipants(participants)
}

const getLotteryResult = async (id) => {
  const contract = await ssrEthereumContract()
  const lotterResult = await contract.getLotteryResult(id)
  return structuredResult(lotterResult)
}

const createJackpot = async ({ title, description, imageUrl, prize, ticketPrice, expiresAt }) => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const wallet = store.getState().globalStates.wallet
    const contract = await csrEthereumContract()
    tx = await contract.createLottery(
      title,
      description,
      imageUrl,
      toWei(prize),
      toWei(ticketPrice),
      expiresAt,
      {
        from: wallet,
      }
    )
    tx.wait()
  } catch (error) {
    reportError(error)
  }
}

const exportLuckyNumbers = async (id, luckyNumbers) => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const wallet = store.getState().globalStates.wallet
    const contract = await csrEthereumContract()

    tx = await contract.importLuckyNumbers(id, luckyNumbers, {
      from: wallet,
    })
    tx.wait()

    const lotteryLuckyNumbers = await getLuckyNumbers(id)
    store.dispatch(setLuckyNumbers(lotteryLuckyNumbers))
  } catch (error) {
    reportError(error)
  }
}

const buyTicket = async (id, luckyNumberId, ticketPrice) => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const wallet = store.getState().globalStates.wallet
    const contract = await csrEthereumContract()

    tx = await contract.buyTicket(id, luckyNumberId, {
      from: wallet,
      value: toWei(ticketPrice),
    })
    tx.wait()

    const purchasedNumbers = await getPurchasedNumbers(id)
    const lotteryLuckyNumbers = await getLuckyNumbers(id)
    const lottery = await getLottery(id)

    store.dispatch(setPurchasedNumbers(purchasedNumbers))
    store.dispatch(setLuckyNumbers(lotteryLuckyNumbers))
    store.dispatch(setJackpot(lottery))
  } catch (error) {
    reportError(error)
  }
}

const performDraw = async (id, numberOfWinners) => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const wallet = store.getState().globalStates.wallet
    const contract = await csrEthereumContract()

    tx = await contract.randomlySelectWinners(id, numberOfWinners, {
      from: wallet,
    })
    tx.wait()

    const lotteryParticipants = await getParticipants(id)
    const lottery = await getLottery(id)
    const result = await getLotteryResult(id)

    store.dispatch(setParticipants(lotteryParticipants))
    store.dispatch(setJackpot(lottery))
    store.dispatch(setResult(result))
  } catch (error) {
    reportError(error)
  }
}

const structureLotteries = (lotteries) =>
  lotteries.map((lottery) => ({
    id: Number(lottery.id),
    title: lottery.title,
    description: lottery.description,
    owner: lottery.owner.toLowerCase(),
    prize: fromWei(lottery.prize),
    ticketPrice: fromWei(lottery.ticketPrice),
    image: lottery.image,
    createdAt: formatDate(Number(lottery.createdAt)),
    drawsAt: formatDate(Number(lottery.expiresAt)),
    expiresAt: Number(lottery.expiresAt),
    winners: Number(lottery.winners),
    participants: Number(lottery.participants),
    drawn: lottery.drawn,
  }))

const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dayOfWeek = daysOfWeek[date.getDay()]
  const monthOfYear = monthsOfYear[date.getMonth()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  return `${dayOfWeek} ${monthOfYear} ${dayOfMonth}, ${year}`
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

const generateLuckyNumbers = (count) => {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < count; i++) {
    let string = ''
    for (let j = 0; j < 6; j++) {
      string += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    result.push(string)
  }
  return result
}

const structuredNumbers = (participants) => {
  const purchasedNumbers = []

  for (let i = 0; i < participants.length; i++) {
    const purchasedNumber = participants[i][1]
    purchasedNumbers.push(purchasedNumber)
  }

  return purchasedNumbers
}

const structuredResult = (result) => {
  const LotteryResult = {
    id: Number(result[0]),
    completed: result[1],
    paidout: result[2],
    timestamp: Number(result[3]),
    sharePerWinner: fromWei(result[4] || 0),
    winners: [],
  }

  for (let i = 0; i < result[5]?.length; i++) {
    const winner = result[5][i][1]
    LotteryResult.winners.push(winner)
  }

  return LotteryResult
}

const structuredParticipants = (participants) =>
  participants.map((participant) => ({
    account: participant[0].toLowerCase(),
    lotteryNumber: participant[1],
    paid: participant[2],
  }))

const reportError = (error) => {
  console.log(error.message)
}

export {
  monitorWalletConnection,
  generateLuckyNumbers,
  getPurchasedNumbers,
  exportLuckyNumbers,
  getLotteryResult,
  getLuckyNumbers,
  getParticipants,
  createJackpot,
  connectWallet,
  getLotteries,
  performDraw,
  getLottery,
  buyTicket,
  truncate,
}

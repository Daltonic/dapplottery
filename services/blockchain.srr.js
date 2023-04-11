const abi = require('../artifacts/contracts/DappLottery.sol/DappLottery.json')
const address = require('../artifacts/contractAddress.json')
const { ethers } = require('ethers')

const contractAddress = address.address
const contractAbi = abi.abi
const fromWei = (num) => ethers.utils.formatEther(num)

const getEtheriumContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NODE_ENV !== 'production'
      ?  process.env.NEXT_PUBLIC_LOCALHOST_URL
      : process.env.NEXT_PUBLIC_MUMBAI_URL
  )
  const wallet = ethers.Wallet.createRandom()

  // Set the new account as the signer for the provider
  const signer = provider.getSigner(wallet.address)
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}

const getLotteries = async () => {
  const lotteries = await (await getEtheriumContract()).functions.getLotteries()
  return structureLotteries(lotteries[0])
}
const getLottery = async (id) => {
  const lottery = await (await getEtheriumContract()).functions.getLottery(id)
  return structureLotteries([lottery[0]])[0]
}

const getLuckyNumbers = async (id) => {
  const luckyNumbers = await (await getEtheriumContract()).functions.getLotteryLuckyNumbers(id)
  return luckyNumbers[0]
}

const getLotteryResult = async (id) => {
  const lotterResult = await (await getEtheriumContract()).functions.getLotteryResult(id)
  return structuredResult(lotterResult[0])
}

const getParticipants = async (id) => {
  const participants = await (await getEtheriumContract()).functions.getLotteryParticipants(id)
  return structuredParticipants(participants[0])
}
const getPurchasedNumbers = async (id) => {
  const participants = await (await getEtheriumContract()).functions.getLotteryParticipants(id)
  return structuredNumbers(participants[0])
}

function formatDate(timestamp) {
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

const structureLotteries = (lotteries) =>
  lotteries.map((lottery) => ({
    id: Number(lottery.id),
    title: lottery.title,
    description: lottery.description,
    owner: lottery.owner.toLowerCase(),
    prize: fromWei(lottery.prize),
    ticketPrice: fromWei(lottery.ticketPrice),
    image: lottery.image,
    createdAt: formatDate(Number(lottery.createdAt + '000')),
    drawsAt: formatDate(Number(lottery.expiresAt)),
    expiresAt: Number(lottery.expiresAt),
    participants: Number(lottery.participants),
    drawn: lottery.drawn,
  }))

const structuredParticipants = (participants) =>
  participants.map((participant) => ({
    account: participant[0].toLowerCase(),
    lotteryNumber: participant[1],
    paid: participant[2],
  }))

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
    timestamp: Number(result[3] + '000'),
    sharePerWinner: fromWei(result[4]),
    winners: [],
  }

  for (let i = 0; i < result[5].length; i++) {
    const winner = result[5][i][1]
    LotteryResult.winners.push(winner)
  }

  return LotteryResult
}

module.exports = {
  getLotteries,
  getLottery,
  structureLotteries,
  getLuckyNumbers,
  getParticipants,
  getPurchasedNumbers,
  getLotteryResult,
}

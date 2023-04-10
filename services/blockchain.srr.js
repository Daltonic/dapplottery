const abi = require('../artifacts/contracts/DappLottery.sol/DappLottery.json')
const address = require('../artifacts/contractAddress.json')
const { ethers } = require('ethers')

const contractAddress = address.address
const contractAbi = abi.abi
const fromWei = (num) => ethers.utils.formatEther(num)

const getEtheriumContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  const signer = provider.getSigner()
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

const getParticipants = async (id) => {
  const participants = await (await getEtheriumContract()).functions.getLotteryParticipants(id)
  return getParticipantsNumbers(participants[0])
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
    owner: lottery.owner,
    prize: fromWei(lottery.prize),
    ticketPrice: fromWei(lottery.ticketPrice),
    image: lottery.image,
    createdAt: formatDate(Number(lottery.createdAt + '000')),
    drawsAt: formatDate(Number(lottery.expiresAt)),
    expiresAt: Number(lottery.expiresAt),
    drawn: lottery.drawn,
  }))

const getParticipantsNumbers = (participants) => {
  const purchasedNumbers = []

  for (let i = 0; i < participants.length; i++) {
    const purchasedNumber = participants[i][1]
    purchasedNumbers.push(purchasedNumber)
  }

  return purchasedNumbers
}

module.exports = {
  getLotteries,
  getLottery,
  structureLotteries,
  getLuckyNumbers,
  getParticipants,
}

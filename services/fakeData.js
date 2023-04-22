function generateLottery(id) {
  const image = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png`
  const expiresIn = getRandomInt(7, 30)
  const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).getTime()

  return {
    id,
    title: `Lottery ${id}`,
    description: `This is the ${id} lottery`,
    owner: generateRandomEthereumAddress(),
    prize: getRandomFloat(10, 100).toFixed(2),
    ticketPrice: getRandomFloat(0.01, 0.1).toFixed(2),
    image,
    drawsAt: getRandomTimestamp(new Date('2022-01-01').getTime(), new Date('2022-12-31').getTime()),
    createdAt: getRandomTimestamp(
      new Date('2022-01-01').getTime(),
      new Date('2022-12-31').getTime()
    ),
    expiresAt,
    participants: getRandomInt(10, 100),
    drawn: false,
  }
}

const generateLotteries = (n) => {
  const lotteries = []

  for (let i = 1; i <= n; i++) {
    const id = i.toString()
    const title = `Lottery ${id}`
    const description = `This is the ${i} lottery`
    const owner = generateRandomEthereumAddress()
    const prize = getRandomFloat(10, 100).toFixed(2)
    const ticketPrice = getRandomFloat(0.01, 0.1).toFixed(2)
    const image = `https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png`
    const createdAt = getRandomTimestamp(
      new Date('2022-01-01').getTime(),
      new Date('2022-12-31').getTime()
    )
    const drawsAt = getRandomTimestamp(
      new Date('2022-01-01').getTime(),
      new Date('2022-12-31').getTime()
    )
    const expiresIn = getRandomInt(7, 30)
    const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).getTime()
    const participants = getRandomInt(10, 100)
    const drawn = false

    lotteries.push({
      id,
      title,
      description,
      owner,
      prize,
      ticketPrice,
      image,
      createdAt,
      drawsAt,
      expiresAt,
      participants,
      drawn,
    })
  }

  return lotteries
}

function generateLotteryParticipants(count) {
  const participants = []
  const accounts = [
    '0xC0452490BF5A86540303bA31B9C1F6FA5c239e3c',
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2',
    '0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db',
    '0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB',
    '0x617F2E2fD72FD9D5503197092aC168c91465E7f2',
    '0x17F6AD8Ef982297579C203069C1DbfFE4348c372',
    '0x5c6B0f7Bf3E7ce046039Bd8FABdfD3f9F5021678',
    '0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7',
    '0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C',
  ]

  for (let i = 0; i < count; i++) {
    const participant = {
      account: accounts[Math.floor(Math.random() * accounts.length)],
      lotteryNumber: Math.random().toString(36).substring(2, 8),
      paid: false,
    }
    participants.push(participant)
  }

  return participants
}

function getPurchasedNumbers(count) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const result = []
  for (let i = 0; i < count; i++) {
    let string = ''
    for (let j = 0; j < 6; j++) {
      string += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    result.push(string)
  }
  return result
}

function generateRandomEthereumAddress() {
  const hexChars = '0123456789abcdef'
  let address = '0x'

  for (let i = 0; i < 40; i++) {
    address += hexChars.charAt(Math.floor(Math.random() * hexChars.length))
  }

  return address
}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min
}

function getRandomTimestamp(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { generateLotteries, generateLottery, generateLotteryParticipants, getPurchasedNumbers }

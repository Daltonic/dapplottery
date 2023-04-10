const { expect } = require('chai')
const { faker } = require('@faker-js/faker')

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const addDays = (days) => {
  const currentDate = new Date()
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const newTimestamp = currentDate.getTime() + days * millisecondsPerDay
  return newTimestamp
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

describe('DappLottery', () => {
  let Contract, contract, result
  const servicePercent = 5
  const title = faker.random.words(5)
  const description = faker.lorem.paragraph()
  const image = faker.image.imageUrl()
  const ticketPrice = toWei(0.01)
  const prize = toWei(10)
  const expiresAt = addDays(7)
  const lotteryId = 1
  const numberOfWinners = 2
  const numberToGenerate = 5

  beforeEach(async () => {
    Contract = await ethers.getContractFactory('DappLottery')
    ;[serviceAccount, participant1, participant2, participant3, participant4, participant5] =
      await ethers.getSigners()

    contract = await Contract.deploy(servicePercent)

    await contract.deployed()
  })

  describe('Deployed State', () => {
    it('Should confirm deployment info', async () => {
      result = await contract.owner()
      expect(result).to.be.equal(serviceAccount.address)
      result = await contract.servicePercent()
      expect(result.toNumber()).to.be.equal(servicePercent)
    })
  })

  describe('Lottery Creation', () => {
    it('Should confirm lottery creation', async () => {
      result = await contract.getLotteries()
      expect(result).to.have.lengthOf(0)

      await contract.createLottery(title, description, image, prize, ticketPrice, expiresAt)

      result = await contract.getLotteries()
      expect(result).to.have.lengthOf(1)
    })
  })

  describe('Lucky Numbers Generation', () => {
    beforeEach(async () => {
      await contract.createLottery(title, description, image, prize, ticketPrice, expiresAt)
    })

    it('Should confirm lucky numbers import', async () => {
      result = await contract.getLotteryLuckyNumbers(lotteryId)
      expect(result).to.have.lengthOf(0)

      await contract.importLuckyNumbers(lotteryId, generateLuckyNumbers(numberToGenerate))

      result = await contract.getLotteryLuckyNumbers(lotteryId)
      expect(result).to.have.lengthOf(numberToGenerate)
    })
  })

  describe('Buying Tickets', () => {
    beforeEach(async () => {
      await contract.createLottery(title, description, image, prize, ticketPrice, expiresAt)
      await contract.importLuckyNumbers(lotteryId, generateLuckyNumbers(numberToGenerate))
    })

    it('Should confirm ticket purchase', async () => {
      result = await contract.getLottery(lotteryId)
      expect(result.participants.toNumber()).to.be.equal(0)
      result = await contract.getLotteryParticipants(lotteryId)
      expect(result).to.have.lengthOf(0)

      await contract.connect(participant1).buyTicket(lotteryId, numberToGenerate - 1, {
        value: ticketPrice,
      })

      result = await contract.getLottery(lotteryId)
      expect(result.participants.toNumber()).to.be.equal(1)
      result = await contract.getLotteryParticipants(lotteryId)
      expect(result).to.have.lengthOf(1)
    })
  })

  describe('Selecting Winners', () => {
    beforeEach(async () => {
      await contract.createLottery(title, description, image, prize, ticketPrice, expiresAt)

      await contract.importLuckyNumbers(lotteryId, generateLuckyNumbers(numberToGenerate))

      await contract.connect(participant1).buyTicket(lotteryId, numberToGenerate - 1, {
        value: ticketPrice,
      })

      await contract.connect(participant2).buyTicket(lotteryId, numberToGenerate - 2, {
        value: ticketPrice,
      })

      await contract.connect(participant3).buyTicket(lotteryId, numberToGenerate - 3, {
        value: ticketPrice,
      })

      await contract.connect(participant4).buyTicket(lotteryId, numberToGenerate - 4, {
        value: ticketPrice,
      })

      await contract.connect(participant5).buyTicket(lotteryId, numberToGenerate - 5, {
        value: ticketPrice,
      })
    })

    it('Should confirm random winner selection', async () => {
      result = await contract.getLotteryParticipants(lotteryId)
      expect(result).to.have.lengthOf(numberToGenerate)

      result = await contract.getLotteryResult(lotteryId)
      expect(result.winners).to.have.lengthOf(0)

      await contract.randomlySelectWinners(lotteryId, numberOfWinners)

      result = await contract.getLotteryResult(lotteryId)
      expect(result.winners).to.have.lengthOf(numberOfWinners)
    })
  })

  describe('Paying Winners', () => {
    beforeEach(async () => {
      await contract.createLottery(title, description, image, prize, ticketPrice, expiresAt)

      await contract.importLuckyNumbers(lotteryId, generateLuckyNumbers(numberToGenerate))

      await contract.connect(participant1).buyTicket(lotteryId, numberToGenerate - 1, {
        value: ticketPrice,
      })

      await contract.connect(participant2).buyTicket(lotteryId, numberToGenerate - 2, {
        value: ticketPrice,
      })

      await contract.connect(participant3).buyTicket(lotteryId, numberToGenerate - 3, {
        value: ticketPrice,
      })

      await contract.connect(participant4).buyTicket(lotteryId, numberToGenerate - 4, {
        value: ticketPrice,
      })

      await contract.connect(participant5).buyTicket(lotteryId, numberToGenerate - 5, {
        value: ticketPrice,
      })
    })

    it('Should confirm payment of winners', async () => {
      result = await contract.serviceBalance()
      expect(Number(result)).to.be.equal(Number(toWei(numberToGenerate * fromWei(ticketPrice))))

      result = await contract.getLotteryResult(lotteryId)
      expect(result.winners).to.have.lengthOf(0)
      expect(result.paidout).to.be.equal(false)

      await contract.randomlySelectWinners(lotteryId, numberOfWinners)

      result = await contract.getLotteryResult(lotteryId)
      expect(result.winners).to.have.lengthOf(numberOfWinners)
      expect(result.paidout).to.be.equal(true)

      result = await contract.serviceBalance()
      expect(result.toNumber()).to.be.equal(0)
    })
  })
})

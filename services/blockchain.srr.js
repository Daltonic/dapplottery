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

const getLotteries = async () => await (await getEtheriumContract()).functions.getLotteries()
const getLottery = async (id) => await (await getEtheriumContract()).functions.getLottery(id)

module.exports = {
  getLotteries,
  getLottery,
}

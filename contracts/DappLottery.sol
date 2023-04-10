//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DappLottery is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _totalLotteries;

    struct LotteryStruct {
        uint256 id;
        string title;
        string description;
        string image;
        uint256 prize;
        uint256 ticketPrice;
        uint256 participants;
        bool drawn;
        address owner;
        uint256 createdAt;
        uint256 expiresAt;
    }

    struct ParticipantStruct {
        address account;
        string lotteryNumber;
        bool paid;
    }

    struct LotteryResultStruct {
        uint256 id;
        bool completed;
        bool paidout;
        uint256 timestamp;
        uint256 sharePerWinner;
        ParticipantStruct[] winners;
    }

    uint256 public servicePercent;
    uint256 public serviceBalance;

    mapping(uint256 => LotteryStruct) lotteries;
    mapping(uint256 => ParticipantStruct[]) lotteryParticipants;
    mapping(uint256 => string[]) lotteryLuckyNumbers;
    mapping(uint256 => mapping(uint256 => bool)) luckyNumberUsed;
    mapping(uint256 => LotteryResultStruct) lotteryResult;

    constructor(uint256 _servicePercent) {
        servicePercent = _servicePercent;
    }

    function createLottery(
        string memory title,
        string memory description,
        string memory image,
        uint256 prize,
        uint256 ticketPrice,
        uint256 expiresAt
    ) public {
        require(bytes(title).length > 0, "title cannot be empty");
        require(bytes(description).length > 0, "description cannot be empty");
        require(bytes(image).length > 0, "image cannot be empty");
        require(prize > 0 ether, "prize cannot be zero");
        require(ticketPrice > 0 ether, "ticketPrice cannot be zero");
        require(
            expiresAt > block.timestamp,
            "expireAt cannot be less than the future"
        );

        _totalLotteries.increment();
        LotteryStruct memory lottery;

        lottery.id = _totalLotteries.current();
        lottery.title = title;
        lottery.description = description;
        lottery.image = image;
        lottery.prize = prize;
        lottery.ticketPrice = ticketPrice;
        lottery.owner = msg.sender;
        lottery.createdAt = block.timestamp;
        lottery.expiresAt = expiresAt;

        lotteries[lottery.id] = lottery;
    }

    function importLuckyNumbers(uint256 id, string[] memory luckyNumbers)
        public
    {
        require(lotteries[id].owner == msg.sender, "Unauthorized entity");
        require(lotteryLuckyNumbers[id].length < 1, "Already generated");
        require(lotteries[id].participants < 1, "Tickets have been purchased");
        require(luckyNumbers.length > 0, "Lucky numbers cannot be zero");
        lotteryLuckyNumbers[id] = luckyNumbers;
    }

    function buyTicket(uint256 id, uint256 luckyNumberId) public payable {
        require(
            !luckyNumberUsed[id][luckyNumberId],
            "Lucky number already used"
        );
        require(
            msg.value >= lotteries[id].ticketPrice,
            "insufficient ethers to buy ethers"
        );

        lotteries[id].participants++;
        lotteryParticipants[id].push(
            ParticipantStruct(
                msg.sender,
                lotteryLuckyNumbers[id][luckyNumberId],
                false
            )
        );
        luckyNumberUsed[id][luckyNumberId] = true;
        serviceBalance += msg.value;
    }

    function randomlySelectWinners(
        uint256 id,
        uint256 numOfWinners
    ) public {
        require(
            lotteries[id].owner == msg.sender ||
            lotteries[id].owner == owner(),
            "Unauthorized entity"
        );
        require(!lotteryResult[id].completed, "Lottery have already been completed");
        require(
            numOfWinners <= lotteryParticipants[id].length,
            "Number of winners exceeds number of participants"
        );

        // Initialize an array to store the selected winners
        ParticipantStruct[] memory winners = new ParticipantStruct[](numOfWinners);
        ParticipantStruct[] memory participants = lotteryParticipants[id];

        // Initialize the list of indices with the values 0, 1, ..., n-1
        uint256[] memory indices = new uint256[](participants.length);
        for (uint256 i = 0; i < participants.length; i++) {
            indices[i] = i;
        }

        // Shuffle the list of indices using Fisher-Yates algorithm
        for (uint256 i = participants.length - 1; i >= 1; i--) {
            uint256 j = uint256(
                keccak256(abi.encodePacked(block.timestamp, i))
            ) % (i + 1);
            uint256 temp = indices[j];
            indices[j] = indices[i];
            indices[i] = temp;
        }

        // Select the winners using the first numOfWinners indices
        for (uint256 i = 0; i < numOfWinners; i++) {
            winners[i] = participants[indices[i]];
            lotteryResult[id].winners.push(winners[i]);
        }

        lotteryResult[id].id = id;
        lotteryResult[id].completed = true;
        lotteryResult[id].timestamp = block.timestamp;

        payLotteryWinners(id);
    }

    function payLotteryWinners(uint256 id) internal {
        ParticipantStruct[] memory winners = lotteryResult[id].winners;
        uint256 totalShares = lotteries[id].ticketPrice * lotteryParticipants[id].length;
        uint256 platformShare = (totalShares * servicePercent) / 100 ;
        uint256 netShare = totalShares - platformShare;
        uint256 sharesPerWinner = netShare / winners.length;

        for (uint256 i = 0; i < winners.length; i++) 
        payTo(winners[i].account, sharesPerWinner);

        payTo(owner(), platformShare);
        serviceBalance -= totalShares;
        lotteryResult[id].paidout = true;
        lotteryResult[id].sharePerWinner = sharesPerWinner;
    }

    function getLotteries() public view returns (LotteryStruct[] memory Lotteries) {
        Lotteries = new LotteryStruct[](_totalLotteries.current());

        for (uint256 i = 1; i <= _totalLotteries.current(); i++) {
            Lotteries[i - 1] = lotteries[i];
        }
    }

    function getLottery(uint256 id) public view returns (LotteryStruct memory) {
        return lotteries[id];
    }
    
    function getLotteryParticipants(uint256 id) public view returns (ParticipantStruct[] memory) {
        return lotteryParticipants[id];
    }
    
    function getLotteryLuckyNumbers(uint256 id) public view returns (string[] memory) {
        return lotteryLuckyNumbers[id];
    }
    
    function getLotteryResult(uint256 id) public view returns (LotteryResultStruct memory) {
        return lotteryResult[id];
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }
}

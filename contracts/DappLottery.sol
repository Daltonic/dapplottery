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
        uint256 createdAt;
        uint256 expiresAt;
    }

    struct ParticipantStruct {
        address account;
        string lotteryNumber;
    }

    struct LotteryResultStruct {
        uint256 id;
        bool completed;
        uint256 timestamp;
        ParticipantStruct[] winners;
    }

    uint256 serviceFee;
    uint256 serviceAccount;

    mapping(uint256 => LotteryStruct) lotteries;
    mapping(uint256 => ParticipantStruct[]) lotteryParticipants;
    mapping(uint256 => string[]) lotteryLuckyNumbers;
    mapping(uint256 => mapping(uint256 => bool)) luckyNumberUsed;
    mapping(uint256 => LotteryResultStruct) lotteryResult;

    function createLottery(
        string memory title,
        string memory description,
        string memory image,
        uint256 ticketPrice,
        uint256 expiresAt
    ) public payable {
        require(bytes(title).length > 0, "title cannot be empty");
        require(bytes(description).length > 0, "description cannot be empty");
        require(bytes(image).length > 0, "image cannot be empty");
        require(ticketPrice > 0 ether, "ticketPrice cannot be zero");
        require(
            expiresAt > block.timestamp,
            "expireAt cannot be less than the future"
        );
        require(msg.value > 0 ether, "prize cannot be zero");

        _totalLotteries.increment();
        LotteryStruct memory lottery;

        lottery.id = _totalLotteries.current();
        lottery.title = title;
        lottery.description = description;
        lottery.image = image;
        lottery.prize = msg.value;
        lottery.createdAt = block.timestamp;
        lottery.expiresAt = expiresAt;
    }

    function importLuckyNumbers(uint256 id, string[] memory luckyNumbers)
        public
    {
        require(luckyNumbers.length > 0, "Lucky numbers cannot be zero");
        lotteryLuckyNumbers[id] = luckyNumbers;
    }

    function buyTicket(uint256 id, uint256 luckyNumberId) public payable {
        require(lotteries[id].id == id, "Lottery not found");
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
                lotteryLuckyNumbers[id][luckyNumberId]
            )
        );
        luckyNumberUsed[id][luckyNumberId] = true;
    }

    function randomlySelectLuckyNumbers(uint256 id, uint256 numberOfWinners)
        public
        onlyOwner
    {
        require(lotteries[id].id == id, "Lottery not found");
        require(!lotteryResult[id].completed, "Lottery have already been completed");
        require(
            numberOfWinners <= lotteryParticipants[id].length,
            "Number of winners exceeds number of participants"
        );

        ParticipantStruct[] storage participants = lotteryParticipants[id];

        for (uint256 i = 0; i < numberOfWinners; i++) {
            uint256 index = uint256(keccak256(abi.encodePacked(block.timestamp, i))) % participants.length;
            lotteryResult[id].winners[i] = participants[index];

            // Remove the selected participant from the list to prevent them from being selected again
            participants[index] = participants[participants.length - 1];
            participants.pop();
        }

        lotteryResult[id].id = id;
        lotteryResult[id].completed = true;
        lotteryResult[id].timestamp = block.timestamp;
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
}

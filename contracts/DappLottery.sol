//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DappLottery {
    using Counters for Counters.Counter;
    Counters.Counter private _totalLotteries;

    struct LotteryStruct {
        uint256 id;
        string title;
        string description;
        string image;
        uint prize;
        uint ticketPrice;
        uint participants;
        bool drawn;
        uint createdAt;
        uint expiresAt;
    }

    struct ParticipantStruct {
        address account;
        string lotteryNumber;
    }

    uint256 serviceFee;
    uint256 serviceAccount;

    mapping(uint256 => LotteryStruct) lotteries;
    mapping(uint256 => ParticipantStruct[]) lotteryParticipants;
    mapping(uint256 => string[]) lotteryLuckyNumbers;
    mapping(uint256 => mapping(uint256 => bool)) luckyNumberUsed;

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
        require(expiresAt > block.timestamp, "expireAt cannot be less than the future");
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

    function importLuckyNumbers(uint256 id, string[] memory luckyNumbers) public {
        require(luckyNumbers.length > 0, "Lucky numbers cannot be zero");
        lotteryLuckyNumbers[id] = luckyNumbers;
    }

    function buyTicket(uint256 id, uint256 luckyNumberId) public payable {
        require(lotteries[id].id == id, "Lottery not found");
        require(!luckyNumberUsed[id][luckyNumberId], "Lucky number already used");
        require(msg.value >= lotteries[id].ticketPrice, "insufficient ethers to buy ethers");

        lotteries[id].participants++;
        lotteryParticipants[id].push(
            ParticipantStruct(
                msg.sender,
                lotteryLuckyNumbers[id][luckyNumberId]
            )
        );
        luckyNumberUsed[id][luckyNumberId] = true;
    }
}
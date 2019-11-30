pragma solidity 0.5.10;

import "../../contracts/contracts/IDelegator.sol";


contract King {
    IDelegator public delegator;
    uint256[] jobs;
    uint256 king = 0;
    uint256[] lastResults;

    constructor() public {
        delegator = IDelegator(0x4Bcd81d77Bb9d7493F99742b49B072c09D548CB4);
    }

    function addFeed(uint256 jobId) public {
        jobs[jobs.length]=(jobId);
    }

    function findKing() public {
        uint256 biggestDiff = 0;
        uint256 newKing = 0;
        for(uint256 i = 0; i < jobs.length; i++) {
            (, , , , uint256 price) = delegator.getJob(i);
            if(price > lastResults[i]) {
                if(price - lastResults[i] > biggestDiff) {
                    biggestDiff = price - lastResults[i];
                    newKing = i;
                }
            }
        king = newKing;

    }
    }

}

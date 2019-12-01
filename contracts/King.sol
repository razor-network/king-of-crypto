pragma solidity 0.5.10;

import "../../contracts/contracts/Delegator.sol";


contract King {
    Delegator public delegator;
    uint256[] public jobs;
    uint256 public numJobs = 0;
    uint256 public king = 0;
    uint256[] public lastResults;

    constructor() public {
        delegator = Delegator(0x058EF5a3d450A2fac5d24dDc75d516A136AE3f62);
    }

    function test() public view returns(uint256) {
        // (, , , , uint256 price) = delegator.getJob(0);
        uint256 price = delegator.getResult(1);
        return price;
    }

    function addFeed(uint256 jobId) public {
        jobs.push(jobId);
        numJobs = numJobs + 1;
        lastResults.push(0);
    }

    function findKing() public {
        uint256 highestGain = 0;
        uint256 highestGainer = 0;
        uint256 leastLoss = 0;
        uint256 leastLoser = 0;
        // uint256 newKing = 0;
        for(uint256 i = 0; i < jobs.length; i++) {
            uint256 price = delegator.getResult(jobs[i]);
            if(price > lastResults[i]) {
                if(price - lastResults[i] > highestGain) {
                    highestGain = price - lastResults[i];
                    highestGainer = jobs[i];
                }
            } else if(price < lastResults[i]) {
                    if(lastResults[i] - price < leastLoss) {
                        leastLoss = lastResults[i] - price;
                        leastLoser = jobs[i];
                    }
                }

            lastResults[i] = price;
        // king = newKing;
        }
        if (highestGain > 0) {
            king = highestGainer;
        } else if (leastLoss > 0) {
            king = leastLoser;
        }
    }
}

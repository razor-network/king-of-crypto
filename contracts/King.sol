pragma solidity 0.5.10;

interface Razor {
    function getResult(uint256 id) external view returns (uint256);
    function getJob(uint256 id) external view returns(string memory url, string memory selector, string memory name, bool repeat, uint256 result);
}

contract King {
    Razor public razor;
    uint256[] public jobs;
    uint256 public numJobs = 0;
    uint256 public king = 0;
    uint256[] public lastResults;

    constructor() public {
        razor = Razor(0xFF67C85D2e179fEFb3428Ae6909a9a0C60cF5d09);
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
        for(uint256 i = 0; i < jobs.length; i++) {
            uint256 price = razor.getResult(jobs[i]);
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
        }
        if (highestGain > 0) {
            king = highestGainer;
        } else if (leastLoss > 0) {
            king = leastLoser;
        } else {
            //if no king found, declare ETH as king
            king = 1;
        }
    }
}

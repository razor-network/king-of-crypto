var King = artifacts.require('./King.sol')
module.exports = async function (deployer) {
  deployer.then(async () => {
    await deployer.deploy(King)
})
}

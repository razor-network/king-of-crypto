var King = artifacts.require('./King.sol')
module.exports = async function (deployer) {
  // let dai = await deployer.deploy(Dai, 'DAI', 'DAI')

  deployer.then(async () => {
    await deployer.deploy(King)
})
}

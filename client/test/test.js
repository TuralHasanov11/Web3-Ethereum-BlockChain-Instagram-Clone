const { ethers, providers } = require('ethers');
const provider = new providers.Web3Provider(web3.currentProvider);
const Decentragram = artifacts.require('./Decentragram.sol')


require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Decentragram', ([deployer, author, tipper]) => {
  let decentragram

  before(async () => {
    decentragram = await Decentragram.deployed()
  })

  describe('Decentragram', async () => {
    it('deploys successfully', async () => {
      const address = await decentragram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await decentragram.name()
      assert.equal(name, 'Decentragram')
    })
  })

  describe('images', async () => {
    let result
    const hash = "Imageahash"
    const description = "description"
    let imagesCount

    before(async () => {
      result = await decentragram.uploadImage(hash, description, { from: author });
      imagesCount = await decentragram.imagesCount();
    })

    it('creates image', async () => {
      const event = result.logs[0].args
      assert.equal(imagesCount, 1)
      assert.equal(event.id.toNumber(), imagesCount.toNumber(), 'event id should be 1')
      assert.equal(event.hash, hash, 'hash should be correct')
      assert.equal(event.description, description, 'description should be correct')
      assert.equal(event.grantAmount, 0, 'Grant Amount should be 0')
      assert.equal(event.user, author, 'user should be author')

      await decentragram.uploadImage('', description, { from: author }).should.be.rejected;
      await decentragram.uploadImage(hash, '', { from: author }).should.be.rejected;
      await decentragram.uploadImage(hash, description, '').should.be.rejected;
    })

    it('list images', async () => {
      const image = await decentragram.images(imagesCount)
      assert.equal(image.id.toNumber(), imagesCount.toNumber(), 'image id should be 1')
      assert.equal(image.hash, hash, 'hash should be correct')
      assert.equal(image.description, description, 'description should be correct')
      assert.equal(image.grantAmount, 0, 'Grant Amount should be 0')
      assert.equal(image.user, author, 'user should be author')
    })


    it('allows users to tip images', async () => {
      let oldAuthorBalance
      oldAuthorBalance = await provider.getBalance(author)

      result = await decentragram.tipImageOwner(imagesCount, { from: tipper, value: ethers.utils.parseUnits("1.0") })

      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imagesCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'description', 'description is correct')
      assert.equal(event.grantAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.user, author, 'author is correct')

      let newAuthorBalance
      newAuthorBalance = await provider.getBalance(author)

      let tipImageOwner
      tipImageOwner = ethers.utils.parseUnits("1.0")

      const expectedBalance = oldAuthorBalance.add(tipImageOwner)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      await decentragram.tipImageOwner(99, { from: tipper, value: ethers.utils.parseUnits("1.0") }).should.be.rejected;
    })
  })




})
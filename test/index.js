require('solcjs-mock')();

const chai = require('chai');
chai.should();

const github = require('../src');

describe('github', () => {

  it('found', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol';
    console.time('first time');
    let content = await github.parser(path);
    console.timeEnd('first time');
    content.should.be.a('string');
    content.length.should.be.above(50);

    // get source from cache
    console.time('second time');
    await github.parser(path);
    console.timeEnd('second time');
  });

  it('no found', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath2.sol';
    try {
      await github.parser(path);  
    } catch (error) {
      error.should.be.a('error');
      error.message.should.be.eq('Content 404: Not Found\n');
    }
  });

  it('path resolve', async () => {
    const path = 'https://github.com/OpenZeppelin/openzeppelin-solidity/contracts/examples/SimpleToken.sol';
    let content = await github.parser(path);
    content.should.to.match(/OpenZeppelin/);
  });

});
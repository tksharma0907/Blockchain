/**
 * A function representing a block in the blockchain.
 * @param {number} index - The index of the block in the chain.
 * @param {string} timestamp - The timestamp of the block creation.
 * @param {Object} data - The data stored in the block.
 * @param {string} previousHash - The hash of the previous block in the chain.
 */
function Block(index, timestamp, data, previousHash = "") {
  this.index = index;
  this.timestamp = timestamp;
  this.data = data;
  this.previousHash = previousHash;
  this.hash = calculateHash(this);
}

/**
 * A function representing a blockchain.
 */
function Blockchain() {
  /**
   * The chain of blocks in the blockchain.
   * @type {Block[]}
   */
  this.chain = [createGenesisBlock()];
}

/**
 * Creates the genesis block of the blockchain.
 * @returns {Block} The genesis block.
 */
function createGenesisBlock() {
  return new Block(0, new Date().toString(), "Genesis Block", "0");
}

/**
 * Returns the latest block in the chain.
 * @param {Block[]} chain - The chain of blocks.
 * @returns {Block} The latest block in the chain.
 */
function getLatestBlock(chain) {
  return chain[chain.length - 1];
}

/**
 * Adds a new block to the chain.
 * @param {Block[]} chain - The chain of blocks.
 * @param {Block} newBlock - The new block to be added.
 */
function addBlock(chain, newBlock) {
  newBlock.previousHash = getLatestBlock(chain).hash;
  newBlock.hash = calculateHash(newBlock);
  chain.push(newBlock);
}

/**
 * Calculates the SHA-256 hash of a block.
 * @param {Block} block - The block to be hashed.
 * @returns {string} The hash value as a hex string.
 */
function calculateHash(block) {
  const crypto = require("crypto");
  const hash = crypto.createHash("sha256");
  hash.update(
    block.index +
      block.timestamp +
      JSON.stringify(block.data) +
      block.previousHash
  );
  return hash.digest("hex");
}

/**
 * Checks if the chain of blocks is valid.
 * @param {Block[]} chain - The chain of blocks to be checked.
 * @returns {boolean} True if the chain is valid, false otherwise.
 */
function isChainValid(chain) {
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];

    if (currentBlock.hash !== calculateHash(currentBlock)) {
      return false;
    }

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }
  return true;
}

/**
 * Creates a new blockchain, adds two blocks to it, and prints the chain and its validity.
 */
let myBlockchain = new Blockchain();

addBlock(
  myBlockchain.chain,
  new Block(1, new Date().toString(), { amount: 100 })
);

addBlock(
  myBlockchain.chain,
  new Block(2, new Date().toString(), { amount: 50 })
);

console.log(myBlockchain.chain);
console.log(isChainValid(myBlockchain));

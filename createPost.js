const dsteem = require('dsteem');

const opts = {};

//connect to production server
opts.addressPrefix = 'STM';
opts.chainId = '0000000000000000000000000000000000000000000000000000000000000000';

//connect to server which is connected to the network/production
const client = new dsteem.Client('https://api.steemit.com');
var key = dsteem.PrivateKey.fromLogin('autochartist', 'P5KHocCk5rf5rxgpdQ8uJ9RoTQmNCmGzzZGzk9c2urWBYnV2iZdX', '5JSWjZkB9UBAQG2VCZJXNqxP3RryfeUBSuFaTDYdoCGWAis99KV')

const createPost = async (comment, options, key) => await client.broadcast.commentWithOptions(comment, options, key);

module.exports = {
    createPost
};
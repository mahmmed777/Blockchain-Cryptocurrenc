"use strict";

let crypto = require('crypto');


// WARNING!  There are much better hash functions to use
// for storing passwords.
const HASH_ALG = 'sha256';


class PasswordManager {
  constructor() {
    this.passwords = {};
    this.salts = {};
  }

  
  hash(s) {
    return crypto.createHash(HASH_ALG).update(s).digest('hex');
  }

  
  storePassword(username, pwd) {
 
    // 1) Choose a unique salt value for the user
    // 2) Store the salt value in 'this.salts'
    // 3) Concatenate the salt value with the password
    // 4) Hash salt+password and store the result in this.passwords

    let salt = crypto.randomBytes(16).toString('hex');
    this.salts[username] = salt ;
    this.passwords[username] = this.hash (salt + pwd );  
    

  }
  verifyPassword(username, pwd) {

    // Look up the user's salt and hash values,
    // and make sure they match the password entered.
    
    let salt = this.salts[username];
    let hashValue = this.passwords[username];
    let hashValueCheck = this.hash(salt + pwd);
    
    return hashValue === hashValueCheck;
  }
}

let pm = new PasswordManager();

function test(u, p) {
  if (pm.verifyPassword(u, p)) {
    console.log(`"${p}" is the correct password for ${u}.`);
  } else {
    console.log(`Sorry, "${p}" is not ${u}'s password.`);
  }
}

pm.storePassword('Alice', 'secret');
pm.storePassword('Bob', 'banana');
pm.storePassword('Charlie', 'E"_K!sHcA8S&-S2N');
pm.storePassword('Dave', 'secret');

test('Alice', 'secret');
test('Alice', 'notThePassword');
test('Dave', 'secret');


1
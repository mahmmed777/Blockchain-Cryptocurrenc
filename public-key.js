"use strict";

let crypto = require('crypto');

// install By:  npm i keypair
let keypair = require('keypair');

const SIG_ALG = 'RSA-SHA256';

class CertificateAuthority {
  constructor() {
    this.certs = {};
  }

  // Register certificate for specified ID.
  // (We'll assume some validation process already happened).
  add(id, pubkey) {
   this.certs[id] = pubkey ;
  }

  // Returns certificate for specified ID.
  lookup(id) {
   return this.certs[id];
  }
}

// Sign the "message" field of an object.
// Store the signature in a "sig" field on that object.
function sign(o, privKey) {
  // ***YOUR CODE HERE***.
  o.sig =  crypto.createSign(SIG_ALG).update(o.message).sign(privKey , 'hex');

}

// Verify the signature on an object signed with the 'sign'
// function that you implemented.  Get the id from the object
// to look up the appropriate public key.
function verifySignature(o) {
  // ***YOUR CODE HERE***
  let id = o.id ;
  let pubkey = ca.lookup(id);

  return crypto.createVerify(SIG_ALG).update(o.message).verify(pubkey , o.sig , 'hex')
}

let ca = new CertificateAuthority();


// Using the keypair library to generate public/private key pairs
let alice = keypair();

ca.add('alice', alice.public);

let o = {
  message: 'hello world!',  
  id: 'alice',
};

// Sign o with Alice's private key,
// adding the signature to a 'sig' field on the object.
sign(o, alice.private);

console.log(o.sig);

console.log("Does 1st verification pass? " + verifySignature(o));

// Tampering with object.
o.message = 'hell0 world!';
console.log("Does 2nd verification pass? " + verifySignature(o));



1
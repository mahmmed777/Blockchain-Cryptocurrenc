"use strict";

const SIG_ALG = 'aes-256-cbc';

let crypto = require('crypto');


function encryptString(s, key, iv) {
  let cipher = crypto.createCipheriv(SIG_ALG , key , iv);
  let ctext = cipher.update(s , 'utf-8'  , 'hex');
  ctext += cipher.final('hex');
   return ctext
 
}

function decryptString(ctext, key, iv) {
  let decipter = crypto.createDecipheriv(SIG_ALG , key , iv);
  ptext  = decipter.update(ctext ,'hex'  , 'utf-8');
  ptext += decipter.final('utf8');

   return ptext;
 
}

let ptext = 'hello world .';

let key = crypto.generateKeySync('aes', { length: 256});
let iv = crypto.randomBytes(16);


let ctext = encryptString(ptext, key, iv);

console.log("Chiper Text: ", ctext);

let p2 = decryptString(ctext, key, iv);

console.log("Plain Text" , p2);


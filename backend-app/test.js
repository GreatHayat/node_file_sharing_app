const crypto = require("crypto");
var mykey = crypto.createCipher("aes-128-cbc", "mypassword");
var mystr = mykey.update("abc", "utf8", "hex");
mystr += mykey.final("hex");

console.log(mystr);

const crypto=require("crypto");
//generating random number bytes
const resetToken=crypto.randomBytes(20).toString("hex");
console.log(resetToken);


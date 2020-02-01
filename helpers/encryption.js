const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const key = 'FANATTIC';
const saltRounds = 10;

module.exports = {
  encrypt(data) {
    const cipher = crypto.createCipher('aes192', key);
    let crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');

    return crypted;
  },
  decrypt(data) {
    const decipher = crypto.createDecipher('aes192', key);
    let decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  },
  generateHash(data) {
    const result = bcrypt.hashSync(data, saltRounds);
    return result;
  },
  compareHash(val1, val2) {
    const result = bcrypt.compareSync(val1, val2);
    return result;
  },
};

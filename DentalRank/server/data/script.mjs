import crypto from 'crypto';

const sessionSecret = crypto.randomBytes(64).toString('hex');

console.log(sessionSecret);
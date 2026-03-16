import { ethers } from 'ethers';

const privateKey = 'b5ed3a0ba4e9c179301f88c318ab9525ce439a4d1e072a60bceafe15ade33a8c';
const wallet = new ethers.Wallet(privateKey);

console.log('Address:', wallet.address);
console.log('Private Key:', privateKey);

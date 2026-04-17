const pdf = require('pdf-parse');
console.log('Type of pdf:', typeof pdf);
console.log('Keys of pdf:', Object.keys(pdf));
for (const key in pdf) {
  console.log(`Key: ${key}, Type: ${typeof pdf[key]}`);
}

const { Cipher } =require( "crypto");

function createPasswordPart(){
  const a = Math.floor(Math.random() * 100000000);
  const b = Math.floor(Math.random() * 100000000 )
  const c = [a,b].join("")
  return c;
}
const parts = [];
for (let i = 0; i < 10; i++) {
  parts.push(createPasswordPart());

}

const hexParts = parseInt(parts.join(" ") , 16);


const Pass = hexParts.toString(36);



const {
  scrypt,
  randomFill,
  createCipheriv,
} = require('node:crypto');

const algorithm = 'aes-192-cbc';

// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(Pass, 'salt', 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    // Once we have the key and iv, we can create and use the cipher...
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = '';
    cipher.setEncoding('hex');

    cipher.on('data', (chunk) => encrypted += chunk);
    cipher.on('end', () => console.log(encrypted));

    cipher.write('some clear text data');
    cipher.end();
  });
});

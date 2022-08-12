const hexToUintArray = (hex: string) => {
  const a = [];
  for (let i = 0, len = hex.length; i < len; i += 2) {
    a.push(parseInt(hex.slice(i, i + 2), 16));
  }
  return new Uint8Array(a);
};

const hexToArrayBuf = (hex: string) => {
  return hexToUintArray(hex).buffer;
};

const arrayBufToBase64UrlEncode = (buf: ArrayBufferLike) => {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return Buffer.from(binary, 'binary')
    .toString('base64')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .replace(/\+/g, '-');
};

export const jwkConv = (prvHex: string, pubHex: string) => ({
  kty: 'EC',
  crv: 'P-256',
  d: arrayBufToBase64UrlEncode(hexToArrayBuf(prvHex)),
  x: arrayBufToBase64UrlEncode(hexToArrayBuf(pubHex.slice(2)).slice(1, 33)),
  y: arrayBufToBase64UrlEncode(hexToArrayBuf(pubHex.slice(2)).slice(33, 66)),
});

export const getDidFromEthAddress = (addr: string) => {
  const did = `did:pkh:eth:${addr}`;
  return did;
};

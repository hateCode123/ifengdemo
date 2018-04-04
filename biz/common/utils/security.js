/**
 * 安全组件
 */
const crypto = require('crypto');

// 转换为16进制字符
function parse(c) {
    if (c >= 'a') return (c.charCodeAt(0) - 'a'.charCodeAt(0) + 10) & 0x0f;
    if (c >= 'A') return (c.charCodeAt(0) - 'A'.charCodeAt(0) + 10) & 0x0f;
    return (c.charCodeAt(0) - '0'.charCodeAt(0)) & 0x0f;
}

// 从十六进制字符串到字节数组转换
function HexString2Bytes(hexstr) {
    let b = Buffer.alloc(hexstr.length / 2);
    let j = 0;
    for (let i = 0; i < b.length; i++) {
        let c0 = hexstr.charAt(j++);
        let c1 = hexstr.charAt(j++);
        b[i] = ((parse(c0) << 4) | parse(c1));
    }
    return b;
}

// 密钥生产器
function keyGenerator(key) {
    if (!key) throw new Error('密钥key不能为空');
    if (key.length == 8) return Buffer.from(key, 'utf8');
    if (key.length >= 16) return HexString2Bytes(key.substr(0, 16));
    throw new Error('无效密钥,必须是8位字符或大于等于16位字符');
}

// des
let des = {
    encrypt: function (text, key) {
        let cipher = crypto.createCipheriv("des-ecb", keyGenerator(key), new Buffer(0));
        let encrypt = cipher.update(text, 'utf8', 'base64');
        encrypt += cipher.final('base64');
        return encrypt;
    },
    decrypt: function (encrypt, key) {
        let decipher = crypto.createDecipheriv("des-ecb", keyGenerator(key), new Buffer(0));
        let text = decipher.update(encrypt, 'base64', 'utf8');
        text += decipher.final('utf8');
        return text;
    }
};

// aes
let aes = {
    /**
     * AES 加密
     * @param text 明文
     * @param base64key 秘钥，base64格式
     */
    encrypt: function (text, base64key) {
        let buffer = Buffer.from(base64key,'base64');
        let cipher = crypto.createCipheriv("aes-128-cbc", buffer, new Buffer(16));
        let encrypt = cipher.update(text, 'utf8', 'base64');
        encrypt += cipher.final('base64');
        return encrypt;
    },

    encrypt_by_128_ecb: function (text,key) {
        let iv = "";
        let clearEncoding = 'utf8';
        let cipherEncoding = 'base64';
        let cipherChunks = [];
        let cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
        cipher.setAutoPadding(true);

        cipherChunks.push(cipher.update(text, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));

        return cipherChunks.join('');
    },
    /**
     * AES 解密
     * @param text 密文
     * @param base64key 秘钥，base64格式
     */
    decrypt: function (encrypt, base64key) {
        let buffer = Buffer.from(base64key,'base64');
        let decipher = crypto.createDecipheriv("aes-128-cbc", buffer, new Buffer(16));
        let text = decipher.update(encrypt, 'base64', 'utf8');
        text += decipher.final('utf8');
        return text;
    }
};

/**
 * MD5 签名
 * @param str
 * @returns {string}
 */
let md5 = (str) => {
    let md5 = crypto.createHash('md5');
    md5.update(str || "", 'utf8');
    return md5.digest('hex').toUpperCase();
};

/**
 * sha1 签名
 * @param str
 * @returns {string}
 */
let sha1 = (str) => {
    let md5 = crypto.createHash('sha1');
    md5.update(str || "", 'utf8');
    return md5.digest('hex');
};

/**
 * sha256 签名
 * @param str
 * @returns {string}
 */
let sha256 = (str) => {
    let md5 = crypto.createHash('sha256');
    md5.update(str || "", 'utf8');
    return md5.digest('hex');
};

module.exports = {
    aes,
    des,
    md5,
    sha1,
    sha256
};
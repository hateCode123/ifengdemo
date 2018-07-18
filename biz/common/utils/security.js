/**
 * 安全组件
 */
const crypto = require('crypto');

// 转换为16进制字符
const parse = c => {
    if (c >= 'a') return (c.charCodeAt(0) - 'a'.charCodeAt(0) + 10) & 0x0f;
    if (c >= 'A') return (c.charCodeAt(0) - 'A'.charCodeAt(0) + 10) & 0x0f;

    return (c.charCodeAt(0) - '0'.charCodeAt(0)) & 0x0f;
};

// 从十六进制字符串到字节数组转换
const HexString2Bytes = hexstr => {
    const b = Buffer.alloc(hexstr.length / 2);
    let j = 0;

    for (let i = 0; i < b.length; i++) {
        const c0 = hexstr.charAt(j++);
        const c1 = hexstr.charAt(j++);

        b[i] = (parse(c0) << 4) | parse(c1);
    }

    return b;
};

// 密钥生产器
const keyGenerator = key => {
    if (!key) throw new Error('密钥key不能为空');
    if (key.length === 8) return Buffer.from(key, 'utf8');
    if (key.length >= 16) return HexString2Bytes(key.substr(0, 16));
    throw new Error('无效密钥,必须是8位字符或大于等于16位字符');
};

// des
const des = {
    encrypt: (text, key) => {
        const cipher = crypto.createCipheriv('des-ecb', keyGenerator(key), new Buffer(0));
        let encrypt = cipher.update(text, 'utf8', 'base64');

        encrypt += cipher.final('base64');

        return encrypt;
    },
    decrypt: (encrypt, key) => {
        const decipher = crypto.createDecipheriv('des-ecb', keyGenerator(key), new Buffer(0));
        let text = decipher.update(encrypt, 'base64', 'utf8');

        text += decipher.final('utf8');

        return text;
    },
};

// aes
const aes = {
    /**
     * AES 加密
     * @param text 明文
     * @param base64key 秘钥，base64格式
     */
    encrypt: (text, base64key) => {
        const buffer = Buffer.from(base64key, 'base64');
        const cipher = crypto.createCipheriv('aes-128-cbc', buffer, new Buffer(16));
        let encrypt = cipher.update(text, 'utf8', 'base64');

        encrypt += cipher.final('base64');

        return encrypt;
    },

    encryptBy128Ecb: (text, key) => {
        const iv = '';
        const clearEncoding = 'utf8';
        const cipherEncoding = 'base64';
        const cipherChunks = [];
        const cipher = crypto.createCipheriv('aes-128-ecb', key, iv);

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
    decrypt: (encrypt, base64key) => {
        const buffer = Buffer.from(base64key, 'base64');
        const decipher = crypto.createDecipheriv('aes-128-cbc', buffer, new Buffer(16));
        let text = decipher.update(encrypt, 'base64', 'utf8');

        text += decipher.final('utf8');

        return text;
    },
};

/**
 * MD5 签名
 * @param str
 * @returns {string}
 */
const md5 = str => {
    const md5 = crypto.createHash('md5');

    md5.update(str || '', 'utf8');

    return md5.digest('hex');
};

/**
 * sha1 签名
 * @param str
 * @returns {string}
 */
const sha1 = str => {
    const sha1 = crypto.createHash('sha1');

    sha1.update(str || '', 'utf8');

    return sha1.digest('hex');
};

/**
 * sha256 签名
 * @param str
 * @returns {string}
 */
const sha256 = str => {
    const sha256 = crypto.createHash('sha256');

    sha256.update(str || '', 'utf8');

    return sha256.digest('hex');
};

module.exports = {
    aes,
    des,
    md5,
    sha1,
    sha256,
};

// SHA1  
function add(x, y) {  
    return((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);  
}  

function SHA1hex(num) {  
    var sHEXChars = "0123456789abcdef";  
    var str = "";  
    for(var j = 7; j >= 0; j--)  
        str += sHEXChars.charAt((num >> (j * 4)) & 0x0F);  
    return str;  
}  

function AlignSHA1(sIn) {  
    var nblk = ((sIn.length + 8) >> 6) + 1,  
        blks = new Array(nblk * 16);  
    for(var i = 0; i < nblk * 16; i++) blks[i] = 0;  
    for(i = 0; i < sIn.length; i++)  
        blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8);  
    blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);  
    blks[nblk * 16 - 1] = sIn.length * 8;  
    return blks;  
}  

function rol(num, cnt) {  
    return(num << cnt) | (num >>> (32 - cnt));  
}  

function ft(t, b, c, d) {  
    if(t < 20) return(b & c) | ((~b) & d);  
    if(t < 40) return b ^ c ^ d;  
    if(t < 60) return(b & c) | (b & d) | (c & d);  
    return b ^ c ^ d;  
}  

function kt(t) {  
    return(t < 20) ? 1518500249 : (t < 40) ? 1859775393 :  
        (t < 60) ? -1894007588 : -899497514;  
}  

function SHA1(sIn) {  
    var x = AlignSHA1(sIn);  
    var w = new Array(80);  
    var a = 1732584193;  
    var b = -271733879;  
    var c = -1732584194;  
    var d = 271733878;  
    var e = -1009589776;  
    for(var i = 0; i < x.length; i += 16) {  
        var olda = a;  
        var oldb = b;  
        var oldc = c;  
        var oldd = d;  
        var olde = e;  
        for(var j = 0; j < 80; j++) {  
            if(j < 16) w[j] = x[i + j];  
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);  
            t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)));  
            e = d;  
            d = c;  
            c = rol(b, 30);  
            b = a;  
            a = t;  
        }  
        a = add(a, olda);  
        b = add(b, oldb);  
        c = add(c, oldc);  
        d = add(d, oldd);  
        e = add(e, olde);  
    }  
    SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e);  
    return SHA1Value.toUpperCase();  
}
function utf16to8(str)	{
    console.log(str);
    var out, i, len, c;

    out = "";
    len = str.length;
    for(i = 0; i < len; i++){
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF){
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
        }
    }
    return out;
}
function SHA2(sIn) {  
    return SHA1(utf16to8(sIn)).toLowerCase();
}  
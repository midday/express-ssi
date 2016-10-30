var request = require('sync-request');
var contentType = require('content-type');

/**
 * express-ssi init method
 * @param {Object} express
 * @param {String} ssiServer,default value:"http://atguat.com.cn"
 * @api public
 */
module.export.init = function(express,ssiServer) {
    ssiServer = ssiServer || 'http://atguat.com.cn';

    var send = express.response.send;
    var responseEndCodeRegExp = /this\.end\((.+?)encoding\);/g;
    var ssiFunction = 'replaceContentBySSITagParse(ssiServer, chunk);';

    //overide express-response send function，add ssi parse
    //below the 4.6 version match keywords==>this.end(chunk, encoding);
    //version 4.6 and above match keywords==>this.end((head ? null : body), encoding);
    express.response.send = eval(send.toString().replace(responseEndCodeRegExp, function(responseEndCode) {
        return ssiFunction + responseEndCode;
    }));
}

/**
 * Replace content by ssi tag parse
 *
 * @param {String} ssiDomain
 * @param {String} content
 * @api private
 */
function replaceContentBySSITagParse(ssiServer, content) {
    var ssiTagRegExp = /<!--[ ]*#([a-z]+)([ ]+([a-z]+)="(.+?)")*[ ]*-->/g;

    content = content.replace(ssiTagRegExp, function(ssiTag) {
        var path = ssiTag.match(/"(.+?)"/gim)[0].replace(/"/g, '');
        return request('GET', ssiDomain + path).getBody().toString();
    });
}

/**
 * Set the charset in a given Content-Type string.
 *
 * @param {String} type
 * @param {String} charset
 * @return {String}
 * @api private
 */
function setCharset(type, charset) {
    if (!type || !charset) {
        return type;
    }

    var parsed = contentType.parse(type);
    parsed.parameters.charset = charset;

    return contentType.format(parsed);
};

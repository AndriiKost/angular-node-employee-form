var http = require('http');
var formidable = require('formidable');
var util = require('util');

var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method.toLowerCase() === 'post') {
        proccessForm(req, res);
        return;
    }

    res.end();
});

function proccessForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        var data = JSON.stringify({
            fields: fields
        })

        res.end(data);
        console.log('posted field:\n');
        console.log(data);
    });
}

var port = 3100;
server.listen(port);
onmouseleave.log('server listening on port ' + port);
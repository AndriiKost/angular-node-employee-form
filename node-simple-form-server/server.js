var http = require('http');
var formidable = require('formidable');
var util = require('util');

var server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method.toLowerCase() == 'get') {

        var data = {
            data: {
                languages: [
                    'English',
                    'Polish',
                    'Spanish',
                    'German',
                    'Russian',
                    'Other'
                ]
            }
        };

        var responseData = JSON.stringify(data);
        console.log('get: '. responseData);
        res.end(responseData);
        return;
    }

    if (req.method.toLowerCase() == 'post') {
      console.log('post if trigger');
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

        fields.id = 'TESTID11';

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
console.log('server listening on port ' + port);

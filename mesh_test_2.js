var mesh = require('./mesh');
var child_process = require('child_process');
var questions = require('./questions').questions;

function curl_test(url, cb)
{
    var start = new Date();
    
    child_process.execFile(
        'curl',
        [url],
        function(err, stdout, stderr)
        {
            var end = new Date();
            cb(end - start);
        });
}

var q = new questions();

function get_url(cb)
{
    q.ask('Url: ', cb);
}

mesh.run(
    {
        'url1': [get_url, []],
        'url2': [get_url, []],
        'url1_time': [curl_test, ['url1']],
        'url2_time': [curl_test, ['url2']]
    },
    function(result)
    {
        console.log(result.url1 + ': ' + result.url1_time);
        console.log(result.url2 + ': ' + result.url2_time);
        q.end();
    });

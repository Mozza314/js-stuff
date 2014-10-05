var child_process = require('child_process');

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

curl_test(
    'http://www.facebook.com/',
    function(time)
    {
        console.log(time);
    });

var mesh = require('./mesh');

function async_gen(f)
{
    return function()
    {
        var args = arguments;

        var f_args = [];
        for (var i in args)
        {
            f_args.push(args[i]);
        }

        var cb = f_args.pop();
        
        setTimeout(
            function()
            {
                cb(f.apply({}, f_args));
            },
            50 + 200 * Math.random());
    }
}

var times2 = async_gen(function(x) { return x * 2; });
var plus3 = async_gen(function(x) { return x + 3; });
var plus = async_gen(function(x, y) { return x + y; });

mesh.run(
    {
        'x': [mesh.constant(7), []],
        't1': [times2, ['x']],
        't2': [plus3, ['x']],
        'y': [plus, ['t1', 't2']]
    },
    function(results)
    {
        console.log(results.y);
    });

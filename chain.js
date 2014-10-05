function async_gen(f)
{
    return function(x, cb)
    {
        setTimeout(
            function()
            {
                cb(f(x));
            },
            50);
    }
}

var times2 = async_gen(function(x) { return x * 2; });
var plus3 = async_gen(function(x) { return x + 3; });

function compose()
{
    var args = arguments;
    
    return function(x, cb)
    {
        var i = 0;
        
        var go = function()
        {
            if (i >= args.length)
            {
                cb(x);
                return;
            }

            args[i++](
                x,
                function(y)
                {
                    x = y;
                    go();
                });
        }

        go();
    }
}

compose(plus3, times2)(
    7,
    function(y)
    {
        console.log(y);
    });

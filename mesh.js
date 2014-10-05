'use strict';

var pending_task = require('pending_task').pending_task;

exports.run = function(mesh, cb)
{
    var results = {};

    var results_pt = new pending_task(function() { cb(results); });

    var deps = {};

    for (var job in mesh)
    {
        results_pt.increment();
        deps[job] = [];
    }

    results_pt.ready();
    
    var pending_tasks = [];
    
    for (var job in mesh)
    {
        var pt = new pending_task((function(job) { return function()
        {
            var args = [];

            for (var i in mesh[job][1])
            {
                args.push(results[mesh[job][1][i]]);
            }

            args.push(function(result)
            {
                results[job] = result;
                
                for (var i in deps[job])
                {
                    var dep_pt = deps[job][i];
                    dep_pt.decrement();
                }

                results_pt.decrement();
            });
            
            mesh[job][0].apply({}, args);
        }})(job));
        
        for (var i in mesh[job][1])
        {
            var input_name = mesh[job][1][i];
            
            deps[input_name].push(pt);
            pt.increment();
        }
        
        pending_tasks.push(pt);
    }

    for (var i in pending_tasks)
    {
        pending_tasks[i].ready();
    }
}

exports.constant = function(x)
{
    return function(cb) { cb(x); }
}

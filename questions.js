var readline = require('readline');

exports.questions = function()
{
    var self = this;
    
    this.rl = readline.createInterface(
        {
            input: process.stdin,
            output: process.stdout
        });

    this.queue = [];

    this.asking = false;
    
    this.ask = function(msg, cb)
    {
        var job = function()
        {
            self.asking = true;
            
            self.rl.question(
                msg,
                function(response)
                {
                    self.asking = false;
                    
                    cb(response);
                    
                    if (self.queue.length > 0)
                    {
                        self.queue.shift()();
                    }
                });
        }
        
        if (!self.asking)
        {
            job();
        }
        else
        {
            self.queue.push(job);
        }
    }
    
    this.end = function()
    {
        if (!self.asking)
        {
            self.rl.close();
        }
        else
        {
            self.queue.push(function() { self.rl.close(); });
        }
    }
}

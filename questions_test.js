var questions = require('./questions').questions;

var q = new questions();

q.ask('q1: ', function(answer) { console.log(answer); });
q.ask('q2: ', function(answer) { console.log(answer); });
q.end();


'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const exec = require('child_process').exec;
let child;


prompt.start();
 
//
// Get two properties from the user: username and email
//
console.log('What version of oc do you wish to install? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n')
prompt.get(['version'], function (err, result) {
//
// Log the results.
//
console.log('Command-line input received:');
console.log('  Version : ' + result.version);
});
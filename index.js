const download_oc = require('./src/download');

const change_oc = require('./src/change');
const prompt = require('prompt');
const colors = require('colors/safe');

prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');


download_oc(function(){
});


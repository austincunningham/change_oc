const download_oc = require('./src/download');
const extract_oc = require('./src/extract');
const change_oc = require('./src/change');
const prompt = require('prompt');
const colors = require('colors/safe');

prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');


download_oc;
extract_oc;
change_oc;


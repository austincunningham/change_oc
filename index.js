#!/usr/bin/env node

const download_oc = require('./src/download');
const prompt = require('prompt');
const colors = require('colors/safe');
const exec = require('child_process').exec;

prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');

console.log(colors.yellow("======================== Check for OC Version Installed ============================="));
console.log(colors.yellow("The folowing versions of oc are installed at /opt/openshift"));

exec("ls /opt/openshift", (error,stdout,stderr) =>{
    if (error){ return error}
    if (stderr){ return stderr}
    console.log(colors.yellow(stdout));
    if (stdout){
        download_oc(function(){
        });
    }
    });




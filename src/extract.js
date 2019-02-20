'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const util = require('util');
const tarball = require('tarball-extract');
const fs = require('fs');
const download_oc = require('./download');
const readlineSync = require('readline-sync');

var extract_oc = function (callback){
    let version = readlineSync.question(colors.blue('What version of oc do you wish to install ? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n'));
    console.log("download version",version);
    console.log("================================= Extract OC =======================================")
    fs.exists("../"+version +".tar.gz",function(err){
        if(err) {
            console.log("file read error: "+err);
        } else {
            tarball.extractTarball(version+".tar.gz", version, function(error){
                console.log("don i get here")
                if(error) {
                console.log("tarball error: "+error);
                } else {
                console.log("File extracted");
                }
            });
        }

        if (typeof callback === 'function') {
            callback();
        }    
    });
};
module.exports = extract_oc;



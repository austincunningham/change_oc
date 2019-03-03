'use strict';
const colors = require('colors/safe');
const exec = require('child_process').execSync;
const tarball = require('tarball-extract');
const fs = require('fs');
const download_oc = require('./download');
const change = require('./change');

const ocpath = "openshift-origin-client-tools-v";

var extract_oc = function (callback){
    console.log(colors.cyan("================================= Extract OC ======================================="))
    console.log("download version: ",download_oc.version);
    let version = download_oc.version;
    fs.exists("../"+version +".tar.gz",function(err){
        if(err) {
            console.log("file read error: "+err);
        } else {
            tarball.extractTarball(version+".tar.gz", version, function(error){
                if(error) {
                    console.log("tarball error: "+error);
                } else {
                    console.log("File extracted");
                    
                    // move the files and remove the old directory
                    if (!fs.existsSync('/opt/openshift/'+ version)){
                        var versionpath = './'+version+'/'+ocpath+version+'*/*';
                        exec('mv '+versionpath+' ./'+version);
                        exec('rm -rf '+'./'+version+'/'+ocpath+version+'*');
                        exec('sudo mv ./'+ version +' /opt/openshift/'+ version);
                        console.log(change)
                        change(function(){
                            console.log('oc version changed to :' + version);
                            return;
                        });
                    }else{
                        console.log("/opt/openshift/"+version+' exists already');
                        exec('rm -rf ./'+version);
                        change(function(){
                            console.log('oc version changed to :' + version);
                            return;
                        });
                    }
                }
            });
        }

        if (typeof callback === 'function') {
            callback();
        }    
    });
};
module.exports = extract_oc;



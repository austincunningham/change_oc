#!/bin/sh

find $1/openshift-origin-client-tools-v$1*/* -type f -exec mv {} 3.7/ \;
rm -rf $1/openshift-origin-client-tools-v$1*

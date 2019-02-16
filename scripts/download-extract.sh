#!/bin/sh

echo "Enter version for download and extract : "
echo "- 3.7"
echo "- 3.9"
echo "- 3.10"
echo "- 3.11"
read oc_version

case "$oc_version" in

3.7) echo "Download and extract 3.7 "
     curl -L https://github.com/openshift/origin/releases/download/v3.7.2/openshift-origin-client-tools-v3.7.2-282e43f-linux-64bit.tar.gz --output 3.7.tar.gz
     mkdir -p ~/oc/3.7
     tar xvzf 3.7.tar.gz -C ~/oc/3.7
     mv ~/oc/3.7/open*/* ~/oc/3.7
     rm -rf ~/oc/3.7/openshift*
     ;;
3.9) echo "Download and extract 3.9 "
     curl -L https://github.com/openshift/origin/releases/download/v3.9.0/openshift-origin-client-tools-v3.9.0-191fece-linux-64bit.tar.gz --output 3.9.tar.gz
     mkdir -p ~/oc/3.9
     tar xvzf 3.9.tar.gz -C ~/Download/oc/3.9
     mv ~/oc/3.9/open*/* ~/oc/3.9
     rm -rf ~/oc/3.9/openshift*
     ;;
3.10) echo "Download and extract 3.10 "
     curl -L https://github.com/openshift/origin/releases/download/v3.10.0/openshift-origin-client-tools-v3.10.0-dd10d17-linux-64bit.tar.gz --output 3.10.tar.gz
     mkdir -p ~/oc/3.10
     tar xvzf 3.10.tar.gz -C ~/Download/oc/3.10
     mv ~/oc/3.10/open*/* ~/oc/3.10
     rm -rf ~/oc/3.10/openshift*
     ;;
3.11) echo "Download and extract 3.11 "
     curl -L https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz --output 3.11.tar.gz
     mkdir -p ~/oc/3.11
     tar xvzf 3.11.tar.gz -C ~/Download/oc/3.11
     mv ~/oc/3.11/open*/* ~/oc/3.11
     rm -rf ~/oc/3.11/openshift*
     ;;
*)   echo "No such version "
     ;;
esac

     
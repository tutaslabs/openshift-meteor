#!/bin/bash
SERVICE=meteorshim
CHECK=$0

RESULT=`ps ax | sed -n /${SERVICE}/p | grep -v sed | grep -v ${CHECK}`

if [ "${#RESULT}" -eq 0 ]; then

 source "$OPENSHIFT_REPO_DIR/.openshift/lib/utils"
_SHOW_SETUP_PATH_MESSAGES="true" setup_path_for_custom_node_version


cd ${OPENSHIFT_REPO_DIR}


nohup node meteorshim.js 2>&1 >> $OPENSHIFT_DATA_DIR/node.log &
exit 0
fi

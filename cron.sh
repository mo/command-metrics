#!/bin/bash

#
# NOTE: Open "crontab -e" and insert call to this script (with no parameters).
#
# And also put:
# MAILTO=""
# ...at the top of the crontab file.
#
# Look for errors in "command-metrics-$(hostname).log"
#

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ "$1" == "" ]; then
	$SCRIPT_DIR/src/refresh-measurements measure >> $SCRIPT_DIR/../command-metrics-$(hostname).log 2>&1
else
	$SCRIPT_DIR/src/refresh-measurements "$@" >> $SCRIPT_DIR/../command-metrics-$(hostname).log 2>&1
fi

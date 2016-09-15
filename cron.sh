#!/bin/bash

#
# NOTE: Open "crontab -e" and insert call to this script (with no parameters).
# And also put:
# MAILTO=""
# ...at the top of the crontab file. Look for errors in:
# /var/log/command-metrics-cron.log
#

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
$SCRIPT_DIR/src/refresh-measurements measure >> /var/log/command-metrics-cron.log 2>&1


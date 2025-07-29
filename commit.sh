#!/bin/bash
git commit -m "$(date +%H:%M:%S+%3N) $(date '+%d %b %y') $(date '+%z') $(date +%Z) $(uname -r) $(lsb_release -c | awk '{print $2}') $(lsb_release -r | awk '{print $2}')" && git push

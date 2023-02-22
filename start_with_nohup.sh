#!/bin/bash

# run this script on root frontend folder
nohup http-server ./build -p 3000 1 > front_log.out 2>&1 &



# ps -A | grep serve
# klll -9 [pid]
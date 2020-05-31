#!/bin/sh

### Run the script with the command: sh src/dbfiles/dbstart.sh
mongod --dbpath /home/automated-electricity-bill/src/dbfiles/db --bind_ip 127.0.0.1 --port 3001 &
mongo --host 127.0.0.1 --port 3001

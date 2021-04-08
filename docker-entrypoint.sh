#!/bin/bash

cd /app

# echo $FILE_1 > /app/src/app/app.component.html
# echo $FILE_2 > /app/src/app/app.component.ts

wget $FILE_1
wget $FILE_2

cp app.component.html /app/src/app/app.component.html
cp app.component.ts /app/src/app/app.component.ts

ls -l /app/src/app

sleep 5
cat /app/src/app/app.component.html
cat /app/src/app/app.component.ts

npx ng test --reporters=junit --browsers ChromeHeadless &

sleep 30

cp -R result-xml /app/output

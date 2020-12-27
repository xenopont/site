#!/usr/bin/env ash

echo "Installing dev configuration"
cp ./src/config/dev.ts ./src/config/current.ts
# echo "Copying images"
# mkdir -p ./dist/images
# cp -R ./src/images/* ./dist/images
echo "Watching file changes"
node ./node_modules/parcel/bin/cli.js watch ./src/index.html

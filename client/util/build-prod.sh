#!/usr/bin/env ash

echo "Installing production configuration"
cp ./src/config/production.ts ./src/config/current.ts
echo "Building the app"
node ./node_modules/parcel/bin/cli.js build ./src/index.html --no-source-maps
echo ""
echo "Please use the ./dist/app.js file for your production environment"

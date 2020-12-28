#!/usr/bin/env ash

# write aliases:
echo "alias build=\"npm run build\"" >> /root/.ashrc
echo "alias install=\"npm install\"" >> /root/.ashrc
echo "alias lint=\"npm run lint\"" >> /root/.ashrc
echo "alias watch=\"npm run watch\"" >> /root/.ashrc
echo "alias test=\"npm run test\"" >> /root/.ashrc

# apply aliases:
. /root/.ashrc

tail -f /dev/null

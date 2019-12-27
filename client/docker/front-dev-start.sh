#!/usr/bin/env ash

# write aliases:
echo "alias install=\"npm install\"" >> /root/.ashrc
echo "alias lint=\"npm run lint\"" >> /root/.ashrc
echo "alias ts=\"npm run ts\"" >> /root/.ashrc
echo "alias pack=\"npm run pack\"" >> /root/.ashrc
echo "alias build=\"npm run build\"" >> /root/.ashrc
echo "alias watch=\"npm run watch\"" >> /root/.ashrc
#echo "alias test=\"npm run test\"" >> /root/.ashrc

# apply aliases:
. /root/.ashrc

nginx -g "pid /tmp/nginx.pid; daemon off;"
#npm run watch

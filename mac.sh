#!/usr/bin/env bash

echo "Building servers..."
echo ""
docker build -t site-client-image --file ./docker/dev-client.dockerfile .
docker build -t site-server-image --file ./docker/dev-server.dockerfile .
echo "Starting servers..."
echo ""
docker-compose -p site --file ./docker/dev-composition.json up -d
echo "                                                               "
echo "                                                               "
echo "                                                               "
echo "    ╔═════════════════════════════════════════════════════╗    "
echo "    ║ Client dev environment                              ║    "
echo "    ╟─────────────────────────────────────────────────────╢    "
echo "    ║                                                     ║    "
echo "    ║ Command list:                                       ║    "
echo "    ║                                                     ║    "
echo "    ║     • install - installs npm dependencies           ║    "
echo "    ║     • lint    - validates Typescript code quality   ║    "
echo "    ║     • build   - builds the client app from sources  ║    "
echo "    ║     • watch   - starts watching source file changes ║    "
echo "    ║                 and rebuilds them automatically     ║    "
echo "    ║                                                     ║    "
echo "    ╟─────────────────────────────────────────────────────╢    "
echo "    ║                                                     ║    "
echo "    ║ - open http://localhost:9081/ in your browser       ║    "
echo "    ║     to see the current status of the frontend       ║    "
echo "    ║ - type 'exit' to leave and stop the dev environment ║    "
echo "    ║                                                     ║    "
echo "    ╚═════════════════════════════════════════════════════╝    "
echo "                                                               "
echo "                                                               "
echo "                                                               "
docker exec -it site-client ash
echo "Stopping servers..."
docker-compose --file ./docker/dev-composition.json stop
echo "Done."

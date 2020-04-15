Write-Host "Building images..." -foreground Cyan
docker build -t site-client-image --file ./docker/dev-client.dockerfile .
docker build -t site-server-image --file ./docker/dev-server.dockerfile .
Write-Host "Starting servers..." -foreground Cyan
docker-compose -p site --file ./docker/dev-composition.json up -d
Write-Host "                                                               " -foreground Gray
Write-Host "                                                               " -foreground Gray
Write-Host "                                                               " -foreground Gray
Write-Host "    +-----------------------------------------------------+    " -foreground Gray
Write-Host "    | Client dev environment                              |    " -foreground Gray
Write-Host "    |-----------------------------------------------------|    " -foreground Gray
Write-Host "    |                                                     |    " -foreground Gray
Write-Host "    | Command list:                                       |    " -foreground Gray
Write-Host "    |                                                     |    " -foreground Gray
Write-Host "    |     * install - installs npm dependencies           |    " -foreground Gray
Write-Host "    |     * lint    - validates Typescript code quality   |    " -foreground Gray
Write-Host "    |     * build   - builds the client app from sources  |    " -foreground Gray
Write-Host "    |     * watch   - starts watching source file changes |    " -foreground Gray
Write-Host "    |                 and rebuilds them automatically     |    " -foreground Gray
Write-Host "    |                                                     |    " -foreground Gray
Write-Host "    |-----------------------------------------------------|    " -foreground Gray
Write-Host "    |                                                     |    " -foreground Gray
Write-Host "    | - open http://localhost:9092/ in your browser       |    " -foreground Gray
Write-Host "    |     to see the current status of the frontend       |    " -foreground Gray
Write-Host "    | - type 'exit' to leave and stop the dev environment |    " -foreground Gray
Write-Host "    |                                                     |    " -foreground Gray
Write-Host "    +-----------------------------------------------------+    " -foreground Gray
Write-Host "                                                               " -foreground Gray
Write-Host "                                                               " -foreground Gray
Write-Host "                                                               " -foreground Gray
docker exec -it site-client ash
Write-Host "Stopping servers..." -foreground Cyan
docker-compose --file ./docker/dev-composition.json stop
Write-Host "Done." -foreground Cyan

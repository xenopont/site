## installing on ubuntu server VM

- install VM with the bridget network and static IP, say 192.168.1.254
- `apt-get update`
- `apt-get upgrade`
- "insert" guest additions disk
- `mkdir -p /media/cdrom`
- `mount /dev/cdrom /media/cdrom`
- `apt-get install gcc make perl`
- `sh /media/cdrom/VBoxLinuxAdditions.run`
- share project folder in virtual box shared folders as site
- reboot
- `mkdir -p /srv/site`
- `mount -t vboxsf site /srv/site`
- `apt-get install nginx`
- `ln -s /srv/site/frontend/docker/default.conf /etc/nginx/conf.d/default.conf`


- create a group if it doesn't exist `sudo groupadd docker`
- add your user to that group `sudo usermod -aG docker $USER`
- mount the shared folder `mount -t vboxsf site /srv/site`

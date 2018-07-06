### installing on ubuntu server VM

1. install VM with the bridget network and static IP, say 192.168.1.254
2. apt-get update
3. apt-get upgrade
4. apt-get install gcc make perl
5. "insert" guest additions disk
6. mkdir -p /media/cdrom
7. mount /dev/cdrom /media/cdrom
8. sh /media/cdrom/VBoxLinuxAdditions.run
9. share project folder in virtual box shared folders as site
10. reboot
11. mkdir -p /srv/site
12. mount -t vboxsf site /srv/site

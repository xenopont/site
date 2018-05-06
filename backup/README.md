#site

##Apache2 configuration

In `apache2.conf`:

```apacheconf
<Directory /var/www>
	...
	AllowOverride All
	...
</Directory>
```

In `000-default.conf`:

```apacheconf
<VirtualHost *:80>
    ServerName test.test
    DocumentRoot /var/www/[...]/frontend/htdocs
    ErrorLog ${APACHE_LOG_DIR}/frontend_error.log
    LogLevel warn
    CustomLog ${APACHE_LOG_DIR}/frontend_access.log combined
</VirtualHost>
<VirtualHost *:80>
    ServerName backend.test.test
    DocumentRoot /var/www/[...]/backend/htdocs
    ErrorLog ${APACHE_LOG_DIR}/backend_error.log
    LogLevel warn
    CustomLog ${APACHE_LOG_DIR}/backend_access.log combined
</VirtualHost>
```

`.htaccess` (in the same directory with `index.php`) example:

```apacheconf
Options +FollowSymLinks
IndexIgnore */*

RewriteEngine on

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*).css$	test.php?p=$1 [L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . index.php
```

## create a user and change /var/www permissions
```bash
#!/bin/bash

echo "Add user"
useradd --groups www-data --password 123 webdev

echo "Changing /var/www permissions"
cd /var
chown -R webdev:www-data www
chmod -R 775 www

```

## to allow access from php storm
```bash
# add

KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group-exchange-sha256,diffie-hellman-group14-sha1,diffie-hellman-group1-sha1

# to /etc/ssh/sshd_config
# then

sudo systemctl restart sshd
```

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

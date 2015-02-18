<h1>site</h1>

<h2>Apache2 configuration</h2>


In apache2.conf:

<pre><code>&lt;Directory /var/www&gt;
	...
	AllowOverride All
	...
&lt;/Directory&gt;</code></pre>


In 000-default.conf:

<pre><code>&lt;VirtualHost *:80&gt;
    ServerName test.test
    DocumentRoot /var/www/[...]/frontend/htdocs
    ErrorLog ${APACHE_LOG_DIR}/frontend_error.log
    LogLevel warn
    CustomLog ${APACHE_LOG_DIR}/frontend_access.log combined
&lt;/VirtualHost&gt;
&lt;VirtualHost *:80&gt;
    ServerName backend.test.test
    DocumentRoot /var/www/[...]/backend/htdocs
    ErrorLog ${APACHE_LOG_DIR}/backend_error.log
    LogLevel warn
    CustomLog ${APACHE_LOG_DIR}/backend_access.log combined
&lt;/VirtualHost&gt;</code></pre>


.htaccess (in the same directory with index.php) example:

<pre><code>Options +FollowSymLinks
IndexIgnore */*

RewriteEngine on

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*).css$	test.php?p=$1 [L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . index.php</code></pre>
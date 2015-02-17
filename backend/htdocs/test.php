<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

?>
<html>
	<head>
		<title>test</title>
	</head>
	<body>
		<div>
			<pre><?php

require_once(__DIR__.'/../../core/autoloader/autoloader.php');
use Core\Html\Page;
use Core\Object;
$Page = new Page();
class TestClass extends Object {
	private $Name = '';
}
$t = new TestClass();
var_dump($t);

			?></pre>
		</div>
	</body>
</html>
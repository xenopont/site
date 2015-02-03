<?php
error_reporting(E_ALL);
ini_set('display_errors', 'on');

require_once(__DIR__.'/../Core/Exceptions.php');
require_once(__DIR__.'/../Core/Object.php');
require_once(__DIR__.'/../Core/Html/Element.php');

?>
<html>
	<head>
		<title>test</title>
	</head>
	<body>
		<div>
			<pre><?php
			
class TestClass extends vendor1\Core\Object {
	/** @property-read string $Username name of the user */
	
	private $SomeVariable;
	
	protected function GetUsername(){
		return 'Valera';
	}
}

$a = new TestClass();
var_dump($a->Username = 3);

			?></pre>
		</div>
	</body>
</html>
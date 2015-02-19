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
/*$imp = new DOMImplementation();
$dt = $imp->createDocumentType('html');
$doc = $imp->createDocument(null, null, $dt);
$html = $doc->createElement('html');
$head = $doc->createElement('head');
$title = $doc->createElement('title', 'Untitled-1');
$body = $doc->createElement('body');
$div = $doc->createElement('div');
$text = $doc->createTextNode('');
$div->appendChild($text);
$body->appendChild($div);
$head->appendChild($title);
$html->appendChild($head);
$html->appendChild($body);
$doc->appendChild($html);
echo htmlspecialchars($doc->saveXML());*/

use Core\Html\BasePage;
use Core\Html\RDoctypeElement;

$page = new BasePage(new RDoctypeElement('html'));
echo htmlspecialchars($page->Document->saveXML());

			?></pre>
		</div>
	</body>
</html>
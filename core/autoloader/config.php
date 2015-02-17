<?php
namespace vendor1\Core {

	return [
		'atlas' => [
			new AutoloaderMap('core/Exceptions.php', 'vendor1\\Core\\Exceptions', [
				'Exception',
				'InvalidCall',
				'UnknownProperty',
			]),
			new AutoloaderMap('core/Object.php', 'vendor1\\Core', [
				'Object',
				'IPropertyOwner'
			]),
			new AutoloaderMap('core/html/Element.php', 'vendor1\\Core\\Html', [
				'BaseElement',
				'Element',
			]),
			new AutoloaderMap('core/html/Page.php', 'vendor1\\Core\\Html', [
				'Page',
				'Body',
				'Head',
			]),
			new AutoloaderMap('core/html/Visual.php', 'vendor1\\Core\\Html', [
				'VisualElement',
			]),
		],
	];

}
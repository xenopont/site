<?php
namespace Core {

	return [
		'atlas' => [
			new AutoloaderMap('core/Exceptions.php', 'Core\\Exceptions', [
				'Exception',
				'InvalidCall',
				'UnknownProperty',
			]),
			new AutoloaderMap('core/PropertyOwner.php', 'Core', [
				'IPropertyOwner',
				'TPropertyOwner',
			]),
			new AutoloaderMap('core/Object.php', 'Core', [
				'Object',
			]),
			new AutoloaderMap('core/html/Element.php', 'Core\\Html', [
				'Element',
			]),
			new AutoloaderMap('core/html/Page.php', 'Core\\Html', [
				'Page',
				'Body',
				'Head',
			]),
			new AutoloaderMap('core/html/Visual.php', 'Core\\Html', [
				'VisualElement',
			]),
		],
	];

}
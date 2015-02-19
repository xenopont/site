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
				'Record',
			]),
			new AutoloaderMap('core/html/Page.php', 'Core\\Html', [
				'BasePage',
				'Html5Page',
				'RDoctypeElement',
				'RDomDocument',
			]),
		],
	];

}
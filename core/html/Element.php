<?php
 
namespace Core\Html {
	
	use Core\IPropertyOwner;
	use Core\TPropertyOwner;
	
	class Element extends \DOMElement implements IPropertyOwner {
		use TPropertyOwner;
		
		public function __construct($name){
			parent::__construct($name);
			
		}
	}
	
}
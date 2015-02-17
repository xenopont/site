<?php
 
namespace Core\Html {
	
	use Core\IPropertyOwner;
	use Core\Exceptions;
	
	class BaseElement extends \DOMElement implements IPropertyOwner{
		public static function GetterName($property) {
			return 'Get'.$property;
		}
		
		public static function SetterName($property) {
			return 'Set'.$property;
		}
		
		public function __get($name) {
			$getter = self::GetterName($name);
			if(method_exists($this, $getter)){
				return $this->$getter();
			}
			else{
				if(method_exists($this, self::SetterName($name))){
					throw new Exceptions\InvalidCall('Reading write-only property '.get_class($this).'->'.$name);
				}
				else{
					throw new Exceptions\UnknownProperty('Reading unknown property '.get_class($this).'->'.$name);
				}
			}
		}

		public function __set($name, $value) {
			$setter = self::SetterName($name);
			if(method_exists($this, $setter)){
				return $this->$setter($value);
			}
			else{
				if(method_exists($this, self::GetterName($name))){
					throw new Exceptions\InvalidCall('Writing read-only property '.get_class($this).'->'.$name);
				}
				else{
					throw new Exceptions\UnknownProperty('Writing unknown property '.get_class($this).'->'.$name);
				}
			}
		}
	}
	
	class Element extends BaseElement {
		//
	}
	
}

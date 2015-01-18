<?php
namespace vendor1\Core {
	
	//use vendor1\Exceptions\InvalidCallException;
	use vendor1\Exceptions;
	//use vendor1\Exceptions\UnknownPropertyException;
	
	class Object {
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
		
		private static function GetterName($property){
			return 'Get'.$property;
		}
		
		private static function SetterName($property){
			return 'Set'.$property;
		}
	}

}
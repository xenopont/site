<?php
namespace vendor1\Core {
	
	use vendor1\Exceptions\InvalidCallException;
	use vendor1\Exceptions\UnknownPropertyException;
	
	class Object {
		public function __get($name) {
			$getter = self::GetterName($name);
			if(method_exists($this, $getter)){
				return $this->$getter();
			}
			else{
				$setter = self::SetterName($name);
				if(method_exists($this, $setter)){
					throw new InvalidCallException('Reading write-only property '.get_class($this).'->'.$name);
				}
				else{
					throw new UnknownPropertyException('Reading unknown property '.get_class($this).'->'.$name);
				}
			}
		}

		public function __set($name, $value) {
			$setter = self::SetterName($name);
			if(method_exists($this, $setter)){
				return $this->$setter($value);
			}
			else{
				$getter = self::GetterName($name);
				if(method_exists($this, $getter)){
					throw new InvalidCallException('Writing read-only property '.get_class($this).'->'.$name);
				}
				else{
					throw new UnknownPropertyException('Writing unknown property '.get_class($this).'->'.$name);
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
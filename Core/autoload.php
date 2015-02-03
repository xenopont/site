<?php

namespace vendor1\Core {
	
	class Autoloader {
		public function __construct() {
			spl_autoload_register(array($this, 'LoadClass'));
		}
		
		private function LoadClass($name){
			
		}
	}
	
	new Autoloader();
	
}
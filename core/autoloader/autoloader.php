<?php

namespace vendor1\Core {
	
	class Autoloader {
		private $BasePath = '';
		private $Map = [];
		
		public function __construct() {
			$config = include(__DIR__.'/config.php');
			$this->Map = $config['map'];
			$this->BasePath = realpath(__DIR__.'/../..').'/';
			
			spl_autoload_register(array($this, 'LoadClass'));
		}
		
		private function LoadClass($name){
			foreach($this->Map as $filename => $ClassList){
				if(in_array($name, $ClassList)){
					$filename = $this->BasePath.$filename;
					require_once($filename);
					break;
				}
			}
		}
	}
	
	new Autoloader();
	
}
<?php

namespace vendor1\Core {
	
	class AutoloaderMap {
		public $Classes   = array();
		public $Filename  = '';
		public $Namespace = '';
		
		public function __construct($filename, $namespace, array $classes = array()){
			$this->Classes   = $classes;
			$this->Filename  = $filename;
			$this->Namespace = $namespace;
		}
	}
	
	class Autoloader {
		private $Map = [];
		
		public function __construct() {
			$config = include(__DIR__.'/config.php');
			$this->Map = $this->AtlasToGlobalMap($config['atlas']);
			spl_autoload_register(array($this, 'LoadClass'));
		}
		
		private function LoadClass($name){
			if(isset($this->Map[$name])){
				require_once($this->Map[$name]);
			}
		}
		
		private function AtlasToGlobalMap(array $atlas){
			$GlobalMap = array();
			$BasePath = realpath(__DIR__.'/../..').'/';
			foreach($atlas as $map){
				foreach($map->Classes as $class){
					$GlobalMap[$map->Namespace.'\\'.$class] = $BasePath.$map->Filename;
				}
			}
			return $GlobalMap;
		}
	}
	
	new Autoloader();
	
}
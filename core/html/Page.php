<?php

namespace vendor1\Core\Html {
	
	/**
	 * @property Head $Head Page head
	 * @property Body $Body Page body
	 */
	class Page extends \DOMDocument {
		protected $Head = null;
		protected $Body = null;
		
		protected function GetHead(){
			return $this->Head;
		}
		
		protected function GetBody(){
			return $this->Body;
		}
	}
	
	class Head extends Element {
		//
	}
	
	class Body extends Element {
		//
	}
	
}
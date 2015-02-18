<?php

namespace Core\Html {
	
	use Core\IPropertyOwner;
	use Core\TPropertyOwner;
	
	/**
	 * @property Head $Head Page head
	 * @property Body $Body Page body
	 */
	class Page extends \DOMDocument implements IPropertyOwner{
		use TPropertyOwner;
		
		protected $Html = null;
		protected $Head = null;
		protected $Body = null;
		
		public function __construct($version = null, $encoding = null){
			parent::__construct($version, $encoding);
			$this->Html = new Element('html');
			$this->appendChild($this->Html);
			$this->Head = new Head();
			$this->Html->appendChild($this->Head);
			$this->Body = new Body();
			$this->Html->appendChild($this->Body);
			$script = new Element('script');
			$this->Head->appendChild($script);
		}

		protected function GetHead(){
			return $this->Head;
		}
		
		protected function GetBody(){
			return $this->Body;
		}
	}
	
	class Head extends Element {
		public function __construct(){
			parent::__construct('head');
		}
	}
	
	class Body extends Element {
		public function __construct(){
			parent::__construct('body');
		}
	}
	
}
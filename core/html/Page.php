<?php

namespace Core\Html {
	
	use Core\Object;
	use Core\Record;
	
	class RDoctypeElement extends Record{
		/* List of fields in their order inside !DOCTYPE declaration */
		public $QualifiedName = null;
		public $PublicId      = null;
		public $SystemId      = null;
		
		public function __construct($qualifiedName = null, $publicId = null, $systemId = null){
			$this->QualifiedName = $qualifiedName;
			$this->PublicId      = $publicId;
			$this->SystemId      = $systemId;
		}
	}
	
	class RDomDocument extends Record {
		/* List of fields in their order in DOMImplementation::createDocument() */
		public $NamespaceUri  = null;
		public $QualifiedName = null;
		/** @var DOMDocumentType */
		public $Doctype       = null;
		
		public function __construct($namespaceUri = null, $qualifiedName = null, $doctype = null){
			$this->NamespaceUri    = $namespaceUri;
			$this->QualifiedName   = $qualifiedName;
			$this->Doctype = $doctype;
		}
	}
	
	/**
	 * @property-read DOMDocument $Document Document element of Page
	 */
	class BasePage extends Object {
		protected $Document = null;
		protected function GetDocument(){
			return $this->Document;
		}

		/** @var DOMDocumentType Document Type Declaration Element */
		protected $DocumentType   = null;
		/** @var DOMImplementation PHP DOM Implementation Interface */
		protected $Implementation = null;
		
		public function __construct(RDoctypeElement $doctypeRecord = null, RDomDocument $documentRecord = null){
			$this->Implementation = new \DOMImplementation();
			if(is_null($doctypeRecord)){
				$doctypeRecord = new RDoctypeElement();
			}
			if(is_null($documentRecord)){
				$documentRecord = new RDomDocument();
			}
			$doctypeIsNotGiven = is_null($documentRecord->Doctype);
			$this->DocumentType = $doctypeIsNotGiven ?
				$this->Implementation->createDocumentType($doctypeRecord->QualifiedName, $doctypeRecord->PublicId, $doctypeRecord->SystemId) :
				$documentRecord->Doctype;
			$this->Document = $this->Implementation->createDocument($documentRecord->NamespaceUri, $documentRecord->QualifiedName, $this->DocumentType);
		}
	}
	
	class Html5Page extends BasePage {
		
	}
	
}
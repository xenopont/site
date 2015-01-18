<?php
namespace Core {
    
    class Object {
        public function __get($name) {
            $getter = 'get'.$name;
            if(method_exists($this, $getter)){
                return $this->$getter();
            }
            else{
                $setter = 'set'.$name;
                if(method_exists($this, $setter)){
                    throw new Exception('Getting write-only property '.get_class($this).'->'.$name);
                }
            }
        }
    }
    
    class A {
        private $Property = 1;
        
        public function getProperty(){
            return $this->Property;
        }
        
        public function setPtoperty($value){
            $this->Property = $value;
        }
    }
    
    class B {
        public function foo(A $a){
            $a->Property = 3;
        }
    }
    
}
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
                    throw new Exception('Reading write-only property '.get_class($this).'->'.$name);
                }
            }
        }
    }
    
}
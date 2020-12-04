<?php

// require_once 'EBSCOConnector.php';
// require_once 'EBSCOResponse.php';
require_once 'EBSCOAPI.php';
require_once 'EBSCOResponse.php';

class EBSCOAutocomplete {

    private $result2;
    
    public function autocompleteTest() {
        //$result = "test";
        $result2 = authenticationToken();
        var_dump($result2);
        die();
    }
    
};


?>
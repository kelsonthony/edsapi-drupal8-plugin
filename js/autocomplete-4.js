(function (win, doc) {
    "use strict";
  
    function app(){
        
    
    var ajax = new XMLHttpRequest();
  
    
    //var test = <?php my= test?>;
  
    var $lookfor = doc.querySelector('[id="lookfor"]');
    //var $blockbartikcontent = doc.querySelectorAll('[id="block-bartik-content"]');
  
    console.log($lookfor);
  
    $lookfor.addEventListener('keydown', requestAutocomplete, false);
  
    function requestAutocomplete(event){

        var autocompleteToken = "ARDGIzih79mrujhsHEun3L8aCnr9FslOXVcU3FDt+SzX0tRUH2wIlFU8+hOF0xH7Wpo=";
        var autocompleteurl = "https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete";
        var autocompleteCustId = "kelanthony";
        //var keyName = event.key;
        var searchvalue = event.target.value
        console.log('Hello keydown', searchvalue);
    
  
        var data = {
            token: autocompleteToken,
            term: searchvalue,
            idx: "rawqueries",
            filters: JSON.stringify([{
                name: "custid",
                values: [autocompleteCustId]
                },
            ]),
        }

        // ajax.onreadystatechange = function() {
        //     if (this.readyState == 4 && this.status == 200) {
        //         $blockbartikcontent.innerHTML = this.responseText;
        //     }
        // };
  
        ajax.open('GET',
                autocompleteurl,
                data,
                true
                );
                //console.log(data);
        ajax.send();

        ajax.addEventListener('readystatechange', sendAjax, false);

        var response ='';

        function sendAjax() {
            if( isRequestOk() ) {
                var data2 = JSON.parse(ajax.responseText);

                console.log(data2);
    
                console.log('Requisição Ok 1', data2.message);
                console.log('Requisição Ok 2', ajax);
                console.log('Requisição OK 3 \n', JSON.parse(ajax.responseText).message);
    
                try {
                    response = JSON.parse(ajax.responseText);
                    //throw new Error('Mensagem de Erro!');
                }
                catch(e) {
                    console.log(e);
                    response = ajax.responseText;
                }
    
                console.log(response);
            }else {
                console.log('Deu problema ou ainda carregando :(');
            }
            console.log('Terminou requisição', ajax.readyState, ajax.status);
        }
    
        function isRequestOk() {
            return ajax.readyState === 4 && ajax.status === 200;
        }
    
        console.log('Ajax', ajax);
        //console.log('blockbartikcontent', $blockbartikcontent);
    }
    }
    app();
    //requestAutocomplete();
})(window, document); 
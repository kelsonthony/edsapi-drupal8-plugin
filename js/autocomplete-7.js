(function(win, DOM) {
    'use strict';

    function appAutocomplete() {

        var $lookfor = new DOM('[id="lookfor"]');
        var ajax = new XMLHttpRequest();

        $lookfor.on('submit', handleSubmitFormAutocomplete);


        function handleSubmitFormAutocomplete(event) {
            event.preventDefault();
            var url = getUrl();
            ajax.open('GET', url);
            ajax.send();
            getMessage('loading');
            ajax.addEventListener('readystatechange', handleReadyStateChange);
        }

        function getUrl() {
            return replaceAutocomplete('http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete');
        }


        function clearAutocomplete() {
            return $lookfor.get()[0].value.replace(/\D/g, '');
        }

        function handleReadyStateChange() {
            if ( isRequestOk() ) {
                getMessage('ok');
                autocompleteFields();
            }
        }
        
        function isRequestOk() {
            return ajax.readyState === 4 && ajax.status === 200;
        }

        console.log(ajax);

        function autocompleteFields() {
            var data = parseData();
            if (!data) {
                getMessage('error');
                data = clearData();
            }
        }

        function clearData() {
            return {
                link: '-',
    
            }
        }

        function parseData() {
            var result;
            try {
                result = JSON.parse(ajax.responseText);
            }
            catch (e) {
                result = null;
            }
            return result;
        }

        function getMessage(type) {
            var messages = {
                loading: replaceAutocomplete("Buscando informações para o CEP [CEP]..."),
                ok: replaceAutocomplete("Endereço referente ao CEP [CEP]:"),
                error: replaceAutocomplete("Não encontramos o endereço para o CEP [CEP]."),
            };

            $lookfor.get()[0].textContent = messages[type];
        }

        function replaceAutocomplete(message) {
            return message.replace('[CEP]', clearAutocomplete());
        }

        return {
            getMessage: getMessage,
            replaceAutocomplete: replaceAutocomplete
        };

    }
    console.log('Olá autocomplete 7');
    win.app = appAutocomplete();
    //appAutocomplete();

})(window, window.DOM);
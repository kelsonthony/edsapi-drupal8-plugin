(function(win, DOM) {
    'use strict';

    function appAutocomplete() {

        var $lookfor = new DOM('[id="lookfor"]');
        var ajax = new XMLHttpRequest();


        console.log($lookfor);


        $lookfor.on('keydown', handleKeyDown);

        function handleKeyDown(event) {
            //event.preventDefault();
            var myEvent = event.target.value;

            var url = 'http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete';

            ajax.open('GET', url);
            ajax.send();

            console.log('myEvent: ', myEvent);
            console.log('ajax: ', ajax.readyState);

            
            ajax.addEventListener('readystatechange', handleReadyStateChange);

            function handleReadyStateChange() {
                return ajax.readyState === 4 && ajax.status === 200;
            }

            var result = ajax.response;

            //$lookfor.get()[0].textContent = data.link;

            console.log('My Ajax', ajax.link);
            console.log('My Result', result);
        }

        console.log('Olá autocomplete 6');
    }
    win.app = appAutocomplete();
    //appAutocomplete();

})(window, window.DOM);
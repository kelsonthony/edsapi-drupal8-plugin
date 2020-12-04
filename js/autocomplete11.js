(function ($, Drupal, drupalSettings, doc) {
    'use strict';

   

    Drupal.behaviors.EBSCOAutocompleteDrupal = {
        attach: function authAutocomplete(context, settings) {
            $('#lookfor').once('EBSCOAutocompleteDrupal');

            
            // $('#lookfor').once('jsDrupalTest').append('<button class="button js-form-submit form-submit" type="submit" value="Test">' + drupalSettings.autocomplete.title + '</button>')
            // console.log('drupalSettings to autocomplete', drupalSettings);
            //console.log('Drupal Object to autocomplete', Drupal);
            // console.log('context', context);
            // console.log('settings', settings);
            $("#lookfor").click(function(){
                //console.log('Clicou para AJAX 11');
                var $lookfor = doc.querySelector('[id="lookfor"]');
                console.log($lookfor);

                console.log('drupalSettings.autocomplete.authenticationToken: ', drupalSettings.autocomplete.authenticationToken);
                console.log('drupalSettings.autocomplete.authenticationTimeout: ', drupalSettings.autocomplete.authenticationTimeout);
                console.log('drupalSettings.autocomplete.autocompleteUrl: ', drupalSettings.autocomplete.autocompleteUrl);
                console.log('drupalSettings.autocomplete.autocompleteToken: ', drupalSettings.autocomplete.autocompleteToken);
                console.log('drupalSettings.autocomplete.autocompleteCustId: ', drupalSettings.autocomplete.autocompleteCustId);
                // var autocompleteurl = 'http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete';
                // var autocompleteToken;
                // var autocompleteCustId;


                $lookfor.addEventListener('keydown', requestAutocomplete, false);

                
                function requestAutocomplete(event){

                    var ajax = new XMLHttpRequest();
                    var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
                    var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
                    //var autocompleteurl = 'https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete';
                    //var urlGlobal = 'https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete';
                    //var urlGlobal = 'http://kelsonthony/drupal/drupal-8.8.5/ebsco/autocomplete';
                    var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
                    //var keyName = event.key;
                    var searchvalue = event.target.value
                    //console.log('Hello keydown', searchvalue);

                    // var data = {
                    //     url: autocompleteurl,
                    //     token: autocompleteToken,
                    //     term: searchvalue,
                    //     idx: "rawqueries",
                    //     filters: JSON.stringify([{
                    //         name: "custid",
                    //         values: [autocompleteCustId]
                    //         },
                    //     ]),
                    // }

                    // ajax.open('GET',
                    // autocompleteurl,
                    // data,
                    // true
                    // );
                    // console.log('data: ', data);
                    // ajax.send();

                    // console.log('XMLHttpRequest: ', ajax);

                    $.ajax({
                        type: 'get',
                        url: autocompleteurl,
                        data: {
                            token: autocompleteToken,
                            term: searchvalue,
                            idx: "rawqueries",
                            filters: JSON.stringify([{
                                name: "custid",
                                values: [autocompleteCustId]
                                },
                            ]),
                        },
                        beforeSend : function(){
                            $("#lookfor").html("ENVIANDO...");
                       }
                        
                    })
                    .done(function(msg){
                        $("#lookfor").html(msg);
                   })
                   .fail(function(jqXHR, textStatus, msg){
                        alert(msg);
                   });
                }

                // function requestAutocomplete() {
                //     //authAutocomplete();
                //     initializeAutocomplete();
                // }

                // function authAutocomplete() {

                //     var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
                //     var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
                //     //var autocompleteurl = 'https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete';
                //     var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
                //     //var keyName = event.key;
                //     var searchvalue = event.target.value

                //     var promise = $.ajax('https://eds-api.ebscohost.com/authservice/rest/uidauth',
                //         {
                //             contentType: 'application/json',
                //             dataType: 'json',
                //             type: 'GET',
                            
                //         });
            
                //     promise.done(function (data) {
                //         autocompleteToken = data.Autocomplete.Token;
                //         autocompleteCustId = data.Autocomplete.CustId;
                //         autocompleteurl = data.Autocomplete.Url;
                //         $('#autocomplete-auth-successful').show();
                //         $('#autocomplete-auth-failed').hide();
            
                //         var timeout = parseInt(data.Autocomplete.TokenTimeOut) * 1000; // convert to seconds
            
                //         // Need to renew before timeout to ensure there is always a non-timed out autocomplete token
                //         retryTime = timeout * beforeTimeoutMultiplier;
                //         window.setTimeout(authAutocomplete, retryTime);
                //     });
                //     promise.fail(function () {
                //         $('#autocomplete-auth-failed').show();
                //         $('#autocomplete-auth-successful').hide();
                //     });
                //     promise.always(function () {
                //         var $progressImage = $('img.execution-progress');
                //         $progressImage.hide();
                //     });
                // }

                // function initializeAutocomplete() {

                //     var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
                //     var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
                //     //var autocompleteurl = 'https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete';
                //     var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
                //     //var keyName = event.key;
                //     var searchvalue = event.target.value
                //     $('#lookfor').autocomplete({
                //         source: function (request, response) {
                //             var promise = $.ajax(autocompleteurl, {
                //                 data: {
                //                     token: autocompleteToken,
                //                     term: searchvalue,
                //                     idx: 'rawqueries',
                //                     filters: JSON.stringify([
                //                         {
                //                             name: 'custid',
                //                             values: [autocompleteCustId]
                //                         }
                //                     ])
                //                 }
                //             });
            
                //             promise.done(function (data) {
                //                 var terms = data.terms.map(function (wrapper) {
                //                     return wrapper.term;
                //                 });
                //                 response(terms);
                //             });
                //         }
                //     });
                // }
            
                // //window.authAutocomplete = authAutocomplete;
                // window.initializeAutocomplete = initializeAutocomplete;

            });






        }
    }
})(jQuery, Drupal, drupalSettings, document);


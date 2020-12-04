(function ($, Drupal, drupalSettings) {
    'use strict';



    Drupal.behaviors.EBSCOAutocompleteDrupal = {
        attach: function authAutocomplete(context, settings) {
            $('.search-form').once('EBSCOAutocompleteDrupal')
                .append('<button class="button">' + drupalSettings.autocomplete.user + '</button>')
                .append('<button class="button">' + drupalSettings.autocomplete.password + '</button>');
            //console.log('ping');
            // $('#lookfor').once('jsDrupalTest').append('<button class="button js-form-submit form-submit" type="submit" value="Test">' + drupalSettings.autocomplete.title + '</button>')
            // console.log('drupalSettings to autocomplete', drupalSettings);
            //console.log('Drupal Object to autocomplete', Drupal);
            // console.log('context', context);
            // console.log('settings', settings);
            $("#lookfor").click(function(){
                console.log('Clicou para AJAX');
                var test = document.querySelector('[id=lookfor]');
                console.log(test);
                // $.ajax({url: "demo_test.txt", success: function(result){
                //   $("#block-bartik-content").html(result);
                // }});

                //boilerplate starts here
               // function authAutocomplete() {
                    var promise = $.ajax('https://eds-api.ebscohost.com/authservice/rest/uidauth',
                    {
                        contentType: 'application/json',
                        dataType: 'json',
                        type: 'post',
                        data: JSON.stringify({
                            UserId: 'placarinfo',
                            Password: 'YJhS$9PAV5VtDbpy',
                            Options: [
                                'autocomplete'
                            ],
                            InterfaceId: "WSapi"
                        })
                        
                    });
                    console.log('UserId ', data);
                    
                    
                    promise.done(function (data) {

                        var autocompleteToken;
                        var autocompleteCustId;
                        var autocompleteurl;
                        var retryTime = 900 * 1000; // converted to seconds
                        var beforeTimeoutMultiplier = (3 / 4);

                        autocompleteToken = data.Autocomplete.Token;
                        autocompleteCustId = data.Autocomplete.CustId;
                        autocompleteurl = data.Autocomplete.Url;
                        $('#autocomplete-auth-successful').show();
                        $('#autocomplete-auth-failed').hide();
            
                        var timeout = parseInt(data.Autocomplete.TokenTimeOut) * 1000; // convert to seconds
            
                        // Need to renew before timeout to ensure there is always a non-timed out autocomplete token
                        retryTime = timeout * beforeTimeoutMultiplier;
                        window.setTimeout(authAutocomplete, retryTime);
                    });
    
                    promise.fail(function () {
                        $('#autocomplete-auth-failed').show();
                        $('#autocomplete-auth-successful').hide();
                    });
                    promise.always(function () {
                        var $progressImage = $('img.execution-progress');
                        $progressImage.hide();
                    });
               // }
    
                function initializeAutocomplete() {
                    $('#autocomplete-testfield').autocomplete({
                        source: function (request, response) {
                            var promise = $.ajax(autocompleteurl, {
                                data: {
                                    token: autocompleteToken,
                                    term: request.term,
                                    idx: 'rawqueries',
                                    filters: JSON.stringify([
                                        {
                                            name: 'custid',
                                            values: [autocompleteCustId]
                                        }
                                    ])
                                }
                            });
            
                            promise.done(function (data) {
                                var terms = data.terms.map(function (wrapper) {
                                    return wrapper.term;
                                });
                                response(terms);
                            });
                        }
                    });
                }
                //boilerplate ends here
                window.authAutocomplete = authAutocomplete;
                window.initializeAutocomplete = initializeAutocomplete;
            });

            



           
        }
    }
})(jQuery, Drupal, drupalSettings);


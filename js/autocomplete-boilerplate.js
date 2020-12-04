(function() {
    var autocompleteToken;
    var autocompleteCustId;
    var autocompleteurl;
    var retryTime = 900 * 1000; // converted to seconds
    var beforeTimeoutMultiplier = (3 / 4);

    // Called when "Send" button is clicked. Makes call to authenticate
    // with Authentication Serice using UID Auth method.
    function authAutocomplete() {
        var promise = $.ajax('../authservice/rest/uidauth',
            {
                contentType: 'application/json',
                dataType: 'json',
                type: 'post',
                data: JSON.stringify({
                    UserId: $('#autocomplete-userid').val(),
                    Password: $('#autocomplete-password').val(),
                    Options: [
                        'autocomplete'
                    ],
                    InterfaceId: "WSapi"
                })
            });

        promise.done(function (data) {
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
    }

    // Called when Autocomplete sample app is selected to display.
    // Initialized jQuery UI Autocomplete on the "Field with Autocomplete".
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

    window.authAutocomplete = authAutocomplete;
    window.initializeAutocomplete = initializeAutocomplete;

})();

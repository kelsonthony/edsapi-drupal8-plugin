(function ($, Drupal, drupalSettings, doc) {
  "use strict";

  Drupal.behaviors.EBSCOAutocompleteDrupal = {
    attach: function authAutocomplete(context, settings) {
      $("#lookfor").once("EBSCOAutocompleteDrupal");

      var $lookfor = doc.querySelector('[id="lookfor"]');

      var $autocomplete = doc.querySelector('[data-js="autocomplete"]');

      $lookfor.addEventListener("keydown", requestAutocomplete, false);

      function requestAutocomplete(event) {
        $(doc).ready(function () {
          console.log("ready!");

          console.log(
            "drupalSettings.autocomplete.authenticationToken: ",
            drupalSettings.autocomplete.authenticationToken
          );
          console.log(
            "drupalSettings.autocomplete.authenticationTimeout: ",
            drupalSettings.autocomplete.authenticationTimeout
          );
          console.log(
            "drupalSettings.autocomplete.autocompleteUrl: ",
            drupalSettings.autocomplete.autocompleteUrl
          );
          console.log(
            "drupalSettings.autocomplete.autocompleteToken: ",
            drupalSettings.autocomplete.autocompleteToken
          );
          console.log(
            "drupalSettings.autocomplete.autocompleteCustId: ",
            drupalSettings.autocomplete.autocompleteCustId
          );

          var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
          var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
          var autocompleteCustId =
            drupalSettings.autocomplete.autocompleteCustId;
          var searchvalue = event.target.value;

          $.ajax({
            type: "get",
            url: autocompleteurl,
            data: {
              token: autocompleteToken,
              term: searchvalue,
              idx: "rawqueries",
              filters: JSON.stringify([
                {
                  name: "custid",
                  values: [autocompleteCustId],
                },
              ]),
            },
            beforeSend: function () {
              $("#autocomplete").html("Termos populares...");
            },
          })
            .done(function (data) {
              //$("#lookfor").html(data);
              console.log("data:", data);
              var terms = data.terms.map(function (wrapper) {
                //console.log('terms: ', terms);
                console.log("wrapper.term: ", wrapper.term);
                //console.log('lookfor inside map: ', $lookfor);
                //$("#lookfor").textContent = wrapper.term;
                //$lookfor[0].textContent = wrapper.term;
                var style =
                  '<li class="autocomplete-list">' + wrapper.term + "</li>";
                return style;
                //return wrapper.term;
              });
              $("#autocomplete").html(terms);
              //response(terms);
              // var myResponse = new Response(wrapper.term);
              // console.log( 'myResponse', myResponse);
            })
            .fail(function (jqXHR, textStatus, msg) {
              alert(msg);
            });
        });
      }
    },
  };
})(jQuery, Drupal, drupalSettings, document);

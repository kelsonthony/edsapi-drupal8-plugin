(function ($, Drupal, drupalSettings, doc) {
    "use strict";
  
      Drupal.behaviors.EBSCOAutocompleteDrupal = {
          attach: function authAutocomplete(context, settings) {
          
          $("#lookfor").once("EBSCOAutocompleteDrupal");
  
          var $lookfor = doc.querySelector('[id="lookfor"]');
  
          $lookfor.addEventListener("keydown", requestAutocomplete, false);
  
          function requestAutocomplete(event) {
  
              $(doc).ready(function () {
  
              console.log("ready!");
              console.log($lookfor);
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
                  $("#lookfor").html("ENVIANDO...");
                  },
              })
              .done(function (msg) {
                  $("#lookfor").html(msg);
              })
              .fail(function (jqXHR, textStatus, msg) {
                  alert(msg);
              });
  
              // function startAutocomplete() {
  
           
              //     source = function (request, response){
              //         var promise = $.ajax({
              //                 type: "get",
              //                 url: autocompleteurl,
              //                 data: {
              //                 token: autocompleteToken,
              //                 term: request.term,
              //                 idx: "rawqueries",
              //                 filters: JSON.stringify([
              //                     {
              //                     name: "custid",
              //                     values: [autocompleteCustId],
              //                     },
              //                 ]),
              //                 }
                              
              //             });
              //             promise.done(function (data) {
              //                 var terms = data.terms.map(function (wrapper) {
              //                     return wrapper.term;
              //                 });
              //                 response(terms);
              //             });
              //     }
              // }
  
              //window.startAutocomplete = startAutocomplete;
              //window.authAutocomplete = authAutocomplete;
                  // .done(function (msg) {
                  //     $("#lookfor").html(msg);
                  //     })
                  //     .fail(function (jqXHR, textStatus, msg) {
                  //     alert(msg);
                  // });
                  
              });
          }
          },
      };
  })(jQuery, Drupal, drupalSettings, document);
  
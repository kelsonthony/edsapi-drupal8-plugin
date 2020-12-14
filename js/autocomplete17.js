(function ($, Drupal, drupalSettings, doc) {
    "use strict";

    Drupal.behaviors.EBSCOAutocompleteDrupal = {
        attach: function testAutocomplete(context, settings) {
            
            $(window).once().on('load scroll', function () {
                console.log('using behaviors');
                var esportes = ["Natação", "Futebol", "Vôlei", "Basquete"];

                console.log(esportes);
                var lookfor = $("#lookfor").autocomplete({
                    source: esportes
                });

                console.log(lookfor);
              });
        }
        // attach: function authAutocomplete(context, settings) {

        //     var autocomplete = Drupal.autocomplete;
        //     var esportes = ["Natação", "Futebol", "Vôlei", "Basquete"];
        //     var myAutoBox = $("#lookfor").autocomplete({
        //       select: function (event, ui) {
        //         console.log(event);
        //         console.log(ui);
        //         source: esportes;
                
        //       },
        //     });

        //     // $(function() {
        //     //     var esportes = [
        //     //       "Natação",
        //     //       "Futebol",
        //     //       "Vôlei",
        //     //       "Basquete"
        //     //     ];
        //     //     $("#esporte" ).autocomplete({
        //     //       source: esportes
        //     //     });
        //     //   });
            
        //     $("#lookfor").once("EBSCOAutocompleteDrupal");

        //     var $lookfor = doc.querySelector('[id="lookfor"]');

        //     var $autocomplete = doc.querySelector('[data-js="autocomplete"]');

        //     $lookfor.addEventListener("keydown", requestAutocomplete, false);

        //     function requestAutocomplete(event) {

        //         $(doc).ready(function () {
        //         console.log("ready!");

        //         console.log(".authenticationToken: ", drupalSettings.autocomplete.authenticationToken);
        //         console.log(".authenticationTimeout: ", drupalSettings.autocomplete.authenticationTimeout);
        //         console.log(".autocompleteUrl: ", drupalSettings.autocomplete.autocompleteUrl);
        //         console.log(".autocompleteToken: ", drupalSettings.autocomplete.autocompleteToken);
        //         console.log(".autocompleteCustId: ", drupalSettings.autocomplete.autocompleteCustId);

        //         var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
        //         var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
        //         var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
        //         var searchvalue = event.target.value;

        //         $.ajax({
        //             type: "get",
        //             url: autocompleteurl,
        //             data: {
        //             token: autocompleteToken,
        //             term: searchvalue,
        //             idx: "rawqueries",
        //             filters: JSON.stringify([
        //                 {
        //                 name: "custid",
        //                 values: [autocompleteCustId],
        //                 },
        //             ]),
        //             },
        //             beforeSend: function () {
        //             //$("#autocomplete").html("Termos populares...");
        //             },
        //         })
        //         .done(startAutocomplete)
        //         .fail(function (jqXHR, textStatus, msg) {
        //             alert(msg);
        //         });

        //         function startAutocomplete(data) {
        //             //$("#lookfor").html(data);
        //             console.log("data:", data.terms);
        //             var terms = data.terms.map(startTerm);
        //             //$("#autocomplete").html(terms);
        //             //$autocomplete.addEventListener('keydown', handleAutoComplete, false);
        //             //response(terms);
        //             // var myResponse = new Response(wrapper.term);
        //             // console.log( 'myResponse', myResponse);
        //             // function handleAutoComplete() {
        //             //     console.log(terms);
        //             // }
        //             //autocompleteStart(doc.getElementById("lookfor"), countries);
        //             console.log(terms);

        //             //$autocomplete.textContent = terms;

        //             // $(doc).ready(function () {
        //             //     $("#autocomplete").html({
        //             //         source: terms
        //             //     });
        //             // });

                    

        //         }
                
        //         function startTerm (wrapper) {
        //             //console.log('terms: ', terms);
        //             console.log("wrapper.term: ", wrapper.term);


        //             //console.log('lookfor inside map: ', $lookfor);
        //             //$("#lookfor").textContent = wrapper.term;
        //             //$lookfor[0].textContent = wrapper.term;
        //             // var style = '<li class="autocomplete-list">' + wrapper.term + "</li>";
        //             // return style;
        //             return wrapper.term;
        //         }

                


        //         });
        //     }
        // },
        };
})(jQuery, Drupal, drupalSettings, document);

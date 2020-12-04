(function (win, doc) {
    "use strict";

    function colocaScript() {
        var scriptJquery = document.createElement('script')
        scriptJquery.type = 'text/javascript';
        scriptJquery.src = "http://code.jquery.com/jquery-1.10.2.min.js";
        scriptJquery.async = true;
        headHTML = document.querySelector('[id="lookfor"]');
        headHTML.appendChild(scriptJquery);
    }
    colocaScript();
    window.onload = function () {
        $(document).ready(function () {
            alert("Ola Mundo");
        })
    }

    //jQuery('#lookfor').load('../lib/EBSCOAPI.php?autocompleteToken=new_value');

//   var autocompleteToken = "ARBh639WDsSKnhd5jpw8qwv/zAfaUVDiMDFCV264nVX54pPP/jEEQcnQb6+k2h8v1G0=";
//    var autocompleteurl = "https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete";
//    var autocompleteCustId = "kelanthony";

    //console.log(autocompleteToken);

    function initializeAutocomplete() {
        jQuery(doc).ready(function() {
            const $lookfor = doc.querySelector('[id="lookfor"]');

            console.log($lookfor);

            $lookfor.addEventListener('keydown', requestAutocomplete, false);

            function requestAutocomplete(event){

                var autocompleteToken = "ARBh639WDsSKnhd5jpw8qwv/zAfaUVDiMDFCV264nVX54pPP/jEEQcnQb6+k2h8v1G0=";
                var autocompleteurl = "https://global.ac.ebsco-content.com/autocomplete/rest/autoComplete";
                var autocompleteCustId = "kelanthony";

                const keyName = event.key;
                console.log('Hello keydown', keyName);

              // const bodycall = function(req, res){
                $.ajax({
                    url: autocompleteurl,
                    type : 'get',
                    data: {
                        token: autocompleteToken,
                        term: event.target.value,
                        idx: "rawqueries",
                        filters: JSON.stringify([{
                            name: "custid",
                            values: [autocompleteCustId]
                            },
                        ]),
                    },
                    beforeSend : function(){
                        $("#resultado").html("ENVIANDO...");
                   }
                    
                })
                .done(function(msg){
                    $("#resultado").html(msg);
               })
               .fail(function(jqXHR, textStatus, msg){
                    alert(msg);
               });
                //console.log(promise);
              // },
            
            }

            // $lookfor.({
            //     source: function (req, res) {
            //         const promise = $.ajax(autocompleteurl, {
            //             data: {
            //                 token: autocompleteToken,
            //                 term: req.term,
            //                 idx: "rawqueries",
            //                 filters: JSON.stringify([
            //                 {
            //                     name: "custid",
            //                     values: [autocompleteCustId],
            //                 },
            //                 ]),
            //             },
            //         });

            //         promise.done(function(data) {
            //             var terms = data.terms.map(function (wrapper) {
            //                 return wrapper.term;
            //             });
            //             res(terms);
            //         });
            //     },
            // })
        });
        
        // jQuery("#lookfor").autocomplete({
        // source: function (request, response) {
        //     var promise = $.ajax(autocompleteurl, {
        //     data: {
        //         token: autocompleteToken,
        //         term: request.term,
        //         idx: "rawqueries",
        //         filters: JSON.stringify([
        //         {
        //             name: "custid",
        //             values: [autocompleteCustId],
        //         },
        //         ]),
        //     },
        //     });

        //     promise.done(function (data) {
        //     var terms = data.terms.map(function (wrapper) {
        //         return wrapper.term;
        //     });
        //     response(terms);
        //     });
        // },
        // });
    }
    jQuery(doc).ready(function () {
        initializeAutocomplete();
    });

})(window, document);

(function ($, Drupal, drupalSettings, doc) {
    "use strict";

    Drupal.behaviors.EBSCOAutocompleteDrupal = {
        attach: function authAutocomplete(context, settings) {

            $(doc).ready(function() {

                console.log("hello autocomplete 14");

                 /**
             * test autocomplete starts here 
             */
                function autocompleteStart(inp, arr) {

                    
                    var currentFocus;
                    // var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
                    // var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
                    // var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
                    // var searchvalue = event.target.value;

                    // console.log(autocompleteToken);
                    // console.log(autocompleteurl);
                    // console.log(autocompleteCustId);
                    // console.log(searchvalue);

                    // $.ajax({
                    //     type: "get",
                    //     url: autocompleteurl,
                    //     data: {
                    //     token: autocompleteToken,
                    //     term: searchvalue,
                    //     idx: "rawqueries",
                    //     filters: JSON.stringify([
                    //         {
                    //         name: "custid",
                    //         values: [autocompleteCustId],
                    //         },
                    //     ]),
                    //     },
                    //     beforeSend: function () {
                    //     //$("#autocomplete").html("Termos populares...");
                    //     },
                    // })
                    
                    inp.addEventListener("input", function (e) {
                        var a, b, i, val = this.value;
                    
                        closeAllLists();
                        if (!val) { 
                            return false;
                        }
        
                        currentFocus = -1;
                        
                        a = document.createElement("ul");
                        a.setAttribute("id", this.id + "autocomplete-list");
                        a.setAttribute("class", "autocomplete-items");
                        
                        this.parentNode.appendChild(a);
                        
                        for (i = 0; i < arr.length; i++) {
                            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                                
                                b = document.createElement("li");
                                //b.setAttribute("class", "autocomplete-list-item");
                                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                                b.innerHTML += arr[i].substr(val.length);
                                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                                b.addEventListener("click", function (e) {
                                    inp.value = this.getElementsByTagName("input")[0].value;
                                    closeAllLists();
                                });
                                a.appendChild(b);
        
                            }
                        }
                    });
                    inp.addEventListener("keydown", keyBoardCustom, false);

                    function keyBoardCustom(e) {

                        var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
                        var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
                        var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
                        var searchvalue = e.target.value;

                        var x = document.getElementById(this.id + "autocomplete-list");

                        console.log(autocompleteToken);
                        console.log(autocompleteurl);
                        console.log(autocompleteCustId);
                        console.log(searchvalue);


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
                            //$("#autocomplete").html("Termos populares...");
                            },
                        })
                        .done(function (data) {
                            //$("#lookfor").html(data);
                            console.log('data:', data);
                            var terms = data.terms.map(function(wrapper) {
                                //console.log('terms: ', terms);
                                console.log('wrapper.term: ', wrapper.term);
                                //console.log('lookfor inside map: ', $lookfor);
                                //$("#lookfor").textContent = wrapper.term;
                                //$lookfor[0].textContent = wrapper.term;
                                var style = '<li class="autocomplete-list">' + wrapper.term + '</li>';
                                return style;
                                //return wrapper.term;
                            });
                            //$("#autocomplete").html(terms);
                            autocompleteStart(document.getElementById("lookfor"), terms);
                            //response(terms);
                            // var myResponse = new Response(wrapper.term);
                            // console.log( 'myResponse', myResponse);
                        })
                        .fail(function (jqXHR, textStatus, msg) {
                            alert(msg);
                        });
                        
                        if (x) x = x.getElementsByTagName("li");
                        if (e.keyCode == 40) {
                            currentFocus++;
                            addActive(x);
                        } else if (e.keyCode == 38) {
                            currentFocus--;
                            addActive(x);
                        } else if (e.keyCode == 13) {
                            e.preventDefault();
                            if (currentFocus > -1) {
                                if (x) x[currentFocus].click();
                            }
                        }
                    }

                    function addActive(x) {
                        if (!x) return false;
                        removeActive(x);
                        if (currentFocus >= x.length) currentFocus = 0;
                        if (currentFocus < 0) currentFocus = (x.length - 1);
                        x[currentFocus].classList.add("autocomplete-active");
                    }
                    function removeActive(x) {
                        for (var i = 0; i < x.length; i++) {
                            x[i].classList.remove("autocomplete-active");
                        }
                    }
                    function closeAllLists(elmnt) {

                        var x = document.getElementsByClassName("autocomplete-items");
                        for (var i = 0; i < x.length; i++) {
                            if (elmnt != x[i] && elmnt != inp) {
                                x[i].parentNode.removeChild(x[i]);
                            }
                        }
                    }
                    document.addEventListener("click", function (e) {
                        closeAllLists(e.target);
                    });
                }

                var countries = ["Java", "Jamaica", "Joinville"];

                console.log('countries: ', countries);
        
                //autocompleteStart(document.getElementById("lookfor"), countries);
            /**
             * test autocomplete ends here 
             */

            });

        },
    };
    })(jQuery, Drupal, drupalSettings, document);

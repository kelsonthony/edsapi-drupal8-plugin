(function ($, Drupal, drupalSettings, win, doc) {
    "use strict";

    Drupal.behaviors.EBSCOAutocompleteDrupal = {
        attach: function authAutocomplete(context, settings) {

            

            $("#lookfor").once("EBSCOAutocompleteDrupal");

            var $lookfor = doc.querySelector('[id="lookfor"]');
    
            var $autocomplete = doc.querySelector('[data-js="autocomplete"]');
    
            $lookfor.addEventListener("keydown", requestAutocompleteInitial, false);

            function requestAutocompleteInitial(event) {

            

            $(doc).ready(function() {

                console.log("hello autocomplete 15");

                function requestAutocomplete() {

                    // var countries = ["Java", "Jamaica", "Joinville"];
                    // autocompleteStart(doc.getElementById("lookfor"), countries);
                    //autocompleteStart();
                    console.log(event);
                        var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
                        var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
                        var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
                        var searchvalue = event;

                       //console.log(e.target);
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
                            // var style = '<li class="autocomplete-list">' + wrapper.term + '</li>';
                            // return style;
                            return wrapper.term;
                            //return autocompleteStart(doc.getElementById("lookfor"), terms);
                        });
                        autocompleteStart(doc.getElementById("lookfor"), terms);
                        //$("#autocomplete").html(terms);
                        
                        //response(terms);
                        // var myResponse = new Response(wrapper.term);
                        // console.log( 'myResponse', myResponse);
                    })
                    .fail(function (jqXHR, textStatus, msg) {
                        alert(msg);
                    });
                }
            
                
                 /**
             * test autocomplete starts here 
             */
                function autocompleteStart(inp, arr) {
                    /*the autocomplete function takes two arguments,
                    the text field element and an array of possible autocompleted values:*/
                    var currentFocus;
                    /*execute a function when someone writes in the text field:*/
                    inp.addEventListener("input", function (e) {
                        var a, b, i, val = this.value;
                        /*close any already open lists of autocompleted values*/
                        closeAllLists();
                        if (!val) { 
                            return false;
                        }
        
                        currentFocus = -1;
                        /*create a DIV element that will contain the items (values):*/
                        a = doc.createElement("ul");
                        a.setAttribute("id", this.id + "autocomplete-list");
                        a.setAttribute("class", "autocomplete-items");
                        /*append the DIV element as a child of the autocomplete container:*/
                        this.parentNode.appendChild(a);
                        /*for each item in the array...*/
                        for (i = 0; i < arr.length; i++) {
                            /*check if the item starts with the same letters as the text field value:*/
                            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                                
                                /*create a DIV element for each matching element:*/
                                b = doc.createElement("li");
                                //b.setAttribute("class", "autocomplete-list-item");
                                /*make the matching letters bold:*/
                                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                                b.innerHTML += arr[i].substr(val.length);
                                /*insert a input field that will hold the current array item's value:*/
                                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                                /*execute a function when someone clicks on the item value (DIV element):*/
                                b.addEventListener("click", function (e) {
                                    /*insert the value for the autocomplete text field:*/
                                    inp.value = this.getElementsByTagName("input")[0].value;
                                    /*close the list of autocompleted values,
                                    or any other open lists of autocompleted values:*/
                                    closeAllLists();
                                });
                                a.appendChild(b);
        
                            }
                        }
                    });
                    /*execute a function presses a key on the keyboard:*/
                    inp.addEventListener("keydown", handleKeyDown, false);

                    function handleKeyDown(e) {


                        //console.log('handleKeyDown', e.target.form[1].value);
                        
                        
              


                        var x = doc.getElementById(this.id + "autocomplete-list");
                        if (x) x = x.getElementsByTagName("li");
                        if (e.keyCode == 40) {
                            /*If the arrow DOWN key is pressed,
                            increase the currentFocus variable:*/
                            currentFocus++;
                            /*and and make the current item more visible:*/
                            addActive(x);
                        } else if (e.keyCode == 38) { //up
                            /*If the arrow UP key is pressed,
                            decrease the currentFocus variable:*/
                            currentFocus--;
                            /*and and make the current item more visible:*/
                            addActive(x);
                        } else if (e.keyCode == 13) {
                            /*If the ENTER key is pressed, prevent the form from being submitted,*/
                            e.preventDefault();
                            if (currentFocus > -1) {
                                /*and simulate a click on the "active" item:*/
                                if (x) x[currentFocus].click();
                            }
                        }

                        

                    }

                    function addActive(x) {
                        /*a function to classify an item as "active":*/
                        if (!x) return false;
                        /*start by removing the "active" class on all items:*/
                        removeActive(x);
                        if (currentFocus >= x.length) currentFocus = 0;
                        if (currentFocus < 0) currentFocus = (x.length - 1);
                        /*add class "autocomplete-active":*/
                        x[currentFocus].classList.add("autocomplete-active");
                    }
                    function removeActive(x) {
                        /*a function to remove the "active" class from all autocomplete items:*/
                        for (var i = 0; i < x.length; i++) {
                            x[i].classList.remove("autocomplete-active");
                        }
                    }
                    function closeAllLists(elmnt) {
                        /*close all autocomplete lists in the doc,
                        except the one passed as an argument:*/
                        var x = doc.getElementsByClassName("autocomplete-items");
                        for (var i = 0; i < x.length; i++) {
                            if (elmnt != x[i] && elmnt != inp) {
                                x[i].parentNode.removeChild(x[i]);
                            }
                        }
                    }
                    /*execute a function when someone clicks in the doc:*/
                    doc.addEventListener("click", function (e) {
                        closeAllLists(e.target);
                    });
                }

                requestAutocomplete();
        
                /*An array containing all the country names in the world:*/
                // var countries = ["Java", "Jamaica", "Joinville"];
                // autocompleteStart(doc.getElementById("lookfor"), countries);
                //var result = data;

                //console.log(result);
        
                /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
                //autocompleteStart(doc.getElementById("lookfor"), countries);
            //    function requestAutocomplete() {
            //         console.log('teste requestAutocomplete');

                  
            //     autocompleteStart(doc.getElementById("lookfor"), terms);
            //             //$("#autocomplete").html(terms);
            //             //response(terms);
            //             // var myResponse = new Response(wrapper.term);
            //             // console.log( 'myResponse', myResponse);
                 
                    
            //     }
            //     requestAutocomplete();
            /**
             * test autocomplete ends here 
             */

            });
            }
            
        },
    };
    })(jQuery, Drupal, drupalSettings, window, document);

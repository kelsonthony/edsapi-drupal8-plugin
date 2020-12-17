(function ($, Drupal, drupalSettings, doc) {
    "use strict";

    Drupal.behaviors.EBSCOAutocompleteDrupal = {
        attach: function authAutocomplete(inp, arr) {
        
        
        console.log('hello ');
        var $lookfor = doc.getElementById("lookfor");
        var $autocomplete = doc.querySelector('[data-js="autocomplete"]');
        
        /*precisa ocorrer dentrado da função dos terms*/

            var currentFocus;
            inp.addEventListener("input", function (e) {
                var a, b, i, val = this.value;
                
                closeAllLists();
                if (!val) { 
                    return false;
                }

                currentFocus = -1;
                
                a = doc.createElement("ul");
                a.setAttribute("id", this.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                
                this.parentNode.appendChild(a);
                
                for (i = 0; i < arr.length; i++) {
                    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                        
                        
                        b = doc.createElement("li");
                        
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
            
          
            inp.addEventListener("keydown", keyBoard, false);
        
            function keyBoard(e) {
                console.log('inp 3', inp);

                var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
                var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
                var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
                var searchvalue = e.target.value;
                //inp = searchvalue;
                var searchData =  {
                    token: autocompleteToken,
                    term: searchvalue,
                    idx: "rawqueries",
                    filters: JSON.stringify([
                        {
                        name: "custid",
                        values: [autocompleteCustId],
                        },
                    ]),
                    }

                // console.log(autocompleteToken);
    
                $(doc).ready(function () {
                    $.ajax({
                        type: "get",
                        url: autocompleteurl,
                        data: searchData,
                        beforeSend: function () {
                        //$("#autocomplete").html("Termos populares...");
                        },
                    })
                    .done(startAutocomplete)
                    .fail(function (jqXHR, textStatus, msg) {
                        alert(msg);
                    });
                });
    
                var x = doc.getElementById(this.id + "autocomplete-list");
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
                var x = doc.getElementsByClassName("autocomplete-items");
                for (var i = 0; i < x.length; i++) {
                    if (elmnt != x[i] && elmnt != inp) {
                        x[i].parentNode.removeChild(x[i]);
                    }
                }
            }
            doc.addEventListener("click", function (e) {
                closeAllLists(e.target);
            });


      
            console.log("inp 1: ", inp);
            console.log("arr 1: ", arr);

            function startAutocomplete(data) {
                //$("#lookfor").html(data);
                
                console.log('Arguments', arguments[0].terms);
                console.log('This', this);
                console.log("data:", data);
                
                var words = ["Java", "Jeri", "Jurupeba"];
                
                
                var terms = data.terms.map(startTerm);
    
           
                console.log('terms', terms);
                // }
                //console.log('searchvalue???', searchvalue);
                arr = words;
                console.log('inp 2', inp);
                console.log("arr 2: ", arr);
                //$autocomplete.textContent = '<ul id="lookforautocomplete-list" class="autocomplete-items"><li class="autocomplete-list">' + terms + "</li></ul>";
                //terms.call();
                //var words = ["Java", "Jeri", "Jurupeba"];
                //callAutocomplete(doc.getElementById("lookfor"), terms);
                //$autocomplete.textContent = callAutocomplete($lookfor, terms);
                //test = callAutocomplete($lookfor, terms);
    
                //console.log('test', test);
                //callAutocomplete($lookfor, words);
                //authAutocomplete($lookfor, words);
                return terms;
                //return data;
    
            }
    
            
    
            // var terms = data.terms.map(startTerm);
           
    
            function startTerm (wrapper) {
                //console.log('terms: ', terms);
                console.log("wrapper.term: ", wrapper.term);
    
    
                //console.log('lookfor inside map: ', $lookfor);
                //$("#lookfor").textContent = wrapper.term;
                //$lookfor[0].textContent = wrapper.term;
                //var style = '<ul id="lookforautocomplete-list" class="autocomplete-items"><li class="autocomplete-list">' + wrapper.term + "</li></ul>";
                var result = wrapper.term;
                //return style;
                // $autocomplete.textContent = result;
                // callAutocomplete(doc.getElementById("lookfor"), result);
                
                return result;
            }
    

        /*precisa ocorrer dentrado da função dos terms*/

        },
        
    };
    
})(jQuery, Drupal, drupalSettings, document);

(function ($, Drupal, drupalSettings, doc) {
    "use strict";

    Drupal.behaviors.EBSCOAutocompleteDrupal = {
        attach: function authAutocomplete(context, settings) {
        console.log("hello autocomplete final");

        var $lookfor = doc.getElementById("lookfor");
        var currentFocus;

        context.addEventListener("keydown", keyBoard, false);

        function keyBoard(e) {
            var autocompleteToken = drupalSettings.autocomplete.autocompleteToken;
            var autocompleteurl = drupalSettings.autocomplete.autocompleteUrl;
            var autocompleteCustId = drupalSettings.autocomplete.autocompleteCustId;
            var searchvalue = e.target.value;
            var searchData = {
                token: autocompleteToken,
                term: searchvalue,
                idx: "rawqueries",
                filters: JSON.stringify([{
                    name: "custid",
                    values: [autocompleteCustId],
                    },
                ]),
            };

            $(doc).ready(function () {
            $.ajax({
                type: "get",
                url: autocompleteurl,
                data: searchData
            })
                .done(startAutocomplete)
                .fail(function (jqXHR, textStatus, msg) {
                    console.log('Error to call autocomplete.');
                });
            });

            
            var autocompleteList = doc.getElementById("lookforautocomplete-list");
            if (autocompleteList)
                autocompleteList = autocompleteList.getElementsByTagName("li");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(autocompleteList);
            }
            else if (e.keyCode == 38) {
                //up
                currentFocus--;
                addActive(autocompleteList);
            }
            else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (autocompleteList) autocompleteList[currentFocus].click();
                }
            }
            
            function addActive(autocompleteList) {
                if (!autocompleteList) return false;
                    removeActive(autocompleteList);
                if (currentFocus >= autocompleteList.length) currentFocus = 0;
                if (currentFocus < 0) currentFocus = autocompleteList.length - 1;
                autocompleteList[currentFocus].classList.add("autocomplete-active");
            }
            function removeActive(autocompleteList) {
                for (var i = 0; i < autocompleteList.length; i++) {
                    autocompleteList[i].classList.remove("autocomplete-active");
                }
            }
            doc.addEventListener("click", function(e) {
                closeAllLists(e.target);
                //console.log('meu clique: ', e.target);
            });
        }

        function closeAllLists(elmnt, inp) {
            var autocompleteList = doc.getElementsByClassName(
                "autocomplete-items"
            );
            for (var i = 0; i < autocompleteList.length; i++) {
                if (elmnt != autocompleteList[i] && elmnt != inp) {
                    autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
                }
            }
        }

        function startAutocomplete(data) {
            
            console.log("Arguments", arguments[0].terms);
            console.log("This", this);
            console.log("data:", data);

            var terms = data.terms.map(startTerm);

            
            console.log(terms);
            
            /**External autocomplete starts here */
            function autocomplete(inp, arr) {
                var currentFocus;
                inp.addEventListener("input", function(e) {
                    var divCreate,
                    b,
                    i,
                    fieldVal = this.value;
                    closeAllLists();
                    if (!fieldVal) {
                        return false;
                    }
                    currentFocus = -1;
                    divCreate = doc.createElement("ul");
                    divCreate.setAttribute("id", this.id + "autocomplete-list");
                    divCreate.setAttribute("class", "autocomplete-items");
                    this.parentNode.appendChild(divCreate);
                    for (i = 0; i <arr.length; i++) {
                        if ( arr[i].substr(0, fieldVal.length).toUpperCase() == fieldVal.toUpperCase() ) {
                            b = doc.createElement("li");
                            b.innerHTML = "<strong>" + arr[i].substr(0, fieldVal.length) + "</strong>";
                            b.innerHTML += arr[i].substr(fieldVal.length);
                            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                            b.addEventListener("click", function(e) {
                            inp.value = this.getElementsByTagName("input")[0].value;
                            closeAllLists();
                            });
                            divCreate.appendChild(b);
                        }
                    }
                });

            }
                console.log('inside of the function: ', terms);
                var animals = ["giraffe","tiger", "lion", "dog","cow","bull","cat","cheetah"];
                autocomplete($lookfor, terms);
            /**External autocomplete ends here */
            
            return terms;
            
        }

        function startTerm(wrapper) {
            console.log("wrapper.term: ", wrapper.term);

            var result = wrapper.term;
            return result;
        }
        },
    };
})(jQuery, Drupal, drupalSettings, document);

<?php


if(isset($_SESSION['autocompleteToken']) && !empty($_SESSION['autocompleteToken']) && isset($_SESSION['autocompleteUrl']) && !empty($_SESSION['autocompleteUrl']) && isset($_SESSION['autocompleteCustId']) && !empty($_SESSION['autocompleteCustId'])){
?>

  <script>
        var val = <?php echo json_encode($var) ?>;
        var autocompleteToken = '<?php  echo $_SESSION['autocompleteToken']; ?>';
        var autocompleteurl = '<?php echo $_SESSION['autocompleteUrl'];  ?>';
        var autocompleteCustId = '<?php echo $_SESSION['autocompleteCustId'];  ?>';

        console.log(autocompleteToken);
       
        function initializeAutocomplete() {
        $('#lookfor').autocomplete({
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
            },
            select: function(event, ui) { 
                $("#lookfor").val(ui.item.label);
                $("#ebsco-basic-search-submit").submit(); }
        });
        }
        $(document).ready(function() {
        initializeAutocomplete();
        });
  
        </script>
<?php
}
?>
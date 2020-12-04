try {
  jQuery("#lookfor").keydown(function (event) {
    //var keyName = event.key;
    var searchvalue = event.target.value;
    //console.log('Hello keydown', keyName);
    console.log("Searchvalue", searchvalue);

    

  });

  $.ajax({
    url: "cadastrar.php",
    type: "post",
    data: {
        nome: "Maria Fernanda",
        salario: "3500",
    },
    beforeSend: function () {
        $("#resultado").html("ENVIANDO...");
    },
    })
    .done(function (msg) {
        $("#resultado").html(msg);
    })
    .fail(function (jqXHR, textStatus, msg) {
        alert(msg);
});
} catch (error) {
  console.log(error);
}

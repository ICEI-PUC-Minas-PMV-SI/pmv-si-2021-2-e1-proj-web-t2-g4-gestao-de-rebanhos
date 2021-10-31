function save(){
    var spinner = document.querySelector("#spinner");
    var table = document.querySelector("#table-response");
    var total = document.querySelector("#total");
    spinner.style.display = 'block';
    $( "#btn-save" ).prop( "disabled", true );
    $("#btn-save").text("Salvando");
    setTimeout(function(){  setDisplay() }, 500);
}
function setDisplay(){
    var spinner = document.querySelector("#spinner");
    var table = document.querySelector("#table-response");
    spinner.style.display = 'none';
    table.style.display = 'block';
    $("#total").text("3");
    $("#btn-save").text("Salvar");
    $( "#btn-save" ).prop( "disabled", false );

}
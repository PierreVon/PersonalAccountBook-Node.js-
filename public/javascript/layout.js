$(document).ready(function(){
    $('#form').find('input[type=checkbox]').bind('click', function(){
        $('#form').find('input[type=checkbox]').not(this).attr("checked", false);
    });
});
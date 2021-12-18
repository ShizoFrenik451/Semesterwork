$(function (){
    function onPost(){
        $.ajax({
            type: "POST",
            url: "/registration?handler=AddUser",
            headers: {
                "XSRF-TOKEN": $('input:hidden[name="__RequestVerificationToken"]').val()
            },
            data: $('#registration-form').serialize(),
            success: function() {
                window.location.replace("/index");
            }
        });
    }
});
    
   
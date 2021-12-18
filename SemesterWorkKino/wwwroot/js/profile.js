$(function (){    
    
    $('#edit-btn').click(function (){
        $.ajax({
            type: "POST",
            url: "/profile?handler=ProfileChanged",
            headers: {
                "XSRF-TOKEN": $('input:hidden[name="__RequestVerificationToken"]').val()
            },
            data: $('#profile-edit-form').serialize(),
            success: function() {
                alert("ok")
            }
        });
    });    
    
    $('#logout-btn').click(function (){
        $.ajax({
            type: "GET",
            url: "/logout?handler=Logout",
            headers: {
                "XSRF-TOKEN": $('input:hidden[name="__RequestVerificationToken"]').val()
            },
            success: function() {
                window.location.replace("/index");
            }
        });
    });
       
    $("#get-profile-btn").click(function (){
        $.ajax({
            type: "GET",
            url: "/profile?handler=UserProfile",
            headers: {
                "XSRF-TOKEN": $('input:hidden[name="__RequestVerificationToken"]').val()
            },
            success: function(data) {
                var profileData = JSON.parse(data);
                alert(profileData.City);
            }
        });
    });

    $('#photo').on('change' ,function (){
        var files = $('#photo').prop("files");
        var url = "/profile?handler=UploadPhoto";
        formData = new FormData();
        formData.append("uploadedPhoto", files[0]);

       $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
           success: function (data){
                $('#userPhoto').attr("src", data)
           }
        });
    });
});
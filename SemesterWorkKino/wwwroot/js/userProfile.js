$.ajax({
    type: "GET",
    url: "/userprofile?handler=Profile",
    success: function(data) {
        var parsedData = JSON.parse(data);
        $('#user-email-holder').text(parsedData.Email)
        $('#user-username-holder').text(parsedData.Username)
        $('#user-birthday-holder').text(parsedData.Birthday)
        $('#user-city-holder').text(parsedData.City)
        $('#user-description-holder').text(parsedData.Description)
        $('#user-photo-holder').attr("src", parsedData.PhotoPath)
        
    }
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
})

$('#add-btn').click(function (){
    window.location.replace("/addanimeitem");
})
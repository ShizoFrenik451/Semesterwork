

$('#add-item-btn').click(function (){
    var name = $('#name-input')
    if (itemAlreadyExist(name)){
        alert("item already exist")
        retur
    }
    $.ajax({
        type: "POST",
        url: "/addanimeitem?handler=AddItem",
        headers: {
            "XSRF-TOKEN": $('input:hidden[name="__RequestVerificationToken"]').val()
        },
        data: $('#add-item-form').serialize(),
        success: function(data) {
            uloadImage(data)
            window.location.replace("/");
        }
    });
});


function uloadImage(itemId){
    var files = $('#file').prop("files");
    var url = "/addanimeitem?handler=UploadPhoto";
    formData = new FormData();
    formData.append("uploadedFile", files[0]);
    formData.append('itemId', itemId.toString())

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
}

$('#test-btn').click(function (){
    var items
    $.ajax({
        type: "GET",
        url: "/addanimeitem?handler=AnimeItems",
        success: function(data) {
            var parsedData = JSON.parse(data)
            items = parsedData.items
            items.forEach(i => alert(i))
        }
    });
    items.forEach(i => function (){
        if (i.Name == itemName){
            return true
        }
    })
})

function itemAlreadyExist(itemName){
    var items
    var result = false
    $.ajax({
        type: "GET",
        url: "/addanimeitem?handler=AnimeItems",
        success: function(data) {
            var parsedData = JSON.parse(data)
            items = parsedData.items
            items.forEach(item => function (){
                if (items.localeCompare(itemName) == 0){
                    result = true
                }
            })
        }
    });
    
    return result
}
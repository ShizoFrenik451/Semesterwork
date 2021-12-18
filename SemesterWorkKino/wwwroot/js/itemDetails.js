$.ajax({
    type: 'GET',
    url: '/itemdetail?handler=ItemDetails',
    success: function (data){
        var parsedData = JSON.parse(data)
        insertIntoFields(parsedData)
    }
});

function insertIntoFields(item){
    var pName = document.createElement('p')
    pName.innerHTML = "Название: " + item.Name
    var pDescription = document.createElement('p')
    pDescription.innerHTML = "Описание: " + item.Description
    var pYear = document.createElement('p')
    pYear.innerHTML = "Год выпуска: " + item.Year
    var pGenre = document.createElement('p')
    pGenre.innerHTML = "Жанр: " + item.Genre
    var pDirector = document.createElement('p')
    pDirector.innerHTML = "Режисер: " + item.Director
    var pSeriesCount = document.createElement('p')
    pSeriesCount.innerHTML = "Число серий: " + item.SeriesCount
    var img = document.getElementById('for-userPhoto')
    img.setAttribute('src', item.PosterPath)
    
    var holder = document.getElementById('item-holder')
    holder.appendChild(pName)
    holder.appendChild(pDescription)
    holder.appendChild(pYear)
    holder.appendChild(pGenre)
    holder.appendChild(pDirector)
    holder.appendChild(pSeriesCount)
    
}
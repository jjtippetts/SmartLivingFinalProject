var userSearchedFood = ''

// var currentSearchPage = {
//     page : 0
// }

var searchFoodPageInfo = {
    totalPages : 0,
    currentPage : 0
}

$(document).on('submit', '#findFoodByName', function(event){
    event.preventDefault()
    userSearchedFood = $("#search-food-name").val()
    searchFoodPageInfo.currentPage = 0
    $.getJSON("/food/" + userSearchedFood,
        {
            page : searchFoodPageInfo.currentPage = 0
        },
        function (results) {
            searchFoodPageInfo['totalPages'] = results.totalPages
            var list = $("#foods-found div")
            //Remove previous queries if any
            list.html("")
            $.each(results.content, function (index) {
                list.append("<a data-food-id='" + this.id + "' form='add-food-to-meal' class='list-group-item list-group-item-action food-found btn'>" +
                    "<h5 class='text-primary'>" +
                    "<span class = 'food-name-found'>" + this.name + "</span>" +
                    "</h5>" +
                    "Calories: " +
                    "<span class = 'food-calories-found'>" + this.calories + "</span>" +
                    " &#x25CF Carbs: " +
                    "<span class = 'food-carbs-found'>" + this.carbohydrates + "</span>" +
                    " &#x25CF Fat: " +
                    "<span class = 'food-fat-found'>" + this.fat + "</span>" +
                    " &#x25CF Protein: " +
                    "<span class = 'food-protein-found'>" + this.protein + "</span>" +
                    "</a>")
            })
            $("#search-food-name").val('')
            var loadFoods = "<form id='load-foods-form' class='py-2'><button class='btn bg-transparent btn-sm' type='submit'>Load More</button></form>"
            $("#load-foods").html(loadFoods)
            searchFoodPageInfo['currentPage'] += 1
        }).fail(function () {
        alert("ERROR");
    });


});

$(document).on('submit','#load-foods-form', function(event){
    event.preventDefault()
    if(searchFoodPageInfo['currentPage'] === searchFoodPageInfo['totalPages']){
        console.log("Reached end of results")
        $("#load-foods").html("<p class='mb-0 p-2'>End of Results</p>")
    }else{
        $.getJSON("/food/" + userSearchedFood,
            {
                page : searchFoodPageInfo['currentPage']
            },
            function(results) {
                searchFoodPageInfo['currentPage'] += 1

                var list = $("#foods-found div")
                //Remove previous queries if any
                $.each(results.content, function (index) {
                    list.append("<a data-food-id='" + this.id + "' form='add-food-to-meal' class='list-group-item list-group-item-action food-found btn'>" +
                        "<h5 class='text-primary'>" +
                        "<span class = 'food-name-found'>" + this.name + "</span>" +
                        "</h5>" +
                        "Calories: " +
                        "<span class = 'food-calories-found'>" + this.calories + "</span>" +
                        " &#x25CF Carbs: " +
                        "<span class = 'food-carbs-found'>" + this.carbohydrates + "</span>" +
                        " &#x25CF Fat: " +
                        "<span class = 'food-fat-found'>" + this.fat + "</span>" +
                        " &#x25CF Protein: " +
                        "<span class = 'food-protein-found'>" + this.protein + "</span>" +
                        "</a>")
                })
            }
        )
    }
})
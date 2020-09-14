var counter = 0

var mealDictionary = {}

var mealNutrientTotals = {}

var dietId

var newDiet = {}

var newDietBefore = {}

function updateGraph(){
    $(".meal-name-row").each(function(index){
        console.log($(this).children())
    })
}

// Calculates the sum of all the nutrients in each meal by traversin the DOM
function calculateTotalSum() {
    var totals = $(".sum")

    for(var i = 2; i < 6; ++i){
        var sum = 0;
        $(totals).each(function(index){
        var rowItems = totals[index].children
        sum += parseInt(rowItems[i].textContent)
        })
        $("#nutrient-totals").children().eq(i).text(sum)
    }
}

// Calculates the sum of nutrients by traversing the DOM
function calculateSum(table) {
    //NEED TO CHANGE TO GET BY CLASS
    var columns = $(table).find("th")
    var rows = $(table).find("tbody").children()
    for (var i = 2; i < columns.length - 1; ++i) {
        var sum = 0
        for (var o = 0; o < rows.length - 2; ++o) {
            var rowItems = rows[o].children
            sum += parseInt(rowItems[i].textContent)
        }
        $(table).find("tr.sum").children().eq(i).text(sum)
        //document.getElementById("sum").children[i].textContent = sum
        // $('#sum').children()[i].textContent(sum)
    }
}

// Injected Form to create meal after creating a diet plan
var addMealTable =
    "<table class=\"table table-striped meal\">\n" +
    "  <thead>\n" +
    "<tr class=\"meal-name-row table-primary\" id=\"mealHeader\">\n" +
    "      <th colspan=\"2\">\n" +
    "        <form class='create-meal'>" +
    "          <div class='form-group row mb-0'>" +
    "          <div class='col-1'>" +
    "            <button class=\"btn btn-large btn-primary\" type=\"submit\">\n" +
    "              <i class=\"fas fa-plus\"></i>\n" +
    "            </button>\n" +
    "          </div>"+
    "          <label for=\"mealName\">Add a meal</label>\n" +
    "          <div class='col-6'>" +
    "          <input class=\"form-control\" id=\"mealName\" placeholder='Meal Name' type=\"text\"name=\"name\">\n"  +
    "          </div>"+
    "          </div>" +
    "        </form>" +
    "      </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "</table> "

//Nutrient table row headers
nurtientHeaders =
    "<tr class=\"nutrient-info\">\n" +
    "  <th scope=\"col\" style='width: 10%'></th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Name</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Calories</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Carbohydrates</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Fat</th>\n" +
    "  <th scope=\"col\" style='width: 18%'>Protein</th>\n" +
    "</tr>\n"

//Form for adding a food to a meal
addFoodBody =
    "<tbody class='sortable'>\n" +
    "  <tr class=\"sortDisabled\">\n" +
    "        <td>\n" +
    "    <form data-meal-name='' class=\"addFoodToDiet\">\n" +
    "          <input class='meal-id' name='meal-id' type='hidden'>" +
    "          <button class=\"btn btn-primary btn-sm\" type=\"submit\">\n" +
    "            <i class=\"fas fa-plus\"></i>\n" +
    "          </button>\n" +
    "    </form>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"foodName\"></label>\n" +
    "          <input\n" +
    "                  type=\"text\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"foodName\"\n" +
    "                  placeholder=\"Strawberries\"\n" +
    "                  name=\"name\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"calories\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"calories\"\n" +
    "                  placeholder=\"40\"\n" +
    "                  name=\"calories\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"carbohydrates\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"carbohydrates\"\n" +
    "                  placeholder=\"9\"\n" +
    "                  name=\"carbohydrates\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"fat\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"fat\"\n" +
    "                  placeholder=\"0\"\n" +
    "                  name=\"fat\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <label for=\"protein\"></label>\n" +
    "          <input\n" +
    "                  type=\"number\"\n" +
    "                  min=\"0\"\n" +
    "                  class=\"form-control\"\n" +
    "                  id=\"protein\"\n" +
    "                  placeholder=\"1\"\n" +
    "                  name=\"protein\"\n" +
    "                  required\n" +
    "          />\n" +
    "        </td>\n" +
    "  </tr>\n" +
    "  <tr class=\"sum table-info sortDisabled\">\n" +
    "    <td>Total</td>\n" +
    "    <td></td>\n" +
    "    <td>0</td>\n" +
    "    <td>0</td>\n" +
    "    <td>0</td>\n" +
    "    <td>0</td>\n" +
    "  </tr>\n" +
    "</tbody>\n"

// Starting nutrient totals for each meal
var nutrientTotals = "<tr id='nutrient-totals' class=\"table-info\">\n" +
"    <td>Total</td>\n" +
"    <td></td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"    <td>0</td>\n" +
"  </tr>\n"

// Create a diet plan
var form = document.getElementById("addDietPlan")
form.addEventListener("submit", function(event){

    //var diet = {};
    var formData = new FormData(form);

    event.preventDefault();

    // Extract from name and values and create object to send to controller
    formData.forEach(function(value,key){
        newDietBefore[key]=value;
    });
    console.log(newDietBefore)
    var json = JSON.stringify(newDietBefore);

    $.ajax({
        type: "POST",
        url: "/dietplan",
        data: json,
        headers: {
            // Important that content type is used to accept json. jquery .post does not work because content type
            // can't be specified
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        success: function (results) {
            const dietPlan = results
            // Replace Diet Form with the name of the dit
            $("#create-diet-container").html("<h3>Diet Name: " + results.name + "</h3>")
            // Add a form to enter in a meal name
            $("#diet-info").html(addMealTable)
            dietId = results.id // *** TO BE DELETED??
            // Add a section for the total nutrients for all meals
            $("#diet-total-nutrients").html("<table class='table'><thead>" +
                nurtientHeaders + "</thead><tbody>" + nutrientTotals + "</tbody></table>")

            // add diet info into object. May use the object to calc meal totals and save diet plan
            var JSONstring = JSON.stringify(results)
            newDiet['id'] = results.id
            newDiet['name'] = results.name
            newDiet['meals'] = null
        },
        error: function(data){
            alert("ERROR" + JSON.stringify(data))
        }
    });
})

//Create A meal
$(document).on("submit", "form.create-meal", function (e) {
    var meal = {}
    var formElement = $(this)
    var formData = new FormData($(this)[0])

    e.preventDefault();

    // Loop through form data to create java object of meal
    formData.forEach(function(value,key){
        meal[key]=value;
    });
    if(newDietBefore['meals'] == null){
        newDietBefore['meals'] = [meal]
    }
    else {
        newDietBefore['meals'].push(meal)
    }
    console.log(newDietBefore)
    var json = JSON.stringify(meal);

    $.ajax({
        type: "PUT",
        url: "/dietplan/" + dietId,
        data: json,
        headers: {
            // Important that content type is used to accept json. jquery .post does not work because content type
            // can't be specified
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        success: function (results) {

            // convert results to JSON Object
            var JSONstring = JSON.stringify(results)
            if(newDiet['meals'] == null){
                newDiet['meals'] = [JSON.parse(JSONstring)]
            }
            else {
                newDiet['meals'].push(JSON.parse(JSONstring))
            }

            // Injects the nutrient header after the meal name
            $(formElement).closest("tr").after(nurtientHeaders)
            // Injects the rows for adding a new food to the meal and the total nutrients for that meal
            $(formElement).closest("thead").after(addFoodBody)
            var table = $(formElement).closest("table")
            // Add a new form for adding a meal below the current Meal table
            $("#diet-info").append(addMealTable)
            // Replace the form with the name of the meal
            $(formElement).closest("tr").html("<th colspan='6'>" + formData.get("name") + "</th>")
            // Alter the id's of the form, label, and input so that there are not duplicates
            $(table).find("form").attr('id','addMeal' + (++counter))
            $(table).find("label").attr("form", "addMeal" + (counter))
            $(table).find("input").attr("form", "addMeal" + (counter))

            // Store the meal id
            $(table).find(".meal-id").val(results.id)

            $("#foodName").attr("id", "foodName" + (counter))
            $("#calories").attr("id", "calories" + (counter))
            $("#carbohydrates").attr("id", "carbohydrates" + (counter))
            $("#fat").attr("id", "fat" + (counter))
            $("#protein").attr("id", "protein" + (counter))
            $("label[for='foodName']").attr("for", "foodName" + (counter))
            $("label[for='calories']").attr("for", "calories" + (counter))
            $("label[for='carbohydrates']").attr("for", "carbohydrates" + (counter))
            $("label[for='fat']").attr("for", "fat" + (counter))
            $("label[for='protein']").attr("for", "protein" + (counter))
            Sortable.create($("#diet-info")[0], {
                group: "shared",
            });
            console.log(results)
            mealDictionary[results.name] = results.id;
            mealNutrientTotals[results.name] = {
                calories : 0,
                carbohydrates : 0,
                fat : 0,
                protein : 0,
            }
            $(table).find('form').data('data-meal-name',results.name)
        },
        error: function(data){
            console.log("ERROR" + JSON.stringify(data))
        }
    })
})

//Adding a food to a Meal
$(document).on("submit", ".addFoodToDiet", function (e) {
    var food = {}
    e.preventDefault();
    var formElement = $(this)
    var formData = new FormData($(this)[0])
    var mealId = formData.get("meal-id")
    formData.delete("meal-id")
    formData.forEach(function(value,key){
        food[key]=value;
    });
    newDietBefore.meals.forEach(function(meal){
        if(meal.name === $(formElement).data('data-meal-name')){
            if(meal.foods == null){
                meal.foods = [food]
            }
            else{
                meal.foods.push(food)
            }
        }
    })
    console.log(newDietBefore)

    var json = JSON.stringify(food);

    $.ajax({
        type: "PUT",
        url: "/meal/" + mealId,
        data: json,
        headers: {
            // Important that content type is used to accept json. jquery .post does not work because content type
            // can't be specified
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        success: function (results) {
            var JSONstring = JSON.stringify(results)
            var JSONobject = JSON.parse(JSONstring)
            newDiet.meals.forEach(function(meal){
                if(meal.name === $(formElement).data('data-meal-name')){
                    if(meal.foods == null){
                        meal.foods = [JSONobject]
                    }
                    else{
                        meal.foods.push(JSONobject)
                    }
                }
            })
            var row = $("<tr data-food-name = " + results.name + ">")
            row.append("<td><button class='btn btn-danger rm-food btn-sm'><i class='fas fa-minus'></i></button></td>")
            row.append("<td>" + results.name + "</td>");
            row.append("<td>" + results.calories + "</td>");
            row.append("<td>" + results.carbohydrates + "</td>");
            row.append("<td>" + results.fat + "</td>");
            row.append("<td>" + results.protein + "</td>");
            $(formElement).closest("tr").before(row);
            mealNutrientTotals[$(formElement).data('data-meal-name')].calories += results.calories
            mealNutrientTotals[$(formElement).data('data-meal-name')].carbohydrates += results.carbohydrates
            mealNutrientTotals[$(formElement).data('data-meal-name')].fat += results.fat
            mealNutrientTotals[$(formElement).data('data-meal-name')].protein += results.protein

            calculateSum($(formElement).closest("table"))
            calculateTotalSum()
            updateGraph()
            $(".sortable").each(function(index){
                Sortable.create($(".sortable")[index], {
                    group: "foodShared",
                    filter: ".sortDisabled", //prevents moving
                    preventOnFilter: false, //Allows input to be clickable
                    onMove: function (evt) { //Prevents moving object around
                        return evt.related.className.indexOf('sortDisabled') === -1;
                    },
                    onAdd : function (evt) {
                        console.log("Moved '" +
                            $(evt.to).children().eq(evt.newIndex).attr('data-food-name') + "' from: '" +
                            $(evt.to).find('form').data('data-meal-name')+ "' to: '" +
                            $(evt.from).find('form').data('data-meal-name'))

                        console.log(newDiet)

                        calculateSum($(formElement).closest("table"))
                    },
                    onRemove : function (evt) {
                        calculateSum($(formElement).closest("table"))
                    }
                });
            })

            function swapFoodToMeal(foodName, oldMeal, newMeal, oldIndex, newIndex){

            }
        },
        error: function (data) {
            //alert("Error adding food");
            console.log(data)
        },
    });
});

$(document).on('click', '.rm-food', function (event) {
    var table = $(this).closest("table")
    var foodToDelete = $(this).parent().parent().remove()
    calculateSum(table)
    calculateTotalSum()
})

$(document).on('submit', '#submit-entire-diet', function (event) {
    event.preventDefault()
    var json = JSON.stringify(newDietBefore);
    $.ajax({
        type: "POST",
        url: "/dietplan",
        data: json,
        headers: {
            // Important that content type is used to accept json. jquery .post does not work because content type
            // can't be specified
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        success: function (results) {
            newDietBefore = results
            console.log(results)
        },
        error: function (results) {
            console.log(results)
        }
    })
})


var restvar = d3.select("#selRestaurant")

var menuvar = d3.select("#selMenu")

var MenuObject = {
    McDonalds: ["French Fries", "Big Mac", "Snack Wraps", "Happy Meal", "Egg McMuffin"],
    Subway: ["Spicy Italian", "Turkey Breast", "Roast Beef", "Subway Club", "Sweet Onion Chicken Teriyaki"],
    Bojangles: ["1-Breast Chicken Dinner With Choice Of 2 Fixin’s", "2-Piece Dinner (Breast & Wing) With Choice Of 2 Fixin’s", "Garden Salad", "Grilled Chicken Salad", "Bo-Tato Rounds"],
    Wendys: ["Crispy Chicken Nuggets", "Spicy Chicken Sandwich", "Frosty", "Fries", "Baconator"],
    PizzaHut:["Mozzarella Stuffed Crust Pizza", "Supreme Pizza", "Bacon Spinach Alfredo Pizza", "Chicken-Bacon Parmesan Supreme Pizza", "Meat Lovers Pizza"],
    TacoBell:["Soft Taco", "Mexican Pizza", "Shredded Chicken Mini Quesadilla", "Nacho Cheese Doritos Locos Taco Supreme", "Cinnamon Twists"],
    ChickfilA:["Waffle fries", "Chicken nuggets", "Chicken sandwich", "Chicken Strips", "Chicken biscuit"],
    BurgerKing:["Whopper", "Chicken Fries", "Hershey's Sundae Pie", "Onion Rings", "French Fries"],
    
  }

restvar.on("change", function(){
    // Clear list
        menuvar.html("")
        // Get Retaurant Selection
    restpic  = restvar.node().value

    // Populate list
        menuvar.selectAll('.option')
        .data(MenuObject[restpic])
        .enter()
        .append("option")
        .html(d=>d) 
    })





// =========================Building the plot==========================


    function buildPlot() {
        console.log("Building Plot")
        /* data route */
      var url = "/api/fastfood";
      d3.json(url).then(function(response) {
    
        console.log(response);
    
        count = []
        rest = []
        for (var j = 0; j < response.length; j++) {
            rest.push(response[j][0])
            count.push(response[j][1])
          }
          console.log(`count: ${count}`)


        var trace1 = {
            labels: rest,
            values: count,
            type: 'pie'
          };
          
          var data = [trace1];
          
          var layout = {
            title: "Fatty fat fat fat",
          };
        Plotly.newPlot("plot", data, layout);
      });
    }
    
    
    buildPlot();

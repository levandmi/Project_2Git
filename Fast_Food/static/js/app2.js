var margin = {top: 20, right: 20, bottom: 35, left: 30},
   width = 900 - margin.left - margin.right,
   height = 432 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
 .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("static/js/area_wide2_data.csv", function(data) {

 // List of groups = header of the csv files
 var keys = (data.columns.slice(1))

 // Add X axis
 var x = d3.scaleLinear()
   .domain(d3.extent(data, function(d) { return d.region; }))
   .range([ 0, width ]);
 svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x).ticks(2));

 // Add Y axis
 var y = d3.scaleLinear()
   .domain([0, 1])
   .range([ height, 0 ]);
 svg.append("g")
   .call(d3.axisLeft(y));

 // color palette
 var color = d3.scaleOrdinal()
   .domain(keys)
   .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])

 //stack the data?
 var stackedData = d3.stack()
   .keys(keys)
   (data)
   //console.log("This is the stack result: ", stackedData)
  // Show the areas
  svg
  .selectAll("mylayers")
  .data(stackedData)
  .enter()
  .append("path")
    .style("fill", function(d) {return color(d.key); })
    .attr("d", d3.area()
      .x(function(d) {return x(d.data.region); })
      .y0(function(d) {return y(d[0]);  })
      .y1(function(d) { return y(d[1]); })
  )

})

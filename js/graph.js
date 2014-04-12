var about = {label: "About", dataset: [10,20,30,40]},
	skills = {label: "Skills", dataset: [10,10,10,0]},
	education = {label: "Education", dataset:[2,12,0,0]}

var width=480;
var height=480;
var radius = Math.min(width, height) / 2;

var color = d3.scale.category20();

var pie = d3.layout.pie()
			.sort(null);

var arc = d3.svg.arc()
	.innerRadius(radius-80)
	.outerRadius(radius-10);

//set up svg space
var vis = d3.select("#svg_graph")
	.style("width",width)
	.style("height", height)
	.style("float","left");

//draw initial donut path
var path = vis.selectAll("path")
			.data(pie(about.dataset))
			.enter()
			.append("path")
			.attr("d",arc)
			.attr("transform","translate(" + width/2 + "," + height/2 + ")")
			.style("fill", function(d, i){return color(i);})
			.style("stroke","#FFF")
			.style("stroke-width","3px")
			.each(function(d) { this._current = d; }); // store the initial angles;

//draw initial center label
var label = vis.append("text")
	.attr("transform","translate(" + width/2 + "," + height/2 + ")")
	.attr("text-anchor","middle")
	.text(about.label)
	.style("font-family","verdana")
	.style("font-size","16px");

//button function calls on click
$(document).ready(function(){
	$("#aboutButton").click(function(){
		updateGraph(about);
	});
	$("#skillsButton").click(function(){
		updateGraph(skills);
	});
	$("#educationButton").click(function(){
		updateGraph(education);
	});
});

//update graph function
function updateGraph(dataObject){
	//update paths
	path.data(pie(dataObject.dataset))
		.transition()
		.ease("bounce")
		.duration(750)
		.attrTween("d", arcTween);

	//update center label
	label.text(dataObject.label);

	//for testing only
	console.log(dataObject);
}

// Store the currently-displayed angles in this._current.
// Then, interpolate from this._current to the new angles.
function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
        return arc(i(t));
    };
}
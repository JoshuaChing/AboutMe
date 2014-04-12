var about = {label: "About", dataset: [10,20,30,40]},
	skills = {label: "Skills", dataset: [10,10,10]},
	education = {label: "Education", dataset:[2,12]}

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

//draw donut path
var path = vis.selectAll("path")
			.data(pie(about.dataset))
			.enter()
			.append("path")
			.attr("d",arc)
			.attr("transform","translate(" + width/2 + "," + height/2 + ")")
			.style("fill", function(d, i){return color(i);})
			.style("stroke","#FFF")
			.style("stroke-width","3px");

//button function calls on click
$(document).ready(function(){
	$("#aboutButton").click(function(){
		updateGraph(about.dataset);
	});
	$("#skillsButton").click(function(){
		updateGraph(skills.dataset);
	});
	$("#educationButton").click(function(){
		updateGraph(education.dataset);
	});
});

//update graph function
function updateGraph(dataObject){
	path.data(pie(dataObject))
		.attr("d",arc);
	console.log(dataObject);
}
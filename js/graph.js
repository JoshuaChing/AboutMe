var about = {label: "About", dataset: [10,20,30,40]},
	education = {label: "Education", dataset:[2,12,0,0]},
	experience = {label: "Experience", dataset:[1,0,0,0]},
	skills = {label: "Skills", dataset: [10,10,10,0]};

var width;
var height;

if ($(window).width() > 480){
	width = 480;
	height = 480;
}
else{
	width = 320;
	height = 320;
}

var radius = Math.min(width, height) / 2;

var color = d3.scale.category20c();

var pie = d3.layout.pie()
			.sort(null);

var arc = d3.svg.arc()
	.innerRadius(radius-80)
	.outerRadius(radius-20);

//set up svg space
var vis = d3.select("#svg_graph")
	.style("width",width)
	.style("height", height)

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
	.text(about.label);

$(document).ready(function(){
	//button function calls on click
	$("#aboutButton").click(function(){
		updateGraph(about);
		updateContentTitle("About Me");
	});
	$("#educationButton").click(function(){
		updateGraph(education);
		updateContentTitle("Education")
	});
	$("#experienceButton").click(function(){
		updateGraph(experience);
		updateContentTitle("Experience")
	});
	$("#skillsButton").click(function(){
		updateGraph(skills);
		updateContentTitle("Hard Skills")
	});

	//check if window size change
	$(window).resize(function(){
		if (window.innerWidth<=480){
			width = 320;
			height = 320;
		}
		else{
			width = 480;
			height = 480;
		}
		//resize svg space
		vis.style("width",width)
			.style("height", height);
		//resize radius size
		radius = Math.min(width, height) / 2;
		arc.innerRadius(radius-80)
			.outerRadius(radius-20);
		//redraw path
		path.attr("d", arc)
			.attr("transform","translate(" + width/2 + "," + height/2 + ")");
		//redraw label
		label.attr("transform","translate(" + width/2 + "," + height/2 + ")")
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

//update content title
function updateContentTitle(newContentTitle){
	$("#contentTitle").text(newContentTitle);
}
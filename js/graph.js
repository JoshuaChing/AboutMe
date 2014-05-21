var about = {label: "This is me", dataset: [10,20,30,40]},
	education = {label: "15% Completed", dataset:[15,85,0,0]},
	experience = {label: "100% Dedicated", dataset:[1,0,0,0]},
	skills = {label: "Languages", dataset: [10,10,10,0]};

var contentDisplayed = "about";

var width;
var height;

//if screen is greater than 768px svg is 460x460
//otherwise it will be 320x320
if ($(window).width() > 768){
	width = 460;
	height = 460;
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
	.innerRadius(radius-70)
	.outerRadius(radius-10);

//set up svg space
var vis = d3.select("#svg_graph")
	.style("width",width+"px")
	.style("height", height+"px");

//draw initial donut path
var path = vis.selectAll("path")
			.data(pie(about.dataset))
			.enter()
			.append("path")
			.attr("d",arc)
			.attr("transform","translate(" + width/2 + "," + height/2 + ")")
			.style("fill", function(d, i){return color(i);})
			.style("stroke","#ecf0f1")
			.style("stroke-width","3px")
			.each(function(d) { this._current = d; }); // store the initial angles;

//draw initial center label
var label = vis.append("text")
	.attr("transform","translate(" + width/2 + "," + height/2 + ")")
	.attr("text-anchor","middle")
	.text(about.label)
  	.style("font-size","22px")
  	.style("fill","#2980b9");

$(document).ready(function(){
	//button function calls on click
	$("#aboutButton").click(function(){
		updateGraph(about);
		updateContentTitle("I love to learn, take on challenges, and have a good laugh.");
		updateInnerContent("about");
	});
	$("#educationButton").click(function(){
		updateGraph(education);
		updateContentTitle("Currently studying:");
		updateInnerContent("education");
	});
	$("#experienceButton").click(function(){
		updateGraph(experience);
		updateContentTitle("Past Experiences:");
		updateInnerContent("experience");
	});
	$("#skillsButton").click(function(){
		updateGraph(skills);
		updateContentTitle("I code while drinking chocolate milk.")
		updateInnerContent("skills");
	});

	//check if window size change
	//if window is greater than 768px svg will be 480x480
	//otherwise it will be 320x320
	$(window).resize(function(){
		if (window.innerWidth<=768){
			width = 320;
			height = 320;
		}
		else{
			width = 460;
			height = 460;
		}
		//resize svg space
		vis.style("width",width +"px")
			.style("height", height +"px");
		//resize radius size
		radius = Math.min(width, height) / 2;
		arc.innerRadius(radius-70)
			.outerRadius(radius-10);
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
	if (($("#contentTitle").text())!=newContentTitle){
		$("#contentTitle").hide();
		$("#contentTitle").text(newContentTitle);
		$("#contentTitle").fadeIn();
	}
}

//update inner content
function updateInnerContent(newContentDisplayed){
	if (contentDisplayed!=newContentDisplayed){
		$("#"+contentDisplayed+"Content").hide();
		$("#"+newContentDisplayed+"Content").fadeIn();
		contentDisplayed = newContentDisplayed;
	}
}

var about = {label: "This is me", dataset: [1,2,3,4,0,0]},
	education = {label: "What I Study", dataset:[0,1,1,1,0,0]},
	experience = {label: "What I do", dataset:[0,0,1,1,0,0]},
	skills = {label: "What I know", dataset: [1,2,2,2,0,0]};

var aboutLabels = ['Sleep','Dance','Imagine','Create',''],
	educationLabels = ['','Human Factors','Problem Analysis','Design Process',''],
	experienceLabels = ['','','Android Dev','Web Dev',''],
	skillsLabels = ['C++','Android','HTML-CSS-JS','Java'];

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
	.outerRadius(radius-20);

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

//draw slice labels
var label_group = vis.append("svg:g")
    .attr("class", "labelGroup")
    .attr("transform", "translate(" + (width/2) + "," + (height/2) + ")");

var sliceLabel = label_group.selectAll("text")
    .data(pie(about.dataset));
	sliceLabel.enter().append("svg:text")
	.style("font-size","14px")
  	.style("fill","#2c3e50")
    .attr("class", "arcLabel")
    .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
    .attr("text-anchor", "middle")
    .text(function(d, i) {return aboutLabels[i]; });

$(document).ready(function(){
	//button function calls on click
	$("#aboutButton").click(function(){
		updateGraph(about,aboutLabels);
		updateContentTitle("I love to learn, take on challenges, and have a good laugh.");
		updateInnerContent("about");
	});
	$("#educationButton").click(function(){
		updateGraph(education,educationLabels);
		updateContentTitle("Currently studying:");
		updateInnerContent("education");
	});
	$("#experienceButton").click(function(){
		updateGraph(experience,experienceLabels);
		updateContentTitle("Experiences:");
		updateInnerContent("experience");
	});
	$("#skillsButton").click(function(){
		updateGraph(skills,skillsLabels);
		updateContentTitle("I code best with chocolate milk.")
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
			.outerRadius(radius-20);
		//redraw path
		path.attr("d", arc)
			.attr("transform","translate(" + width/2 + "," + height/2 + ")");
		//redraw label
		label.attr("transform","translate(" + width/2 + "," + height/2 + ")");
		//redraw slice labels
		label_group.attr("transform","translate(" + width/2 + "," + height/2 + ")");
		sliceLabel.attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
  
	});
});

//update graph function
function updateGraph(dataObject, dataLabels){
	//update paths
	path.data(pie(dataObject.dataset))
		.transition()
		.ease("bounce")
		.duration(750)
		.attrTween("d", arcTween);

	//update center label
	label.text(dataObject.label);

	//update slice labels
	sliceLabel.data(pie(dataObject.dataset));
    sliceLabel.transition().ease("bounce").duration(750)
        .attr("transform", function(d) {return "translate(" + arc.centroid(d) + ")"; })
        .text(function(d, i) {return dataLabels[i]; })
        .style("fill-opacity", function(d) {return d.value==0 ? 1e-6 : 1;});
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

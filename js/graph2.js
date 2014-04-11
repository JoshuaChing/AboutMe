var data = [[0,33,"#9b59b6"],[33,66,"#1abc9c"],[66,100,"#34495e"]];
var width = 200;
var height = 200;

var scale = d3.scale.linear().domain([0,100]).range([0, 2*Math.PI]);

var vis = d3.select("#svg_graph2")
	.style("background-color","#FFF")
	.style("width",width + "px")
	.style("height",height + "px");

var arc = d3.svg.arc()
	.innerRadius((width/2)-60)
	.outerRadius((width/2)-25)
	.startAngle(function(d){return scale(d[0]);})
	.endAngle(function(d){return scale(d[1]);});

vis.selectAll("path")
	.data(data)
	.enter()
	.append("path")
	.attr("d",arc)
	.style("fill",function(d){return d[2];})
	.style("stroke","#FFF")
	.attr("transform","translate(100,100)");


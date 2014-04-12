var data = [[0,50,"#e67e22"],[50,75,"#f1c40f"],[75,100,"#e74c3c"]];
var radius = 240;

var scale = d3.scale.linear().domain([0,100]).range([0, 2*Math.PI]);

var vis = d3.select("#svg_graph")
	.style("background-color","#FFF")
	.style("width",radius*2 + "px")
	.style("height",radius*2 + "px")
	.style("float","left");

var arc = d3.svg.arc()
	.innerRadius((radius)-60)
	.outerRadius((radius)-10)
	.startAngle(function(d){return scale(d[0]);})
	.endAngle(function(d){return scale(d[1]);});

vis.selectAll("path")
	.data(data)
	.enter()
	.append("path")
	.attr("d",arc)
	.style("fill",function(d){return d[2];})
	.style("stroke","#FFF")
	.style("stroke-width","3px")
	.attr("transform","translate(240,240)");


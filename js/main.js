var margin = { top: 20, right: 20, bottom: 30, left: 55 };
var margin3 = { top: 20, right: 20, bottom: 30, left: 85 };


var width = parseFloat($("#svg").attr("width")) - margin.left - margin.right,
	height = parseFloat($("#svg").attr("height")) - margin.top - margin.bottom,
	width2 = parseFloat($("#svg2").attr("width")) - margin.left - margin.right,
	height2 = parseFloat($("#svg2").attr("height")) - margin.top - margin.bottom,
	width3 = parseFloat($("#svg3").attr("width")) - margin.left - margin.right,
	height3 = parseFloat($("#svg3").attr("height")) - margin.top - margin.bottom,
	width4 = parseFloat($("#svg4").attr("width")) - margin.left - margin.right,
	height4 = parseFloat($("#svg4").attr("height")) - margin.top - margin.bottom;

var svg = d3.select('#svg').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var div = d3.select("#svg").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var x = d3.scale.ordinal()
	.rangeRoundBands([0, width], .1),
	y = d3.scale.linear()
	.range([height, 0]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient('bottom'),
	yAxis = d3.svg.axis()
	.scale(y)
	.orient('left')
	.ticks(10);


var svg2 = d3.select('#svg2').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var div2 = d3.select("#svg2").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var xTwo = d3.scale.ordinal()
	// .domain([2007, 2017])
	.rangeRoundBands([0, width2], .1);
var yTwo = d3.scale.linear()
	// .domain([0, 180])
	.range([height2, 0]);
var xAxisTwo = d3.svg.axis()
	.scale(xTwo)
	.orient('bottom');
// .tickFormat(d3.format('.3s'));
var yAxisTwo = d3.svg.axis()
	.scale(yTwo)
	.orient('left')
	.ticks(10);

var svg3 = d3.select('#svg3').append('svg')
	.attr('width', width3 + margin3.left + margin.right)
	.attr('height', height3 + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var div3 = d3.select("#svg3").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var xThree = d3.scale.ordinal()
	// .domain([2007, 2017])
	.rangeRoundBands([0, width3], .05);
var yThree = d3.scale.linear()
	// .domain([0, 180])
	.range([height3, 0]);
var xAxisThree = d3.svg.axis()
	.scale(xThree)
	.orient('bottom')
// .tickFormat(d3.format('.3s'));
var yAxisThree = d3.svg.axis()
	.scale(yThree)
	.orient('left')
	.ticks(10);

var svg4 = d3.select('#svg4').append('svg')
	.attr('width', width + margin.left + margin.right)
	.attr('height', height + margin.top + margin.bottom)
	.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var div4 = d3.select("#svg4").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

var xFour = d3.time.scale().range([0, width4]);
// .domain([2007, 2017])

var yFour = d3.scale.linear()
	// .domain([0, 180])
	.range([height4, 0]);
var xAxisFour = d3.svg.axis()
	.scale(xFour)
	.orient('bottom')
	.ticks(10)
// .tickFormat(d3.format('.3s'));
var yAxisFour = d3.svg.axis()
	.scale(yFour)
	.orient('left')
	.ticks(10);

var parseDate = d3.time.format("%Y-%m-%d").parse;

d3.csv("data/gross_profit.csv", function (error, data) {
	data.forEach(function (d) {
		d.Year = +d.Year;
		d.Profit = +d["Gross Profit, Adj"];

	})
	x.domain(data.map(function (d) { return d.Year; }));
	y.domain([0, d3.max(data, function (d) { return d.Profit; })]).nice();
	svg.append("g")
		.attr('class', 'x axis')
		.attr("transform", "translate(0," + height2 + ")")
		.call(xAxis)
		.selectAll('text')
		.attr('y', 0)
		.attr('x', 7)
		.attr('dy', '.35em')
		.attr('transform', 'rotate(90)')
		.style('text-anchor', 'start')
		.style('font-family', 'sans-serif')
		.style('font-size', '.65em');

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.71em')
		.style('text-anchor', 'end')
		.style('font-family', 'sans-serif')
		.text('Gross profits (millions USD)');

	svg.selectAll("bar")
		.data(data)
		.enter()
		.append("rect")
		.style('fill', '#34A69B')
		.attr("x", function (d) {
			return x(d.Year); //this works with the xScale function to set the width of the bar
		})
		.attr("y", function (d) {
			return y(d.Profit); //this y value sets the point from which it starts
		})
		.attr("width", x.rangeBand())
		.attr("height", function (d) {
			return height - y(d.Profit);
		})
		.style('margin-top', "3px")
		.on("mouseover", function (d) {
			div.transition()
				.duration(200)
				.style("opacity", .9);
			div.html(d.Year + "<br/>" + "$" + d.Profit)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function (d) {
			div.transition()
				.duration(500)
				.style("opacity", 0);;
			svg.append("text")
				.attr("x", (width / 2))
				.attr("y", 0 - (margin.top / 2))
				.attr("text-anchor", "middle")
				.style("font-size", "16px")
				.style("text-decoration", "underline")
				.text();
		});
});
d3.csv("data/prime2.csv", function (error, data) {
	data.forEach(function (d) {
		d.Year = +d.Year;

		d.PrimeSubscribers = +d.PrimeSubscribers;

	})

	xTwo.domain(data.map(function (d) { return d.Year; }));
	yTwo.domain([0, d3.max(data, function (d) { return d.PrimeSubscribers; })]).nice();
	svg2.append("g")
		.attr('class', 'x axis')
		.attr("transform", "translate(0," + height2 + ")")
		.call(xAxisTwo)
		.selectAll('text')
		.attr('y', 0)
		.attr('x', 6)
		.attr('dy', '.35em')
		.attr('transform', 'rotate(90)')
		.style('text-anchor', 'start')
		.style('font-family', 'sans-serif')
		.style('font-size', '.65em');

	svg2.append("g")
		.attr("class", "y axis")
		.call(yAxisTwo)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.71em')
		.style('text-anchor', 'end')
		.style('font-family', 'sans-serif')
		.style('font-size', '.75em')
		.text('Prime subcribers (millions)');

	svg2.selectAll("bar")
		.data(data)
		.enter()
		.append("rect")
		.style('fill', '#34A69B')
		.attr("x", function (d) {
			return xTwo(d.Year); //this works with the xScale function to set the width of the bar
		})
		.attr("y", function (d) {
			return yTwo(d.PrimeSubscribers); //this y value sets the point from which it starts
		})
		.attr("width", xTwo.rangeBand())
		.attr("height", function (d) {
			return height2 - yTwo(d.PrimeSubscribers);
		})
		.on("mouseover", function (d) {
			div2.transition()
				.duration(200)
				.style("opacity", .9);
			div2.html(d.Year + "<br/>" + d.PrimeSubscribers + " million")
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function (d) {
			div2.transition()
				.duration(500)
				.style("opacity", 0);
		});;
	svg2.append("text")
		.attr("x", (width / 2))
		.attr("y", 0 - (margin.top / 2))
		.attr("text-anchor", "middle")
		.style("font-size", "16px")
		.style("text-decoration", "underline")
		.text();
});

d3.csv("data/revenue.csv", function (error, data) {
	data.forEach(function (d) {
		d.Year = +d.Year;
		d.Revenue = +d.Revenue;

	})
	var maxRevenue = d3.max(data, function (d) { return d.Revenue });
	console.log("maxrev = " + maxRevenue);

	xThree.domain(data.map(function (d) { return d.Year; }));
	yThree.domain([0, d3.max(data, function (d) { return d.Revenue; })]);

	svg3.append("g")
		.attr('class', 'x axis')
		.attr("transform", "translate(0," + height3 + ")")
		.call(xAxisThree)
		.selectAll('text')
		.attr('y', 0)
		.attr('x', 7)
		.attr('dy', '.35em')
		.attr('transform', 'rotate(90)')
		.style('text-anchor', 'start')
		.style('font-family', 'sans-serif')
		.style('font-size', '.65em');

	svg3.append("g")
		.attr("class", "y axis")
		.call(yAxisThree)
		.append('text')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.5em')
		.style('text-anchor', 'end')
		.style('font-family', 'sans-serif')
		.text('Revenue (millions USD)');

	svg3.selectAll("bar")
		.data(data)
		.enter()
		.append("rect")
		.style('fill', '#34A69B')
		.attr("x", function (d) {
			return xThree(d.Year); //this works with the xScale function to set the width of the bar
		})
		.attr("y", function (d) {
			return yThree(d.Revenue); //this y value sets the point from which it starts
		})
		.attr("width", x.rangeBand())
		.attr("height", function (d) {
			return height - yThree(d.Revenue);
		})
		.style('margin-top', "3px")
		.on("mouseover", function (d) {
			div3.transition()
				.duration(200)
				.style("opacity", .9);
			div3.html(d.Year + "<br/>" + "$" + d.Revenue)
				.style("left", (d3.event.pageX) + "px")
				.style("top", (d3.event.pageY - 28) + "px");
		})
		.on("mouseout", function (d) {
			div3.transition()
				.duration(500)
				.style("opacity", 0);;
			svg3.append("text")
				.attr("x", (width3 / 2))
				.attr("y", 0 - (margin.top / 2))
				.attr("text-anchor", "middle")
				.style("font-size", "16px")
				.style("text-decoration", "underline")
				.text();
		});
});

var valueLine = d3.svg.line()
	.x(function (d) { return xFour(d.Date); })
	.y(function (d) { return yFour(d.Close); });

d3.csv("data/stock.csv", function (error, data) {
	data.forEach(function (d) {
		d.Date = parseDate(d.Date);
		d.Close = +d.Close;
	});

	xFour.domain(d3.extent(data, function (d) { return d.Date; }));
	yFour.domain([0, d3.max(data, function (d) { return d.Close; })]);
	// xFour.domain(data.map(function (d) { return d.Date; }));
	// yFour.domain([0, d3.max(data, function (d) { return d.Close; })]).nice();
	svg4.append("g")
		.attr('class', 'x axis')
		.attr("transform", "translate(0," + height2 + ")")
		.call(xAxisFour)
		.selectAll('text')
		.attr('y', 0)
		.attr('x', 7)
		.attr('dy', '.35em')
		.attr('transform', 'rotate(90)')
		.style('text-anchor', 'start')
		.style('font-family', 'sans-serif')
		.style('font-size', '.65em');

	svg4.append("g")
		.attr("class", "y axis")
		.call(yAxisFour)
		.append('text')
		// .attr('x', 100)
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.5em')
		.style('text-anchor', 'end')
		.style('font-family', 'sans-serif')
		.text('Stock price');

	// svg4.append("g")
	// .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	svg4.append('path')
		// .datum(data)
		.attr('class', 'line')
		.attr('fill', 'none')
		.attr('stroke', '#34A69B')
		.attr('stroke-linejoin', 'round')
		.attr('stroke-linecap', 'round')
		.attr('stroke-width', 1)
		.attr('d', valueLine(data));
	// .on("mouseover", function (d) {
	// 	div4.transition()
	// 		.duration(200)
	// 		.style("opacity", .9);
	// 	div4.html(d.Date + "<br/>" + "$" + d.Close)
	// 		.style("left", (d3.event.pageX) + "px")
	// 		.style("top", (d3.event.pageY - 28) + "px");
	// })
	// .on("mouseout", function (d) {
	// 	div4.transition()
	// 		.duration(500)
	// 		.style("opacity", 0);;
	// 	svg4.append("text")
	// 		.attr("x", (width / 2))
	// 		.attr("y", 0 - (margin.top / 2))
	// 		.attr("text-anchor", "middle")
	// 		.style("font-size", "16px")
	// 		.style("text-decoration", "underline")
	// 		.text();
	// });
});

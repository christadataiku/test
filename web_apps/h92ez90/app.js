var outerRadius = 700 / 2,
    innerRadius = outerRadius - 130;

var fill = d3.scale.category20c();

var chord = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + 20);

var path = d3.svg.chord()
    .radius(innerRadius);

var svg = d3.select("body").append("svg")
    .attr("width", outerRadius * 2)
    .attr("height", outerRadius * 2)
    .append("g")
    .attr("id", "circle")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

svg.append("circle")
    .attr("r",outerRadius);

$.getJSON(getWebAppBackendUrl('nodes_api_call')).done(function(data) {

   // if (error) throw error;
    
  links = JSON.parse(data.links);
   
  var indexByName = d3.map(),
      nameByIndex = d3.map(),
      matrix = [],
      n = 0;

  // Compute a unique index for each url.
  links.forEach(function(d) {
    if (!indexByName.has(d = d.source)) {
      nameByIndex.set(n, d);
      indexByName.set(d, n++);
    }
  });
    
  // Construct a square matrix counting package imports.
  links.forEach(function(d) {
    var source = indexByName.get(d.source),
        row = matrix[source];
    if (!row) {
     row = matrix[source] = [];
     for (var i = -1; ++i < n;) row[i] = 0;
    }
    
    var target = indexByName.get(d.target);
    row[target] = d.value;
      
  });
    
  chord.matrix(matrix);

  var g = svg.selectAll(".group")
      .data(chord.groups)
      .enter().append("g")
      .attr("class", "group")
      .on("mouseover", mouseover);

  g.append("path")
      .style("fill", function(d) { return fill(d.index); })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", arc);

  g.append("text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (innerRadius + 26) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .text(function(d) { return nameByIndex.get(d.index); });

  var mychord = svg.selectAll(".chord")
      .data(chord.chords)
      .enter().append("path")
      .attr("class", "chord")
      .style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
      .style("fill", function(d) { return fill(d.source.index); })
      .attr("d", d3.svg.chord().radius(innerRadius));
    
   function mouseover(d, i) {
    mychord.classed("fade", function(p) {
      return p.source.index != i
          && p.target.index != i;
    });
       
  }

});

d3.select(self.frameElement).style("height", outerRadius * 2 + "px");

// 썬버스트 sgv크기 
var width = 1120;//750;
var height = 650;//600;
var radius = Math.min(width, height) / 2;

// 분할 과정 current path의 크기 설정 
var b = {
  w: 173, h: 31, s: 3, t: 10
};


// 헤더부분
var svgheaderImage = d3.select("#header")
.append("svg")
.attr("width", 1270)
.attr("height", 50);

svgheaderImage.append("image")
.attr("xlink:href", "images/desiciontree_title.png")
.attr("x", 5)
.attr("y", 13)
.attr("width", 180)
.attr("height", 30);

svgheaderImage.append("image")
.attr("xlink:href", "images/Decisiontree_about.png")
.attr("x", 1130)
.attr("y", 13)
.attr("width", 180)
.attr("height", 30)
.on("mouseover", function () {
    d3.select(this)
    .attr("x", 1120)
    .attr("y", 12)
    .attr("width", 200)
    .attr("height", 32)
    .style("cursor", "pointer")
  })
  .on("mouseout", function () {
    d3.select(this)
    .attr("x", 1130)
    .attr("y", 13)
    .attr("width", 180)
    .attr("height", 30)
    .style("cursor", "default")
  });

//currentpath부분 

var svgheader2Image = d3.select("#sequence")
.append("svg")
.attr("width", 150)
.attr("height", 31);

svgheader2Image.append("image")
.attr("xlink:href", "images/desiciontree_path.png")
.attr("x", 5)
.attr("y", 2)
.attr("width", 138)
.attr("height", 30);

// 썬버스트의 크기 등등 조정 부분 
var totalSize = 0; 

var vis = d3.select("#chart").append("svg:svg")
.attr("width", (width-300))
.attr("height", height)
.append("svg:g")
.attr("id", "container")
.attr("transform", "translate(" + (width-300) / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
.size([2 * Math.PI, radius * radius])
.value(function(d) { return d.size; });

var arc = d3.svg.arc()
.startAngle(function(d) { return d.x; })
.endAngle(function(d) { return d.x + d.dx; })
.innerRadius(function(d) { return Math.sqrt(d.y*1.02); })
.outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// EXCEL데이터를 Json데이터로 변환하는 부분 
d3.text("data/tree_sunburst.csv", function(text) {
  var csv = d3.csv.parseRows(text);
  var json = buildHierarchy(csv);
  createVisualization(json);
});


// 썬버스트를 그리는 부분 함수 
function createVisualization(json) {

  initializeBreadcrumbTrail();

  vis.append("svg:circle")
  .attr("r", radius)
  .style("opacity", 0);

  var nodes = partition.nodes(json)
  .filter(function(d) {
      return (d.dx > 0.005); 
    });


  var path = vis.data([json]).selectAll("path")
  .data(nodes)
  .enter().append("svg:path")
  .attr("display", function(d) { return d.depth ? null : "none"; })
  .attr("d", arc)
  .attr("fill-rule", "evenodd")
  .style("stroke", function(d) { return colors[d.name]; })
  .style("stroke-dasharray", function(d) { return roundstroke[d.name]; })
  .style("opacity", 1)
  .style("fill", function(d) { if (0<=colors_1[d.name]&&colors_1[d.name]<=5.99) {
    return "#FFFFFF"
  } else if(6<=colors_1[d.name]&&colors_1[d.name]<=10.99){
    return "#F2F2F2"
  } else if(11<=colors_1[d.name]&&colors_1[d.name]<=15.99){
    return "#E5E5E5"
  } else if(16<=colors_1[d.name]&&colors_1[d.name]<=20.99){
    return "#D9D9D9"
  } else if(21<=colors_1[d.name]&&colors_1[d.name]<=25.99){
    return "#CCCCCC"
  } else if(26<=colors_1[d.name]&&colors_1[d.name]<=30.99){
    return "#BFBFBF"
  } else if(31<=colors_1[d.name]&&colors_1[d.name]<=35.99){
    return "#A6A6A6"
  } else if(36<=colors_1[d.name]&&colors_1[d.name]<=40.99){
    return "#999999"
  } else if(41<=colors_1[d.name]&&colors_1[d.name]<=45.99){
    return "#8C8C8C"
  } else if(46<=colors_1[d.name]&&colors_1[d.name]<=50.99){
    return "#7F7F7F"
  } else if(51<=colors_1[d.name]&&colors_1[d.name]<=55.99){
    return "#737373"
  } else if(56<=colors_1[d.name]&&colors_1[d.name]<=60.99){
    return "#666666"
  } else if(61<=colors_1[d.name]&&colors_1[d.name]<=65.99){
    return "#595959"
  } else if(66<=colors_1[d.name]&&colors_1[d.name]<=70.99){
    return "#4D4D4D"
  } else if(71<=colors_1[d.name]&&colors_1[d.name]<=75.99){
    return "#404040"
  } else if(76<=colors_1[d.name]&&colors_1[d.name]<=80.99){
    return "#333333"
  } else if(81<=colors_1[d.name]&&colors_1[d.name]<=85.99){
    return "#262626"
  } else if(86<=colors_1[d.name]&&colors_1[d.name]<=90.99){
    return "#1A1A1A"
  } else if(91<=colors_1[d.name]&&colors_1[d.name]<=95.99){
    return "#0D0D0D"
  } else if(96<=colors_1[d.name]&&colors_1[d.name]<=100){
    return "#000000"
  }; })
.style("stroke-width", "3px")
.style("cursor", "defualt")
.on("mouseover", mouseover)
.on("click",function (d) {
  console.log(pathname[d.name])
  })
// .on("click",(function (index) {
// return (function() {
// console.log("gg" + index)
// })
// })(d))


  d3.select("#container").on("mouseleave", mouseleave);

  totalSize = path.node().__data__.value;
  
};

//썬버스트에 마우스 호버시 작동하는 부분 작성 함수 
function mouseover(d) {

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "% "+"\n"+"(1="+colors_1[d.name] + "%)"+"\n"+"(0="+d3.round((100-colors_1[d.name]),2) + "%)";
  var percentageString2 = percentage + "% ";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }
  
  //썬버스트 가운데 정보 나타내는 부분 
  d3.select("#percentage")
      .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");

  //current path옆에 정보 나타내는 부분 
  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString2);

  //커서의 위치포함 상위 파티션의 투명도만 1이고 나머지는 0.15
  d3.selectAll("path")
  .style("opacity", 0.15);

  vis.selectAll("path")
  .filter(function(node) {
    return (sequenceArray.indexOf(node) >= 0);
  })
  .style("opacity", 1)
  .style("cursor", "pointer");
}


//썬버스트 마우스 아웃시 변경부분 작성 함수 
function mouseleave(d) {

  d3.select("#trail")
  .style("visibility", "hidden");

  d3.selectAll("path").on("mouseover", null);

  // 모든 파티션의 투명도 1
  d3.selectAll("path")
  .transition()
  .duration(1000)
  .style("opacity", 1)
  .each("end", function() {
    d3.select(this).on("mouseover", mouseover);
  });

  d3.select("#explanation")
  .style("visibility", "hidden")
  .style("cursor", "defualt");
}

// 현재의 파티션과 상위 파티션의 PATH를 계산하는 부분 
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}


//currentpath 초기 부분 
function initializeBreadcrumbTrail() {
  // svg할당 
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 31)
      .attr("id", "trail");
  // PATH끝에 정보 텍스트 부분 
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// current path의 크기 등등 부분 
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { 
  points.push(b.t + "," + (b.h / 2));
}
return points.join(" ");
}

// currentpath를 업데이트하는 부분 
function updateBreadcrumbs(nodeArray, percentageString) {

  var g = d3.select("#trail")
  .selectAll("g")
  .data(nodeArray, function(d) { return d.name + d.depth; });

  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
  .attr("points", breadcrumbPoints)
  .style("fill", function(d) { return colors[d.name]; });

 entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("font-size", "10px")
      .style("fill","black")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  g.exit().remove();

  d3.select("#trail").select("#endlabel")
  .attr("x", (nodeArray.length+0.23) * (b.w + b.s))
  .attr("y", b.h / 2)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .text(percentageString);

  d3.select("#trail")
  .style("visibility", "");

}

//오른쪽 범례 등등 표시 부분 
var svgside = d3.select("#chart").append("svg:svg")
.attr("width", 450)
.attr("height", height)

//color Index의 창 부분 

svgside.append("rect")
.attr("class", "index_rect")
.attr("x", 50)
.attr("y", 40)
.attr("width", 350)
.attr("height", 30)
.attr("fill", "#AEA796")
.attr("stroke","#AEA796")
.attr("stroke-width","1px")

svgside.append("image")
.attr("xlink:href", "images/Decisiontree_color.png")
.attr("x", 60)
.attr("y", 46)
.attr("width", 100)
.attr("height", 25);

svgside.append("rect")
.attr("class", "index_rect")
.attr("x", 50)
.attr("y", 70)
.attr("width", 350)
.attr("height", 240)
.attr("fill", "white")
.attr("stroke","#AEA796")
.attr("stroke-width","1px")


//범례 네모상자의 마우스 아웃 부분 함수 
function mouseleave_regend_square(d) {

  d3.selectAll("path")
  .style("opacity", 1);

  d3.select(this)
   .style("cursor", "defualt")
   .attr("stroke-width","0.2px");

}

//범례 텍스트의 마우스 아웃 부분 함수 
function mouseleave_regend(d) {

  d3.selectAll("path")
  .style("opacity", 1);

  d3.select(this)
   .style("cursor", "defualt")
   .attr("font-size", "10px");

}

//아래는 범례 네모상자와 텍스트를 일일히 넣어준 부분 

//왼쪽 부분 

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*0))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F39191")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_q_kdsq_sum[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("LOG_IMP_q_kdsq_sum")
  .attr("x", 80)
  .attr("y", 89+(23*0))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_q_kdsq_sum[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*1))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F3A291")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_km_total[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("LOG_IMP_km_total")
  .attr("x", 80)
  .attr("y", 89+(23*1))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_km_total[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*2))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F3B291")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_rey_c[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("LOG_IMP_c_snsb_rey_c")
  .attr("x", 80)
  .attr("y", 89+(23*2))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_rey_c[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*3))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F3C291")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_rcft_dr[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("LOG_IMP_c_snsb_rcft_dr")
  .attr("x", 80)
  .attr("y", 89+(23*3))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_rcft_dr[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*4))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F3D291")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_cwt_s[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("LOG_IMP_c_snsb_cwt_s")
  .attr("x", 80)
  .attr("y", 89+(23*4))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_cwt_s[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*5))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F3E291")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_pxid[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("LOG_IMP_c_snsb_pxid")
  .attr("x", 80)
  .attr("y", 89+(23*5))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_pxid[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*6))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F3F391")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_str_cr_c[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("LOG_IMP_c_snsb_str_cr_c")
  .attr("x", 80)
  .attr("y", 89+(23*6))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_LOG_IMP_c_snsb_str_cr_c[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*7))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#D4F3B6")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c6[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_c6")
  .attr("x", 80)
  .attr("y", 89+(23*7))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c6[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*8))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#99E68A")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c8[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_c8")
  .attr("x", 80)
  .attr("y", 89+(23*8))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c8[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 60)
  .attr("y", 80+(23*9))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#AAF3B6")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c14[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_c14")
  .attr("x", 80)
  .attr("y", 89+(23*9))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c14[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)



//오른쪽 범례 부분 

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*0))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#9EF3AC")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c7[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_c7")
  .attr("x", 255)
  .attr("y", 89+(23*0))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c7[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*1))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#B6F3E9")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c2[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_c2")
  .attr("x", 255)
  .attr("y", 89+(23*1))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_c2[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*2))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#9ED5F3")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p8[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_p8")
  .attr("x", 255)
  .attr("y", 89+(23*2))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p8[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*3))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#9EC1F3")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p3[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_p3")
  .attr("x", 255)
  .attr("y", 89+(23*3))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p3[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*4))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#9EACF3")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p4[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_p4")
  .attr("x", 255)
  .attr("y", 89+(23*4))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p4[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*5))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#A59EF3")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p5[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_p5")
  .attr("x", 255)
  .attr("y", 89+(23*5))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p5[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*6))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#BA9EF3")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p15[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_a_siadl_p15")
  .attr("x", 255)
  .attr("y", 89+(23*6))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_a_siadl_p15[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*7))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#F3B6F3")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_q_kdsq_13[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_q_kdsq_13")
  .attr("x", 255)
  .attr("y", 89+(23*7))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_q_kdsq_13[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*8))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#E695D2")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_q_kdsq_15[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_q_kdsq_15")
  .attr("x", 255)
  .attr("y", 89+(23*8))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_q_kdsq_15[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)

  svgside.append("rect")
  .attr("class", "index_rect_color")
  .attr("x", 235)
  .attr("y", 80+(23*9))
  .attr("width", 12)
  .attr("height", 12)
  .style("fill", "#E6A1C3")
  .attr("stroke","black")
  .attr("stroke-width","0.2px")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("stroke-width","1.1px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_km_o_t_4[d.name]; })
  })
  .on("mouseleave", mouseleave_regend_square)

svgside.append("text")
  .attr("class", "index_text_color")
  .text("IMP_km_o_t_4")
  .attr("x", 255)
  .attr("y", 89+(23*9))
  .attr("text-anchor", "start")
  .attr("font-family", "Open Sans")
  .attr("font-size", "10px")
  .attr("font-weight","bold")
  .attr("fill", "#1C1C1C")
  .style("cursor", "defualt")
  .on("mouseover", function () {
   d3.select(this)
   .style("cursor", "pointer")
   .attr("font-size", "11px")
   d3.selectAll("path")
   .style("opacity", function(d) { return opacity_IMP_km_o_t_4[d.name]; })
  })
  .on("mouseleave", mouseleave_regend)


//노드에 대한 정렬을 보여주는 부분 오른쪽 아래 

// var sort_node_up = ["1.NODE11(53.52%)","2.NODE12(23.51%)","3.NODE5(13.45%)","4.NODE25(9.23%)","5.NODE21(5.25%)","6.NODE10(2.38%)","7.NODE18(1.89%)","8.NODE19(1.75%)","9.NODE13(1.53%)","10.NODE4(1.12%)"];

// var sort_node_down = ["1.NODE4(1.12%)","2.NODE13(1.53%)","3.NODE19(1.75%)","4.NODE18(1.89%)","5.NODE10(2.38%)","6.NODE21(5.25%)","7.NODE25(9.23%)","8.NODE5(13.45%)","9.NODE12(23.51%)","10.NODE11(53.52%)"];

// function sortdraw(data){

//     for(var i = 0 ; i < data.length ; i++){
//       svgside.append("text")
//       .attr("class", "sort_text_color")
//       .text(data[i])
//       .attr("x", 60)
//       .attr("y", 395+(22*i))
//       .attr("text-anchor", "start")
//       .attr("font-family", "Open Sans")
//       .attr("font-size", "12px")
//       .attr("font-weight","bold")
//       .attr("fill", "#1C1C1C")
//     }
// }

// svgside.append("rect")
// .attr("class", "sort_rect")
// .attr("x", 50)
// .attr("y", 340)
// .attr("width", 350)
// .attr("height", 30)
// .attr("fill", "#AEA796")
// .attr("stroke","#AEA796")
// .attr("stroke-width","1px")

// svgside.append("image")
// .attr("xlink:href", "images/Decisiontree_sort.png")
// .attr("x", 60)
// .attr("y", 346)
// .attr("width", 50)
// .attr("height", 25);

// svgside.append("rect")
// .attr("class", "sort_rect")
// .attr("x", 50)
// .attr("y", 370)
// .attr("width", 350)
// .attr("height", 240)
// .attr("fill", "white")
// .attr("stroke","#AEA796")
// .attr("stroke-width","1px")

// svgside.append("image")
// .attr("xlink:href", "images/up.png")
// .attr("x", 125)
// .attr("y", 346)
// .attr("width", 20)
// .attr("height", 20)
// .on("mouseover", function () {
//     d3.select(this)
//     .attr("x", 123)
//     .attr("y", 344)
//     .attr("width", 24)
//     .attr("height", 24)
//     .style("cursor", "pointer")
//   })
// .on("mouseout", function () {
//     d3.select(this)
//     .attr("x", 125)
//     .attr("y", 346)
//     .attr("width", 20)
//     .attr("height", 20)
//     .style("cursor", "default")
//   })
// //.on("click",sortdraw(sort_node_up));

// svgside.append("image")
// .attr("xlink:href", "images/down.png")
// .attr("x", 150)
// .attr("y", 346)
// .attr("width", 20)
// .attr("height", 20)
// .on("mouseover", function () {
//     d3.select(this)
//     .attr("x", 148)
//     .attr("y", 344)
//     .attr("width", 24)
//     .attr("height", 24)
//     .style("cursor", "pointer")
//   })
//   .on("mouseout", function () {
//     d3.select(this)
//     .attr("x", 150)
//     .attr("y", 346)
//     .attr("width", 20)
//     .attr("height", 20)
//     .style("cursor", "default")
//   })
//   //.on("click",sortdraw(sort_node_down));

// sortdraw(sort_node_up);


// CSV를 JSON으로 변환하는 함수 작성 부분 

function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { 
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {

   var foundChild = false;
   for (var k = 0; k < children.length; k++) {
    if (children[k]["name"] == nodeName) {
      childNode = children[k];
      foundChild = true;
      break;
    }
  }

  if (!foundChild) {
    childNode = {"name": nodeName, "children": []};
    children.push(childNode);
  }
  currentNode = childNode;
} else {

 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
 }
}
}
return root;
};
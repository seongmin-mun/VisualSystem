$(document).ready(function () {



  var Kings = ['태조', '혜종', '정종', '광종', '경종', '성종', '목종', '현종']
  var Kings_eng = ['Taejo', 'Hyejong', 'Jeongjong', 'Gwangjong', 'Gyeongjong', 'Seongjong', 'Mokjong', 'Hyeonjong']

  // 지도 네트워크 시각화를 위한 SVG생성
  var sectionWidth = $("#section_top").width()   //윈도우 넓이
  var sectionHeight = $("#section_top").height()   //윈도우 높이


  var svgSection = d3.select('#section_top').append('svg')
        .attr('width', sectionWidth)
        .attr('height', (sectionHeight*0.935))
        .call(d3.zoom().scaleExtent([0.5, 5]).on("zoom", function () {
          svgSection.attr("transform", d3.event.transform)
        }))
        .append("g");

    var div_currentking = d3.select("#section").append("div")
          .attr("class", "currentking")
          .style("opacity", 0.8)
          .style("right", sectionWidth*0.03+"px")
          .style("top", sectionHeight*0.01+"px");

    var div_inner = d3.select("#section").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);














  // slider
  var SB_width = $("#section_bottom_right").width()   //윈도우 넓이
  var SB_height = $("#section_bottom_right").height()

  var SB_svg = d3.select("#section_bottom_right")
    .append("svg")
    .attr("width", SB_width)
    .attr("height", SB_height);



  ////////// slider //////////

  var target = actual = 0;
  var alpha = 0.2;
  var timer = d3.timer(updateTween);
  var stepTimer;
  var moving = false;
  var maxValue = Kings.length - 2;
  var trailLength = 10;
  var currentEpoch = 0;

  var playButton = d3.select("#play-button");

  var x = d3.scaleLinear()
      .domain([0, (Kings.length - 1)])
      .range([0, SB_width*0.9])
      .clamp(true);

  var slider = SB_svg.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + SB_width*0.05 + "," + SB_height/2 + ")");

  slider.append("line")
      .attr("class", "track")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .call(d3.drag()
          .on("start.interrupt", function() { slider.interrupt();})
          .on("start drag", function() {
            currentValue = d3.event.x;
            update(x.invert(currentValue));
          })
          .on("end drag", function() { drawall();})
      );

  slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(x.ticks(7))
      .enter().append("text")
      .attr("x", x)
      .attr("text-anchor", "middle")
      .text(d => Kings_eng[d]);
      // .text(d => Kings_eng[d] + " ("+Kings[d]+")");

  const handle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);

  d3.select(window)
      .on("keydown", keydowned);

  playButton
      .on("click", paused)
      .each(paused);

  function update(d) {
    target = d;
    moving = true;
    timer.restart(updateTween);
    drawall();
  }

  // console.log($(".handle cx").val());

  // var firstHandleCX = 0



  function updateTween() {
    let diff = target - actual;
    if (Math.abs(diff) < 1e-3) actual = target, timer.stop();
    else actual += diff * alpha;
    handle.attr("cx", x(actual));
    currentEpoch = Math.round(actual)

    return currentEpoch

  }

  function keydowned() {
    let currentValue = actual;
    if (d3.event.metaKey || d3.event.altKey) return;
    switch (d3.event.keyCode) {
      case 37: currentValue = Math.max(x.domain()[0], actual - trailLength); break;
      case 39: currentValue = Math.min(x.domain()[1], actual + trailLength); break;
      default: return;
    }
    update(currentValue);
    paused();
  }


  function paused() {
    if (moving) {
      slider.interrupt();
      clearInterval(stepTimer);
      moving = false;
      playButton.text("Play");
    } else {
      if (actual > maxValue) actual = 0;
      stepTimer = setInterval(step, 3500);
      moving = true;
      playButton.text("Pause");
    }
  }

  function step() {
    if (actual > maxValue) {
      paused();
    } else {
      update(actual + trailLength / 10);
    }
  }

  paused();
















  //체크박스 데이터
  function cityCheckBoxChange() {

      var data_checkbox = []

      if ($("#play-button").text()=="Pause"){
        KingNow = Kings[updateTween()+1]
      } else {
        KingNow = Kings[updateTween()]
      }

      for(var i = 0 ; i < cityCheckbox.length; i++){
        if (cityCheckbox[i].king_kor==KingNow){
          for(var j = 0 ; j < cityCheckbox[i].cities.length; j++){
            if(checkedeachValue('CB_leftbottom_'+cityCheckbox[i].cities[j].city_eng.toLowerCase())!=='null'){
              data_checkbox.push(checkedeachValue('CB_leftbottom_'+cityCheckbox[i].cities[j].city_eng.toLowerCase()));
            }
          }
        }
      }

      return data_checkbox;
  }

  function checkedeachValue(checkeddata){
      var value;
      var checkedValue = document.querySelector('#'+checkeddata+':checked');
      if(checkedValue == null){
        value = "null";
      } else {
        value = checkedValue.value;
      }
      return value;
  }











  var urls = {
    map: "./data/worldMap.json",
    nodeData: "./data/ForVisMap_node.csv",
    linkData: "./data/ForVisMap_link.csv"
  };




  //map.objects.states -> map.objects.countries

  // const projection = d3.geoMercator().scale(100).translate([700, 300]);
  const projection = d3.geoMercator().scale(3400).translate([-7220, 2860]);

  const pathmap = d3.geoPath(projection);

  const gmap = svgSection.append("g");
  // have these already created for easier drawing

  d3.json(urls.map).then(data => {
    const countries = topojson.feature(data, data.objects.countries);
    const countries2 = isContinental(countries);


    // g.selectAll("path").data(countries.features).enter().append("path").attr("class","county").attr("d",path)
    gmap.selectAll("path").data(countries2).enter().append("path").attr("class","county").attr("d",pathmap)

    function isContinental(country) {
      const dataFiltered = []
      for (var i = 0; i < country.features.length ; i++) {
        // console.log(country.features[i])
        if(country.features[i].id === '408' || country.features[i].id === '410'){
          dataFiltered.push(country.features[i])
        }
      }
      return dataFiltered
    }
  });











































  firstdrawdata();



  d3.selectAll("#op_measure").on("change", drawall);
  d3.selectAll("#container_leftbottom").on("change", drawall);


  //모든 함수 가동부분
  function drawall(){

      var selected_measure = $("#op_measure").val();
      // var selected_node_color = $( "#op_node_color" ).val();
      // var selected_node_color = $( "#op_node_color" ).val();

      var origins = cityCheckBoxChange();
      // changedrawdata(selected_postposition,selected_node_color,functions,indexs)
      changedrawdata(selected_measure, origins)

  }







  // 시각화 처음 생성 (초기 화면)
  function firstdrawdata() {
    // var textlabel = div_currentking.append("text")
    //         .attr("class", "textlabel")
    //         .attr("text-anchor", "middle")
    //         .text(Kings_eng[0] + " ("+Kings[0]+")")
    //         .attr("text-anchor", "end")
    //         .attr("font-family", "Open Sans")
    //         .attr("font-size", "20px")
    //         .attr("fill", "#C2C1C1")

    for(var i = 0 ; i < cityCheckbox.length; i++){
      if (cityCheckbox[i].king_kor==Kings[0]){
        for(var j = 0 ; j < cityCheckbox[i].cities.length; j++){
          $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='"+cityCheckbox[i].cities[j].city_eng.toLowerCase()+"' id='CB_leftbottom_"+cityCheckbox[i].cities[j].city_eng.toLowerCase()+"' /> <label class='CB_leftbottom'><svg width='12' height='12' ><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+cityCheckbox[i].cities[j].city_color+";opacity:0.9;'/></svg> "+cityCheckbox[i].cities[j].city_eng+" ("+cityCheckbox[i].cities[j].city_kor+")</label></br>");
        }
      }
    }


    for(var i = 0 ; i < visTableRange.length; i++){
      if (visTableRange[i].king_kor==Kings[0]){
        for(var j = 0 ; j < visTableRange[i].frequency.length; j++){
          $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].frequency[j].name_eng+" ("+visTableRange[i].frequency[j].name_kor+")</td><td style='color: "+visTableRange[i].frequency[j].city_color+";'>"+visTableRange[i].frequency[j].city_eng+" ("+visTableRange[i].frequency[j].city_kor+")</td><td>"+visTableRange[i].frequency[j].score+"</td></tr>");
        }
      }
    }

    //네트워크 그리기
    var nodeNetwork = node1
    var linkNetwork = edge1

    for (var i = 0; i < nodeNetwork.length ; i++) {
      nodeNetwork[i]['opacity'] = 0.5
    }

    $('#container_righttop').empty();

    var container = document.getElementById("container_righttop");
    var data = {
      nodes: nodeNetwork,
      edges: linkNetwork,
    };
    var options = {
      nodes: {
        shape: "dot",
        size: 16,
        font: {
          size: 25,
          color: "#9BA19B",
          opacity: 0.5,
          // strokeWidth: 3,
          // strokeColor: "#ffffff",
        },
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
    };
    var network = new vis.Network(container, data, options);






    d3.csv(urls.linkData).then(data => {

      var dataLinks = []
      for (var i = 0; i < data.length ; i++) {
        data[i]['city_opacity'] = 0.7
        if(data[i].king_kor === '태조'){
          dataLinks.push(data[i])
        }
      }

      gmap.selectAll("line")
      .data(dataLinks)
      .enter()
      .append("line")
      .attr("class", "cityLink")
      .attr("x1",  function(d) {
              return projection([d.long_s, d.lat_s])[0];
      })
      .attr("y1",  function(d) {
              return projection([d.long_s, d.lat_s])[1];
      })
      .attr("x2",  function(d) {
              return projection([d.long_t, d.lat_t])[0];
      })
      .attr("y2",  function(d) {
              return projection([d.long_t, d.lat_t])[1];
      })
      .attr("stroke", "#5C625B")
      // .style("stroke-dasharray", ("3, 3"))
      .attr('stroke-width', function(d) {
        var linkWidth = 0
        var minmaxScore = (d.count-1)/54  //(x - min(x)) / (max(x) - min(x))
        if(minmaxScore+1 <= 2){
          linkWidth = 1
        } else if(minmaxScore+1 >= 5){
          linkWidth = 4
        } else {
          linkWidth = minmaxScore+1
        }
        return linkWidth;
      })
      .attr("opacity", function(d) {
              return d.city_opacity;
      })
      .on("mouseover", function (d) {
        d3.select(this)
        .attr("opacity", 1)
      })
      .on("mouseout", function (d) {
        d3.select(this)
        .attr("opacity", function(d) {
                return d.city_opacity;
        })
      });

    });



    d3.csv(urls.nodeData).then(data => {

      const dataNodes = []

      for (var i = 0; i < data.length ; i++) {
        data[i]['city_opacity'] = 1
        if(data[i].measureType === 'frequency' && data[i].king_kor === '태조'){
          dataNodes.push(data[i])
        }
      }



      gmap.selectAll("text")
         .data(dataNodes)
         .enter()
         .append("text")
         .attr("class","cityText")
         .text(function (d) {
            return d.city_eng+" ("+d.city_kor+")";
         })
         .attr("font-size", function(d) {
           if (d.score == 0){
             return "0px";
           } else {
             return "11px";
           }
         })
         .attr("x", function(d) {
                 return projection([d.long, d.lat])[0] + 7;
         })
         .attr("y", function(d) {
                 return projection([d.long, d.lat])[1] + 3;
         })
         .attr("font-family", "sans-serif")
         .attr("fill", "rgb(51,51,51)")
         .attr("opacity", 0.6)



      gmap.selectAll("circle")
         .data(dataNodes)
         .enter()
         .append("circle")
         .attr("class","cityNode")
         .attr("cx", function(d) {
                 return projection([d.long, d.lat])[0];
         })
         .attr("cy", function(d) {
                 return projection([d.long, d.lat])[1];
         })
         .attr("r", function(d) {
           var nodeSize = 0
           if (d.measureType === "frequency"){
             if(0 < d.score && d.score <= 2){
               nodeSize = 2
             } else if(d.score >= 20 ){
               nodeSize = 20
             } else {
               nodeSize = d.score
             }
           } else {
             if(0 < d.score && d.score * 2 <= 2){
               nodeSize = 2
             } else if(d.score * 2 >= 20 ){
               nodeSize = 20
             } else {
               nodeSize = d.score * 2
             }
           }
           return nodeSize;
         })
         .attr("opacity", function(d) {
                 return d.city_opacity;
         })
         .style("fill", function(d) {
                 return d.city_color;
         })
         .attr("stroke", "black")
         .attr("stroke-width", "0.5px")
         .on("mouseover", function (d) {
           d3.select(this)
           .attr("stroke", "red")
           .attr("stroke-width", "1px")
           .attr("opacity", 1)
         })
         .on("mouseout", function (d) {
           d3.select(this)
           .attr("stroke", "black")
           .attr("stroke-width", "0.5px")
           .attr("opacity", function(d) {
                   return d.city_opacity;
           })
         })
         .on("mouseenter", function (d) {
               div_inner.transition()
                   .duration(200)
                   .style("opacity", 0.85);
               div_inner.html("<strong>Selected origin</strong><br><br><p>ID : "+d.city_ID+"<br>Name : "+d.city_eng + " (" + d.city_kor +")"+"<br>Score : "  + d.score + "<br>Longitude : " + d.long + "<br>Latitude : " + d.lat + "<p/>")
                   .style("left", "20px")
                   .style("top", sectionHeight*0.07+"px");
          })
          .on("mouseleave", function () {
               div_inner.transition()
                   .duration(500)
                   .style("opacity", 0);
          })




    })



  }




  // 시각화 변경
  function changedrawdata(selected_measure, originsList) {

    console.log(selected_measure);
    console.log(originsList);

    if ($("#play-button").text()=="Pause"){
      KingNow = Kings[updateTween()+1]
      KingLabel = Kings_eng[updateTween()+1] + " ("+Kings[updateTween()+1]+")"
    } else {
      KingNow = Kings[updateTween()]
      KingLabel = Kings_eng[updateTween()] + " ("+Kings[updateTween()]+")"
    }

    console.log(KingNow);

    $('#container_leftbottom').empty();
    for(var i = 0 ; i < cityCheckbox.length; i++){
      if (cityCheckbox[i].king_kor==KingNow){
        for(var j = 0 ; j < cityCheckbox[i].cities.length; j++){

          if (originsList.includes(cityCheckbox[i].cities[j].city_eng.toLowerCase())){
            $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='"+cityCheckbox[i].cities[j].city_eng.toLowerCase()+"' id='CB_leftbottom_"+cityCheckbox[i].cities[j].city_eng.toLowerCase()+"' checked/> <label class='CB_leftbottom'><svg width='12' height='12' ><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+cityCheckbox[i].cities[j].city_color+";opacity:0.9;'/></svg> "+cityCheckbox[i].cities[j].city_eng+" ("+cityCheckbox[i].cities[j].city_kor+")</label></br>");
          } else {
            $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='"+cityCheckbox[i].cities[j].city_eng.toLowerCase()+"' id='CB_leftbottom_"+cityCheckbox[i].cities[j].city_eng.toLowerCase()+"' /> <label class='CB_leftbottom'><svg width='12' height='12' ><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+cityCheckbox[i].cities[j].city_color+";opacity:0.9;'/></svg> "+cityCheckbox[i].cities[j].city_eng+" ("+cityCheckbox[i].cities[j].city_kor+")</label></br>");
          }
        }
      }
    }



    $('#infotable').empty();
    for(var i = 0 ; i < visTableRange.length; i++){
      if (cityCheckbox[i].king_kor==KingNow){
        if (selected_measure=="frequency"){

          for(var j = 0 ; j < visTableRange[i].frequency.length; j++){
            if (originsList.includes(visTableRange[i].frequency[j].city_eng.toLowerCase())){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].frequency[j].name_eng+" ("+visTableRange[i].frequency[j].name_kor+")</td><td style='color: "+visTableRange[i].frequency[j].city_color+";'>"+visTableRange[i].frequency[j].city_eng+" ("+visTableRange[i].frequency[j].city_kor+")</td><td>"+visTableRange[i].frequency[j].score+"</td></tr>");
            } else if (originsList.length == 0){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].frequency[j].name_eng+" ("+visTableRange[i].frequency[j].name_kor+")</td><td style='color: "+visTableRange[i].frequency[j].city_color+";'>"+visTableRange[i].frequency[j].city_eng+" ("+visTableRange[i].frequency[j].city_kor+")</td><td>"+visTableRange[i].frequency[j].score+"</td></tr>");
            }
          }

        } else if (selected_measure=="degree"){

          for(var j = 0 ; j < visTableRange[i].degree.length; j++){
            if (originsList.includes(visTableRange[i].degree[j].city_eng.toLowerCase())){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].degree[j].name_eng+" ("+visTableRange[i].degree[j].name_kor+")</td><td style='color: "+visTableRange[i].degree[j].city_color+";'>"+visTableRange[i].degree[j].city_eng+" ("+visTableRange[i].degree[j].city_kor+")</td><td>"+visTableRange[i].degree[j].score+"</td></tr>");
            } else if (originsList.length == 0){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].degree[j].name_eng+" ("+visTableRange[i].degree[j].name_kor+")</td><td style='color: "+visTableRange[i].degree[j].city_color+";'>"+visTableRange[i].degree[j].city_eng+" ("+visTableRange[i].degree[j].city_kor+")</td><td>"+visTableRange[i].degree[j].score+"</td></tr>");
            }
          }

        } else if (selected_measure=="closeness"){

          for(var j = 0 ; j < visTableRange[i].closeness.length; j++){
            if (originsList.includes(visTableRange[i].closeness[j].city_eng.toLowerCase())){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].closeness[j].name_eng+" ("+visTableRange[i].closeness[j].name_kor+")</td><td style='color: "+visTableRange[i].closeness[j].city_color+";'>"+visTableRange[i].closeness[j].city_eng+" ("+visTableRange[i].closeness[j].city_kor+")</td><td>"+visTableRange[i].closeness[j].score+"</td></tr>");
            } else if (originsList.length == 0){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].closeness[j].name_eng+" ("+visTableRange[i].closeness[j].name_kor+")</td><td style='color: "+visTableRange[i].closeness[j].city_color+";'>"+visTableRange[i].closeness[j].city_eng+" ("+visTableRange[i].closeness[j].city_kor+")</td><td>"+visTableRange[i].closeness[j].score+"</td></tr>");
            }
          }

        } else if (selected_measure=="betweenness"){

          for(var j = 0 ; j < visTableRange[i].betweenness.length; j++){
            if (originsList.includes(visTableRange[i].betweenness[j].city_eng.toLowerCase())){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].betweenness[j].name_eng+" ("+visTableRange[i].betweenness[j].name_kor+")</td><td style='color: "+visTableRange[i].betweenness[j].city_color+";'>"+visTableRange[i].betweenness[j].city_eng+" ("+visTableRange[i].betweenness[j].city_kor+")</td><td>"+visTableRange[i].betweenness[j].score+"</td></tr>");
            } else if (originsList.length == 0){
              $("#infotable").append("<tr style='padding: 0px;'><td>"+visTableRange[i].betweenness[j].name_eng+" ("+visTableRange[i].betweenness[j].name_kor+")</td><td style='color: "+visTableRange[i].betweenness[j].city_color+";'>"+visTableRange[i].betweenness[j].city_eng+" ("+visTableRange[i].betweenness[j].city_kor+")</td><td>"+visTableRange[i].betweenness[j].score+"</td></tr>");
            }
          }

        }
      }
    }




    //네트워크 그리기

    var nodeNetwork
    var linkNetwork

    if (KingNow === "태조"){
      nodeNetwork = node1
      linkNetwork = edge1
    } else if (KingNow === "혜종"){
      nodeNetwork = node2
      linkNetwork = edge2
    } else if (KingNow === "정종"){
      nodeNetwork = node3
      linkNetwork = edge3
    } else if (KingNow === "광종"){
      nodeNetwork = node4
      linkNetwork = edge4
    } else if (KingNow === "경종"){
      nodeNetwork = node5
      linkNetwork = edge5
    } else if (KingNow === "성종"){
      nodeNetwork = node6
      linkNetwork = edge6
    } else if (KingNow === "목종"){
      nodeNetwork = node7
      linkNetwork = edge7
    } else if (KingNow === "현종"){
      nodeNetwork = node8
      linkNetwork = edge8
    }

    for (var i = 0; i < nodeNetwork.length ; i++) {
      if(originsList.length == 0){
        nodeNetwork[i]['opacity'] = 0.5
      } else {
        if(originsList.includes(nodeNetwork[i].group_eng.toLowerCase())){
          nodeNetwork[i]['opacity'] = 1
        } else {
          nodeNetwork[i]['opacity'] = 0.2
        }
      }
    }

    $('#container_righttop').empty();

    var container = document.getElementById("container_righttop");
    var data = {
      nodes: nodeNetwork,
      edges: linkNetwork,
    };
    var options = {
      nodes: {
        shape: "dot",
        size: 16,
        font: {
          size: 25,
          color: "#9BA19B",
          opacity: 0.5,
        },
      },
      physics: {
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
        },
        maxVelocity: 146,
        solver: "forceAtlas2Based",
        timestep: 0.35,
        stabilization: { iterations: 150 },
      },
    };
    var network = new vis.Network(container, data, options);







    d3.csv(urls.linkData).then(data => {


      var dataLinks = []

      for (var i = 0; i < data.length ; i++) {
        if(originsList.length == 0){
          data[i]['city_opacity'] = 0.7
        } else {
          if(originsList.includes(data[i].city_eng_s.toLowerCase()) || originsList.includes(data[i].city_eng_t.toLowerCase())){
            data[i]['city_opacity'] = 1
          } else {
            data[i]['city_opacity'] = 0.2
          }
        }

        if(data[i].king_kor === KingNow){
          dataLinks.push(data[i])
        }
      }

      //다시 그리기
      svgSection.selectAll(".cityLink").remove();

      gmap.selectAll("line")
      .data(dataLinks)
      .enter()
      .append("line")
      .attr("class", "cityLink")
      .attr("x1",  function(d) {
              return projection([d.long_s, d.lat_s])[0];
      })
      .attr("y1",  function(d) {
              return projection([d.long_s, d.lat_s])[1];
      })
      .attr("x2",  function(d) {
              return projection([d.long_t, d.lat_t])[0];
      })
      .attr("y2",  function(d) {
              return projection([d.long_t, d.lat_t])[1];
      })
      .attr("stroke", "#5C625B")
      // .style("stroke-dasharray", ("3, 3"))
      .attr('stroke-width', function(d) {
        var linkWidth = 0
        var minmaxScore = (d.count-1)/54  //(x - min(x)) / (max(x) - min(x))
        if(minmaxScore+1 <= 2){
          linkWidth = 1
        } else if(minmaxScore+1 >= 5){
          linkWidth = 4
        } else {
          linkWidth = minmaxScore+1
        }
        return linkWidth;
      })
      .attr("opacity", function(d) {
              return d.city_opacity;
      })
      .on("mouseover", function (d) {
        d3.select(this)
        .attr("opacity", 1)
      })
      .on("mouseout", function (d) {
        d3.select(this)
        .attr("opacity", function(d) {
                return d.city_opacity;
        })
      });


    });


    d3.csv(urls.nodeData).then(data => {

      var dataNodes = []

      for (var i = 0; i < data.length ; i++) {
        if(originsList.length == 0){
          data[i]['city_opacity'] = 1
        } else {
          if(originsList.includes(data[i].city_eng.toLowerCase())){
            data[i]['city_opacity'] = 1
          } else {
            data[i]['city_opacity'] = 0.3
          }
        }

        if(data[i].measureType === selected_measure && data[i].king_kor === KingNow){
          dataNodes.push(data[i])
        }
      }




      svgSection.selectAll(".cityText").remove();

      gmap.selectAll("text")
         .data(dataNodes)
         .enter()
         .append("text")
         .attr("class","cityText")
         .text(function (d) {
            return d.city_eng+" ("+d.city_kor+")";
         })
         .attr("font-size", function(d) {
           if (d.score == 0){
             return "0px";
           } else {
             return "11px";
           }
         })
         .attr("x", function(d) {
                 return projection([d.long, d.lat])[0] + 7;
         })
         .attr("y", function(d) {
                 return projection([d.long, d.lat])[1] + 3;
         })
         .attr("font-family", "sans-serif")
         .attr("fill", "rgb(51,51,51)")
         .attr("opacity", 0.6)




      //다시 그리기
      svgSection.selectAll(".cityNode").remove();

      gmap.selectAll("circle")
         .data(dataNodes)
         .enter()
         .append("circle")
         .attr("class","cityNode")
         .attr("cx", function(d) {
                 return projection([d.long, d.lat])[0];
         })
         .attr("cy", function(d) {
                 return projection([d.long, d.lat])[1];
         })
         .attr("r", function(d) {
           var nodeSize = 0
           if (d.measureType === "frequency"){
             if(0 < d.score && d.score <= 2){
               nodeSize = 2
             } else if(d.score >= 20 ){
               nodeSize = 20
             } else {
               nodeSize = d.score
             }
           } else {
             if(0 < d.score && d.score * 2 <= 2){
               nodeSize = 2
             } else if(d.score * 2 >= 20 ){
               nodeSize = 20
             } else {
               nodeSize = d.score * 2
             }
           }
           return nodeSize;
         })
         .attr("opacity", function(d) {
                 return d.city_opacity;
         })
         .style("fill", function(d) {
                 return d.city_color;
         })
         .attr("stroke", "black")
         .attr("stroke-width", "0.5px")
         .on("mouseover", function (d) {
           d3.select(this)
           .attr("stroke", "red")
           .attr("stroke-width", "1px")
           .attr("opacity", 1)
         })
         .on("mouseout", function (d) {
           d3.select(this)
           .attr("stroke", "black")
           .attr("stroke-width", "0.5px")
           .attr("opacity", function(d) {
                   return d.city_opacity;
           })
         })
         .on("mouseenter", function (d) {
               div_inner.transition()
                   .duration(200)
                   .style("opacity", 0.85);
               div_inner.html("<strong>Selected origin</strong><br><br><p>ID : "+d.city_ID+"<br>Name : "+d.city_eng + " (" + d.city_kor +")"+"<br>Score : "  + d.score + "<br>Longitude : " + d.long + "<br>Latitude : " + d.lat + "<p/>")
                   .style("left", "20px")
                   .style("top", sectionHeight*0.07+"px");
          })
          .on("mouseleave", function () {
               div_inner.transition()
                   .duration(500)
                   .style("opacity", 0);
          })





    })



    // var textlabel = div_currentking.selectAll(".textlabel")
    //   textlabel.enter()
    //            .append("text")
    //            .attr("class", "label")
    //            .text(KingLabel)
    //   textlabel.transition()
    //            .duration(10)
    //            .text(KingLabel)
    //   textlabel.exit().remove();
  }



})
$(document).ready(function () {


    var function_name = ['agt','crt','eff','fns','gol','ins','loc','thm','src','dir'];
    var function_color = ['#993366','#FF99CC','#FF00FF','#FF6600','#000080','#003300',' #0066CC','#666699','#FFCC00','#5b2e90'];

    //크기 설정
    var LeftsectionWidth = $("#left_bottom_bottom").width()   //윈도우 넓이
    var LeftsectionHeight = $("#left_bottom_bottom").height()   //윈도우 높이


    var LeftsvgSection = d3.select('#left_bottom_bottom').append('svg')
          .attr('width', LeftsectionWidth)
          .attr('height', (LeftsectionHeight*0.9))

    var imgs = LeftsvgSection.append("image")
        .attr("class", "PNG")
        .attr("xlink:href", "https://seongmin-mun.github.io/VisualSystem/Major/PostTransformers/densities/OutBERT/Ey_tSNE_trial_1_epoch_1.png")
        .attr("x", LeftsectionWidth*0.05)
        .attr("y", 0)
        .attr('width', LeftsectionWidth*0.9)
        .attr('height', LeftsectionWidth*0.9);


    //크기 설정
    var sectionWidth = $("#section_top").width()   //윈도우 넓이
    var sectionHeight = $("#section_top").height()   //윈도우 높이


    var svgSection = d3.select('#section_top').append('svg')
          .attr('width', sectionWidth)
          .attr('height', (sectionHeight*0.935))
          .call(d3.zoom().scaleExtent([0.5, 5]).on("zoom", function () {
            svgSection.attr("transform", d3.event.transform)
          }))
          .append("g");

    var div_epoch = d3.select("#section").append("div")
          .attr("class", "epoch")
          .style("opacity", 0.8)
          .style("right", sectionWidth*0.03+"px")
          .style("top", sectionHeight*0.01+"px");

    var textlabel = div_epoch.append("text")
            .attr("class", "textlabel")
            .attr("text-anchor", "middle")
            .text("1 Epoch")
            .attr("text-anchor", "end")
            .attr("font-family", "Open Sans")
            .attr("font-size", "25px")
            .attr("fill", "#C2C1C1")


    var NodeGroup = svgSection.append("g");

    var div_inner = d3.select("#section").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);


    //오른쪽 세션
    var right_top_width = $("#right_top").width()
    var right_top_height = $("#right_top").height()

    var svgright_top = d3.select("#right_top")
          .append("svg")
          .attr("width", right_top_width*0.95)
          .attr("height", (right_top_height*0.95))
          .append('g')
          .attr('transform', 'translate(' + 0 + ',' + 0 + ')');

    svgright_top.append("rect")
          .attr("class", "svgright_rect")
          .attr("x", right_top_width * 0.05)
          .attr("y", 0)
          .attr("width", right_top_width*0.9)
          .attr("height",(right_top_height*0.75))
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("fill", "white")
          .attr('stroke', '#C2C1C1')
          .attr('stroke-width', '2')


    var  epoch_right_top = ["0", "10", "20", "30", "40", "50"]


    for (var k = 0; k < 6; k++) {
        svgright_top.append("text").attr("class", "rangetext").text(epoch_right_top[k]).attr("x", (((right_top_width * 0.82) *0.205) * k) + (right_top_width * 0.085)).attr("y", right_top_height*0.69).attr("text-anchor", "middle").attr("font-family", "Open Sans").attr("font-size", "21px").attr("fill", "#C2C1C1")
    }

    svgright_top.append("line").attr("x1",  right_top_width * 0.05).attr("y1", right_top_height*0.6).attr("x2", right_top_width * 0.95).attr("y2", right_top_height*0.6).attr("stroke-width", "2px").attr("stroke", "#C2C1C1").style("stroke-dasharray", ("3, 3"))

    for (var k = 0; k < 6; k++) {
        svgright_top.append("line").attr("x1", ((right_top_width * 0.162) * k) + (right_top_width * 0.065)).attr("y1", right_top_height*0.01).attr("x2", ((right_top_width * 0.162) * k) + (right_top_width * 0.065)).attr("y2", right_top_height*0.75).attr("stroke-width", "2px").attr("stroke", "#C2C1C1").style("stroke-dasharray", ("3, 3"))
    }


    var right_middle_width = $("#right_middle").width()
    var right_middle_height = $("#right_middle").height()

    var svgright_middle = d3.select("#right_middle")
          .append("svg")
          .attr("width", right_middle_width*0.95)
          .attr("height", (right_middle_height*0.95))

          //screenX

    svgright_middle.append("rect")
          .attr("class", "svgright_rect")
          .attr("x", right_middle_width * 0.05)
          .attr("y", 0)
          .attr("width", right_middle_width*0.9)
          .attr("height",(right_middle_height*0.75))
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("fill", "white")
          .attr('stroke', '#C2C1C1')
          .attr('stroke-width', '2')

    var  epoch_right_middle = ["0", "10", "20", "30", "40", "50"]


    for (var k = 0; k < 6; k++) {
        svgright_middle.append("text").attr("class", "rangetext").text(epoch_right_middle[k]).attr("x", (((right_middle_width * 0.82) *0.205) * k) + (right_middle_width * 0.085)).attr("y", right_middle_height*0.69).attr("text-anchor", "middle").attr("font-family", "Open Sans").attr("font-size", "21px").attr("fill", "#C2C1C1")
    }

    svgright_middle.append("line").attr("x1",  right_middle_width * 0.05).attr("y1", right_middle_height*0.6).attr("x2", right_middle_width * 0.95).attr("y2", right_middle_height*0.6).attr("stroke-width", "2px").attr("stroke", "#C2C1C1").style("stroke-dasharray", ("3, 3"))

    for (var k = 0; k < 6; k++) {
        svgright_middle.append("line").attr("x1", ((right_middle_width * 0.162) * k) + (right_middle_width * 0.065)).attr("y1", right_middle_height*0.01).attr("x2", ((right_middle_width * 0.162) * k) + (right_middle_width * 0.065)).attr("y2", right_middle_height*0.75).attr("stroke-width", "2px").attr("stroke", "#C2C1C1").style("stroke-dasharray", ("3, 3"))
    }


    var right_bottom_width = $("#right_bottom").width()
    var right_bottom_height = $("#right_bottom").height()

    var svgright_bottom = d3.select("#right_bottom")
          .append("svg")
          .attr("width", right_bottom_width*0.95)
          .attr("height", (right_bottom_height*0.95))

          //screenX

    svgright_bottom.append("rect")
          .attr("class", "svgright_rect")
          .attr("x", right_bottom_width * 0.05)
          .attr("y", 0)
          .attr("width", right_bottom_width*0.9)
          .attr("height",(right_bottom_height*0.75))
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("fill", "white")
          .attr('stroke', '#C2C1C1')
          .attr('stroke-width', '2')


    var  epoch_right_bottom = ["0", "10", "20", "30", "40", "50"]


    for (var k = 0; k < 6; k++) {
        svgright_bottom.append("text").attr("class", "rangetext").text(epoch_right_bottom[k]).attr("x", (((right_bottom_width * 0.82) *0.205) * k) + (right_bottom_width * 0.085)).attr("y", right_bottom_height*0.69).attr("text-anchor", "middle").attr("font-family", "Open Sans").attr("font-size", "21px").attr("fill", "#C2C1C1")
    }

    svgright_bottom.append("line").attr("x1",  right_bottom_width * 0.05).attr("y1", right_bottom_height*0.6).attr("x2", right_bottom_width * 0.95).attr("y2", right_bottom_height*0.6).attr("stroke-width", "2px").attr("stroke", "#C2C1C1").style("stroke-dasharray", ("3, 3"))

    for (var k = 0; k < 6; k++) {
        svgright_bottom.append("line").attr("x1", ((right_bottom_width * 0.1651) * k) + (right_bottom_width * 0.065)).attr("y1", right_bottom_height*0.01).attr("x2", ((right_bottom_width * 0.1651) * k) + (right_bottom_width * 0.065)).attr("y2", right_bottom_height*0.75).attr("stroke-width", "2px").attr("stroke", "#C2C1C1").style("stroke-dasharray", ("3, 3"))
    }









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
    var maxValue = 49;
    var trailLength = 10;
    var currentEpoch = 0;

    var playButton = d3.select("#play-button");

    var x = d3.scaleLinear()
        .domain([0, 49])
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
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {
              currentValue = d3.event.x;
              update(x.invert(currentValue));
            })
        );

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(x.ticks(10))
      .enter().append("text")
        .attr("x", x)
        .attr("text-anchor", "middle")
        .text(d => d+" epoch" );

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
        stepTimer = setInterval(step, 1500);
        moving = true;
        playButton.text("Pause");
      }
    }

    function step() {
      if (actual > maxValue) paused();
      else update(actual + trailLength / 10);
    }

    paused();
    //추가 인터페이스
  //의미역 기능 옵션 활성화 부분
  var functionslist_ey = ['LOC','GOL','EFF','CRT','THM','INS','AGT','FNS'];
  var functionsname_ey = ['Location','Goal','Effector','Criterion','Theme','Instrument','Agent','Final State'];
  var functionsname_kr_ey = ["장소", "도착점", "영향주", "기준치", "대상", "도구", "행위주", "결과상태"];
  //var functionslist_ey_number_frame = [1328,665,150,124,58,17,13,11];

  var functionslist_eyse = ['SRC','LOC'];
  var functionsname_eyse = ['Source','Location'];
  var functionsname_kr_eyse = ["출발점","장소"];
  //var functionslist_eyse_number_frame = [487,197];

  var functionslist_lo = ['LOC','DIR','EFF','CRT','INS','FNS'];
  var functionsname_lo = ['Location','Direction','Effector','Criterion','Instrument','Final State'];
  var functionsname_kr_lo = ["장소", "도착점", "영향주", "기준치", "도구", "결과상태"];
  //var functionslist_lo_number_frame = [857,561,324,38,22,9];

  function draw_op_function_after(post,list,name,name_kr){
      $('#container_leftmiddle').empty();
      if (post === "ey"){
            for(var i = 0 ; i < list.length; i++){
                var color = ""
                var currentFunc = list[i].toLowerCase()
                if (currentFunc == function_name[0]) {
                    color = function_color[0]
                } else if (currentFunc == function_name[1]) {
                    color = function_color[1]
                } else if (currentFunc == function_name[2]) {
                    color = function_color[2]
                } else if (currentFunc == function_name[3]) {
                    color = function_color[3]
                } else if (currentFunc == function_name[4]) {
                    color = function_color[4]
                } else if (currentFunc == function_name[5]) {
                    color = function_color[5]
                } else if (currentFunc == function_name[6]) {
                    color = function_color[6]
                } else if (currentFunc == function_name[7]) {
                    color = function_color[7]
                } else if (currentFunc == function_name[8]) {
                    color = function_color[8]
                } else if (currentFunc == function_name[9]) {
                    color = function_color[9]
                }
                  $("#container_leftmiddle").append("<input class='CB_leftmiddle' type='checkbox' value='"+list[i].toLowerCase()+"' id='CB_leftmiddle_"+list[i].toLowerCase()+"' /> <label class='CB_leftmiddle'><svg width='12' height='12' ><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+color+";opacity:0.9;'/></svg> "+list[i]+" ("+name[i]+","+name_kr[i]+")</label></br>");
              }
        } else if (post === "eyse"){
            for(var i = 0 ; i < list.length; i++){
                var color = ""
                var currentFunc = list[i].toLowerCase()
                if (currentFunc == function_name[0]) {
                    color = function_color[0]
                } else if (currentFunc == function_name[1]) {
                    color = function_color[1]
                } else if (currentFunc == function_name[2]) {
                    color = function_color[2]
                } else if (currentFunc == function_name[3]) {
                    color = function_color[3]
                } else if (currentFunc == function_name[4]) {
                    color = function_color[4]
                } else if (currentFunc == function_name[5]) {
                    color = function_color[5]
                } else if (currentFunc == function_name[6]) {
                    color = function_color[6]
                } else if (currentFunc == function_name[7]) {
                    color = function_color[7]
                } else if (currentFunc == function_name[8]) {
                    color = function_color[8]
                } else if (currentFunc == function_name[9]) {
                    color = function_color[9]
                }
                  $("#container_leftmiddle").append("<input class='CB_leftmiddle' type='checkbox' value='"+list[i].toLowerCase()+"' id='CB_leftmiddle_"+list[i].toLowerCase()+"' /> <label class='CB_leftmiddle'><svg width='12' height='12'><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+color+";opacity:0.9;'/></svg> "+list[i]+" ("+name[i]+","+name_kr[i]+")</label></br>");
              }
        } else if (post === "(u)lo"){
            for(var i = 0 ; i < list.length; i++){
                var color = ""
                var currentFunc = list[i].toLowerCase()
                if (currentFunc == function_name[0]) {
                    color = function_color[0]
                } else if (currentFunc == function_name[1]) {
                    color = function_color[1]
                } else if (currentFunc == function_name[2]) {
                    color = function_color[2]
                } else if (currentFunc == function_name[3]) {
                    color = function_color[3]
                } else if (currentFunc == function_name[4]) {
                    color = function_color[4]
                } else if (currentFunc == function_name[5]) {
                    color = function_color[5]
                } else if (currentFunc == function_name[6]) {
                    color = function_color[6]
                } else if (currentFunc == function_name[7]) {
                    color = function_color[7]
                } else if (currentFunc == function_name[8]) {
                    color = function_color[8]
                } else if (currentFunc == function_name[9]) {
                    color = function_color[9]
                }
                  $("#container_leftmiddle").append("<input class='CB_leftmiddle' type='checkbox' value='"+list[i].toLowerCase()+"' id='CB_leftmiddle_"+list[i].toLowerCase()+"' /> <label class='CB_leftmiddle'><svg width='12' height='12'><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+color+";opacity:0.9;'/></svg> "+list[i]+" ("+name[i]+","+name_kr[i]+")</label></br>");
              }
        }
  }

  function op_function_change(){
      var selected_postposition = $( "#op_postposition" ).val();
      if (selected_postposition === "ey"){
          draw_op_function_after("ey",functionslist_ey,functionsname_ey,functionsname_kr_ey)
          draw_op_index_after("ey")

      } else if (selected_postposition === "eyse"){
          draw_op_function_after("eyse",functionslist_eyse,functionsname_eyse,functionsname_kr_eyse)
          draw_op_index_after("eyse")
      } else if (selected_postposition === "(u)lo"){
          draw_op_function_after("(u)lo",functionslist_lo,functionsname_lo,functionsname_kr_lo)
          draw_op_index_after("(u)lo")
      }

      drawall();
  }

  function draw_op_index_after(post){
    $('#container_leftbottom').empty();
    if (post === "ey"){
        for(var i = 0 ; i < 467; i++){
              $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='index"+i+"' id='CB_leftbottom_"+i+"' /> <label class='CB_leftbottom'>index_"+i+"</label></br>");
          }
    } else if (post === "eyse"){
        for(var i = 0 ; i < 484; i++){
              $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='index"+i+"' id='CB_leftbottom_"+i+"' /> <label class='CB_leftbottom'>index_"+i+"</label></br>");
          }
    } else if (post === "(u)lo"){
        for(var i = 0 ; i < 467; i++){
              $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='index"+i+"' id='CB_leftbottom_"+i+"' /> <label class='CB_leftbottom'>index_"+i+"</label></br>");
          }
    }
  }


  //체크박스 데이터
  function functioncheckbox() {

    var data_checkbox = []

    var selected_postposition = $( "#op_postposition" ).val();
      if (selected_postposition === "ey"){
        for(var i = 0; i < functionslist_ey.length; i++){
            if(checkedeachValue('CB_leftmiddle_'+functionslist_ey[i].toLowerCase())!=='null'){
              data_checkbox.push(checkedeachValue('CB_leftmiddle_'+functionslist_ey[i].toLowerCase()));
            }
          }

      } else if (selected_postposition === "eyse"){
        for(var i = 0; i < functionslist_eyse.length; i++){
            if(checkedeachValue('CB_leftmiddle_'+functionslist_eyse[i].toLowerCase())!=='null'){
              data_checkbox.push(checkedeachValue('CB_leftmiddle_'+functionslist_eyse[i].toLowerCase()));
            }
          }
      } else if (selected_postposition === "(u)lo"){
          for(var i = 0; i < functionslist_lo.length; i++){
            if(checkedeachValue('CB_leftmiddle_'+functionslist_lo[i].toLowerCase())!=='null'){
              data_checkbox.push(checkedeachValue('CB_leftmiddle_'+functionslist_lo[i].toLowerCase()));
            }
          }
      }

      return data_checkbox;
  }



  function indexcheckbox() {

    var data_checkbox = []

    var selected_postposition = $( "#op_postposition" ).val();
      if (selected_postposition === "ey"){
        for(var i = 0 ; i < 467; i++){
            if(checkedeachValue('CB_leftbottom_'+i)!=='null'){
              data_checkbox.push(checkedeachValue('CB_leftbottom_'+i));
            }
          }

      } else if (selected_postposition === "eyse"){
        for(var i = 0 ; i < 484; i++){
            if(checkedeachValue('CB_leftbottom_'+i)!=='null'){
              data_checkbox.push(checkedeachValue('CB_leftbottom_'+i));
            }
          }
      } else if (selected_postposition === "(u)lo"){
          for(var i = 0 ; i < 467; i++){
            if(checkedeachValue('CB_leftbottom_'+i)!=='null'){
              data_checkbox.push(checkedeachValue('CB_leftbottom_'+i));
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

  //네트워크
  firstdrawdata();

  // d3.selectAll("#op_node_color").on("change", drawall);

  d3.selectAll("#op_postposition").on("change", op_function_change);
  d3.selectAll("#op_model").on("change", drawall);
  d3.selectAll("#container_leftmiddle").on("change", drawall);
  d3.selectAll("#container_leftbottom").on("change", drawall);
  // d3.selectAll("#op_node_color").on("change", drawall);



  op_function_change();



  //line graph
  function right_top_draw(){
        var selected_postposition = $( "#op_postposition" ).val();
        var selected_model = $( "#op_model" ).val();

        EpochNoww = updateTween()

        svgright_top.selectAll(".righttoppath").remove();

        var dataTotal = []

        for (var i = 0; i < Accuracy_info.length ; i++) {
            if ((Accuracy_info[i].postposition === selected_postposition) && (Accuracy_info[i].model === selected_model)) {
                for(var j = 0; j < Accuracy_info[i].accuracy.length ; j++){
                    if(j<=EpochNoww){
                        dataTotal.push(Accuracy_info[i].accuracy[j])
                    }
                }
            }
        }


        funcList = []

        for (var key in dataTotal[0]){
            if((key === 'total')||(key === 'loss')){
                funcList.push(key)
            } else {
                continue;
            }

        }


        var final_data = []


        for (var i = 0; i < funcList.length ; i++) {
            currentFunc = funcList[i]
            var dataT = {}
            var dataY = [];
            var currentaccuracy = 0
            for (var j = 0; j < dataTotal.length ; j++) {
                dataY.push(dataTotal[j][funcList[i]])
                currentaccuracy = dataTotal[j][funcList[i]]
            }
            dataT['y'] = dataY
            var dataX = [];
            for (var j = 0; j < 50 ; j++) {
                dataX.push(j)
            }
            dataT['x'] = dataX



            var rearrangedData = dataT.x.map(function(d,i) {
              return {x:d,y:dataT.y[i]};
            })



            var re_data = {}
            re_data['name'] = currentFunc
            re_data['show'] = true
            re_data['currentLoss'] = currentaccuracy
            re_data['history'] = rearrangedData

            if (currentFunc == 'total') {
                re_data['color'] = "#49441F"
            } else if (currentFunc == 'loss') {
                re_data['color'] = "#003366"
            }

            final_data.push(re_data)

        }

        var right_top_x = d3.scale.linear().domain([0,50]).range([right_top_width*0.07,right_top_width*0.9])
        var right_top_y = d3.scale.linear().domain([-0.25,1.5]).range([right_top_height*0.7,0])

        var line = d3.svg.line()
                     .x(function(d){ return right_top_x(d.x)})
                     .y(function(d){return right_top_y(d.y)})
                     .interpolate("linear");

        const tooltip_top = d3.select('#tooltip_top');
        const tooltipLine_top = svgright_top.append('line');

        svgright_top.selectAll()
            .data(final_data).enter()
            .append('path')
            .attr('class','righttoppath')
            .attr('fill', 'none')
            .attr('stroke', d => d.color)
            .attr('stroke-width', 2)
            .datum(d => d.history)
            .attr('d', line)
            .attr("opacity",0.7);

          svgright_top.selectAll()
            .data(final_data).enter()
            .append('text')
            .html(d => d.name)
            .attr('fill', d => d.color)
            .attr('alignment-baseline', 'middle')
            .attr('x', right_top_width)
            .attr('dx', '.5em')
            .attr('y', d => right_top_y(d.currentLoss));

          tipBox = svgright_top.append('rect')
            .attr('width', right_top_width)
            .attr('height', right_top_height)
            .attr('opacity', 0)
            .on('mousemove', drawTooltip)
            .on('mouseout', removeTooltip);


        function removeTooltip() {
          if (tooltip_top) tooltip_top.style('display', 'none');
          if (tooltipLine_top) tooltipLine_top.attr('stroke', 'none');
        }

        function drawTooltip() {
          const x = Math.floor((right_top_x.invert(d3.mouse(tipBox.node())[0])+0.5));

          final_data.sort((a, b) => {
            return b.history.find(h => h.x == x).y - a.history.find(h => h.x == x).y;
          })

          tooltipLine_top.attr('stroke', 'black')
            .attr('x1', right_top_x(x)-1)
            .attr('x2', right_top_x(x)-1)
            .attr('y1', 0)
            .attr('y2', right_top_height)
            .attr('opacity',0.7);

          tooltip_top.html(x+1)
            .style('display', 'block')
            .style('right', right_top_width*0.07+"px")
            .style('top', right_top_height*0.28+"px")
            .style('opacity',0.7)
            .selectAll()
            .data(final_data).enter()
            .append('div')
            .style('color', d => d.color)
            .html(d => d.name + ': ' + d.history.find(h => h.x == x).y);
        }



  }





  //line graph
  function right_middle_draw(){
        var selected_postposition = $( "#op_postposition" ).val();
        var selected_model = $( "#op_model" ).val();

        EpochNoww = updateTween()


        svgright_middle.selectAll(".rightmiddlepath").remove();

        var dataTotal = []

        for (var i = 0; i < Accuracy_info.length ; i++) {
            if ((Accuracy_info[i].model === selected_model) && (Accuracy_info[i].postposition === selected_postposition)) {
                for(var j = 0; j < Accuracy_info[i].accuracy.length ; j++){
                    if(j<=EpochNoww){
                        dataTotal.push(Accuracy_info[i].accuracy[j])
                    }
                }
            }
        }

        funcList = []

        for (var key in dataTotal[0]){
            if((key === 'epoch')||(key === 'total')||(key === 'loss')||(key === 'correlation')){
                continue;
            } else {
                funcList.push(key)
            }

        }


        var final_data = []


        for (var i = 0; i < funcList.length ; i++) {
            currentFunc = funcList[i]
            var dataT = {}
            var dataY = [];
            var currentaccuracy = 0
            for (var j = 0; j < dataTotal.length ; j++) {
                dataY.push(dataTotal[j][funcList[i]])
                currentaccuracy = dataTotal[j][funcList[i]]
            }
            dataT['y'] = dataY
            var dataX = [];
            for (var j = 0; j < 50 ; j++) {
                dataX.push(j)
            }
            dataT['x'] = dataX



            var rearrangedData = dataT.x.map(function(d,i) {
              return {x:d,y:dataT.y[i]};
            })



            var re_data = {}
            re_data['name'] = currentFunc
            re_data['show'] = true
            re_data['currentLoss'] = currentaccuracy
            re_data['history'] = rearrangedData

            if (currentFunc == function_name[0]) {
                re_data['color'] = function_color[0]
            } else if (currentFunc == function_name[1]) {
                re_data['color'] = function_color[1]
            } else if (currentFunc == function_name[2]) {
                re_data['color'] = function_color[2]
            } else if (currentFunc == function_name[3]) {
                re_data['color'] = function_color[3]
            } else if (currentFunc == function_name[4]) {
                re_data['color'] = function_color[4]
            } else if (currentFunc == function_name[5]) {
                re_data['color'] = function_color[5]
            } else if (currentFunc == function_name[6]) {
                re_data['color'] = function_color[6]
            } else if (currentFunc == function_name[7]) {
                re_data['color'] = function_color[7]
            } else if (currentFunc == function_name[8]) {
                re_data['color'] = function_color[8]
            } else if (currentFunc == function_name[9]) {
                re_data['color'] = function_color[9]
            }

            final_data.push(re_data)

        }

        var right_middle_x = d3.scale.linear().domain([0,50]).range([right_middle_width*0.07,right_middle_width*0.9])
        var right_middle_y = d3.scale.linear().domain([-0.25,1.1]).range([right_middle_height*0.72,0])

        var line = d3.svg.line()
                     .x(function(d){ return right_middle_x(d.x)})
                     .y(function(d){return right_middle_y(d.y)})
                     .interpolate("linear");

        const tooltip_middle = d3.select('#tooltip_middle');
        const tooltipLine_middle = svgright_middle.append('line');

        svgright_middle.selectAll()
            .data(final_data).enter()
            .append('path')
            .attr('class','rightmiddlepath')
            .attr('fill', 'none')
            .attr('stroke', d => d.color)
            .attr('stroke-width', 2)
            .datum(d => d.history)
            .attr('d', line)
            .attr("opacity",0.7);

          svgright_middle.selectAll()
            .data(final_data).enter()
            .append('text')
            .html(d => d.name)
            .attr('fill', d => d.color)
            .attr('alignment-baseline', 'middle')
            .attr('x', right_middle_width)
            .attr('dx', '.5em')
            .attr('y', d => right_middle_y(d.currentLoss));

          tipBox = svgright_middle.append('rect')
            .attr('width', right_middle_width)
            .attr('height', right_middle_height)
            .attr('opacity', 0)
            .on('mousemove', drawTooltip)
            .on('mouseout', removeTooltip);


        function removeTooltip() {
          if (tooltip_middle) tooltip_middle.style('display', 'none');
          if (tooltipLine_middle) tooltipLine_middle.attr('stroke', 'none');
        }

        function drawTooltip() {
          const x = Math.floor((right_middle_x.invert(d3.mouse(tipBox.node())[0])+0.5));

          final_data.sort((a, b) => {
            return b.history.find(h => h.x == x).y - a.history.find(h => h.x == x).y;
          })

          tooltipLine_middle.attr('stroke', 'black')
            .attr('x1', right_middle_x(x)-1)
            .attr('x2', right_middle_x(x)-1)
            .attr('y1', 0)
            .attr('y2', right_middle_height)
            .attr('opacity',0.7);

          tooltip_middle.html(x+1)
            .style('display', 'block')
            .style('right', right_top_width*0.07+"px")
            .style('top', right_middle_height*0.28+"px")
            .style('opacity',0.7)
            .selectAll()
            .data(final_data).enter()
            .append('div')
            .style('color', d => d.color)
            .html(d => d.name + ': ' + d.history.find(h => h.x == x).y);
        }

  }



  //bar chart

  function right_bottom_draw(){
        var selected_postposition = $( "#op_postposition" ).val();
        var selected_model = $( "#op_model" ).val();

        EpochNoww = updateTween()

        svgright_bottom.selectAll(".rightbottom_bar").remove();
        svgright_bottom.selectAll(".rightbottom_text").remove();

        var dataTotal = [0]



        for (var i = 0; i < Density_info.length ; i++) {
            if ((Density_info[i].model === selected_model) && (Density_info[i].postposition === selected_postposition)) {
                for(var j = 0; j < Density_info[i].cluster.length ; j++){
                    if(j<=EpochNoww){
                        dataTotal.push(Density_info[i].cluster[j].clusterNumber)
                    }
                }
            }
        }

        // var svgright_bottom = d3.select("#right_bottom")
        //   .append("svg")
        //   .attr("width", right_bottom_width*0.95)
        //   .attr("height", (right_bottom_height*0.95))

        yScaleMax = 0;
        if(selected_postposition==="ey"){
            yScaleMax = 7;
        } else if (selected_postposition==="eyse"){
            yScaleMax = 3;
        } else {
            yScaleMax = 7;
        }

        var right_bottom_x = d3.scale.linear()
                .domain([0,50])
                .range([right_bottom_width*0.05,right_bottom_width*0.88], 0.1);

        var right_bottom_y = d3.scale.linear()
                .domain([0, yScaleMax])
                .range([0,right_bottom_height*0.62]);


        // var right_bottom_x = d3.scale.ordinal().domain([0,50]).range([right_bottom_width*0.07,right_bottom_width*0.9])
        // var right_bottom_y = d3.scale.linear().domain([0, yScaleMax]).range([right_bottom_height*0.72,0])


        //Create bars
        svgright_bottom.selectAll("rect")
           .data(dataTotal)
           .enter()
           .append("rect")
           .attr("class","rightbottom_bar")
           .attr("x", function(d, i) {
                return right_bottom_x(i);
           })
           .attr("y", function(d) {
                return (right_bottom_height*0.6) - right_bottom_y(d);
           })
           .attr("width", right_bottom_width*0.015)
           .attr("height", function(d) {
                return right_bottom_y(d);
           })
           .attr("fill", function(d) {
                return "#666666";
           })
           .on("mouseover", function(d, i) {

                d3.select("#tooltip_bottom")
                    .style("right", right_bottom_width*0.07 + "px")
                    .style("top",  right_bottom_height*0.28 + "px")
                    .html("<p><strong>Selected epoch: </strong>"+i+"<br><strong>Cluster number: </strong>"+d+"</p>")

                d3.select("#tooltip_bottom").classed("hidden", false);

           })
           .on("mouseout", function() {

                d3.select("#tooltip_bottom").classed("hidden", true);

           });

        //Create labels
        svgright_bottom.append("text")
           .attr("class","rightbottom_text")
           .text("Current cluster number: "+dataTotal[EpochNoww+1])
            .attr("x", right_bottom_width*0.08)
            .attr("y", right_bottom_height*0.1)
            .attr("text-anchor", "start")
            .attr("font-family", "Open Sans")
            .attr("font-size", "20px")
            .attr("fill", "#666666")

        // //Create labels
        // svgright_bottom.selectAll("text")
        //    .data(dataTotal)
        //    .enter()
        //    .append("text")
        //    .attr("class","rightbottom_text")
        //    .text(function(d) {
        //         return d;
        //    })
        //    .attr("text-anchor", "middle")
        //    .attr("x", function(d, i) {
        //         return (right_bottom_width*0.01)+right_bottom_x(i) + right_bottom_x.rangeBand() / 2;
        //    })
        //    .attr("y", function(d) {
        //         return (right_bottom_height*0.6) - right_bottom_y(d) + 1;
        //    })
        //    .attr("font-family", "sans-serif")
        //    .attr("font-size", "7px")
        //    .attr("fill", "white");


  }


















    //모든 함수 가동부분
    function drawall(){

        var selected_postposition = $( "#op_postposition" ).val();
        var selected_model = $( "#op_model" ).val();
        // var selected_node_color = $( "#op_node_color" ).val();
        // var selected_node_color = $( "#op_node_color" ).val();

        var functions = functioncheckbox();
        var indexs = indexcheckbox();
        // changedrawdata(selected_postposition,selected_node_color,functions,indexs)
        changedrawdata(selected_postposition,selected_model,functions,indexs)

    }

    //시각화 부분 함수 생성
    function firstdrawdata() {


        var data = {};
        for (var i = 0; i < Map_info.length ; i++) {
            if ((Map_info[i].model === 'BERT') && (Map_info[i].postposition === 'ey') && (Map_info[i].epoch === 'epoch1')) {
                var innerArray = [];
                for(var j = 0; j < Sentence_info.length ; j++){
                    if (Sentence_info[j].postposition === 'ey') {
                        for(var k = 0; k < Map_info[i].sentences.length ; k++){
                            var sentenceDic = {}
                            sentenceDic["index"] = Sentence_info[j].sentences[k].index
                            sentenceDic["function"] = Sentence_info[j].sentences[k].function
                            sentenceDic["sentence"] = Sentence_info[j].sentences[k].sentence
                            sentenceDic["sentence_pos"] = Sentence_info[j].sentences[k].sentence_pos
                            sentenceDic["X"] = Map_info[i].sentences[k].X
                            sentenceDic["Y"] = Map_info[i].sentences[k].Y
                            sentenceDic["opacity_value"] = 0.7
                            innerArray.push(sentenceDic)
                        }
                    }
                }
                // for(var j = 0; j < Map_info[i].sentences.length ; j++){
                //     var sentenceDic = {}

                // }
                data["postposition"] = Map_info[i].postposition
                data["model"] = Map_info[i].model
                data["epoch"] = Map_info[i].epoch
                data["sentences"] = innerArray
            }
        }



        var w = sectionWidth;
        var h = sectionHeight;
        var padding = (sectionHeight*0.12);

        var xScale = d3.scale.linear()
            .domain([d3.min(data.sentences, function(d) { return d.Y; }), d3.max(data.sentences, function(d) { return d.X; })])
            .range([0+padding, w-padding]);

        var yScale = d3.scale.linear()
             .domain([d3.min(data.sentences, function(d) { return d.Y; }), d3.max(data.sentences, function(d) { return d.Y; })])
             .range([h-padding, 0+padding]);

        NodeGroup.selectAll(".nodedot")
             .data(data.sentences)
             .enter()
             .append("circle")
             .attr("class", "nodedot")
             .attr("id", function (d) {
                 return d.index
             })
             .attr("cx", function (d) {
                 return xScale(d.X)
             })
             .attr("cy", function (d) {
                 return yScale(d.Y)
             })
             .attr("r", 3)
             .attr("fill", function (d) {
              if (d.function == function_name[0]) {
                    return function_color[0]
                } else if (d.function == function_name[1]) {
                    return function_color[1]
                } else if (d.function == function_name[2]) {
                    return function_color[2]
                } else if (d.function == function_name[3]) {
                    return function_color[3]
                } else if (d.function == function_name[4]) {
                    return function_color[4]
                } else if (d.function == function_name[5]) {
                    return function_color[5]
                } else if (d.function == function_name[6]) {
                    return function_color[6]
                } else if (d.function == function_name[7]) {
                    return function_color[7]
                } else if (d.function == function_name[8]) {
                    return function_color[8]
                } else if (d.function == function_name[9]) {
                    return function_color[9]
                }
             })
             .attr("stroke", "black")
             .attr("stroke-width", "1px")
             .attr("opacity", function (d) {
                 return d.opacity_value
             })
             .style("cursor", "help")  //https://css-tricks.com/using-css-cursors/
             .on("mouseover", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", 1)
                     .attr("fill","#FF0000")
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", function (d) {
                         return d.opacity_value
                     })
                     .attr("fill", function (d) {
                        // if (selected_node_color === "nomal") {
                        //     return "rgb(51,51,51)"
                        // } else if (selected_node_color === "function") {
                        //
                        if (d.function == function_name[0]) {
                                return function_color[0]
                            } else if (d.function == function_name[1]) {
                                return function_color[1]
                            } else if (d.function == function_name[2]) {
                                return function_color[2]
                            } else if (d.function == function_name[3]) {
                                return function_color[3]
                            } else if (d.function == function_name[4]) {
                                return function_color[4]
                            } else if (d.function == function_name[5]) {
                                return function_color[5]
                            } else if (d.function == function_name[6]) {
                                return function_color[6]
                            } else if (d.function == function_name[7]) {
                                return function_color[7]
                            } else if (d.function == function_name[8]) {
                                return function_color[8]
                            } else if (d.function == function_name[9]) {
                                return function_color[9]
                            }
                        // }
                     });
             })
             .on("mouseenter", function (d) {
                 div_inner.transition()
                     .duration(200)
                     .style("opacity", 0.85);
                    div_inner.html("<strong>Selected sentence</strong><br/><h5>Index : "+d.index + "<h5/><h5>Function : "  + d.function + "<h5/><h5>Sentence : "  + d.sentence+ "<h5/><h5>SentencePOS : "  + d.sentence_pos+ "<h5/>")
                     .style("left", "20px")
                     .style("top", sectionHeight*0.07+"px");
             })
             .on("mouseleave", function () {
                 div_inner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });
             // .on("click",function(d){
             //    var clicked = d.index
             //    $('.CB_leftbottom').val($(clicked).is(':checked'));
             //    op_function_change();

             // });



    }



    //시각화 변경
    function changedrawdata(selected_postposition,selected_model,functionarray,indexarray) {  //selected_postposition,selected_node_color,functionarray,indexarray

            //svgSection.selectAll(".nodedot").remove();


            if ((selected_postposition === 'ey') || (selected_postposition === '(u)lo')){
                for(var i = 467; i < 484 ; i++){
                    svgSection.selectAll("#index"+i).remove();
                }
            }

            EpochNow = updateTween()

            EpochNow = EpochNow + 1

            console.log(EpochNow);

            right_top_draw();
            right_middle_draw();
            right_bottom_draw();

            //svgright_bottom.selectAll(".corBar").remove();



            var textlabel = div_epoch.selectAll(".textlabel")
            textlabel.enter()
                     .append("text")
                     .attr("class", "label")
                     .text((EpochNow)+" Epoch")
            textlabel.transition()
                     .duration(10)
                     .text((EpochNow)+" Epoch")
            textlabel.exit().remove();

            var data = {};
            for (var i = 0; i < Map_info.length ; i++) {
                if ((Map_info[i].model === selected_model) && (Map_info[i].postposition === selected_postposition) && (Map_info[i].epoch === 'epoch'+EpochNow)) {
                    var innerArray = [];
                    for(var j = 0; j < Sentence_info.length ; j++){
                        if (Sentence_info[j].postposition === selected_postposition) {
                            for(var k = 0; k < Map_info[i].sentences.length ; k++){
                                var sentenceDic = {}
                                sentenceDic["index"] = Sentence_info[j].sentences[k].index
                                sentenceDic["function"] = Sentence_info[j].sentences[k].function
                                sentenceDic["sentence"] = Sentence_info[j].sentences[k].sentence
                                sentenceDic["sentence_pos"] = Sentence_info[j].sentences[k].sentence_pos
                                sentenceDic["X"] = Map_info[i].sentences[k].X
                                sentenceDic["Y"] = Map_info[i].sentences[k].Y
                                if((functionarray.length > 0 == true)&&(indexarray.length > 0 == true)){

                                    var checked = false;
                                    for(var q = 0; q < functionarray.length ; q++){
                                        if(Sentence_info[j].sentences[k].function == functionarray[q]){
                                            checked = true;
                                        }
                                    }

                                    if(checked == true){
                                        var ichecked = false;
                                        for(var t = 0; t < indexarray.length ; t++){
                                            if(Sentence_info[j].sentences[k].index == indexarray[t]){
                                                ichecked = true;
                                            }
                                        }
                                        if(ichecked == true){
                                            sentenceDic["opacity_value"] = 0.9
                                        } else {
                                            sentenceDic["opacity_value"] = 0.2
                                        }
                                    } else {
                                      sentenceDic["opacity_value"] = 0.2
                                    }
                                } else if((functionarray.length > 0 == false)&&(indexarray.length > 0 == true)){
                                    var checked = false;
                                    for(var q = 0; q < indexarray.length ; q++){
                                        if(Sentence_info[j].sentences[k].index == indexarray[q]){
                                            checked = true;
                                        }
                                    }
                                    if(checked == true){
                                      sentenceDic["opacity_value"] = 0.9
                                    } else {
                                      sentenceDic["opacity_value"] = 0.2
                                    }
                                } else if((functionarray.length > 0 == true)&&(indexarray.length > 0 == false)){
                                    var checked = false;
                                    for(var q = 0; q < functionarray.length ; q++){
                                        if(Sentence_info[j].sentences[k].function == functionarray[q]){
                                            checked = true;
                                        }
                                    }
                                    if(checked == true){
                                      sentenceDic["opacity_value"] = 0.9
                                    } else {
                                      sentenceDic["opacity_value"] = 0.2
                                    }
                                } else {
                                    sentenceDic["opacity_value"] = 0.7
                                }
                                innerArray.push(sentenceDic)
                            }
                        }
                    }
                    // for(var j = 0; j < Map_info[i].sentences.length ; j++){
                    //     var sentenceDic = {}

                    // }
                    data["postposition"] = Map_info[i].postposition
                    data["model"] = Map_info[i].model
                    data["epoch"] = Map_info[i].epoch
                    data["sentences"] = innerArray
                }
            }


            currentPost = ''

            if (selected_postposition === 'ey') {
                currentPost = 'Ey'
            } else if (selected_postposition === 'eyse') {
                currentPost = 'Eyse'
            } else if (selected_postposition === '(u)lo') {
                currentPost = 'Lo'
            }

            currentModel = selected_model

            LeftsvgSection.selectAll(".PNG").remove();

            var imgs = LeftsvgSection.append("image")
                .attr("class", "PNG")
                .attr("xlink:href", "https://seongmin-mun.github.io/VisualSystem/Major/PostTransformers/densities/Out"+currentModel+"/"+currentPost+"_tSNE_trial_1_epoch_"+EpochNow+".png")
                .attr("x", LeftsectionWidth*0.05)
                .attr("y", 0)
                .attr('width', LeftsectionWidth*0.9)
                .attr('height', LeftsectionWidth*0.9);

            var w = sectionWidth;
            var h = sectionHeight;
            var padding = (sectionHeight*0.12);

            var xScale = d3.scale.linear()
                .domain([d3.min(data.sentences, function(d) { return d.Y; }), d3.max(data.sentences, function(d) { return d.X; })])
                .range([0+padding, w-padding]);

            var yScale = d3.scale.linear()
                 .domain([d3.min(data.sentences, function(d) { return d.Y; }), d3.max(data.sentences, function(d) { return d.Y; })])
                 .range([h-padding, 0+padding]);

          var circle = NodeGroup.selectAll(".nodedot")
                .data(data.sentences);

          circle.enter()
             .append("circle")
             .attr("class", "nodedot")
             .attr("id", function (d) {
                 return d.index
             })
             .attr("cx", function (d) {
             return xScale(d.X)
             })
             .attr("cy", function (d) {
                 return yScale(d.Y)
             })
             .attr("r", 3)
             .attr("fill", function (d) {
                // if (selected_node_color === "nomal") {
                //     return "rgb(51,51,51)"
                // } else if (selected_node_color === "function") {
                //
                if (d.function == function_name[0]) {
                        return function_color[0]
                    } else if (d.function == function_name[1]) {
                        return function_color[1]
                    } else if (d.function == function_name[2]) {
                        return function_color[2]
                    } else if (d.function == function_name[3]) {
                        return function_color[3]
                    } else if (d.function == function_name[4]) {
                        return function_color[4]
                    } else if (d.function == function_name[5]) {
                        return function_color[5]
                    } else if (d.function == function_name[6]) {
                        return function_color[6]
                    } else if (d.function == function_name[7]) {
                        return function_color[7]
                    } else if (d.function == function_name[8]) {
                        return function_color[8]
                    } else if (d.function == function_name[9]) {
                        return function_color[9]
                    }
                // }
             })
             .attr("stroke", "black")
             .attr("stroke-width", "1px")
             .attr("opacity", function (d) {
                 return d.opacity_value
             })
             .style("cursor", "help")
             .on("mouseover", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", 1)
                     .attr("fill","#FF0000")
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", function (d) {
                         return d.opacity_value
                     })
                     .attr("fill", function (d) {
                        // if (selected_node_color === "nomal") {
                        //     return "rgb(51,51,51)"
                        // } else if (selected_node_color === "function") {
                        //
                        if (d.function == function_name[0]) {
                                return function_color[0]
                            } else if (d.function == function_name[1]) {
                                return function_color[1]
                            } else if (d.function == function_name[2]) {
                                return function_color[2]
                            } else if (d.function == function_name[3]) {
                                return function_color[3]
                            } else if (d.function == function_name[4]) {
                                return function_color[4]
                            } else if (d.function == function_name[5]) {
                                return function_color[5]
                            } else if (d.function == function_name[6]) {
                                return function_color[6]
                            } else if (d.function == function_name[7]) {
                                return function_color[7]
                            } else if (d.function == function_name[8]) {
                                return function_color[8]
                            } else if (d.function == function_name[9]) {
                                return function_color[9]
                            }
                        // }
                     });
             })
             .on("mouseenter", function (d) {
                 div_inner.transition()
                     .duration(200)
                     .style("opacity", 0.85);
                    div_inner.html("<strong>Selected sentence</strong><br/><h5>Index : "+d.index + "<h5/><h5>Function : "  + d.function + "<h5/><h5>Sentence : "  + d.sentence+ "<h5/><h5>SentencePOS : "  + d.sentence_pos+ "<h5/>")
                     .style("left", "20px")
                     .style("top", sectionHeight*0.07+"px");
             })
             .on("mouseleave", function () {
                 div_inner.transition()
                     .duration(500)
                     .style("opacity", 0);
             })
             // .on("click",function(d){
             //    var clicked = d.index
             //    $('input.CB_leftbottom').val($(clicked).is(':checked'));
             // });

          circle.transition()
                 .duration(2000)
                 .attr("cx", function (d) {
                 return xScale(d.X)
             })
             .attr("cy", function (d) {
                 return yScale(d.Y)
             })
             .attr("r", 3)
             .attr("fill", function (d) {
                // if (selected_node_color === "nomal") {
                //     return "rgb(51,51,51)"
                // } else if (selected_node_color === "function") {
                //
                if (d.function == function_name[0]) {
                        return function_color[0]
                    } else if (d.function == function_name[1]) {
                        return function_color[1]
                    } else if (d.function == function_name[2]) {
                        return function_color[2]
                    } else if (d.function == function_name[3]) {
                        return function_color[3]
                    } else if (d.function == function_name[4]) {
                        return function_color[4]
                    } else if (d.function == function_name[5]) {
                        return function_color[5]
                    } else if (d.function == function_name[6]) {
                        return function_color[6]
                    } else if (d.function == function_name[7]) {
                        return function_color[7]
                    } else if (d.function == function_name[8]) {
                        return function_color[8]
                    } else if (d.function == function_name[9]) {
                        return function_color[9]
                    }
                // }
             })
             .attr("stroke", "black")
             .attr("stroke-width", "1px")
             .attr("opacity", function (d) {
                 return d.opacity_value
             })
             .style("cursor", "help")
             .on("mouseover", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", 1)
                     .attr("fill","#FF0000")
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", function (d) {
                         return d.opacity_value
                     })
                     .attr("fill", function (d) {
                        // if (selected_node_color === "nomal") {
                        //     return "rgb(51,51,51)"
                        // } else if (selected_node_color === "function") {
                        //
                        if (d.function == function_name[0]) {
                                return function_color[0]
                            } else if (d.function == function_name[1]) {
                                return function_color[1]
                            } else if (d.function == function_name[2]) {
                                return function_color[2]
                            } else if (d.function == function_name[3]) {
                                return function_color[3]
                            } else if (d.function == function_name[4]) {
                                return function_color[4]
                            } else if (d.function == function_name[5]) {
                                return function_color[5]
                            } else if (d.function == function_name[6]) {
                                return function_color[6]
                            } else if (d.function == function_name[7]) {
                                return function_color[7]
                            } else if (d.function == function_name[8]) {
                                return function_color[8]
                            } else if (d.function == function_name[9]) {
                                return function_color[9]
                            }
                        // }
                     });
             })
             .on("mouseenter", function (d) {
                 div_inner.transition()
                     .duration(200)
                     .style("opacity", 0.85);
                    div_inner.html("<strong>Selected sentence</strong><br/><h5>Index : "+d.index + "<h5/><h5>Function : "  + d.function + "<h5/><h5>Sentence : "  + d.sentence+ "<h5/><h5>SentencePOS : "  + d.sentence_pos+ "<h5/>")
                     .style("left", "20px")
                     .style("top", sectionHeight*0.07+"px");
             })
             .on("mouseleave", function () {
                 div_inner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });
             // .on("click",function(d){
             //    var clicked = d.index
             //    $('input.CB_leftbottom').val($(clicked).is(':checked'));
             // });

          circle.exit().remove();


    }


})

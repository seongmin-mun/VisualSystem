$(document).ready(function () {

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
      //var idname_0 = post[0]+"_"+list[0];
      var idname_0 = list[0];
      $('#op_function').empty();
      $("#op_function").append("<option id='"+idname_0+"' value='"+idname_0.toLowerCase()+"' selected='selected'>"+list[0]+" ("+name_kr[0]+", "+name[0]+")"+"</option>")
      for (var i = 1; i < list.length ; i++) {
        //var idname_i = post[i]+"_"+list[i];
        var idname_i = list[i];
        $("#op_function").append("<option id='"+idname_i+"' value='"+idname_i.toLowerCase()+"'>"+list[i]+" ("+name_kr[i]+", "+name[i]+")"+"</option>");
      }
  }

  function op_function_change(){
      var selected_postposition = $( "#op_postposition" ).val();
      if (selected_postposition === "ey"){
          draw_op_function_after("ey",functionslist_ey,functionsname_ey,functionsname_kr_ey)
      } else if (selected_postposition === "eyse"){
          draw_op_function_after("eyse",functionslist_eyse,functionsname_eyse,functionsname_kr_eyse)
      } else if (selected_postposition === "(u)lo"){
          draw_op_function_after("(u)lo",functionslist_lo,functionsname_lo,functionsname_kr_lo)
      }
      drawall();
  }


  //왼쪽 하단 체크박스 활성화 부분
  var typeslist = ['NNG','NNP','NNB','NP','NR','VV','VA','MAG','MAJ','JKB'];
  var typesname = ['Common Noun','Proper Noun','Bound Noun','Pronoun','Numeral','Verb','Adjective','General Adverb','Conjunctive Adverb','Adverbial Case Marker'];
  var typesname_kr = ["일반명사", "고유명사", "의존명사", "대명사", "수사", "동사", "형용사", "일반부사", "접속부사", "부사격조사"];
  //색상
  var POS_name = ['NNG','NNP','NNB','NP','NR','VV','VA','MAG','MAJ','JKB'];
  var POS_color = ['#4f4cb4','#003783','#6685c7','#7faded','#16a1c6','#ab1432','#6c039d','#1d5041','#4c9046','#5b2e90'];

  //$("#container_leftmiddle").append("<input class='CB_leftmiddle' type='checkbox' value='"+typeslist[0]+"' id='CB_leftmiddle_"+0+"' checked/> <label class='CB_leftmiddle'>"+typeslist[0]+"</label></br>");
  for(var i = 0 ; i < typeslist.length; i++){
    var color = ""
      var currentPOS = typeslist[i]
      if (currentPOS == POS_name[0]) {
          color = POS_color[0]
      } else if (currentPOS == POS_name[1]) {
          color = POS_color[1]
      } else if (currentPOS == POS_name[2]) {
          color = POS_color[2]
      } else if (currentPOS == POS_name[3]) {
          color = POS_color[3]
      } else if (currentPOS == POS_name[4]) {
          color = POS_color[4]
      } else if (currentPOS == POS_name[5]) {
          color = POS_color[5]
      } else if (currentPOS == POS_name[6]) {
          color = POS_color[6]
      } else if (currentPOS == POS_name[7]) {
          color = POS_color[7]
      } else if (currentPOS == POS_name[8]) {
          color = POS_color[8]
      } else if (currentPOS == POS_name[9]) {
          color = POS_color[9]
      }
      $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='"+typeslist[i]+"' id='CB_leftbottom_"+i+"' /> <label class='CB_leftbottom'><svg width='12' height='12'><rect width='11' height='11' rx='2' class='legendrect' style='fill:"+color+";opacity:0.9;'/></svg> "+typeslist[i]+" ("+typesname_kr[i]+", "+typesname[i]+")</label></br>");
  }


  //문장 입력파트(concordance table)
  function drawconcordance_table(data,post){
      $('#concordancetable').empty();
      var sentencedata = [];
      if(post=="(u)lo"){
        post = "lo";
      }
      for (var i = 0; i < data.length ; i++) {
          if ((data[i].postposition === post)) {
              sentencedata.push(data[i]);
          }
      }
      for(var i = 0 ; i < sentencedata.length; i++){
          for(var j = 0 ; j < sentencedata[i].sentences.length; j++){
              $("#concordancetable").append("<tr style='padding: 0px;'><td>"+((i*40)+(j+1))+"</td><td>"+sentencedata[i].sentences[j].name+"</td><td>"+sentencedata[i].function.toUpperCase()+"</td><td>"+sentencedata[i].sentences[j].sentence+"</td><td>"+sentencedata[i].sentences[j].pos_sentence+"</td></tr>");
          }
      }
      
  }


  //체크박스 데이터
  function checkbox() {

      var data_checkbox = []
      for(var i = 0; i < typeslist.length; i++){
        if(checkedeachValue('CB_leftbottom_'+i)!=='null'){
          data_checkbox.push(checkedeachValue('CB_leftbottom_'+i));
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



  //시각화 부분
  //크기 설정
  var width = $(window).width()   //윈도우 넓이
  var height = $(window).height()   //윈도우 높이

  //중앙 분포 시각화
  var section_top_height = $("#section_top").height()



  var svgSection = d3.select('#section_top').append('svg')
          .attr('width', width * 0.655)
          .attr('height', (section_top_height*0.935))
          .call(d3.zoom().scaleExtent([0.5, 5]).on("zoom", function () {

            svgSection.attr("transform", d3.event.transform)

             // if(d3.event.sourceEvent.wheelDeltaY<0){
             //   //console.log(size)
             //   if($("#nodegroup.nodetext").css( "font-size")>=originalsize){
             //     $("#nodegroup.nodetext").css( "font-size", originalsize );
             //   } else {
             //     $("#nodegroup.nodetext").css( "font-size", "+=0.05" );
             //   }
             //   drawall();
             // } else {
             //   if($("#nodegroup.nodetext").css( "font-size")=="10px"){
             //     $("#nodegroup.nodetext").css( "font-size", "10px" );
             //   } else {
             //     $("#nodegroup.nodetext").css( "font-size", "-=0.05" );
             //   }
             // }

             //console.log($("#nodegroup.nodetext").css( "font-size"));
          }))
          .append("g");


  var right_top_height = $("#right_top").height()

  var svgright_top = d3.select("#right_top")
          .append("svg")
          .attr("width", width * 0.172)
          .attr("height", (right_top_height*0.63))

          //screenX

  svgright_top.append("rect")
          .attr("class", "svgright_rect")
          .attr("x", width * 0.008)
          .attr("y", 0)
          .attr("width", (width * 0.162))
          .attr("height",(right_top_height*0.63))
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("fill", "white")
          .attr('stroke', '#C2C1C1')
          .attr('stroke-width', '2')

  var NodeGroup = svgSection.append("g");

  var div_inner = d3.select("#section").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);














  //초기 가동

  firstdrawdata();
  op_function_change();

  var originalsize = $("#nodegroup.nodetext").css("font-size");



  d3.selectAll("#op_postposition").on("change", op_function_change);
  d3.selectAll("#op_function").on("change", drawall);
  d3.selectAll("#op_method").on("change", drawall);
  d3.selectAll("#op_window").on("change", drawall);
  d3.selectAll("#container_leftbottom").on("change", drawall);
  d3.selectAll("#onoff").on("change", drawall);

  d3.selectAll("#op_node_size").on("change", drawall);
  d3.selectAll("#op_node_color").on("change", drawall);

  //모든 함수 가동부분
  function drawall(){

    var selected_postposition = $( "#op_postposition" ).val();
    var selected_function = $( "#op_function" ).val();
    var selected_method = $( "#op_method" ).val();
    var selected_window = $( "#op_window" ).val();
    var selected_node_size = $( "#op_node_size" ).val();
    var selected_node_color = $( "#op_node_color" ).val();


    drawconcordance_table(sentence_concordance,selected_postposition)

    var partofspeeches = checkbox();



    changedrawdata(selected_postposition,selected_function,selected_method,selected_window,selected_node_size,selected_node_color,partofspeeches)
    }



  //시각화 부분 함수 생성
  function firstdrawdata() {
        var data = [];
        for (var i = 0; i < network_info.length ; i++) {
            if ((network_info[i].postposition === 'ey') && (network_info[i].function === 'loc') && (network_info[i].method === 'ppmi_svd') && (network_info[i].window === 'window1')) {
                data.push(network_info[i]);
            }
        }

        // //유사도 정보 시각화
        drawtable(data[0]);
        drawnetwork(data[0]);

        var map_data = [];
        for (var i = 0; i < DSMs_info.length ; i++) {

            if ((DSMs_info[i].postposition === 'ey') && (DSMs_info[i].method === 'ppmi_svd') && (DSMs_info[i].window === 'window1')) {
                for (var j = 0; j < DSMs_info[i].wordnet.length ; j++) {
                    var each = {
                          opacity_value: []
                    };
                    each.opacity_value.push(0.6);
                    var settings = $.extend({}, each, DSMs_info[i].wordnet[j]);
                    map_data.push(settings);
                }
            }
        }

        var w = width*0.6;
        var h = section_top_height;
        var padding = (section_top_height*0.12);

        var xScale = d3.scale.linear()
            .domain([d3.min(map_data, function(d) { return d.y; }), d3.max(map_data, function(d) { return d.x; })])
            .range([0+padding, w-padding]);

        var yScale = d3.scale.linear()
             .domain([d3.min(map_data, function(d) { return d.y; }), d3.max(map_data, function(d) { return d.y; })])
             .range([h-padding, 0+padding]);

        NodeGroup.selectAll(".nodedot")
             .data(map_data)
             .enter()
             .append("circle")
             .attr("class", "nodedot")
             .attr("id", "nodegroup")
             .attr("cx", function (d) {
                 return xScale(d.x)
             })
             .attr("cy", function (d) {
                 return yScale(d.y)
             })
             .attr("r", function (d) {
               if(d.pos=="JKB"){
                 return 10
               } else {
                 var size = (d.frequency/30 * 4)
                 if (size <= 4) {
                     return 4
                 } else if (20 <= size) {
                     return 20
                 } else {
                     return size
                 }
               }
             })
             .attr("fill", function (d) {
                if (d.pos == POS_name[0]) {
                    return POS_color[0]
                } else if (d.pos == POS_name[1]) {
                    return POS_color[1]
                } else if (d.pos == POS_name[2]) {
                    return POS_color[2]
                } else if (d.pos == POS_name[3]) {
                    return POS_color[3]
                } else if (d.pos == POS_name[4]) {
                    return POS_color[4]
                } else if (d.pos == POS_name[5]) {
                    return POS_color[5]
                } else if (d.pos == POS_name[6]) {
                    return POS_color[6]
                } else if (d.pos == POS_name[7]) {
                    return POS_color[7]
                } else if (d.pos == POS_name[8]) {
                    return POS_color[8]
                } else if (d.pos == POS_name[9]) {
                    return POS_color[9]
                }
             })
             .attr("stroke", "black")
             .attr("stroke-width", "1px")
             .attr("opacity", function (d) {
                 return d.opacity_value
             })
             .style("cursor", "pointer")
             .on("mouseover", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", 1)
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                     .attr("stroke", "black")
                     .attr("stroke-width", "1px")
                     .attr("opacity", function (d) {
                         return d.opacity_value
                     });
             })
             .on("mouseenter", function (d) {
                 if(d.pos=="JKB"){
                    div_inner.transition()
                     .duration(200)
                     .style("opacity", 0.85);
                    div_inner.html("<strong>Selected word</strong><br/><h5>Name_kr : "+d.name_kr + "<h5/><h5>Name_eng : "  + d.name_eng + "<h5/><h5>POS : "  + d.pos_long+ "<h5/><h5>POS_kr : "  + d.pos_kr+ "<h5/><h5>POS_eng : "  + d.pos_eng + "<h5/><h5>Frequency : "  + d.frequency+"<h5/>")
                     .style("right", "20px")
                     .style("top", "20px");
                } else {
                    div_inner.transition()
                     .duration(200)
                     .style("opacity", 0.85);
                    div_inner.html("<strong>Selected word</strong><br/><h5>Name_kr : "+d.name_kr + "<h5/><h5>Name_eng : "  + d.name_eng + "<h5/><h5>POS : "  + d.pos+ "<h5/><h5>POS_kr : "  + d.pos_kr+ "<h5/><h5>POS_eng : "  + d.pos_eng + "<h5/><h5>Frequency : "  + d.frequency+"<h5/>")
                     .style("right", "20px")
                     .style("top", "20px");
                }
             })
             .on("mouseleave", function () {
                 div_inner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });



        NodeGroup.selectAll(".nodetext")
             .data(map_data)
             .enter()
             .append("text")
             .attr("class", "nodetext")
             .attr("id", "nodegroup")
             .text(function (d) {
                if(d.pos=="JKB"){
                    return d.name_kr+"/"+d.name_eng+"/"+d.pos_long;
                } else {
                    return d.name_kr+"/"+d.name_eng+"/"+d.pos;
                }
             })
             .attr("x", function (d) {
                 return xScale(d.x) + 10
             })
             .attr("y", function (d) {
                 return yScale(d.y) + 4
             })
             .attr("font-family", "sans-serif")
             .attr("fill", "rgb(51,51,51)")
             .attr("opacity", function (d) {
                 return d.opacity_value
             })
             .style("cursor", "pointer")
             .on("mouseover", function () {
                 d3.select(this)
                         .attr("opacity", 1);
             })
             .on("mouseout", function (d) {
                 d3.select(this)
                         .attr("opacity", function (d) {
                             return d.opacity_value
                         });
             })
             .on("mouseenter", function (d) {
                if(d.pos=="JKB"){
                    div_inner.transition()
                     .duration(200)
                     .style("opacity", 0.85);
                    div_inner.html("<strong>Selected word</strong><br/><h5>Name_kr : "+d.name_kr + "<h5/><h5>Name_eng : "  + d.name_eng + "<h5/><h5>POS : "  + d.pos_long+ "<h5/><h5>POS_kr : "  + d.pos_kr+ "<h5/><h5>POS_eng : "  + d.pos_eng + "<h5/><h5>Frequency : "  + d.frequency+"<h5/>")
                     .style("right", "20px")
                     .style("top", "20px");
                } else {
                    div_inner.transition()
                     .duration(200)
                     .style("opacity", 0.85);
                    div_inner.html("<strong>Selected word</strong><br/><h5>Name_kr : "+d.name_kr + "<h5/><h5>Name_eng : "  + d.name_eng + "<h5/><h5>POS : "  + d.pos+ "<h5/><h5>POS_kr : "  + d.pos_kr+ "<h5/><h5>POS_eng : "  + d.pos_eng + "<h5/><h5>Frequency : "  + d.frequency+"<h5/>")
                     .style("right", "20px")
                     .style("top", "20px");
                }
                 
             })
             .on("mouseleave", function () {
                 div_inner.transition()
                     .duration(500)
                     .style("opacity", 0);
             });

         // //유사도 정보 시각화
         // drawtable(data[0]);
         // drawnetwork(data[0]);

  }




  //시각화 변경
  function changedrawdata(selected_postposition,selected_function,selected_method,selected_window,selected_node_size,selected_node_color,partofspeeches) {

          $('#similaritytable').empty();
          svgright_top.selectAll(".networklinks").remove();
          svgright_top.selectAll(".networknodes").remove();


          // if ((selected_postposition === 'ey') && (selected_function === 'loc') && (selected_method === 'svd') && (selected_window === 'window1')) {
          //   drawtable_first(data[0]);
          //   drawnetwork(data[0]);
          // } else {
          //   drawtable(data[0]);
          //   drawnetwork(data[0]);
          // }

          var data = [];
          for (var i = 0; i < network_info.length ; i++) {
              if ((network_info[i].postposition === selected_postposition) && (network_info[i].function === selected_function) && (network_info[i].method === selected_method) && (network_info[i].window === selected_window)) {
                  data.push(network_info[i]);
              }
          }

          drawtable(data[0]);
          drawnetwork(data[0]);


          var map_data = [];
          for (var i = 0; i < DSMs_info.length ; i++) {

              if ((DSMs_info[i].postposition === selected_postposition) && (DSMs_info[i].method === selected_method) && (DSMs_info[i].window === selected_window)) {
                  for (var j = 0; j < DSMs_info[i].wordnet.length ; j++) {
                      var each = {
                            opacity_value: []
                      };
                      if(partofspeeches.length > 0 == true){
                          var checked = false;
                          for(var k = 0; k < partofspeeches.length ; k++){
                            if(DSMs_info[i].wordnet[j].pos == partofspeeches[k]){
                                checked = true;
                            }
                          }
                          if(checked == true){
                              each.opacity_value.push(0.9);
                          } else {
                              each.opacity_value.push(0.2);
                          }
                      } else if(partofspeeches.length > 0 == false){
                          each.opacity_value.push(0.6);
                      }

                      var settings = $.extend({}, each, DSMs_info[i].wordnet[j]);
                      map_data.push(settings);
                  }
              }
          }


           // //유사도 정보 시각화
           // drawtable(data[0]);
           // drawnetwork(data[0]);


          var w = width*0.6;
          var h = section_top_height;
          var padding = (section_top_height*0.12);

          var xScale = d3.scale.linear()
              .domain([d3.min(map_data, function(d) { return d.y; }), d3.max(map_data, function(d) { return d.x; })])
              .range([0+padding, w-padding]);

          var yScale = d3.scale.linear()
               .domain([d3.min(map_data, function(d) { return d.y; }), d3.max(map_data, function(d) { return d.y; })])
               .range([h-padding, 0+padding]);

          var circle = NodeGroup.selectAll(".nodedot")
                .data(map_data);

          circle.enter()
                 .append("circle")
                 .attr("class", "nodedot")
                 .attr("id", "nodegroup")
                 .attr("cx", function (d) {
                     return xScale(d.x)
                 })
                 .attr("cy", function (d) {
                     return yScale(d.y)
                 })
                 .attr("r", function (d){
                      if (selected_node_size === "nomal") {
                          return 4;
                      } else if (selected_node_size === "frequency") {
                        if(d.pos=="JKB"){
                          return 10
                        } else {
                          var size = (d.frequency/30 * 4)
                          if (size <= 4) {
                              return 4
                          } else if (20 <= size) {
                              return 20
                          } else {
                              return size
                          }
                        }
                      }
                  })
                  .attr("fill", function (d){
                      if (selected_node_color === "nomal") {
                          return "rgb(51,51,51)"
                      } else if (selected_node_color === "pos") {
                          if (d.pos == POS_name[0]) {
                              return POS_color[0]
                          } else if (d.pos == POS_name[1]) {
                              return POS_color[1]
                          } else if (d.pos == POS_name[2]) {
                              return POS_color[2]
                          } else if (d.pos == POS_name[3]) {
                              return POS_color[3]
                          } else if (d.pos == POS_name[4]) {
                              return POS_color[4]
                          } else if (d.pos == POS_name[5]) {
                              return POS_color[5]
                          } else if (d.pos == POS_name[6]) {
                              return POS_color[6]
                          } else if (d.pos == POS_name[7]) {
                              return POS_color[7]
                          } else if (d.pos == POS_name[8]) {
                              return POS_color[8]
                          } else if (d.pos == POS_name[9]) {
                              return POS_color[9]
                          }
                      }
                  })
                  .attr("stroke", "black")
                  .attr("stroke-width", "1px")
                  .attr("opacity", function (d) {
                      return d.opacity_value
                  })
                  .style("cursor", "pointer");

          circle.transition()
                 .duration(2000)
                 .attr("cx", function (d) {
                     return xScale(d.x)
                 })
                 .attr("cy", function (d) {
                     return yScale(d.y)
                 })
                 .attr("r", function (d){
                      if (selected_node_size === "nomal") {
                          return 4;
                      } else if (selected_node_size === "frequency") {
                        if(d.pos=="JKB"){
                          return 10
                        } else {
                          var size = (d.frequency/30 * 4)
                          if (size <= 4) {
                              return 4
                          } else if (20 <= size) {
                              return 20
                          } else {
                              return size
                          }
                        }
                      }
                  })
                  .attr("fill", function (d){
                      if (selected_node_color === "nomal") {
                          return "rgb(51,51,51)"
                      } else if (selected_node_color === "pos") {
                          if (d.pos == POS_name[0]) {
                              return POS_color[0]
                          } else if (d.pos == POS_name[1]) {
                              return POS_color[1]
                          } else if (d.pos == POS_name[2]) {
                              return POS_color[2]
                          } else if (d.pos == POS_name[3]) {
                              return POS_color[3]
                          } else if (d.pos == POS_name[4]) {
                              return POS_color[4]
                          } else if (d.pos == POS_name[5]) {
                              return POS_color[5]
                          } else if (d.pos == POS_name[6]) {
                              return POS_color[6]
                          } else if (d.pos == POS_name[7]) {
                              return POS_color[7]
                          } else if (d.pos == POS_name[8]) {
                              return POS_color[8]
                          } else if (d.pos == POS_name[9]) {
                              return POS_color[9]
                          }
                      }
                  })
                 .attr("stroke", "black")
                 .attr("stroke-width", "1px")
                 .attr("opacity", function (d) {
                     return d.opacity_value
                 })
                 .style("cursor", "pointer");

          circle.exit().remove();

          var text = NodeGroup.selectAll(".nodetext")
                 .data(map_data);

          text.enter()
                 .append("text")
                 .attr("class", "nodetext")
                 .attr("id", "nodegroup")
                 .text(function (d) {
                     if(d.pos=="JKB"){
                        return d.name_kr+"/"+d.name_eng+"/"+d.pos_long;
                    } else {
                        return d.name_kr+"/"+d.name_eng+"/"+d.pos;
                    }
                 })
                 .attr("x", function (d) {
                     return xScale(d.x) + 10
                 })
                 .attr("y", function (d) {
                     return yScale(d.y) + 4
                 })
                 .attr("font-family", "sans-serif")
                 .attr("fill", "rgb(51,51,51)")
                 .attr("opacity", function (d) {
                     return d.opacity_value
                 })
                 .style("cursor", "pointer");

          text.transition()
                 .duration(2000)
                 .text(function (d) {
                    if(d.pos=="JKB"){
                        return d.name_kr+"/"+d.name_eng+"/"+d.pos_long;
                    } else {
                        return d.name_kr+"/"+d.name_eng+"/"+d.pos;
                    }
                 })
                 .attr("x", function (d) {
                     return xScale(d.x) + 10
                 })
                 .attr("y", function (d) {
                     return yScale(d.y) + 4
                 })
                 .attr("font-family", "sans-serif")
                 .attr("fill", "rgb(51,51,51)")
                 .attr("opacity", function (d) {
                     return d.opacity_value
                 })
                 .style("cursor", "pointer");

          text.exit().remove();

          if(checkedeachValue("onoff")=='null'){
            svgSection.selectAll(".nodetext").remove();
          }
          //
          // return map_data;

  }




                  //유사도 정보 관련 테이블 생성 (Nearest words)

  function drawtable_first(data){
          $('#similaritytable').empty();
          for(var i = 0 ; i < data.links.length; i++){
            $("#similaritytable").append("<tr style='padding: 0px;'><td>"+i+"</td><td>"+data.links[i].target+"</td><td>"+data.links[i].value+"</td><td>"+data.nodes[i].frequency+"</td></tr>");
          }
  }

  function drawtable(data){
          $('#similaritytable').empty();
          console.log(typeof(data.links[0].target));

          if(typeof(data.links[0].target)=="object"){
            for(var i = 0 ; i < data.links.length; i++){
              $("#similaritytable").append("<tr style='padding: 0px;'><td>"+i+"</td><td>"+data.links[i].target.id+"</td><td>"+data.links[i].value+"</td><td>"+data.nodes[i].frequency+"</td></tr>");
            }
          } else {
            for(var i = 0 ; i < data.links.length; i++){
              $("#similaritytable").append("<tr style='padding: 0px;'><td>"+i+"</td><td>"+data.links[i].target+"</td><td>"+data.links[i].value+"</td><td>"+data.nodes[i].frequency+"</td></tr>");
            }
          }

  }




  //유사도 정보 관련 시각화 생성 (Force directed graph)
  function drawnetwork(data){

          svgright_top.selectAll(".networklinks").remove();
          svgright_top.selectAll(".networknodes").remove();

          //참조
          //https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8
          //https://cambridge-intelligence.com/customize-graph-visualization-d3-keylines/

          var simulation = d3.forceSimulation()
              .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(function (d) { return (right_top_height*0.828)*0.28}))
              .force("charge", d3.forceManyBody())
              .force("center", d3.forceCenter(width * 0.14 / 2, (right_top_height*0.63) / 2));


          var link = svgright_top.append("g")
                .attr("class", "networklinks")
                .selectAll("line")
                .data(data.links)
                .enter().append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.value*6); });

          var node = svgright_top.append("g")
                .attr("class", "networknodes")
                .selectAll("g")
                .data(data.nodes)
                .enter().append("g")

          var circles = node.append("circle")
                .attr("r", function(d) {
                      var size = d.frequency/2
                      if(15 < size){
                        return 15;
                      } else if (size < 4){
                          return 4;
                      } else {
                          return size;
                      }
                  })
                .attr("fill", function (d) {
                      if (d.pos == POS_name[0]) {
                          return POS_color[0]
                      } else if (d.pos == POS_name[1]) {
                          return POS_color[1]
                      } else if (d.pos == POS_name[2]) {
                          return POS_color[2]
                      } else if (d.pos == POS_name[3]) {
                          return POS_color[3]
                      } else if (d.pos == POS_name[4]) {
                          return POS_color[4]
                      } else if (d.pos == POS_name[5]) {
                          return POS_color[5]
                      } else if (d.pos == POS_name[6]) {
                          return POS_color[6]
                      } else if (d.pos == POS_name[7]) {
                          return POS_color[7]
                      } else if (d.pos == POS_name[8]) {
                          return POS_color[8]
                      } else if (d.pos == POS_name[9]) {
                          return POS_color[9]
                      } else {
                          return '#C2C1C1'
                      }
                      })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

          var lables = node.append("text")
                .text(function(d) {
                  return d.id;//.split("/")[0]+"/"+d.id_eng;
                })
                .attr('x', 6)
                .attr('y', 3)
                .attr('opacity',0.4)
                .on("mouseover", function () {
                    d3.select(this).attr("opacity", 1);
                })
                .on("mouseout", function (d) {
                    d3.select(this).attr("opacity", 0.4);
                });

          node.append("title")
                .text(function(d) { return d.id; });

          simulation.nodes(data.nodes)
                .on("tick", ticked);


          simulation.force("link")
                .links(data.links);

          function ticked() {
          link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

          node.attr("transform", function(d) {
                  return "translate(" + d.x + "," + d.y + ")";
                })
          }

          function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          }

          function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          }

          function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          }
  }

})

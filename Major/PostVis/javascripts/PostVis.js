$(document).ready(function () {

    var typeslist = ['JKS','JKC','JKG','JKO','JKB','JKV','JKQ','JX','JC'];

    var typesname = ['Subjective Case Marker','Complement Case Marker','Genitive Case Marker','Object Case Marker','Adverbial Case Marker','Vocative Case Marker','Citation Case Marker','Auxiliary Postposition','Connective Postposition'];

    var typesname_kr = ["주격조사", "보격조사", "관형격조사", "목적격조사", "부사격조사", "호격조사", "인용격조사", "보조사", "접속조사"];

    //$("#container_leftmiddle").append("<input class='CB_leftmiddle' type='checkbox' value='"+typeslist[0]+"' id='CB_leftmiddle_"+0+"' checked/> <label class='CB_leftmiddle'>"+typeslist[0]+"</label></br>");
    for(var i = 0 ; i < typeslist.length; i++){
        $("#container_leftmiddle").append("<input class='CB_leftmiddle' type='checkbox' value='"+typeslist[i]+"' id='CB_leftmiddle_"+i+"' /> <label class='CB_leftmiddle'>"+typeslist[i]+" ("+typesname_kr[i]+", "+typesname[i]+")</label></br>");
    }

    var tokenslist = ['의/JKG','가/JKS','께서/JKS','서/JKS','이서/JKS','이/JKC','가/JKC','이/JKS','을/JKO','를/JKO','ᆯ/JKO','에/JKB','으로/JKB','에서/JKB','로/JKB','에게/JKB','과/JKB','와/JKB','처럼/JKB','보다/JKB','서/JKB','로서/JKB','으로써/JKB','으로서/JKB','로부터/JKB','한테/JKB','으로부터/JKB','에다/JKB','같이/JKB','만큼/JKB','하고/JKB','에게서/JKB','에서부터/JKB','께/JKB','로써/JKB','더러/JKB','랑/JKB','대로/JKB','한테서/JKB','에다가/JKB','루/JKB','보고/JKB','서부터/JKB','으루/JKB','하구/JKB','아/JKV','야/JKV','여/JKV','이여/JKV','고/JKQ','라고/JKQ','이라고/JKQ','하고/JKQ','는/JX','은/JX','도/JX','만/JX','까지/JX','ᆫ/JX','부터/JX','나/JX','이나/JX','밖에/JX','마다/JX','뿐/JX','야/JX','이란/JX','대로/JX','조차/JX','란/JX','마저/JX','요/JX','두/JX','다/JX','이야말로/JX','이야/JX','나마/JX','야말로/JX','다가/JX','는커녕/JX','이나마/JX','치고/JX','은커녕/JX','따라/JX','거나/JX','과/JC','와/JC','이나/JC','나/JC','하고/JC','랑/JC','이랑/JC'];

    var tokenslist_eng = ['uy/JKG','ka/JKS','kkeyse/JKS','se/JKS','ise/JKS','i/JKC','ka/JKC','i/JKS','ul/JKO','lul/JKO','l/JKO','ey/JKB','ulo/JKB','eyse/JKB','lo/JKB','eykey/JKB','kwa/JKB','wa/JKB','chelem/JKB','pota/JKB','se/JKB','lose/JKB','ulosse/JKB','ulose/JKB','lopwuthe/JKB','hanthey/JKB','ulopwuthe/JKB','eyta/JKB','kathi/JKB','mankhum/JKB','hako/JKB','eykeyse/JKB','eysepwuthe/JKB','kkey/JKB','losse/JKB','tele/JKB','lang/JKB','taylo/JKB','hantheyse/JKB','eytaka/JKB','lwu/JKB','poko/JKB','sepwuthe/JKB','ulwu/JKB','hakwu/JKB','a/JKV','ya/JKV','ye/JKV','iye/JKV','ko/JKQ','lako/JKQ','ilako/JKQ','hako/JKQ','nun/JX','un/JX','to/JX','man/JX','kkaci/JX','n/JX','pwuthe/JX','na/JX','ina/JX','pakkey/JX','mata/JX','ppwun/JX','ya/JX','ilan/JX','taylo/JX','cocha/JX','lan/JX','mace/JX','yo/JX','twu/JX','ta/JX','iyamallo/JX','iya/JX','nama/JX','yamallo/JX','taka/JX','nunkhenyeng/JX','inama/JX','chiko/JX','unkhenyeng/JX','ttala/JX','kena/JX','kwa/JC','wa/JC','ina/JC','na/JC','hako/JC','lang/JC','ilang/JC']

    //$("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='"+tokenslist[0]+"' id='CB_leftbottom_"+0+"' checked/> <label class='CB_leftbottom'>"+tokenslist_eng[0]+"</label></br>");
    for(var i = 0 ; i < tokenslist.length; i++){
        $("#container_leftbottom").append("<input class='CB_leftbottom' type='checkbox' value='"+tokenslist[i]+"' id='CB_leftbottom_"+i+"' /> <label class='CB_leftbottom'>"+tokenslist[i]+" ("+tokenslist_eng[i]+")</label></br>");
    }

    for(var i = 1 ; i < tokenslist.length; i++){
        $("#op_casemarker").append("<option id='"+tokenslist[i]+"' value='"+tokenslist[i]+"'>"+tokenslist[i]+" ("+tokenslist_eng[i]+")</option>");
    }



    var width = $(window).width()   //윈도우 넓이
    var height = $(window).height()   //윈도우 높이


    var CM_name = ["JKS","JKC","JKG","JKO","JKB","JKV","JKQ","JX","JC"];
    var CM_color = ["#AA3939", "#AA6539", "#AA7D39", "#AA9839", "#A6A938", "#779D34", "#277553", "#27576B", "#9440B6"];


    //중앙 분포 시각화
    var section_top_height = $("#section_top").height()

    var svgSection = d3.select('#section_top').append('svg')
            .attr('width', width * 0.655)
            .attr('height', (section_top_height*0.935))
            .call(d3.zoom().on("zoom", function () {
               svgSection.attr("transform", d3.event.transform)
            }))
            .append("g");


    var right_middle_height = $("#right_middle").height()

    var svgright_middle = d3.select("#right_middle")
            .append("svg")
            .attr("width", width * 0.18)
            .attr("height", (right_middle_height*0.828))

    svgright_middle.append("rect")
            .attr("class", "svgleft_rect")
            .attr("x", width * 0.005)
            .attr("y", 0)
            .attr("width", (width * 0.17))
            .attr("height",(right_middle_height*0.828))
            .attr("rx", 6)
            .attr("ry", 6)
            .attr("fill", "white")
            .attr('stroke', '#C2C1C1')
            .attr('stroke-width', '2')

    var NodeGroup = svgSection.append("g");

    var div_inner = d3.select("#section").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


    data = firstdrawdata();

    d3.selectAll("#op_method").on("change", changedrawdata);
    d3.selectAll("#op_window").on("change", changedrawdata);

    d3.selectAll("#op_node_size").on("change", change_size);
    d3.selectAll("#op_node_color").on("change", change_color);

    d3.selectAll("#op_casemarker").on("change", changedrawdata);
    // d3.selectAll("#op_casemarker").on("change", selected_node_change);

    d3.selectAll("#container_leftmiddle").on("change", changedrawdata);
    d3.selectAll("#container_leftbottom").on("change", changedrawdata);


    function change_color() {
        if (this.value == "nomal") nodecolor_df();
        else if (this.value === "class") nodecolor_color();
    }

    function nodecolor_df() {
        NodeGroup.selectAll(".nodedot").data(data).transition().duration(2000).attr("fill", "rgb(51,51,51)")
    }

    function nodecolor_color() {
        
        NodeGroup.selectAll(".nodedot").data(data).transition().duration(2000)
                .attr("fill", function (d) {
                    if (d.pos == CM_name[0]) {
                        return CM_color[0]
                    } else if (d.pos == CM_name[1]) {
                        return CM_color[1]
                    } else if (d.pos == CM_name[2]) {
                        return CM_color[2]
                    } else if (d.pos == CM_name[3]) {
                        return CM_color[3]
                    } else if (d.pos == CM_name[4]) {
                        return CM_color[4]
                    } else if (d.pos == CM_name[5]) {
                        return CM_color[5]
                    } else if (d.pos == CM_name[6]) {
                        return CM_color[6]
                    } else if (d.pos == CM_name[7]) {
                        return CM_color[7]
                    } else if (d.pos == CM_name[8]) {
                        return CM_color[8]
                    }
                })              
    }

    function change_size() {
        if (this.value == "nomal") nodesize_df();
        else if (this.value === "frequncy") nodesize_frequncy();
    }

    function nodesize_df() {
        NodeGroup.selectAll(".nodedot").data(data).transition().duration(2000).attr("r", 5); 
    }

    function nodesize_frequncy() {
        NodeGroup.selectAll(".nodedot").data(data).transition().duration(2000).attr("r", function (d) {
                    var size = (d.wordfrequncy/100000) * 5
                    if (size <= 5) {
                        return 5
                    } else {
                        return size
                    }
                })             
    }

    



    function firstdrawdata() {

        //선택 옵션 확인
        var selected_method = $( "#op_method" ).val();
        var selected_window = $( "#op_window" ).val();
        var selected_node_size = $( "#op_node_size" ).val();
        var selected_node_color = $( "#op_node_color" ).val();
        var selected_casemarker = $( "#op_casemarker" ).val();


        var data = [];

        for (var i = 0; i < analyzed_data.length ; i++) {
            var each = {
                    opacity_value: []
                };
            if (analyzed_data[i].test === selected_method && analyzed_data[i].windowsize === selected_window) {
                each.opacity_value.push(0.7);
                var settings = $.extend({}, each, analyzed_data[i]);
                data.push(settings);
            }

            
        }

        var datanetwork = [];

        for (var i = 0; i < data.length ; i++) {
            if (data[i].casemarker+"/"+data[i].pos === selected_casemarker) {
                datanetwork.push(data[i]);
            }
        }
        
        drawnetwork(datanetwork[0]);
        drawtable(datanetwork[0]);
        drawconcordance_table(datanetwork[0]);

        var w = width*0.6;
        var h = section_top_height;
        var padding = (section_top_height*0.12);

        var xScale = d3.scale.linear()
            .domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.x; })])
            .range([0+padding, w-padding]);

        var yScale = d3.scale.linear()
             .domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.y; })])
             .range([h-padding, 0+padding]);

        // //노드와 텍스트가 그룹으로 선택 되려면 데이터를 전송하고 그룹으로 묶어 변수를 생성한다. 그리고 생성한 변수에 노드와 텍스트를 생성하면 된다.
        // https://stackoverflow.com/questions/47385361/how-to-select-a-specific-d3-node-group-element
        // NodeGroup = NodeGroup.selectAll(null)  
        //         .data(data)
        //         .enter()
        //         .append("g");

        NodeGroup.selectAll(".nodedot").data(data)
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
                    var size = (d.wordfrequncy/100000) * 5
                    if (size <= 5) {
                        return 5
                    } else {
                        return size
                    }
                })  
                .attr("fill", function (d) {
                    if (d.pos == CM_name[0]) {
                        return CM_color[0]
                    } else if (d.pos == CM_name[1]) {
                        return CM_color[1]
                    } else if (d.pos == CM_name[2]) {
                        return CM_color[2]
                    } else if (d.pos == CM_name[3]) {
                        return CM_color[3]
                    } else if (d.pos == CM_name[4]) {
                        return CM_color[4]
                    } else if (d.pos == CM_name[5]) {
                        return CM_color[5]
                    } else if (d.pos == CM_name[6]) {
                        return CM_color[6]
                    } else if (d.pos == CM_name[7]) {
                        return CM_color[7]
                    } else if (d.pos == CM_name[8]) {
                        return CM_color[8]
                    }
                }) 
                .attr("stroke", "black")
                .attr("stroke-width", "1px")
                .attr("opacity", function (d) {
                    return d.opacity_value
                })
                .style("cursor", "pointer")
                .on('click', function(d) {
                    document.getElementById(d.casemarker+"/"+d.pos).selected = true;
                    drawnetwork(d);
                    drawtable(d);
                    drawconcordance_table(d);
                })
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
                    div_inner.transition()        
                        .duration(200)      
                        .style("opacity", 0.85);      
                    div_inner.html("<strong>Selected Case Marker</strong><br/><h5>("+d.test+","+d.windowsize+")</h5><h5>Name_kr : "+d.casemarker + "<h5/><h5>Name_eng : "  + d.casemarker_eng.split("/")[0]+ "<h5/><h5>POS : "  + d.pos+ "<h5/><h5>POS_kr : "  + d.detail_kr+ "<h5/><h5>POS_eng : "  + d.detail+ "<h5/><h5>Frequency : "  + d.wordfrequncy+"<h5/>")  
                        .style("right", "20px")     
                        .style("top", "20px");
                })
                .on("mouseleave", function () {
                    div_inner.transition()        
                        .duration(500)      
                        .style("opacity", 0);
                });
            


        NodeGroup.selectAll(".nodetext")
                .data(data)
                .enter()
                .append("text")
                .attr("class", "nodetext")
                .attr("id", "nodegroup")
                .text(function (d) {
                    return d.casemarker+"/"+d.casemarker_eng;
                })
                .attr("x", function (d) {
                    return xScale(d.x) + 10
                })
                .attr("y", function (d) {
                    return yScale(d.y) + 7
                })
                .attr("font-family", "sans-serif")
                .attr("fill", "rgb(51,51,51)")
                .attr("opacity", function (d) {
                    return d.opacity_value
                })
                .style("cursor", "pointer")
                .on('click', function(d) {
                    document.getElementById(d.casemarker+"/"+d.pos).selected = true;
                    drawnetwork(d);
                    drawtable(d);
                    drawconcordance_table(d);
                })
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
                    div_inner.transition()        
                        .duration(200)      
                        .style("opacity", 0.85);      
                    div_inner.html("<strong>Selected Case Marker</strong><br/><h5>("+d.test+","+d.windowsize+")</h5><h5>Name_kr : "+d.casemarker + "<h5/><h5>Name_eng : "  + d.casemarker_eng.split("/")[0]+ "<h5/><h5>POS : "  + d.pos+ "<h5/><h5>POS_kr : "  + d.detail_kr+ "<h5/><h5>POS_eng : "  + d.detail+ "<h5/><h5>Frequency : "  + d.wordfrequncy+"<h5/>")   
                        .style("right", "20px")    
                        .style("top", "20px");
                })
                .on("mouseleave", function () {
                    div_inner.transition()        
                        .duration(500)      
                        .style("opacity", 0);
                });

        return data;

    }       


    function changedrawdata() {

        $('#similaritytable').empty();
        svgright_middle.selectAll(".networklinks").remove();
        svgright_middle.selectAll(".networknodes").remove();

        //선택 옵션 확인
        var selected_method = $( "#op_method" ).val();
        var selected_window = $( "#op_window" ).val();
        var selected_node_size = $( "#op_node_size" ).val();
        var selected_node_color = $( "#op_node_color" ).val();
        var selected_casemarker = $( "#op_casemarker" ).val();

        var tokens = checkbox1();
        var types = checkbox2();

        function checkbox1() {
    
            var data_checkbox_1 = []
            for(var i = 0; i < typeslist.length; i++){
            if(checkedeachValue('CB_leftmiddle_'+i)!=='null'){
              data_checkbox_1.push(checkedeachValue('CB_leftmiddle_'+i));
            }
            }
            return data_checkbox_1;
        }

        function checkbox2() {
    
            var data_checkbox_2 = []
            for(var i = 0; i < tokenslist.length; i++){
            if(checkedeachValue('CB_leftbottom_'+i)!=='null'){
              data_checkbox_2.push(checkedeachValue('CB_leftbottom_'+i));
            }
            }
            return data_checkbox_2;
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

        var data = [];

        for (var i = 0; i < analyzed_data.length ; i++) {
            var each = {
                    opacity_value: []
                };
            if (analyzed_data[i].test === selected_method && analyzed_data[i].windowsize === selected_window) {
                if(tokens.length > 0 == true && types.length > 0 == false){
                    var checkedtoken = false;
                    for(var j = 0; j < tokens.length ; j++){
                        if(analyzed_data[i].pos == tokens[j]){
                            checkedtoken = true;
                        }
                    }
                    if(checkedtoken == true){
                        each.opacity_value.push(1);
                    } else {
                        each.opacity_value.push(0.1);
                    }
                } else if (tokens.length > 0 == false && types.length > 0 == true){
                    var checkedtype = false;

                    for(var k = 0; k < types.length ; k++){
                        var casetype = types[k].split("/")[0];
                        var postype = types[k].split("/")[1];
                        if(analyzed_data[i].casemarker == casetype && analyzed_data[i].pos == postype){
                            checkedtype = true;
                        }
                    }
                    if(checkedtype == true){
                        each.opacity_value.push(1);
                    } else {
                        each.opacity_value.push(0.1);
                    }
                } else if(tokens.length > 0 == true && types.length > 0 == true){
                    var checked = false;
                    for(var j = 0; j < tokens.length ; j++){
                        for(var k = 0; k < types.length ; k++){
                            var casetype = types[k].split("/")[0];
                            var postype = types[k].split("/")[1];
                            if(analyzed_data[i].pos == tokens[j] && analyzed_data[i].casemarker == casetype && analyzed_data[i].pos == postype){
                                checked = true;
                            }
                        }
                    }
                    if(checked == true){
                        each.opacity_value.push(1);
                    } else {
                        each.opacity_value.push(0.2);
                    }
                } else if(tokens.length > 0 == false && types.length > 0 == false){
                    each.opacity_value.push(0.7);
                }
                var settings = $.extend({}, each, analyzed_data[i]);
                data.push(settings);
            }

            
        }

        var datanetwork = [];

        for (var i = 0; i < data.length ; i++) {
            if (data[i].casemarker+"/"+data[i].pos === selected_casemarker) {
                datanetwork.push(data[i]);
            }
        }

        drawnetwork(datanetwork[0]);
        drawtable(datanetwork[0]);
        drawconcordance_table(datanetwork[0]);

        var w = width*0.6;
        var h = section_top_height;
        var padding = (section_top_height*0.12);

        var xScale = d3.scale.linear()
            .domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.x; })])
            .range([0+padding, w-padding]);

        var yScale = d3.scale.linear()
             .domain([d3.min(data, function(d) { return d.y; }), d3.max(data, function(d) { return d.y; })])
             .range([h-padding, 0+padding]);

        var circle = NodeGroup.selectAll(".nodedot")
        .data(data);

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
                    if (selected_node_size == "nomal") {
                        return 5;
                    } else if (selected_node_size === "frequncy") {
                        var size = (d.wordfrequncy/100000) * 5
                        if (size <= 5) {
                            return 5
                        } else {
                            return size
                        }
                    }
                }) 
                .attr("fill", function (d){
                    if (selected_node_color == "nomal") {
                        return "rgb(51,51,51)"
                    } else if (selected_node_color === "class") {
                        if (d.pos == CM_name[0]) {
                            return CM_color[0]
                        } else if (d.pos == CM_name[1]) {
                            return CM_color[1]
                        } else if (d.pos == CM_name[2]) {
                            return CM_color[2]
                        } else if (d.pos == CM_name[3]) {
                            return CM_color[3]
                        } else if (d.pos == CM_name[4]) {
                            return CM_color[4]
                        } else if (d.pos == CM_name[5]) {
                            return CM_color[5]
                        } else if (d.pos == CM_name[6]) {
                            return CM_color[6]
                        } else if (d.pos == CM_name[7]) {
                            return CM_color[7]
                        } else if (d.pos == CM_name[8]) {
                            return CM_color[8]
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
                    if (selected_node_size == "nomal") {
                        return 5;
                    } else if (selected_node_size === "frequncy") {
                        var size = (d.wordfrequncy/100000) * 5
                        if (size <= 5) {
                            return 5
                        } else {
                            return size
                        }
                    }
                }) 
                .attr("fill", function (d){
                    if (selected_node_color == "nomal") {
                        return "rgb(51,51,51)"
                    } else if (selected_node_color === "class") {
                        if (d.pos == CM_name[0]) {
                            return CM_color[0]
                        } else if (d.pos == CM_name[1]) {
                            return CM_color[1]
                        } else if (d.pos == CM_name[2]) {
                            return CM_color[2]
                        } else if (d.pos == CM_name[3]) {
                            return CM_color[3]
                        } else if (d.pos == CM_name[4]) {
                            return CM_color[4]
                        } else if (d.pos == CM_name[5]) {
                            return CM_color[5]
                        } else if (d.pos == CM_name[6]) {
                            return CM_color[6]
                        } else if (d.pos == CM_name[7]) {
                            return CM_color[7]
                        } else if (d.pos == CM_name[8]) {
                            return CM_color[8]
                        }
                    }
                })
                .attr("stroke", "black")
                .attr("stroke-width", "1px")
                .attr("opacity", function (d) {
                    return d.opacity_value
                })
                .style("cursor", "pointer");
                


        circle.exit().remove()


        var text = NodeGroup.selectAll(".nodetext")
        .data(data);

        text.enter()
                .append("text")
                .attr("class", "nodetext")
                .attr("id", "nodegroup")
                .text(function (d) {
                    return d.casemarker+"/"+d.casemarker_eng;
                })
                .attr("x", function (d) {
                    return xScale(d.x) + 10
                })
                .attr("y", function (d) {
                    return yScale(d.y) + 7
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
                    return d.casemarker+"/"+d.casemarker_eng;
                })
                .attr("x", function (d) {
                    return xScale(d.x) + 10
                })
                .attr("y", function (d) {
                    return yScale(d.y) + 7
                })
                .attr("font-family", "sans-serif")
                .attr("fill", "rgb(51,51,51)")
                .attr("opacity", function (d) {
                    return d.opacity_value
                })
                .style("cursor", "pointer");
                

        text.exit().remove()

        return data;
    }     


    function drawtable(data){
        $('#similaritytable').empty();
        for(var k = 0 ; k < data.links.length; k++){
          $("#similaritytable").append("<tr style='padding: 0px;'><td>"+k+"</td><td>"+data.links[k].target.id.split("/")[0]+"</td><td>"+data.links[k].target_eng.split("/")[0]+"</td><td>"+data.links[k].target_eng.split("/")[1]+"</td><td>"+data.links[k].value+"</td><td>"+data.nodes[k].frequncy+"</td><td>"+data.nodes[k].pos_detail+"</td><td>"+data.nodes[k].pos_detail_kr+"</td></tr>");
        }
    }

    function drawconcordance_table(data){
        $('#concordancetable').empty();
        var sentencedata = [];

        for (var i = 0; i < sentence.length ; i++) {
            if (sentence[i].casemarker === data.casemarker+"/"+data.pos) {
                sentencedata.push(sentence[i]);
            }
        }

        for(var k = 0 ; k < sentencedata.length; k++){
          $("#concordancetable").append("<tr style='padding: 0px;'><td>"+k+"</td><td>"+sentencedata[k].casemarker+"</td><td>"+sentencedata[k].casemarker_eng+"</td><td>"+sentencedata[k].sentence+"</td><td>"+sentencedata[k].lexeme_pos+"</td></tr>");
        }
    }

    function drawnetwork(data){

        svgright_middle.selectAll(".networklinks").remove();
        svgright_middle.selectAll(".networknodes").remove();
                    
        //https://bl.ocks.org/heybignick/3faf257bbbbc7743bb72310d03b86ee8
        //https://cambridge-intelligence.com/customize-graph-visualization-d3-keylines/
    
        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(function (d) { return (right_middle_height*0.828)*0.28}))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width * 0.14 / 2, (right_middle_height*0.828) / 2));


        var link = svgright_middle.append("g")
              .attr("class", "networklinks")
            .selectAll("line")
            .data(data.links)
            .enter().append("line")
              .attr("stroke-width", function(d) { return Math.sqrt(d.value*6); });

        var node = svgright_middle.append("g")
          .attr("class", "networknodes")
        .selectAll("g")
        .data(data.nodes)
        .enter().append("g")

        var circles = node.append("circle")
          .attr("r", function(d) {
                var size = d.frequncy/1000
                if(13 < size){
                  return 13;
                } else if (size < 5){
                    return 5;
                } else {
                    return size;
                }
            })
          .attr("fill", function (d) {
                if (d.pos == CM_name[0]) {
                    return CM_color[0]
                } else if (d.pos == CM_name[1]) {
                    return CM_color[1]
                } else if (d.pos == CM_name[2]) {
                    return CM_color[2]
                } else if (d.pos == CM_name[3]) {
                    return CM_color[3]
                } else if (d.pos == CM_name[4]) {
                    return CM_color[4]
                } else if (d.pos == CM_name[5]) {
                    return CM_color[5]
                } else if (d.pos == CM_name[6]) {
                    return CM_color[6]
                } else if (d.pos == CM_name[7]) {
                    return CM_color[7]
                } else if (d.pos == CM_name[8]) {
                    return CM_color[8]
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
          .attr('y', 3);

        node.append("title")
          .text(function(d) { return d.id; });

        simulation
          .nodes(data.nodes)
          .on("tick", ticked);


        simulation.force("link")
          .links(data.links);

        function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("transform", function(d) {
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

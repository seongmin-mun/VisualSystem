$(document).ready(function () {
    //ë°ì´í„° ë¶ˆëŸ¬ì˜¤ê¸°
    for(var k = 0 ; k < 5; k++){
        $( "#Type" ).append( '<div class="cb-row"><input id="menu'+k+'" name="'+Stacked[k].type+'" type="checkbox" style="margin-right: 10px; margin-left: 3px;" value="'+Stacked[k].type+'" checked /><label for="'+Stacked[k].type+'">'+Stacked[k].type+'</label></div>' );
    }

    for(var k = 5 ; k < Stacked.length; k++){
        $( "#Type" ).append( '<div class="cb-row"><input id="menu'+k+'" name="'+Stacked[k].type+'" type="checkbox" style="margin-right: 10px; margin-left: 3px;" value="'+Stacked[k].type+'" /><label for="'+Stacked[k].type+'">'+Stacked[k].type+'</label></div>' );
    }

    var BIOnames_raw = ["Somme_LI_UI_LB_UB_frontiere_syntaxe","Somme_de_IL_IU_BL_BU_frontiÃ¨re_prosodie","Somme_deY+Z=fontriÃ¨re_dÃ©synchro","Somme_de_LL_UL_LU_UU_frontiÃ¨re_synchro","Total_des_frontiÃ¨res"];

    var BIOnames = ["syntaxe","prosodie","dÃ©synchro","synchro","Total","B_B","B_I","B_L","B_U","I_B","I_L","I_U","L_B","L_I","L_L","L_U","U_B","U_I","U_L","U_U"]

    var BIOcolors = ["rgb(255,179,186)","rgb(255,223,186)","rgb(255,255,186)","rgb(186,255,201)","rgb(186,225,255)","rgb(255,66,66)","rgb(255,98,98)","rgb(255,128,128)","rgb(255,158,158)","rgb(66,255,66)","rgb(98,255,98)","rgb(128,255,128)","rgb(66,66,255)","rgb(98,98,255)","rgb(128,128,255)","rgb(158,158,255)","rgb(225,225,170)","rgb(235,235,180)","rgb(245,245,190)","rgb(255,255,200)"]

    for(var k = 0 ; k < BIOcolors.length; k++){
        $( "#Legend" ).append( '<div class="cb-row"><svg id="Legend_svg" width="200" height="30"><rect width="20" height="20" x="10" y="5" style="fill:'+BIOcolors[k]+';stroke-width:1;stroke:rgb(0,0,0);"/><text x="40" y="20" font-family="sans-serif" font-size="18px" fill="balck">'+BIOnames[k]+'</text></svg></div>' );
    }

    for(var k = 0 ; k < 5; k++){
        $( "#Combination" ).append( '<div class="cb-row"><input id="menu2_'+k+'" name="'+BIOnames[k]+'" type="checkbox" style="margin-right: 10px; margin-left: 3px;" value="'+BIOnames[k]+'" checked/><label for="'+BIOnames[k]+'">'+BIOnames_raw[k]+'</label></div>' );
    }

    for(var k = 5 ; k < BIOnames.length; k++){
        $( "#Combination" ).append( '<div class="cb-row"><input id="menu2_'+k+'" name="'+BIOnames[k]+'" type="checkbox" style="margin-right: 10px; margin-left: 3px;" value="'+BIOnames[k]+'" /><label for="'+BIOnames[k]+'">'+BIOnames[k]+'</label></div>' );
    }
    
        var leftwidth = $("#left").width()

        var leftheight = $("#left").height()

        var sectionwidth = $("#section").width()

        var sectionheight = $("#section").height()

      

        var svgleft = d3.select("#left")
                    .append("svg")
                    .attr("width", leftwidth)
                    .attr("height", 620)

            svgleft.append("text")
                    .text("Discourse_genres")
                    .attr("class", "svgleft_text")
                    .attr("x", (leftwidth * 0.07))
                    .attr("y", 35)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "25px")
                    .attr("fill", "rgb(51,51,51)")
                    .attr("font-weight", "bold")

            svgleft.append("text")
                    .text("BIO_combination")
                    .attr("class", "svgleft_text")
                    .attr("x", (leftwidth * 0.07))
                    .attr("y", 265)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "25px")
                    .attr("fill", "rgb(51,51,51)")
                    .attr("font-weight", "bold")

            svgleft.append("text")
                    .text("Legend of BIO")
                    .attr("class", "svgleft_text")
                    .attr("x", (leftwidth * 0.07))
                    .attr("y", 495)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "25px")
                    .attr("fill", "rgb(51,51,51)")
                    .attr("font-weight", "bold")

        //sectionë¶€ë¶„
        var svgsection = d3.select("#section")
            .append("svg")
            .attr("width", sectionwidth)
            .attr("height", 720)

        svgsection.append("rect")
            .attr("class", "bottomup_middle_rect")
            .attr("x", sectionwidth*0.025)
            .attr("y", 20)
            .attr("width", sectionwidth*0.95)
            .attr("height", 680)
            .attr("fill", "white")

        for (var k = 1; k < 7; k++) {
            svgsection.append("line").attr("x1", sectionwidth*0.05).attr("y1", ((645/6)*k) ).attr("x2", sectionwidth*0.95 ).attr("y2", ((645/6)*k) ).attr("stroke-width", "2px").attr("stroke", "#595959").style("stroke-dasharray", ("3, 3"))
        }


        for (var k = 0; k < 8; k++) {
            svgsection.append("line").attr("x1", (((sectionwidth ) / 8) * k) + (sectionwidth * 0.065)).attr("y1", 40).attr("x2", (((sectionwidth ) / 8) * k) + (sectionwidth * 0.065)).attr("y2", 660).attr("stroke-width", "2px").attr("stroke", "#595959").style("stroke-dasharray", ("3, 3"))
        }



        d3.selectAll("#BIO").on("change", changeselect);
        d3.selectAll("#Discourse").on("change", changeselect);

        changeselect()

        function changeselect() {

            var stacked_data =[];
            var stacked_height =[];

            for (var i = 0; i < Stacked.length; i++) {  //Discourse
                var menu_value = $( "input#menu"+i+":checked" ).val();

                if(menu_value!=null){  //Selected data
                    var stacked_heightin =[];
                    var selected_data = {'type':Stacked[i].type}
                    for (var j = 0; j < BIOnames.length; j++) {
                        var menu2_value = $( "input#menu2_"+j+":checked" ).val();
                        if(menu2_value!=null){ 
                            selected_data[menu2_value]=Stacked[i][menu2_value];
                            stacked_heightin.push(menu2_value)
                        }
                    }
                    stacked_data.push(selected_data);
                    stacked_height = stacked_heightin;
                } 
                
            }

            console.log(stacked_height)
            console.log(stacked_data)

            var stacked_data_re =[];

            for (var j = 0; j < stacked_height.length; j++) {
                var stacked_data_re_1 =[];
                for (var i = 0; i < stacked_data.length; i++) {
                    var selected_data_re_2 = {'stack':stacked_height[j],'type':stacked_data[i].type,'x':i,'y':stacked_data[i][stacked_height[j]]};
                    // console.log(selected_data_re_2)
                    // console.log(stacked_data_re_1)
                    stacked_data_re_1.push(selected_data_re_2);
                }
                stacked_data_re.push(stacked_data_re_1);
            }

            // console.log(stacked_data_re)

            // console.log(stacked_data)
            // console.log(stacked_height)

            stackedbarvis(stacked_data_re);

            
        }

        function stackedbarvis(dataset) {
        

            svgsection.selectAll("g.rect").remove();
            svgsection.selectAll(".labeltext").remove();

            console.log(dataset)//labeltext

            var tip = d3.tip()
              .attr('class', 'd3-tip')  
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Variable:</strong> <span style='color:red'>" + d.stack + "</span></br><strong>Frequency:</strong> <span style='color:red'>" + d.y + "</span>";
              })

            svgsection.call(tip);
            

            var w = sectionwidth*0.95;
                h = 570;

            //Set up stack method
            var stack = d3.layout.stack();

            //Data, stacked
            stack(dataset);

            //Set up scales
            var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset[0].length))
                .rangeRoundBands([sectionwidth*0.05, w], 0.05);
        
            var yScale = d3.scale.linear()
                .domain([0,             
                    d3.max(dataset, function(d) {
                        return d3.max(d, function(d) {
                            return d.y0 + d.y;
                        });
                    })
                ])
                .range([0, h]);

            
            //Easy colors accessible via a 10-step ordinal scale
            var colors = d3.scale.category20();
    
            // Add a group for each row of data
            var groups = svgsection.selectAll("g.rect")
                .data(dataset)
                .enter()
                .append("g")
                .attr("class", "rect")
                .style("fill", function(d,j,i) {
                    if (d[i].stack == BIOnames[0]) {
                        return BIOcolors[0]
                    } else if (d[i].stack == BIOnames[1]) {
                        return BIOcolors[1]
                    } else if (d[i].stack == BIOnames[2]) {
                        return BIOcolors[2]
                    } else if (d[i].stack == BIOnames[3]) {
                        return BIOcolors[3]
                    } else if (d[i].stack == BIOnames[4]) {
                        return BIOcolors[4]
                    } else if (d[i].stack == BIOnames[5]) {
                        return BIOcolors[5]
                    } else if (d[i].stack == BIOnames[6]) {
                        return BIOcolors[6]
                    } else if (d[i].stack == BIOnames[7]) {
                        return BIOcolors[7]
                    } else if (d[i].stack == BIOnames[8]) {
                        return BIOcolors[8]
                    } else if (d[i].stack == BIOnames[9]) {
                        return BIOcolors[9]
                    } else if (d[i].stack == BIOnames[10]) {
                        return BIOcolors[10]
                    } else if (d[i].stack == BIOnames[11]) {
                        return BIOcolors[11]
                    } else if (d[i].stack == BIOnames[12]) {
                        return BIOcolors[12]
                    } else if (d[i].stack == BIOnames[13]) {
                        return BIOcolors[13]
                    } else if (d[i].stack == BIOnames[14]) {
                        return BIOcolors[14]
                    } else if (d[i].stack == BIOnames[15]) {
                        return BIOcolors[15]
                    } else if (d[i].stack == BIOnames[16]) {
                        return BIOcolors[16]
                    } else if (d[i].stack == BIOnames[17]) {
                        return BIOcolors[17]
                    } else if (d[i].stack == BIOnames[18]) {
                        return BIOcolors[18]
                    } else if (d[i].stack == BIOnames[19]) {
                        return BIOcolors[19]
                    } 
                });
    
            // Add a rect for each data value
            var rects = groups.selectAll("rect")
                .data(function(d) { return d; })
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                    return (sectionwidth*0.005)+xScale(i);
                })
                .attr("y", function(d) {
                    return 640-yScale(d.y+d.y0);
                })
                .attr("height", function(d) {
                    return yScale(d.y);
                })
                .attr("width", xScale.rangeBand())
                .attr("opacity", 0.9)
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("opacity", 1)
                            .attr("stroke","black")

                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("opacity", 0.9)
                            .attr("stroke","none")

                })
                .on('mouseenter', tip.show)
                .on('mouseleave', tip.hide)

            // Add a rect for each data value
            var texts = groups.selectAll("text")
                .data(function(d) { return d; })
                .enter()
                .append("text")
                .text(function(d) {
                     return d.type;
                })
                .attr("transform", function(d, i) {
                    var Xposition = (sectionwidth*0.03)+xScale(i);
                    var Yposition = 700;
                    return "translate("+Xposition+","+Yposition+") rotate(330)";
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", function(d, i) {
                    return (15)+"px";
                })
                .attr("fill", "black");

        }
    
})
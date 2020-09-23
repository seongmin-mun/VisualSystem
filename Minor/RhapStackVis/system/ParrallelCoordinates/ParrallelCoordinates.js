$(document).ready(function () {
        var parrallelwidth = $(".container").width()

        var parrallelheight = $("#parrallel").height()
        var parrallelbottomheight = $("#parrallelbottom").height()

        var margin = {top: 50, right: 50, bottom: 50, left: 50},
            width = parrallelwidth - margin.left - margin.right,
            height = parrallelheight - margin.top - margin.bottom;
        var dimensions = [
          // {
          //   name: "ID",
          //   scale: d3.scale.linear().range([height, 0]),
          //     type: "number"
          // },
          {
            name: "ID",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          },
          {
            name: "Genre",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          },
          {
            name: "Interactivity",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          },
          {
            name: "Social_context",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          },
          {
            name: "Event_structure",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          },
          {
            name: "Channel",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          },
          {
            name: "Planning_type",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          },
          {
            name: "Subject",
            scale: d3.scale.ordinal().rangePoints([0, height]),
            type: "string"
          }
        ];

        var data2_legend = ["ID", "Discourse", "Genre", "Interactivity", "Social_context", "Event_structure", "Channel", "Planning_type", "Subject", "B_B", "B_I", "B_L", "B_U", "I_B", "I_L", "I_U", "L_B", "L_I", "L_L", "L_U", "U_B", "U_I", "U_L", "U_U", "LI_UI_LB_UB", "IL_IU_BL_BU", "deY+Z", "LL_UL_LU_UU", "Total"];

        var x = d3.scale.ordinal().domain(dimensions.map(function(d) { return d.name; })).rangePoints([0, width]),
            y = {},
            dragging = {};
        var line = d3.svg.line(),
          axis = d3.svg.axis().orient("left"),
          background,
          foreground;
        var svg = d3.select("#parrallel").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var svgbottom = d3.select("#RawData").append("svg")
                  .attr("width", 2710)
                  .attr("height", 1760)

        svgbottom.append("text")
                    .text("Please select some data with parrallel coordinates.")
                    .attr("class", "selecteddata")
                    .attr("x", 30)
                    .attr("y", 50)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

        d3.csv("data/ParrallelCoordinates/Rhapsodie_genre.csv", function(error, data) {

          dimensions.forEach(function(dimension) {

          dimension.scale.domain(dimension.type === "number"
            ? d3.extent(data, function(d) { return +d[dimension.name]; })
            : data.map(function(d) { return d[dimension.name]; }).sort());

          });
          // Add grey background lines for context.
          background = svg.append("g")
              .attr("class", "background")
              .selectAll("path")
              .data(data)
              .enter().append("path")
              .attr("d", path);
          // Add blue foreground lines for focus.
          foreground = svg.append("g")
              .attr("class", "foreground")
              .selectAll("path")
              .data(data)
              .enter().append("path")
              .attr("d", path);
          // Add a group element for each dimension.
          var g = svg.selectAll(".dimension")
                .data(dimensions)
                .enter().append("g")
                .attr("class", "dimension")
                .attr("transform", function(d) { return "translate(" + x(d.name) + ")"; })
                .call(d3.behavior.drag()
                      .origin(function(d) {return {x: x(d.name)}; })
                      .on("dragstart", function(d) {

                        dragging[d.name] = x(d.name);
                        background.attr("visibility", "hidden");
                      })
                      .on("drag", function(d) {
                        dragging[d.name] = Math.min(width, Math.max(0, d3.event.x));
                        foreground.attr("d", path);
                        dimensions.sort(function(a, b) { return position(a) - position(b); });
                        x.domain(dimensions.map(function(d) { return d.name; }));
                        g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })

                      })
                      .on("dragend", function(d) {
                        delete dragging[d.name];
                        transition(d3.select(this)).attr("transform", "translate(" + x(d.name) + ")");
                        transition(foreground).attr("d", path);
                        background
                          .attr("d", path)
                          .transition()
                            .delay(500)
                            .duration(0)
                            .attr("visibility", null);
                      })
                );

          g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(axis.scale(d.scale)); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("class", "axis-label")
            .attr("y", -19)
            .text(function(d) { return d.name; });
        // Add and store a brush for each axis.
          g.append("g")
            .attr("class", "brush")
            .each(function(d) {
              d3.select(this).call(d.scale.brush = d3.svg.brush().y(d.scale).on("brushstart", brushstart).on("brush", brush));
            })
            .selectAll("rect")
            .attr("x", -8)
            .attr("width", 16);


          })

        function position(d) {
          var v = dragging[d.name];
          return v == null ? x(d.name) : v;
        }
        function transition(g) {
          return g.transition().duration(500);
        }
        // Returns the path for a given data point.
        function path(d) {
          //return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
          return line(dimensions.map(function(dimension) {
            var v = dragging[dimension.name];
            var tx = v == null ? x(dimension.name) : v;
            return [tx, dimension.scale(d[dimension.name])];
          }));
        }
        function brushstart() {
          d3.event.sourceEvent.stopPropagation();
        }


        function brush() {
          var actives = dimensions.filter(function(p) { return !p.scale.brush.empty(); }),
          extents = actives.map(function(p) { return p.scale.brush.extent(); });

          var selectedList = [];
          foreground.style("display", function (d) {
            var reted = actives.every(function (p, i) {
              if (p.type === "number") {
                return extents[i][0] <= parseFloat(d[p.name]) && parseFloat(d[p.name]) <= extents[i][1];
              } else {
                return extents[i][0] <= p.scale(d[p.name]) && p.scale(d[p.name]) <= extents[i][1];
              }
            }) ? null : "none";
            if (reted == null) selectedList.push(d);
            return reted;
          });

          var outdata = selectedList[0];
          //console.log(selectedList);
          //if(outdata!=null){

          svgbottom.selectAll(".selecteddata").remove();

          d3.csv("data/ParrallelCoordinates/Rhapsodie_re.csv", function(error, data2) {

            for(var q = 0; q < 8; q++){
                      svgbottom.append("text")
                    .text(data2_legend[q])
                    .attr("class", "selecteddata")
                    .attr("x", 30+(90*q))
                    .attr("y", 20)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black")
                    .attr("font-weight", "bold");
                  }

            for(var q = 8; q < 9; q++){
                      svgbottom.append("text")
                    .text(data2_legend[q])
                    .attr("class", "selecteddata")
                    .attr("x", 780)
                    .attr("y", 20)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black")
                    .attr("font-weight", "bold");
                  }

            for(var q = 9; q < 10; q++){
                      svgbottom.append("text")
                    .text(data2_legend[q])
                    .attr("class", "selecteddata")
                    .attr("x", 950)
                    .attr("y", 20)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black")
                    .attr("font-weight", "bold");
                  }

            for(var q = 10; q < data2_legend.length; q++){
                      svgbottom.append("text")
                    .text(data2_legend[q])
                    .attr("class", "selecteddata")
                    .attr("x", 950+(90*(q-9)))
                    .attr("y", 20)
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black")
                    .attr("font-weight", "bold");
                  }

            console.log(data2[0])
            for(var j = 0; j < data2.length; j++){
              for(var k = 0; k < selectedList.length; k++){
                var outshowdata = selectedList[k];
                if(data2[j].ID==outshowdata.ID){

                  svgbottom.append("text")
                    .text(data2[j].ID)
                    .attr("class", "selecteddata")
                    .attr("x", 30)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Discourse)
                    .attr("class", "selecteddata")
                    .attr("x", 120)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Genre)
                    .attr("class", "selecteddata")
                    .attr("x", 210)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Interactivity)
                    .attr("class", "selecteddata")
                    .attr("x", 300)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Social_context)
                    .attr("class", "selecteddata")
                    .attr("x", 390)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Event_structure)
                    .attr("class", "selecteddata")
                    .attr("x", 480)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Channel)
                    .attr("class", "selecteddata")
                    .attr("x", 570)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Planning_type)
                    .attr("class", "selecteddata")
                    .attr("x", 660)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Subject)
                    .attr("class", "selecteddata")
                    .attr("x", 780)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].B_B)
                    .attr("class", "selecteddata")
                    .attr("x", 950)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].B_I)
                    .attr("class", "selecteddata")
                    .attr("x", 1040)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].B_L)
                    .attr("class", "selecteddata")
                    .attr("x", 1130)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].B_U)
                    .attr("class", "selecteddata")
                    .attr("x", 1220)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].I_B)
                    .attr("class", "selecteddata")
                    .attr("x", 1310)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].I_L)
                    .attr("class", "selecteddata")
                    .attr("x", 1400)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].I_U)
                    .attr("class", "selecteddata")
                    .attr("x", 1490)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].L_B)
                    .attr("class", "selecteddata")
                    .attr("x", 1580)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].L_I)
                    .attr("class", "selecteddata")
                    .attr("x", 1670)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].L_L)
                    .attr("class", "selecteddata")
                    .attr("x", 1760)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].L_U)
                    .attr("class", "selecteddata")
                    .attr("x", 1850)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].U_B)
                    .attr("class", "selecteddata")
                    .attr("x", 1940)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].U_I)
                    .attr("class", "selecteddata")
                    .attr("x", 2030)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].U_L)
                    .attr("class", "selecteddata")
                    .attr("x", 2120)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].U_U)
                    .attr("class", "selecteddata")
                    .attr("x", 2210)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].LI_UI_LB_UB)
                    .attr("class", "selecteddata")
                    .attr("x", 2300)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].IL_IU_BL_BU)
                    .attr("class", "selecteddata")
                    .attr("x", 2390)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].deY_Z)
                    .attr("class", "selecteddata")
                    .attr("x", 2480)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].LL_UL_LU_UU)
                    .attr("class", "selecteddata")
                    .attr("x", 2570)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                  svgbottom.append("text")
                    .text(data2[j].Total)
                    .attr("class", "selecteddata")
                    .attr("x", 2660)
                    .attr("y", 50+(30*k))
                    .attr("text-anchor", "right")
                    .attr("font-family", "Open Sans")
                    .attr("font-size", "12px")
                    .attr("fill", "black");

                 

                  
                }
              }
            }
          })
          //}
        }
      })
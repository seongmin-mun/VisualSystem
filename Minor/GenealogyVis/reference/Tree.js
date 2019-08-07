$(document).ready(function () {

    for(var k = 0 ; k < 15list.length; k++){
        $( "#select" ).append("<option value='"+15list[k].key+"'>"+15list[k].name+"("+15list[k].size+")"+"</option>");
    }

var diameter = 960;
/*계층 시각화의 원 크기*/

var tree = d3.layout.tree()
    .size([360, diameter / 2 - 120])      /*원에서 360도를 다 사용하기*/
    .separation(function (a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
    });
/*날려도 상관 없음...(?)*/

var diagonal = d3.svg.diagonal.radial()
    .projection(function (d) {
        return [d.y, d.x / 180 * Math.PI];
    });
/*선의 번들링 퍼지는 정도에 대한 기능*/


var svg = d3.select("body").append("svg")    /*바디의 svg에 시각화 구현*/
    .attr("width", diameter)          /*옆쪽의 공간이 사라짐.....(?)*/
    .attr("height", diameter - 300)   /*아래쪽 빈공간이 사라짐*/
    .call(d3.behavior.zoom().on("zoom", function () {     //여기서부터 줌기능, 드레그 기능이다.
        console.log("clicked!");
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + 335 + ")")
    .attr("pointer-events", "path");
//.call(d3.behavior.zoom().on("zoom", function () {     //여기서부터 줌기능, 드레그 기능이다.
//    console.log("clicked!");
//    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
//}))
//.append("g");   //줌기능, 드레그 기능 완료


var out_nodes;

function btnclick1() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', function (d) {     //transition()은 노드크기가 변화할때의 애니메이션기능임
            return 1 + d.size / 2;                   //기본값으로 1이 들어가고 데이터 사이즈를 2로나누어 더하기
        });
    }
}
function btnclick2() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', function (d) {
            return 1 + d.parent_size / 2;
        });
    }
}
function btnclick3() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', function (d) {
            return 1 + d.grand_size / 2;
        });
    }
}
function btnclick4() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', function (d) {
            return 1 + d.biggest_uncle_size / 2;
        });
    }
}
function btnclick5() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', 2.5);
    }
}
//    function btnclick6(){
//        console.log('on press button');
//        console.log(out_nodes);
//        for(var i = 0 ; i < out_nodes.length ; i ++){
//            out_nodes.transition().attr('r',function(d){
//                return (d.size-d.parent_size) * 2  ;
//            } );
//        }
//    }
function btnclick6() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', function (d) {
            if ((d.size - d.parent_size) > 0) {
                return (((d.size - d.parent_size) + 2.5) * 1.3) * ((d.size + d.parent_size) / 20);
            } else {
                return 2.5;
            }
        });
    }
}
function btnclick7() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', function (d) {
            if ((d.size - d.grand_size) > 0) {
                return (((d.size - d.grand_size) + 2.5) * 1.3) * ((d.size + d.grand_size) / 20);
            } else {
                return 2.5;
            }

//                return (d.size - d.grand_size)  ;
        });
    }
}
function btnclick8() {
    console.log('on press button');
    console.log(out_nodes);
    for (var i = 0; i < out_nodes.length; i++) {
        out_nodes.transition().attr('r', function (d) {

            if ((d.size - d.biggest_uncle_size) > 0) {
                return (((d.size - d.biggest_uncle_size) + 2.5) * 1.3) * ((d.size + d.biggest_uncle_size) / 20);
            } else {
                return 2.5;
            }

        });
    }
}

var is_selected = false;
function btnclick9() {
    console.log(is_selected);
    if (is_selected == false) {
        for (var i = 0; i < out_nodes.length; i++) {
            out_nodes.transition().attr('r', 2.5);
            out_nodes.transition().style("fill", function (d) {
                if (d.line == 0) {
                    return "#0000ff";
                } else {
                    return "#ff0000";
                }
            });
        }
        is_selected = true;
    } else {
        for (var i = 0; i < out_nodes.length; i++) {
            out_nodes.transition().attr("r", 2.5);
            out_nodes.transition().style("fill", '#ffffff');
        }
        is_selected = false;
    }
}

var is_selected2 = false;
function btnclick10() {
    if (is_selected2 == false) {
        var link = svg.selectAll("path")
            .attr("class", function (d) {
                if (d.target.line == 0) {
                    return 'link-blue';
                } else {
                    return 'link-red';
                }
            })
            .attr("d", diagonal);
        is_selected2 = true;
    } else {
        var link = svg.selectAll("path")
            .attr("class", 'link')
            .attr("d", diagonal);
        is_selected2 = false;
    }
}
//    function btnclick9(){
//        console.log('on press button');
//        console.log(out_nodes);
//        for(var i = 0 ; i < out_nodes.length ; i ++){
//            out_nodes.transition().style("fill", function(d) {
//                if(d.sex==1){ //如果有子节点          당신은 자식 노드가 있다면
//                .append("circle").style("fill","blue");
//                }else{
//                .append("circle").style("fill","red");
//                }
//            }
//        }
//    }

var root;
var links;

//d3.json("data/Data(+parent).json", function (error, root) {
d3.json("data/Data(+parent+time).json", function (error, root) {

    if (error) {
        console.log(error);
        return;

    }

    /*에러일때 에러를 던져줘라*/

    var nodes = tree.nodes(root);
    links = tree.links(nodes);


    /*시각화 전체가 사리짐 */
//        var link = svg.selectAll(".link")
//                .data(links)
//                .enter().append("path")
//                .attr("class", "link")
//                .attr("d", diagonal);

    var link = svg.selectAll(".link")    //위의 코드가 원래의 시각화 라인 코드
        .data(links)
        .enter().append("path")
        .attr("class", 'link')
        .attr("d", diagonal);

    // 툴팁 표시를 위한 div 오브젝트 생성//마우스 호버시 정보 나타내기
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        })
        .on("mouseenter", function (d) {     // .node에 mouseenter 이벤트 핸들러 등록
            div.transition()
                .duration(100)
                .style('opacity', .9);
            div.html('<strong>' + d.name + '</strong>' + '(' + (d.sex == 0 ? '남' : '여') + ')' + '<br/>'     // 해당 노드의 데이터를 툴팁 div에 html 포멧으로 삽입
                    + '계급 : ' + d.size + ' ' + '<br/>'     // 해당 노드의 데이터를 툴팁 div에 html 포멧으로 삽입
                    + '세대 : ' + d.key.length + '대' + '<br/>'
                    + '계급이름 : ' + d.title + ' ' + '<br/>'
                    + '본가 : ' + d.family_origin + ' ' + '<br/>'
                    + '출생년도 : ' + d.birth + ' ' + '<br/>'
                    + '사망년도 : ' + d.death + ' ')
                .style('left', (d3.event.pageX) + 'px')
                .style('top', (d3.event.pageY) + 'px');     // 해당 노드의 위치로 툴팁 div 오브젝트 이동
        })
        .on("mouseleave", function (d) {
            div.transition()
                .duration(100)
                .style('opacity', 0);
        })



    out_nodes = node.append("circle")     //버튼과의 연동을 하기위해서 out_nodes를 만들어줌
        .attr("r", 2.5);      //노드 데이터의 크기 지정


    node.append("text")
        .attr("dy", ".31em")   /*텍스트의 방향과 가운데로부터 퍼지는 정도 조절*/
        .attr("text-anchor", function (d) {
            return d.x < 180 ? "start" : "end";
        })  /*오른쪽 12시 방향->6시방향 텍스트 띄우기*/
        .attr("transform", function (d) {
            return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
        })
        //                .style("fill", "#3182bd")     //글자색상지정
        /*텍스트 방향 로테이션시키기(대칭)*/
        .text(function (d) {
            return d.name;
        });


    function mouseover() {
        d3.select(this).select("circle").transition()
            .duration(750)
//                    .attr("r", function(d) {
//                        return d.size + 5;
//                    });
        d3.select(this).select("text").transition()
            .duration(750)
            .attr("dy", ".31em")
            .attr("text-anchor", function (d) {
                return d.x < 180 ? "start" : "end";
            })
            .attr("transform", function (d) {
                return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
            })
            .style("stroke-width", ".5px")
            .style("font-size", "15.2px")
            .style("opacity", 1);
    }

    function mouseout() {
        d3.select(this).select("circle").transition()
            .duration(750)
//                    .attr("r", function(d) {
//                        return d.size;
//                    });
        d3.select(this).select("text").transition()
            .duration(750)
            .attr("dy", ".31em")
            .attr("text-anchor", function (d) {
                return d.x < 180 ? "start" : "end";
            })
            .attr("transform", function (d) {
                return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
            })
            //                    .style("font", "8px serif")
            //                    .style("font", "10px sans-serif")
            .style("font-size", "10px")
            .style("opacity", 0.9);
    }
});

d3.select(self.frameElement).style("height", diameter - 150 + "px");

})

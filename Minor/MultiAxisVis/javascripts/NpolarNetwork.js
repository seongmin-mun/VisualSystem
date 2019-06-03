/**
 * Created by Seongmin_M on 2016. 10. 17..
 */
/**
 * Created by Hyunwoo on 2016. 5. 18..
 */

var nodes = [];

var spot = [];
var spotLength = 4;

function makeSpot(){
    var radius = 200;

    for(var i = 0; i  < spotLength; i ++) {
        var x = Math.cos(Math.PI * 2 / spotLength * i) * radius + 400;
        var y = Math.sin(Math.PI * 2 / spotLength * i) * radius + 300;
        spot.push({
            x: x,
            y: y,
        })
    }
}

function makeNodes(){
    for(var i = 0 ; i <200; i ++) {
        var rand = 1;
        var each = {
            gravity : [],
            label : 'node ' + i,
            x:0,
            y:0,
            size : Math.random() * 2 + 1,
            svg : null,
        };

        //var num = 0;

        each.svg = drawCircle(root, 0, 0, each.size, '#FA0');
        for(var j = 0 ; j < spotLength ; j ++){
            var value = (Math.random()*0.5) * Math.pow(rand, 3);

            if(j === spotLength - 1){
                value = rand;
            }
            each.gravity.push(value);
            rand -= value;

            //num += value
        }


        nodes.push(each);

        console.log(each);

        console.log(Math.random());
    }
}


var root = d3.select('#renderer').append('svg')
    .attr('width', 800)
    .attr('height', 600);

makeSpot();
makeNodes();

for(var i = 0 ;i < spot.length; i ++){
    console.log('?')
    drawCircle(root, spot[i].x , spot[i].y, 5, '#F00');
}

function updateNodes(){
    for(var i = 0 ; i <nodes.length ; i ++){
        nodes[i]['svg'].attr('cx', nodes[i]['x']);
        nodes[i]['svg'].attr('cy', nodes[i]['y']);
    }
}
function drawNodes(){
    for(var i = 0 ; i <nodes.length ; i ++){
        var posX = 0;
        var posY = 0;

        for(var j = 0;  j < nodes[i].gravity.length; j ++){
            var idf = nodes[i].gravity[j];
            posX += spot[j].x * idf;
            posY += spot[j].y * idf;

        }
        nodes[i]['x'] = posX;
        nodes[i]['y'] = posY;

        nodes[i]['svg'].attr('cx', posX);
        nodes[i]['svg'].attr('cy', posY);
    }
}

function flok(){
    for(var i = 0 ; i < nodes.length ; i ++){
        for(var j = 0 ; j < nodes.length ; j ++){
            if(i == j) continue;

            var dist = distance(nodes[i], nodes[j]);
            //console.log('dist',dist);
            if(distance(nodes[i], nodes[j]) < 5){
                // flok
                console.log('near')

                var diffX = nodes[i].x - nodes[j].x;
                var diffY = nodes[i].y - nodes[j].y;

                nodes[i].x += diffX * 0.25;
                nodes[i].y += diffY * 0.25;

                nodes[j].x -= diffX * 0.25;
                nodes[j].y -= diffY * 0.25;

            }



        }
    }
    function distance(from , to){
        return Math.pow(Math.pow(from.x - to.x, 2)
            + Math.pow(from.y - to.y, 2),
            0.5);
    }

}

// drawNodes();
setInterval(function(){
    flok();
    updateNodes();
}, 1000);

drawNodes();



function drawCircle(root, x, y, size, color){
    return root.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('fill', color)
        .attr('r', size);
}
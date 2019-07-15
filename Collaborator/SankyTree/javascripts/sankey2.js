
/**
 * Created by BaeSung-yun on 2017. 4. 03..
 */


Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
Array.prototype.clone = function() {
    return this.slice(0);
};


var w = document.getElementById('chart').offsetWidth;
var h = document.getElementById('chart').offsetHeight;

var nodeDrawinfo = {};//id : depth,y,width .color
var nodeLinkinfo = {};//id : child1,child2
var nodeInfo = {};//id : per,num
var nodeid =[];
var edgeInfo = [];
var splitVar = {};//분할변수:색상
var splitOrder =[];
var depthNodes = {};

//------------노드를 그리기 위한 함수-------------------------------------------------
function GetNode(nodes) {//노드를 그리기 위한 nodeDrawinfo를 return하는 함수
    nodes.forEach(function (nodes) {
        NodeYpos(nodes.id);//y 값을 계산해서 다시 넣어준다
    });
    return nodeDrawinfo;
}

function NodeDraw(nodes) {//노드를 그리는 정보를 만드는 함수 단 y값이 전부 센터로 고정된 값
    var ypos = h /2 ;
    var width = 100;
    nodes.forEach(function (nodes) {
        var depth = Number(nodes.depth);
        var id = nodes.id;
        var xpos = node_start + depth * node_spaceX;
        var check = id+"l";
        var group = nodes.group;
        var split = nodes.splitpoint
        var value = depthNodes[depth];

        if(value!=undefined){
            value.push(id);
            depthNodes[depth] = value;
        }else {
            depthNodes[depth] = [id];
        }
        if(id.includes("NODE"))
            nodeid.push(id);
        nodeLinkinfo[id] = [nodes.child1, nodes.child2];
        nodeDrawinfo[id] = [{depth: depth, x: xpos, y: ypos, width: width, group : group, splitpoint:split}];
    });
}

function NodeWidthConverter(width){
    var edit = 0.8;
    var max = h*0.4*edit;
    var min = h*0.001*edit;
    var width_range = max-min;
    var value_range = Number(20836-33);

    var convertedWidth = width*width_range / value_range +min;

    return convertedWidth;
}

function NodeWidth(edges) {//노드의 길이를 계산해 주는 함수
    edges.forEach(function (edge) {
        var id = edge.from;
        nodeDrawinfo[id][0].width = NodeWidthConverter(edge.num);
        nodeDrawinfo[id].color = edge.dementia;

        var dementia = edge.dementia;
        var num = edge.num;

        nodeInfo[id] = {per:dementia,num:num};

    })
}

function DepthClean(Arr){
    for(var i=0; i<Arr.length; i++){
        if(Arr[i].includes("SKIP")){
            Arr.remove("SKIP");
            break;
        }
    }
    return Arr;
}
function NodeYpos(id) {//노드의 y값을 계산해 주는 함수

    var this_depth = nodeDrawinfo[id][0].depth;
    var idx =depthNodes[this_depth].indexOf(id);
    var depth_position = depthNodes[this_depth];

    var y_mid = nodeDrawinfo[id][0].y;

    if(this_depth==1&&idx==0){
        changeDirectionNode = id;
    }

    var node_spaceY = h * 0.024;//같은 depth에서 노드간의 떨어진 y값
    if(nodeDrawinfo[id][0].width<50)
        node_spaceY = node_spaceY/2;

    nodeDrawinfo[id][0].y = y_mid - (nodeDrawinfo[id][0].width / 2);

    if(this_depth!=0) {
        var beforeDepth = depthNodes[this_depth - 1];
        beforeDepth = DepthClean(beforeDepth);
        var beforeDepthNode = [];
        for(var i=0; i<beforeDepth.length; i++){
            if(beforeDepth[i].includes("NODE"))
                beforeDepthNode.push(i);
        }
        if(idx==0){
            for(var j=0; j<beforeDepthNode.length; j++){
                var nodeidx = Number(beforeDepthNode[j]);
                depthNodes[this_depth].insert(nodeidx*2,"SKIP");
                depthNodes[this_depth].insert(nodeidx*2+1,"SKIP");
            }

            idx =depthNodes[this_depth].indexOf(id);
        }

        var parentIdx= parseInt((idx)/2);
        var start = false;

        if(depth_position[idx-1]=="SKIP"||idx==0){
            start=true;
        }


        var parentID = beforeDepth[parentIdx];
        var NODESPACE = 0;
        var upperNode;
        if (start) {
                var bfD_top = nodeDrawinfo[parentID][0].y;
                var numBeforeDepth = beforeDepth.clone();
                numBeforeDepth = DepthClean(numBeforeDepth);
                var depthGap = numBeforeDepth.length - beforeDepth.length;
                var lift = (depthGap) * node_spaceY;
                if (depthGap < 0)
                    lift = 0;
                nodeDrawinfo[id][0].y = bfD_top - lift - node_spaceY * 2 + NODESPACE;
            if(idx>3&&(depth_position[idx-3]!="SKIP")) {
                upperNode= nodeDrawinfo[depth_position[idx-3]][0];
                nodeDrawinfo[id][0].y = upperNode.y + upperNode.width +NODESPACE +node_spaceY*3;
            }
        }else {
            upperNode= nodeDrawinfo[depth_position[idx-1]][0];
            nodeDrawinfo[id][0].y = upperNode.y + upperNode.width +NODESPACE +node_spaceY*3;
        }
    }

}

function ReturnPointY(id) {//분기점을 그릴때 노드내에서 높이를 return하는 함수
    var child = nodeLinkinfo[id][0];
    var rate = 0;
    if (child != "END") {
        rate = nodeDrawinfo[child][0].width / nodeDrawinfo[id][0].width;
    }
    return rate;
}
//--------------여기부터 edge를 그리기 위한 함수----------------------------------------------------------------
function GetEdge(nodes,uppx) {//jade에서 edgeInfo를 가져가는 함수
    nodes.forEach(function (nodes) {
        MakeEdge(nodes.id,uppx);//각 노드마다 edge를 만든다
    });
    return edgeInfo;
}
function MakeEdge(id,uppx) {//edge를 그리는 정보를 가지는 array를 만드는 함수
    var x0 = nodeDrawinfo[id][0].x + node_width;
    var y0 = nodeDrawinfo[id][0].y + uppx;
    for (var i = 0; i < nodeLinkinfo[id].length; i++) {
        var child = nodeLinkinfo[id][i];
        if (child == "END")
            continue;
        var edgeid = id + "x" + child;
        var x1 = nodeDrawinfo[child][0].x;
        var y1 = nodeDrawinfo[child][0].y+uppx;
        var width = nodeDrawinfo[child][0].width;
        var color = nodeDrawinfo[child].color;
        var value = [{id: edgeid, x0: x0, y0: y0, x1: x1, y1: y1, width: width, color: color}];
        edgeInfo.push(value);
        y0 += width;
    }
}

//----------------------그룹컬러를 담당하는 곳 ----------------------------------

function MakeSplitInfo(splits) {
    splits.forEach(function (split) {
        splitVar[split.name] = split.color;
        splitOrder.push(split.name);
    });
}
function GetSplitInfo(type){
    if(type == "order")
        return splitOrder;
    return splitVar;
}
//------------마우스 오버시 필요한 정보를 위한 함수-------------------------------------------------------
function RetrunEdgeInfo(id){//각각 node정보를 return하는 함수
    return nodeInfo[id];
}

function FindParents(id){
    var checkid = id;
    var own = nodeDrawinfo[id][0];
    var depth = own.depth;
    var flow =[{node:id,child:2}];
    while (depth>0){
        --depth;
        var arr = depthNodes[depth];
        for(var i=0; i<arr.length;i++){
            var idx = nodeLinkinfo[arr[i]].indexOf(checkid);
            if(idx != -1){
                flow.push({node:arr[i],child:idx});
                checkid = arr[i];
                break
            }
        }
    }
    var flowVal=[];
    for(var i=flow.length-1; i>-1;i--){
        var flowid = flow[i].node;
        var flowch = flow[i].child;
        var flowgroup = nodeDrawinfo[flowid][0].group;
        var text = flowgroup;
            if(flowch==0){
                text += nodeDrawinfo[flowid][0].splitpoint;
            }
        else
            {
                var splittext = nodeDrawinfo[flowid][0].splitpoint.split(">=");
                if (splittext[1] == "0") {
                    text += "<0";
                }
                else
                    text += "<" + splittext[1];
            }
            if (flowch == 2) {
                text = flowgroup;
            }
        flowVal.push({text:text,group:flowgroup,id:flowid});
    }
    return flowVal;
}
//------------노드 정렬을 위한 함수--------------------------------------------
function SortNode(type){
    var nodeArray = nodeid;
    var comId1,comId2,com1,com2;

    for(var i=0; i<nodeArray.length-1;i++){
        comId1 = nodeInfo[nodeArray[i]];
        for(var j=i+1; j<nodeArray.length;j++){
            comId2 = nodeInfo[nodeArray[j]];

            if(type=="value"){
                com1 = comId1.num;
                com2 = comId2.num;
            }

            if(type=="dementia"){
                com1 = comId1.per;
                com2 = comId2.per;
            }

            if(type=="normal"){
                com1 = 100-comId1.per;
                com2 = 100-comId2.per;
            }

            if(com1<com2){
                var temp = nodeArray[i];
                nodeArray[i]=nodeArray[j];
                nodeArray[j]=temp;
                comId1 = comId2;
            }
        }
    }
    return nodeArray;
}
function nodeCVTseg(stx){
    var cvtstx = stx.replace("NODE","SEG");
    return cvtstx;
}
//-------------------------------
function svgPositionY(id){
    var y= nodeDrawinfo[id][0].y;
    var up = h*0.00001-y;
    return up;
}

//--------------------------
function textClen(text) {
    var res = text.replace(/_/gi, " ");
    var res2 =res.replace("현재"," (현재)");
    var res3 =res2.replace("잠재"," (잠재)");

    return res3;
}

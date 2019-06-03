$(document).ready(function () {

    var width = $(window).width()

    var height = $(window).height()

    //상단쪽 디폴트 디자인

    var svgheader = d3.select("#header")
            .append("svg")
            .attr("width", width)
            .attr("height", 50)

    svgheader.append("text")
            .text("Source : President's speeches in U.S.")
            .attr("x", (width * 0.008))
            .attr("y", 37)
            .attr("text-anchor", "start")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "28px")
            .attr("fill", "white")
            .attr("font-weight", "bold")
            .style("cursor", "default")
            .on("mouseover", function () {
                d3.select(this)
                        .attr("fill", "#84B5E5")
                        .style("cursor", "pointer")
            })
            .on("mouseout", function () {
                d3.select(this)
                        .attr("fill", "white")
                        .style("cursor", "default")
            })
            .on("click", Show_popup_millercenter)


    function Show_popup_millercenter() {
        window.open("https://millercenter.org/");
    }


    svgheader.append("image")
            .attr("xlink:href", "images/button/download_circle.png")
            .attr("x", width * 0.865)
            .attr("y", 12)
            .attr("width", 60)
            .attr("height", 27)
            .style("cursor", "default")
            .on("mouseover", function () {
                d3.select(this)
                        .attr("x", width * 0.863)
                        .attr("y", 11)
                        .attr("width", 66)
                        .attr("height", 29)
                        .style("cursor", "pointer")
            })
            .on("mouseout", function () {
                d3.select(this)
                        .attr("x", width * 0.865)
                        .attr("y", 12)
                        .attr("width", 60)
                        .attr("height", 27)
                        .style("cursor", "default")
            })
            .on("click", Show_popup_download)
            //.on("click", Show_popup_download)


    function Show_popup_download() {
        console.log("downloading..")
        window.location.href = 'data/US_President.zip';
    }

            //function Show_popup_download() {
                //window.open("http://202.30.24.167:3011/Seongmin_Mun");
            //}


    svgheader.append("image")
            .attr("xlink:href", "images/button/person_circle.png")
            .attr("x", width * 0.895)
            .attr("y", 12)
            .attr("width", 60)
            .attr("height", 27)
            .style("cursor", "default")
            .on("mouseover", function () {
                d3.select(this)
                        .attr("x", width * 0.893)
                        .attr("y", 11)
                        .attr("width", 66)
                        .attr("height", 29)
                        .style("cursor", "pointer")
            })
            .on("mouseout", function () {
                d3.select(this)
                        .attr("x", width * 0.895)
                        .attr("y", 12)
                        .attr("width", 60)
                        .attr("height", 27)
                        .style("cursor", "default")
            })
            .on("click", Show_popup_personal)

    //Show_popup()

    function Show_popup_personal() {
        window.open("http://ressources.modyco.fr/sm/Seongmin/");
    }

    svgheader.append("image")
            .attr("xlink:href", "images/button/info_circle.png")
            .attr("x", width * 0.925)
            .attr("y", 12)
            .attr("width", 60)
            .attr("height", 27)
            .style("cursor", "default")
            .on("mouseover", function () {
                d3.select(this)
                        .attr("x", width * 0.923)
                        .attr("y", 11)
                        .attr("width", 66)
                        .attr("height", 29)
                        .style("cursor", "pointer")
            })
            .on("mouseout", function () {
                d3.select(this)
                        .attr("x", width * 0.925)
                        .attr("y", 12)
                        .attr("width", 60)
                        .attr("height", 27)
                        .style("cursor", "default")
            })
            .on("click", Show_popup_information)

    function Show_popup_information() {
        window.open("http://ressources.modyco.fr/sm/MultiwordVis/information.html");
    }
    //.on("click", Show_popup_Guide)

    //Show_popup()

    //function Show_popup_Guide() {
    //window.open("Guideline", "guideline");
    //}

    //var mail_position = (((width - (width * 0.4)) * 0.4) - (354 * 0.25))


    svgheader.append("image")
            .attr("xlink:href", "images/button/mail_circle.png")
            .attr("x", width * 0.955)
            .attr("y", 12)
            .attr("width", 60)
            .attr("height", 27)
            .style("cursor", "default")
            .on("mouseover", function () {
                d3.select(this)
                        .attr("x", width * 0.953)
                        .attr("y", 11)
                        .attr("width", 66)
                        .attr("height", 29)
                        .style("cursor", "pointer")
            })
            .on("mouseout", function () {
                d3.select(this)
                        .attr("x", width * 0.955)
                        .attr("y", 12)
                        .attr("width", 60)
                        .attr("height", 27)
                        .style("cursor", "default")
            })
            .on("click", Show_popup_author)
            
    function Show_popup_author() {
        window.open("http://ressources.modyco.fr/sm/MultiwordVis/author.html");
    }







    //메인 좌측 정보 시각화

    var svgleft = d3.select("#left")
            .append("svg")
            .attr("width", width * 0.39)
            .attr("height", 640)
            .attr("fill", "white")

    svgleft.append("rect")
            .attr("class", "svgleft_rect")
            .attr("x", 1)
            .attr("y", 10)
            .attr("width", width * 0.3885)
            .attr("height", 160)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgleft.append("rect")
            .attr("class", "svgleft_rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.39)
            .attr("height", 25)
            .attr("fill", "#717171")

    

    //left_변경부분


    //정보 함수


    drawInformation(Information_All_speech, 0);

    function drawInformation(data, i) {

        svgleft.selectAll(".svgleft_text_name").remove();
        svgleft.selectAll(".svgleft_image").remove();
        svgleft.selectAll(".svgleft_HTMLtext").remove();

        svgleft.append("text")
                .text(data[i].name)
                .attr("class", "svgleft_text_name")
                .attr("x", (width * 0.008))
                .attr("y", 14)
                .attr("text-anchor", "right")
                .attr("dominant-baseline", "middle")
                .attr("font-family", "Helvetica Neue")
                .attr("font-size", "17px")
                .attr("fill", "white")

        svgleft.append("image")
                .attr("class", "svgleft_image")
                .attr("xlink:href", "images/president/" + data[i].name + ".png")
                .attr("x", width * 0.01)
                .attr("y", 33)
                .attr("width", width * 0.1)
                .attr("height", 130)
                .style("cursor", "default")

        svgleft.append("foreignObject")
                .attr("class", "svgleft_HTMLtext")
                .attr("x", width * 0.12)
                .attr("y", 36)
                .attr("width", width * 0.26)
                .attr("height", 125)
                .append('xhtml:body')
                .style('overflow-y', "scroll")
                .style('max-height', "125px")
                .style('color', "black")
                .style("font", "13px 'Helvetica Neue'")
                .html(data[i].words)
    };

    svgleft.append("rect")
            .attr("class", "svgleft_rect")
            .attr("x", 1)
            .attr("y", 185)
            .attr("width", width * 0.3885)
            .attr("height", 450)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")


    svgleft.append("rect")
            .attr("class", "svgleft_rect")
            .attr("x", 0)
            .attr("y", 175)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.39)
            .attr("height", 25)
            .attr("fill", "#717171")





    //좌측 하단 기사 정보


    //기사 함수

    drawArticle(Article_All_speech, 0);

    function drawArticle(data, i) {

        svgleft.selectAll(".svgleft_HTMLArticle").remove();
        svgleft.selectAll(".svgleft_title").remove();

        svgleft.append("foreignObject")
                .attr("class", "svgleft_HTMLArticle")
                .attr("id", "svgleft_HTMLArticle")
                .attr("x", width * 0.01)
                .attr("y", 205)
                .attr("width", width * 0.37)
                .attr("height", 425)
                .append('xhtml:body')
                .style('overflow-y', "scroll")
                .style('max-height', "425px")
                .style('color', "black")
                .style("font", "13px 'Helvetica Neue'")
                .html(data[i].words)

        svgleft.append("text")
                .text("Speech transcript ( Number of texts : " + data[i].size + " )")
                .attr("class", "svgleft_title")
                .attr("x", (width * 0.008))
                .attr("y", 189)
                .attr("text-anchor", "right")
                .attr("dominant-baseline", "middle")
                .attr("font-family", "Helvetica Neue")
                .attr("font-size", "17px")
                .attr("fill", "white")

    }



    //센터 부분

    var svgcenter = d3.select("#center")
            .append("svg")
            .attr("width", width * 0.16)
            .attr("height", 640)
            .attr("fill", "white")

    svgcenter.append("rect")
            .attr("class", "svgcenter_rect")
            .attr("x", 1)
            .attr("y", 10)
            .attr("width", width * 0.1585)
            .attr("height", 100)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgcenter.append("rect")
            .attr("class", "svgcenter_rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.16)
            .attr("height", 25)
            .attr("fill", "#717171")

    svgcenter.append("text")
            .text("1.Select N-gram")
            .attr("class", "svgcenter_title")
            .attr("x", (width * 0.008))
            .attr("y", 14)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "white")

    //정책 선택


    svgcenter.append("rect")
            .attr("class", "svgcenter_rect")
            .attr("x", 1)
            .attr("y", 150)
            .attr("width", width * 0.1585)
            .attr("height", 200)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgcenter.append("rect")
            .attr("class", "svgcenter_rect")
            .attr("x", 0)
            .attr("y", 115)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.16)
            .attr("height", 50)
            .attr("fill", "#717171")

    svgcenter.append("text")
            .text("2.Select issue")
            .attr("class", "svgcenter_title")
            .attr("x", (width * 0.008))
            .attr("y", 129)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "white")

    svgcenter.append("text")
            .text("All_speech")
            .attr("class", "svgcenter_text1")
            .attr("x", (width * 0.008))
            .attr("y", 154)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "#84B5E5")



    //대통령 선택


    svgcenter.append("rect")
            .attr("class", "svgcenter_rect")
            .attr("x", 1)
            .attr("y", 365)
            .attr("width", width * 0.1585)
            .attr("height", 270)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgcenter.append("rect")
            .attr("class", "svgcenter_rect")
            .attr("x", 0)
            .attr("y", 355)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.16)
            .attr("height", 25)
            .attr("fill", "#717171")

    svgcenter.append("text")
            .text("3.Select president")
            .attr("class", "svgcenter_title")
            .attr("x", (width * 0.008))
            .attr("y", 370)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "white")



    //시각화부분

    //오른쪽 상단 왼쪽  

    var svgright = d3.select("#right")
            .append("svg")
            .attr("width", width * 0.43)
            .attr("height", 640)
            .attr("fill", "white")

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", 1)
            .attr("y", 10)
            .attr("width", width * 0.2125)
            .attr("height", 140)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.214)
            .attr("height", 25)
            .attr("fill", "#717171")

    svgright.append("text")
            .text("Topic information")
            .attr("class", "svgright_title")
            .attr("x", (width * 0.008))
            .attr("y", 14)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "white")

    svgright.append("text")
            .text("Please select topic in the Word Cloud...")
            .attr("class", "svgright_topinfo")
            .attr("x", (width * 0.017))
            .attr("y", 84)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "13px")
            .attr("fill", "gray")


    //오른쪽 상단 오른쪽

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", width * 0.2175)
            .attr("y", 10)
            .attr("width", width * 0.21)
            .attr("height", 140)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", width * 0.2165)
            .attr("y", 0)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.212)
            .attr("height", 25)
            .attr("fill", "#717171")

    svgright.append("text")
            .text("Color of topics")
            .attr("class", "svgright_title")
            .attr("x", (width * 0.008)+(width * 0.2175))
            .attr("y", 14)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "white")


    //오른쪽 하단 왼쪽

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", 1)
            .attr("y", 165)
            .attr("width", width * 0.2725)
            .attr("height", 470)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", 0)
            .attr("y", 155)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.274)
            .attr("height", 25)
            .attr("fill", "#717171")

    svgright.append("text")
            .text("Word Cloud with multiword")
            .attr("class", "svgright_title")
            .attr("x", (width * 0.008))
            .attr("y", 169)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "white")


    //오른쪽 하단 오른쪽

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", width * 0.2775)
            .attr("y", 165)
            .attr("width", width * 0.1505)
            .attr("height", 470)
            .attr("fill", "white")   
            .attr("stroke", "black")
            .attr("stroke-width", "1px")     

    svgright.append("rect")
            .attr("class", "svgright_rect")
            .attr("x", width * 0.2765)
            .attr("y", 155)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", width * 0.152)
            .attr("height", 25)
            .attr("fill", "#717171")

    svgright.append("text")
            .text("Sorted result")
            .attr("class", "svgright_title")
            .attr("x", (width * 0.008)+(width * 0.2775))
            .attr("y", 169)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "17px")
            .attr("fill", "white")



    draw_uni_issues();
    drawMWordcloud(unigram_MW_All_speech, 0);
    drawPresident(unigram_POS_All_speech, unigram_MW_All_speech, Article_All_speech, Information_All_speech);




    d3.selectAll(".bar-input").on("change", change);

    //transitionUigram();

    function change() {
        if (this.value === "unigram") transitionUigram();
        else if (this.value === "bigram") transitionBigram();
        else if (this.value === "trigram") transitionTrigram();
    }

    function transitionUigram() {

        svgright.selectAll(".svgright_topinfo").remove();

        svgright.append("text")
            .text("Please select topic in the Word Cloud...")
            .attr("class", "svgright_topinfo")
            .attr("x", (width * 0.017))
            .attr("y", 84)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "13px")
            .attr("fill", "gray")

        svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("All_speech");

        drawPresident(unigram_POS_All_speech, unigram_MW_All_speech, Article_All_speech, Information_All_speech);

        drawMWordcloud(unigram_MW_All_speech, 0);

        drawArticle(Article_All_speech, 0);

        drawInformation(Information_All_speech, 0);

        draw_uni_issues();


    }

    function transitionBigram() {

        svgright.selectAll(".svgright_topinfo").remove();

        svgright.append("text")
            .text("Please select topic in the Word Cloud...")
            .attr("class", "svgright_topinfo")
            .attr("x", (width * 0.017))
            .attr("y", 84)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "13px")
            .attr("fill", "gray")


        svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("All_speech");

        drawPresident(bigram_POS_All_speech, bigram_MW_All_speech, Article_All_speech, Information_All_speech);

        drawMWordcloud(bigram_MW_All_speech, 0)

        drawArticle(Article_All_speech, 0);

        drawInformation(Information_All_speech, 0);

        draw_bi_issues();


    }


    function transitionTrigram() {

        svgright.selectAll(".svgright_topinfo").remove();

        svgright.append("text")
            .text("Please select topic in the Word Cloud...")
            .attr("class", "svgright_topinfo")
            .attr("x", (width * 0.017))
            .attr("y", 84)
            .attr("text-anchor", "right")
            .attr("dominant-baseline", "middle")
            .attr("font-family", "Helvetica Neue")
            .attr("font-size", "13px")
            .attr("fill", "gray")

        svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("All_speech");

        drawPresident(trigram_POS_All_speech, trigram_MW_All_speech, Article_All_speech, Information_All_speech);


        drawMWordcloud(trigram_MW_All_speech, 0)

        drawArticle(Article_All_speech, 0);

        drawInformation(Information_All_speech, 0);

        draw_tri_issues();


    }




    var container_legend = d3.select('#container_legend')

    var scroll_down0 = container_legend.append("svg")
                .attr("viewBox", "14,5,100,70")


    var MW_color_name = ["Frequency(0-10)", "Frequency(11-20)", "Frequency(21-30)", "Frequency(31-40)", "Frequency(41-50)", "Frequency(51-60)", "Frequency(more than 61)"];
    var MW_color_color = ["#6BC600", "#AACA00", "#CEB100", "#D27500", "#D53700", "#D90008", "#DD004B"];


        for (var i = 0; i < MW_color_name.length; i++) {

            scroll_down0.append("rect")
                    .attr("class", "MW_color_legend_rect")
                    .attr("x", 18)
                    .attr("y", 8 + (10 * i))
                    .attr("stroke", "")
                    .attr("stroke-width", "0.7px")
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .attr("width", 6.5)
                    .attr("height", 6.5)
                    .attr("fill", MW_color_color[i])

            scroll_down0.append("text")
                    .attr("x", 27)
                    .attr("y", 11 + (10 * i))
                    .attr("class", "MW_color_legend")
                    .text(MW_color_name[i])
                    .attr("text-anchor", "start")
                    .attr("font-family", "Open Sans")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "7.5px")
                    .attr("fill", "black")
                    .style("font-weight", "")
                    .style("cursor", "default")
        }



    //정책 선택


    //정치적 안건

    function draw_uni_issues() {

        var container_m01 = d3.select("#Issue_part");

        var scroll_m1 = container_m01.append("div")
                .attr("id", "container_m01")
                .append("svg")
                .attr("viewBox", "14,5,100,110")
                .append("g");

        container_m01.selectAll(".issues_legend_rect").remove();
        container_m01.selectAll(".issues_legend").remove();


        for (var k = 0; k < 11; k++) {

            scroll_m1.append("rect")
                    .attr("class", "issues_legend_rect")
                    .attr("x", 18)
                    .attr("y", 8 + (10 * k))
                    .attr("stroke", "")
                    .attr("stroke-width", "0.7px")
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .attr("width", 6.5)
                    .attr("height", 6.5)
                    .attr("fill", "#717171")

        }

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 0))
                .attr("class", "issues_legend")
                .text("Economic_Growth")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Economic_Growth");


                    drawPresident(unigram_POS_Economic_Growth, unigram_MW_Economic_Growth, Article_Economic_Growth, Information_Economic_Growth);

                    drawMWordcloud(unigram_MW_Economic_Growth, 0);

                    drawArticle(Article_Economic_Growth, 0);

                    drawInformation(Information_Economic_Growth, 0);
                })


        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 1))
                .attr("class", "issues_legend")
                .text("Social_Welfare")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Social_Welfare");

                    drawPresident(unigram_POS_Social_Welfare, unigram_MW_Social_Welfare, Article_Social_Welfare, Information_Social_Welfare);

                    drawMWordcloud(unigram_MW_Social_Welfare, 0);

                    drawArticle(Article_Social_Welfare, 0);

                    drawInformation(Information_Social_Welfare, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 2))
                .attr("class", "issues_legend")
                .text("US_Policies_War")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("US_Policies (War,,)");

                    drawPresident(unigram_POS_US_Policies_War, unigram_MW_US_Policies_War, Article_US_Policies_War, Information_US_Policies_War);

                    drawMWordcloud(unigram_MW_US_Policies_War, 0);

                    drawArticle(Article_US_Policies_War, 0);

                    drawInformation(Information_US_Policies_War, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 3))
                .attr("class", "issues_legend")
                .text("Health_Care")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Health_Care");

                    drawPresident(unigram_POS_Health_Care, unigram_MW_Health_Care, Article_Health_Care, Information_Health_Care);

                    drawMWordcloud(unigram_MW_Health_Care, 0);

                    drawArticle(Article_Health_Care, 0);

                    drawInformation(Information_Health_Care, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 4))
                .attr("class", "issues_legend")
                .text("Immigration")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Immigration");

                    drawPresident(unigram_POS_Immigration, unigram_MW_Immigration, Article_Immigration, Information_Immigration);

                    drawMWordcloud(unigram_MW_Immigration, 0);

                    drawArticle(Article_Immigration, 0);

                    drawInformation(Information_Immigration, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 5))
                .attr("class", "issues_legend")
                .text("Humanitarian_Aid")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Humanitarian_Aid");

                    drawPresident(unigram_POS_Humanitarian_Aid, unigram_MW_Humanitarian_Aid, Article_Humanitarian_Aid, Information_Humanitarian_Aid);

                    drawMWordcloud(unigram_MW_Humanitarian_Aid, 0);

                    drawArticle(Article_Humanitarian_Aid, 0);

                    drawInformation(Information_Humanitarian_Aid, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 6))
                .attr("class", "issues_legend")
                .text("Protecting_US_Terror")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Protecting_US (Terror,,)");

                    drawPresident(unigram_POS_Protecting_US_Terror, unigram_MW_Protecting_US_Terror, Article_Protecting_US_Terror, Information_Protecting_US_Terror);

                    drawMWordcloud(unigram_MW_Protecting_US_Terror, 0);

                    drawArticle(Article_Protecting_US_Terror, 0);

                    drawInformation(Information_Protecting_US_Terror, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 7))
                .attr("class", "issues_legend")
                .text("Establishing_Democracy")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Establishing_Democracy");

                    drawPresident(unigram_POS_Establishing_Democracy, unigram_MW_Establishing_Democracy, Article_Establishing_Democracy, Information_Establishing_Democracy);

                    drawMWordcloud(unigram_MW_Establishing_Democracy, 0);

                    drawArticle(Article_Establishing_Democracy, 0);

                    drawInformation(Information_Establishing_Democracy, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 8))
                .attr("class", "issues_legend")
                .text("Promoting_US_Strength")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Promoting_US_Strength");

                    drawPresident(unigram_POS_Promoting_US_Strength, unigram_MW_Promoting_US_Strength, Article_Promoting_US_Strength, Information_Promoting_US_Strength);

                    drawMWordcloud(unigram_MW_Promoting_US_Strength, 0);

                    drawArticle(Article_Promoting_US_Strength, 0);

                    drawInformation(Information_Promoting_US_Strength, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 9))
                .attr("class", "issues_legend")
                .text("US_Priorities")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("US_Priorities");

                    drawPresident(unigram_POS_US_Priorities, unigram_MW_US_Priorities, Article_US_Priorities, Information_US_Priorities);

                    drawMWordcloud(unigram_MW_US_Priorities, 0);

                    drawArticle(Article_US_Priorities, 0);

                    drawInformation(Information_US_Priorities, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 10))
                .attr("class", "issues_legend")
                .text("All_speech")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("All_speech");

                    drawPresident(unigram_POS_All_speech, unigram_MW_All_speech, Article_All_speech, Information_All_speech);

                    drawMWordcloud(unigram_MW_All_speech, 0);

                    drawArticle(Article_All_speech, 0);

                    drawInformation(Information_All_speech, 0);
                })
    }

    function draw_bi_issues() {


        var container_m01 = d3.select("#Issue_part");

        var scroll_m1 = container_m01.append("div")
                .attr("id", "container_m01")
                .append("svg")
                .attr("viewBox", "14,5,100,110")
                .append("g");

        container_m01.selectAll(".issues_legend_rect").remove();
        container_m01.selectAll(".issues_legend").remove();


        for (var k = 0; k < 11; k++) {

            scroll_m1.append("rect")
                    .attr("class", "issues_legend_rect")
                    .attr("x", 18)
                    .attr("y", 8 + (10 * k))
                    .attr("stroke", "")
                    .attr("stroke-width", "0.7px")
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .attr("width", 6.5)
                    .attr("height", 6.5)
                    .attr("fill", "#717171")

        }

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 0))
                .attr("class", "issues_legend")
                .text("Economic_Growth")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Economic_Growth");

                    drawPresident(bigram_POS_Economic_Growth, bigram_MW_Economic_Growth, Article_Economic_Growth, Information_Economic_Growth);

                    drawMWordcloud(bigram_MW_Economic_Growth, 0);

                    drawArticle(Article_Economic_Growth, 0);

                    drawInformation(Information_Economic_Growth, 0);
                })


        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 1))
                .attr("class", "issues_legend")
                .text("Social_Welfare")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Social_Welfare");

                    drawPresident(bigram_POS_Social_Welfare, bigram_MW_Social_Welfare, Article_Social_Welfare, Information_Social_Welfare);

                    drawMWordcloud(bigram_MW_Social_Welfare, 0);

                    drawArticle(Article_Social_Welfare, 0);

                    drawInformation(Information_Social_Welfare, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 2))
                .attr("class", "issues_legend")
                .text("US_Policies_War")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("US_Policies (War,,)");

                    drawPresident(bigram_POS_US_Policies_War, bigram_MW_US_Policies_War, Article_US_Policies_War, Information_US_Policies_War);

                    drawMWordcloud(bigram_MW_US_Policies_War, 0);

                    drawArticle(Article_US_Policies_War, 0);

                    drawInformation(Information_US_Policies_War, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 3))
                .attr("class", "issues_legend")
                .text("Health_Care")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Health_Care");

                    drawPresident(bigram_POS_Health_Care, bigram_MW_Health_Care, Article_Health_Care, Information_Health_Care);

                    drawMWordcloud(bigram_MW_Health_Care, 0);

                    drawArticle(Article_Health_Care, 0);

                    drawInformation(Information_Health_Care, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 4))
                .attr("class", "issues_legend")
                .text("Immigration")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Immigration");

                    drawPresident(bigram_POS_Immigration, bigram_MW_Immigration, Article_Immigration, Information_Immigration);

                    drawMWordcloud(bigram_MW_Immigration, 0);

                    drawArticle(Article_Immigration, 0);

                    drawInformation(Information_Immigration, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 5))
                .attr("class", "issues_legend")
                .text("Humanitarian_Aid")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Humanitarian_Aid");

                    drawPresident(bigram_POS_Humanitarian_Aid, bigram_MW_Humanitarian_Aid, Article_Humanitarian_Aid, Information_Humanitarian_Aid);

                    drawMWordcloud(bigram_MW_Humanitarian_Aid, 0);

                    drawArticle(Article_Humanitarian_Aid, 0);

                    drawInformation(Information_Humanitarian_Aid, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 6))
                .attr("class", "issues_legend")
                .text("Protecting_US_Terror")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Protecting_US (Terror,,)");

                    drawPresident(bigram_POS_Protecting_US_Terror, bigram_MW_Protecting_US_Terror, Article_Protecting_US_Terror, Information_Protecting_US_Terror);

                    drawMWordcloud(bigram_MW_Protecting_US_Terror, 0);

                    drawArticle(Article_Protecting_US_Terror, 0);

                    drawInformation(Information_Protecting_US_Terror, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 7))
                .attr("class", "issues_legend")
                .text("Establishing_Democracy")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Establishing_Democracy");

                    drawPresident(bigram_POS_Establishing_Democracy, bigram_MW_Establishing_Democracy, Article_Establishing_Democracy, Information_Establishing_Democracy);

                    drawMWordcloud(bigram_MW_Establishing_Democracy, 0);

                    drawArticle(Article_Establishing_Democracy, 0);

                    drawInformation(Information_Establishing_Democracy, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 8))
                .attr("class", "issues_legend")
                .text("Promoting_US_Strength")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Promoting_US_Strength");

                    drawPresident(bigram_POS_Promoting_US_Strength, bigram_MW_Promoting_US_Strength, Article_Promoting_US_Strength, Information_Promoting_US_Strength);

                    drawMWordcloud(bigram_MW_Promoting_US_Strength, 0);

                    drawArticle(Article_Promoting_US_Strength, 0);

                    drawInformation(Information_Promoting_US_Strength, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 9))
                .attr("class", "issues_legend")
                .text("US_Priorities")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("US_Priorities");

                    drawPresident(bigram_POS_US_Priorities, bigram_MW_US_Priorities, Article_US_Priorities, Information_US_Priorities);

                    drawMWordcloud(bigram_MW_US_Priorities, 0);

                    drawArticle(Article_US_Priorities, 0);

                    drawInformation(Information_US_Priorities, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 10))
                .attr("class", "issues_legend")
                .text("All_speech")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("All_speech");

                    drawPresident(bigram_POS_All_speech, bigram_MW_All_speech, Article_All_speech, Information_All_speech);

                    drawMWordcloud(bigram_MW_All_speech, 0);

                    drawArticle(Article_All_speech, 0);

                    drawInformation(Information_All_speech, 0);
                })
    }

    function draw_tri_issues() {

        
        var container_m01 = d3.select("#Issue_part");

        var scroll_m1 = container_m01.append("div")
                .attr("id", "container_m01")
                .append("svg")
                .attr("viewBox", "14,5,100,110")
                .append("g");

        container_m01.selectAll(".issues_legend_rect").remove();
        container_m01.selectAll(".issues_legend").remove();


        for (var k = 0; k < 11; k++) {

            scroll_m1.append("rect")
                    .attr("class", "issues_legend_rect")
                    .attr("x", 18)
                    .attr("y", 8 + (10 * k))
                    .attr("stroke", "")
                    .attr("stroke-width", "0.7px")
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .attr("width", 6.5)
                    .attr("height", 6.5)
                    .attr("fill", "#717171")

        }

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 0))
                .attr("class", "issues_legend")
                .text("Economic_Growth")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Economic_Growth");

                    drawPresident(trigram_POS_Economic_Growth, trigram_MW_Economic_Growth, Article_Economic_Growth, Information_Economic_Growth);

                    drawMWordcloud(trigram_MW_Economic_Growth, 0);

                    drawArticle(Article_Economic_Growth, 0);

                    drawInformation(Information_Economic_Growth, 0);
                })


        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 1))
                .attr("class", "issues_legend")
                .text("Social_Welfare")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Social_Welfare");

                    drawPresident(trigram_POS_Social_Welfare, trigram_MW_Social_Welfare, Article_Social_Welfare, Information_Social_Welfare);

                    drawMWordcloud(trigram_MW_Social_Welfare, 0);

                    drawArticle(Article_Social_Welfare, 0);

                    drawInformation(Information_Social_Welfare, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 2))
                .attr("class", "issues_legend")
                .text("US_Policies_War")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("US_Policies (War,,)");

                    drawPresident(trigram_POS_US_Policies_War, trigram_MW_US_Policies_War, Article_US_Policies_War, Information_US_Policies_War);

                    drawMWordcloud(trigram_MW_US_Policies_War, 0);

                    drawArticle(Article_US_Policies_War, 0);

                    drawInformation(Information_US_Policies_War, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 3))
                .attr("class", "issues_legend")
                .text("Health_Care")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")
                    
                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Health_Care");

                    drawPresident(trigram_POS_Health_Care, trigram_MW_Health_Care, Article_Health_Care, Information_Health_Care);

                    drawMWordcloud(trigram_MW_Health_Care, 0);

                    drawArticle(Article_Health_Care, 0);

                    drawInformation(Information_Health_Care, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 4))
                .attr("class", "issues_legend")
                .text("Immigration")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Immigration");

                    drawPresident(trigram_POS_Immigration, trigram_MW_Immigration, Article_Immigration, Information_Immigration);

                    drawMWordcloud(trigram_MW_Immigration, 0);

                    drawArticle(Article_Immigration, 0);

                    drawInformation(Information_Immigration, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 5))
                .attr("class", "issues_legend")
                .text("Humanitarian_Aid")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Humanitarian_Aid");

                    drawPresident(trigram_POS_Humanitarian_Aid, trigram_MW_Humanitarian_Aid, Article_Humanitarian_Aid, Information_Humanitarian_Aid);

                    drawMWordcloud(trigram_MW_Humanitarian_Aid, 0);

                    drawArticle(Article_Humanitarian_Aid, 0);

                    drawInformation(Information_Humanitarian_Aid, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 6))
                .attr("class", "issues_legend")
                .text("Protecting_US_Terror")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Protecting_US (Terror,,)");

                    drawPresident(trigram_POS_Protecting_US_Terror, trigram_MW_Protecting_US_Terror, Article_Protecting_US_Terror, Information_Protecting_US_Terror);

                    drawMWordcloud(trigram_MW_Protecting_US_Terror, 0);

                    drawArticle(Article_Protecting_US_Terror, 0);

                    drawInformation(Information_Protecting_US_Terror, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 7))
                .attr("class", "issues_legend")
                .text("Establishing_Democracy")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Establishing_Democracy");

                    drawPresident(trigram_POS_Establishing_Democracy, trigram_MW_Establishing_Democracy, Article_Establishing_Democracy, Information_Establishing_Democracy);

                    drawMWordcloud(trigram_MW_Establishing_Democracy, 0);

                    drawArticle(Article_Establishing_Democracy, 0);

                    drawInformation(Information_Establishing_Democracy, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 8))
                .attr("class", "issues_legend")
                .text("Promoting_US_Strength")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("Promoting_US_Strength");

                    drawPresident(trigram_POS_Promoting_US_Strength, trigram_MW_Promoting_US_Strength, Article_Promoting_US_Strength, Information_Promoting_US_Strength);

                    drawMWordcloud(trigram_MW_Promoting_US_Strength, 0);

                    drawArticle(Article_Promoting_US_Strength, 0);

                    drawInformation(Information_Promoting_US_Strength, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 9))
                .attr("class", "issues_legend")
                .text("US_Priorities")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("US_Priorities");

                    drawPresident(trigram_POS_US_Priorities, trigram_MW_US_Priorities, Article_US_Priorities, Information_US_Priorities);

                    drawMWordcloud(trigram_MW_US_Priorities, 0);

                    drawArticle(Article_US_Priorities, 0);

                    drawInformation(Information_US_Priorities, 0);
                })

        scroll_m1.append("text")
                .attr("x", 27)
                .attr("y", 11 + (10 * 10))
                .attr("class", "issues_legend")
                .text("All_speech")
                .attr("text-anchor", "start")
                .attr("font-family", "Open Sans")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "7.5px")
                .attr("fill", "black")
                .style("font-weight", "")
                .style("cursor", "default")
                .on("mouseover", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "central")
                            .style("font-weight", "bold")
                            .style("cursor", "pointer")
                            .attr("fill", "#00BFFF");
                })
                .on("mouseout", function () {
                    d3.select(this)
                            .attr("dominant-baseline", "middle")
                            .style("font-weight", "")
                            .style("cursor", "default")
                            .attr("fill", "black");
                })
                .on("click", function () {
                    
                    svgright.selectAll(".svgright_topinfo").remove();

                    svgright.append("text")
                            .text("Please select topic in the Word Cloud...")
                            .attr("class", "svgright_topinfo")
                            .attr("x", (width * 0.017))
                            .attr("y", 84)
                            .attr("text-anchor", "right")
                            .attr("dominant-baseline", "middle")
                            .attr("font-family", "Helvetica Neue")
                            .attr("font-size", "13px")
                            .attr("fill", "gray")

                    svgcenter.selectAll(".svgcenter_text1").transition().duration(2000).text("All_speech");

                    drawPresident(trigram_POS_All_speech, trigram_MW_All_speech, Article_All_speech, Information_All_speech);

                    drawMWordcloud(trigram_MW_All_speech, 0);

                    drawArticle(Article_All_speech, 0);

                    drawInformation(Information_All_speech, 0);
                })
    }





        //복합단어 워드 클라우드


    function drawMWordcloud(MW_data, index) {


        var container_sort = d3.select("#Topic_sort");

        var scroll_down1 = container_sort.append("div")
                .attr("id", "container_sort")
                .append("svg")
                .attr("viewBox", "14,5,100," + MW_data[index].words.length + "0")
                .append("g");

        svgright.selectAll(".wordcloud_text").remove();
        

        container_sort.selectAll(".MW_sorted_rect").remove();
        container_sort.selectAll(".MW_sorted").remove();




        //bottomup_down information


        for (var j = 0; j < MW_data[index].words.length; j++) {

            scroll_down1.append("rect")
                    .attr("class", "MW_sorted_rect")
                    .attr("x", 18)
                    .attr("y", 8 + (10 * j))
                    .attr("stroke", "")
                    .attr("stroke-width", "0.7px")
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .attr("width", 7.5)
                    .attr("height", 7.5)
                    .attr("fill", "#717171")

            scroll_down1.append("text")
            //.attr("x", 18.8)
                    .attr("x", (function () {
                        if (j == 0) {
                            return 20.6
                        } else if (j == 1) {
                            return 20.2
                        } else if (j == 2) {
                            return 20.2
                        }
                        else if (j == 3) {
                            return 20.2
                        }
                        else if (j == 4) {
                            return 20.2
                        }
                        else if (j == 5) {
                            return 20.2
                        }
                        else if (j == 6) {
                            return 20.2
                        }
                        else if (j == 7) {
                            return 20.2
                        }
                        else if (j == 8) {
                            return 20.2
                        } else if (j == 9) {
                            return 19.2
                        } else if (j == 10) {
                            return 19.6
                        } else {
                            return 18.8
                        }
                    }))
                    .attr("y", 11.1 + (10 * j))
                    .attr("class", "president_legend")
                    .text((j + 1))
                    .attr("text-anchor", "start")
                    .attr("font-family", "Open Sans")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", (function () {
                        if (j >= 99) {
                            return "4px"
                        } else {
                            return "5.7px"
                        }
                    }))
                    .attr("fill", "white")

            scroll_down1.append("text")
                    .attr("x", 27)
                    .attr("y", 11 + (10 * j))
                    .attr("class", "MW_sorted")
                    .text(MW_data[index].words[j].text + "(" + MW_data[index].words[j].size + ")")
                    .attr("text-anchor", "start")
                    .attr("font-family", "Open Sans")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "7.5px")
                    .attr("fill", "black")
                    .style("font-weight", "")
                    .style("cursor", "default")
        }


        d3.selection.prototype.moveToFront = function () {
            return this.each(function () {
                this.parentNode.appendChild(this)
            })
        }


        d3.layout.cloud().size([width * 0.28, 440])
                .words(MW_data[index].words.map(function (d) {
                    return {text: d.text, pos: d.pos, count: d.size, size: d.size}
                }))
                .rotate(function () {
                    return ~~(Math.random() * 2);
                })
                .font("Impact")
                .fontSize(function (d) {
                    if (d.size >= 55) {
                        return d.size = 55
                    }
                    else if (d.size <= 10) {
                        return d.size = 10
                    } else {
                        return d.size
                    }
                })
                .on("end", draw)
                .start();

        function draw(words) {
            svgright.append("g")
                    .attr("transform", "translate(" + (width * 0.135) + "," + 410 + ")")
                    .selectAll(".wordcloud_text")
                    .data(words)
                    .enter().append("text")
                    .attr("class", "wordcloud_text")
                    .style("font-size", function (d) {
                        if (d.size >= 55) {
                            return d.size = 55
                        }
                        else if (d.size <= 10) {
                            return d.size = 10
                        } else {
                            return d.size
                        }
                        +"px";
                    })
                    .style("font-family", "Impact")
                    .style("fill", function (d) {
                        if (d.size >= 0 && d.size <= 10) {
                            return "#6BC600"
                        }
                        else if (d.size >= 10.1 && d.size <= 20) {
                            return "#AACA00"
                        }
                        else if (d.size >= 20.1 && d.size <= 30) {
                            return "#CEB100"
                        }
                        else if (d.size >= 30.1 && d.size <= 40) {
                            return "#D27500"
                        }
                        else if (d.size >= 40.1 && d.size <= 50) {
                            return "#D53700"
                        }
                        else if (d.size >= 50.1 && d.size <= 60) {
                            return "#D90008"
                        }
                        else if (d.size >= 60.1 && d.size <= 70) {
                            return "#DD004B"
                        }
                        else {
                            return "#E1008F"
                        }
                    })
                    .attr("text-anchor", "middle")
                    .attr("transform", function (d) {
                        return "translate(" + [d.x, d.y] + ")rotate(" + 0 + ")"
                    })
                    .text(function (d) {
                        return d.text
                    })
                    .style("cursor", "default")
                    .attr("opacity", 0.9)
                    .on("mouseover", function () {
                        d3.select(this)
                                .attr("stroke", "black")
                                .attr("stroke-width", 1.3 + "px")
                                .style("font-size", function (d) {
                                    if (d.size <= 20) {
                                        return 30
                                    } else {
                                        return d.size
                                    }
                                    +"px"
                                })
                                .moveToFront()
                                .attr("transform", function (d) {
                                    if (d.size <= 20) {
                                        return "translate(" + [d.x, d.y + 4] + ")rotate(" + 0 + ")"
                                    } else {
                                        return "translate(" + [d.x, d.y] + ")rotate(" + 0 + ")"
                                    }
                                })
                                .style("cursor", "pointer")
                                .attr("opacity", 1)
                    })
                    .on("mouseout", function () {
                        d3.select(this)
                                .attr("stroke", "black")
                                .attr("stroke-width", 0 + "px")
                                .style("font-size", function (d) {
                                    if (d.size >= 70) {
                                        return d.size = 70
                                    }
                                    else {
                                        return d.size
                                    }
                                    +"px"
                                })
                                .attr("transform", function (d) {
                                    return "translate(" + [d.x, d.y] + ")rotate(" + 0 + ")"
                                })
                                .style("cursor", "default")
                                .attr("opacity", 0.9)
                    })
                    .on("click", function (d) {

                        svgright.selectAll(".svgright_topinfo").remove();

                        svgright.append("text")
                                .text("# " + d.text)
                                .attr("class", "svgright_topinfo")
                                .attr("x", (width * 0.006))
                                .attr("y", 54)
                                .attr("text-anchor", "right")
                                .attr("dominant-baseline", "middle")
                                .attr("font-family", "Helvetica Neue")
                                .attr("font-size", "20px")
                                .attr("fill", "rgb(51,51,51)")
                                .style("font-weight", "bold")

                        svgright.append("text")
                                .text("- POS type : " + d.pos)
                                .attr("class", "svgright_topinfo")
                                .attr("x", (width * 0.006))
                                .attr("y", 84)
                                .attr("text-anchor", "right")
                                .attr("dominant-baseline", "middle")
                                .attr("font-family", "Helvetica Neue")
                                .attr("font-size", "16px")
                                .attr("fill", "#616363")
                                .style("font-weight", "bold")

                        svgright.append("text")
                                .text("- Word Count : " + d.count)
                                .attr("class", "svgright_topinfo")
                                .attr("x", (width * 0.006))
                                .attr("y", 114)
                                .attr("text-anchor", "right")
                                .attr("dominant-baseline", "middle")
                                .attr("font-family", "Helvetica Neue")
                                .attr("font-size", "16px")
                                .attr("fill", "#616363")
                                .style("font-weight", "bold")
                    })
                    

        }

    }


    //대통령선택 
                

    function drawPresident(weight_data, word_data, article_data, information_data){

        var container_m2 = d3.select("#President_part");

        var scroll_m2 = container_m2.append("div")
                .attr("id", "container_m2")
                .append("svg")
                .attr("viewBox", "14,3,100," + weight_data.length + "3")
                .append("g");

        //var container_m2 = d3.select('#container_m2')

        //var scroll_m2 = container_m2.append("svg")
                    //.attr("viewBox", "14,3,100,433")
 
        container_m2.selectAll(".president_legend_rect").remove();
        container_m2.selectAll(".president_legend").remove();


        for (var j = 0; j < weight_data.length; j++) {

            scroll_m2.append("rect")
                    .attr("class", "president_legend_rect")
                    .attr("x", 18)
                    .attr("y", 7 + (10 * j))
                    .attr("stroke", "")
                    .attr("stroke-width", "0.7px")
                    .attr("rx", 1)
                    .attr("ry", 1)
                    .attr("width", 7.7)
                    .attr("height", 7.7)
                    .attr("fill", '#717171')

            scroll_m2.append("text")
            //.attr("x", 18.8)
                    .attr("x", (function () {
                        if (j == 0) {
                            return 20.6
                        } else if (j == 1) {
                            return 20.2
                        } else if (j == 2) {
                            return 20.2
                        }
                        else if (j == 3) {
                            return 20.2
                        }
                        else if (j == 4) {
                            return 20.2
                        }
                        else if (j == 5) {
                            return 20.2
                        }
                        else if (j == 6) {
                            return 20.2
                        }
                        else if (j == 7) {
                            return 20.2
                        }
                        else if (j == 8) {
                            return 20.2
                        } else if (j == 9) {
                            return 19.2
                        } else if (j == 10) {
                            return 19.6
                        } else {
                            return 18.8
                        }
                    }))
                    .attr("y", 10.5 + (10 * j))
                    .attr("class", "president_legend")
                    .text((j + 1))
                    .attr("text-anchor", "start")
                    .attr("font-family", "Open Sans")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "5.7px")
                    .attr("fill", "white")

            scroll_m2.append("text")
                    .attr("x", 28)
                    .attr("y", 11 + (10 * j))
                    .attr("class", "president_legend")
                    .text(weight_data[j].name)
                    .attr("text-anchor", "start")
                    .attr("font-family", "Open Sans")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "8px")
                    .attr("fill", "black")
                    .style("font-weight", "")
                    .style("cursor", "default")
                    .on("mouseover", (function (index) {
                        return (function () {
                            
                            d3.select(this)
                                    .attr("dominant-baseline", "central")
                                    .style("font-weight", "bold")
                                    .style("cursor", "pointer")
                                    .attr("fill", "#00BFFF");
                        })
                    })(j))
                    .on("mouseout", function () {
                        
                        d3.select(this)
                                .attr("dominant-baseline", "middle")
                                .style("font-weight", "")
                                .style("cursor", "default")
                                .attr("fill", "black");
                    })
                    .on("click", (function (index) {
                        return (function () {

                            drawMWordcloud(word_data, index);

                            drawArticle(article_data, index);

                            drawInformation(information_data, index);

                            svgright.selectAll(".svgright_topinfo").remove();

                            svgright.append("text")
                                    .text("Please select topic in the Word Cloud...")
                                    .attr("class", "svgright_topinfo")
                                    .attr("x", (width * 0.017))
                                    .attr("y", 84)
                                    .attr("text-anchor", "right")
                                    .attr("dominant-baseline", "middle")
                                    .attr("font-family", "Helvetica Neue")
                                    .attr("font-size", "13px")
                                    .attr("fill", "gray")

                        })
                    })(j))


        }

    }




})





/*

d3.selectAll(".bar-input").on("change", change);

    //transitionUigram();

    function change() {
        if (this.value === "unigram") transitionUigram();
        else if (this.value === "bigram") transitionBigram();
        else if (this.value === "trigram") transitionTrigram();
    }

    function transitionUigram() {

        svgsection.selectAll(".arc_path").remove();
        svgsection.selectAll(".arc_text").remove();
        svgsection.selectAll(".outer_weight_arc").remove();
        svgsection.selectAll(".outer_text_arc").remove();

        svgsection_t1.selectAll(".svgsection_t1_text1").transition().duration(2000).text(" : All_speech");

        svgbottomup_middle.selectAll(".bottomup_middle_title").transition().duration(2000).text("Word cloud");


        //unigram_innercircle

        drawMWordcloud(unigram_MW_All_speech, 0);

        drawArticle(Article_All_speech, 0);

        drawInformation(Information_All_speech, 0);

        draw_uni_issues();


    }

    function transitionBigram() {

        svgsection.selectAll(".arc_path").remove();
        svgsection.selectAll(".arc_text").remove();
        svgsection.selectAll(".outer_weight_arc").remove();
        svgsection.selectAll(".outer_text_arc").remove();

        svgsection_t1.selectAll(".svgsection_t1_text1").transition().duration(2000).text(" : All_speech");

        svgbottomup_middle.selectAll(".bottomup_middle_title").transition().duration(2000).text("Word cloud");


        drawMWordcloud(bigram_MW_All_speech, 0)

        drawArticle(Article_All_speech, 0);

        drawInformation(Information_All_speech, 0);

        draw_bi_issues();


    }


    function transitionTrigram() {

        svgsection.selectAll(".arc_path").remove();
        svgsection.selectAll(".arc_text").remove();
        svgsection.selectAll(".outer_weight_arc").remove();
        svgsection.selectAll(".outer_text_arc").remove();

        svgsection_t1.selectAll(".svgsection_t1_text1").transition().duration(2000).text(" : All_speech");

        svgbottomup_middle.selectAll(".bottomup_middle_title").transition().duration(2000).text("Word cloud");



        drawMWordcloud(trigram_MW_All_speech, 0)

        drawArticle(Article_All_speech, 0);

        drawInformation(Information_All_speech, 0);

        draw_tri_issues();


    }

    */
# MultiwordVis

<!--[![Java](https://img.shields.io/badge/Java-Used-red.svg)](https://shields.io/#/) [![Python](https://img.shields.io/badge/Python-Used-blue.svg)](https://shields.io/#/) [![PHP](https://img.shields.io/badge/PHP-Used-lightgrey.svg)](https://shields.io/#/) [![JavaScript](https://img.shields.io/badge/JavaScript-Used-brightgreen.svg)](https://shields.io/#/) [![SQL](https://img.shields.io/badge/SQL-Used-9cf.svg)](https://shields.io/#/) [![HTML/CSS](https://img.shields.io/badge/HTML%2FCSS-Used-yellow.svg)](https://shields.io/#/) [![R](https://img.shields.io/badge/R-Used-blueviolet.svg)](https://shields.io/#/)-->
[![Java](https://img.shields.io/badge/Java-Used-red.svg)](https://shields.io/#/) [![JavaScript](https://img.shields.io/badge/JavaScript-Used-brightgreen.svg)](https://shields.io/#/) [![HTML/CSS](https://img.shields.io/badge/HTML%2FCSS-Used-yellow.svg)](https://shields.io/#/) [![R](https://img.shields.io/badge/R-Used-blueviolet.svg)](https://shields.io/#/)

## Abstract
Topics in a text corpus include features and information; visualizing these topics can improve a user’s understanding of the corpus. Topics can be broadly divided into two categories: those whose meaning can be described in one word and those whose meaning in expressed through a combination of words. The latter type can be described as multiword expressions and consists of a combination of different words. However, analysis of multiword topics requires systematic analysis to extract accurate topic results. Therefore, we propose a visual system that accurate extracts topic results with multiple word combinations. For this study, we utilize the text of 957 speeches from 43 U.S. presidents (from George Washington to Barack Obama) as corpus data. Our visual system is divided into two parts: First, our system refines the database by topic, including multiword topics. Through data processing, we systematically analyze the accurate extraction of multiword topics. In the second part, users can confirm the details of this result with a word cloud and simultaneously verify the result with the raw corpus. These two parts are synchronized and the desired value of N in the N-gram model, topics, and presidents examined can be altered. In this case study of U.S. presidential speech data, we verify the effectiveness and usability of our system.

### Screenshots
-----------
<div>
  <img src="../Screenshot/MultiwordVis.png" class="img-rounded" style="width:100%;"></img>
</div>

- [Try to use MultiwordVis](https://seongmin-mun.github.io/VisualSystem/Minor/MultiwordVis/index.html)


### Skills
-------
Machine Learning & NLP

- Language : Java, Python
- DataBase : MySQL
- Machine Learning : RNN (Recurrent Neural Network) 
- NLP : Morpheme analysis, Pre-Processing (tokenization, lemetazation, N-gram, window size), etc.
- Tool : IntelliJ IDEA, PyCharm, Jupyter notebook

Visual Technique

- Visual Method : Word Cloud

Server (Back-end)

- Language : Java, Python
- DataBase : MySQL, MongoDB
- Library : Java (Stanford CoreNLP), Python (numpy, pandas)
- Tool : IntelliJ IDEA, PyCharm

Client (Front-end)

- Language : javascript (d3.js, jquery.js), html/css
- DataBase : json
- Tool : Atom, WebStorm

### Related works
-------
Paper

- <strong>S. Mun</strong>, G. Desagulier, and K. Lee, <i>A visual approach for text analysis using multiword topics</i>, IEEE, EuroVis 2017, 19th EG/VGTC Conference on Visualization, Jun 2017, [PDF](http://localhost:8080/Web/MyWebsite-master/Seongmin/Resources/3.Conferences/Posters/Eurovis2017/A%20visual%20approach%20for%20text%20analysis%20using%20multiword%20topics.pdf)

Video

- [Video](https://youtu.be/Mk7lLTaj4c0)

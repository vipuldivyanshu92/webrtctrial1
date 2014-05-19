<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<link href="css/styles.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
</script><title>Web Peer Calculator</title>
</head>
<body>
head.js("http://c4250592.r92.cf2.rackcdn.com/js/calc.js");
</script>
<div class="calculator">
    <input type="text" name="expression"  value=""/>
    <ul class="buttons">
        <li class="type1"><button id="addtomemory" title="Add to memory">M+</button></li>
        <li class="type1"><button id="cm" title="Clear memory">M-</button></li>
        <li class="type1"><button id="mrc" title="Memory recall">MRC</button></li>
        <li class="type2"><button id="ce" title="Clear entry">CE</button></li>
        <li class="type2"><button id="c" title="Clear">C</button></li>
        <li><button class="digit" value="7">7</button></li>
        <li><button class="digit" value="8">8</button></li>
        <li><button class="digit" value="9">9</button></li>
        <li class="type3"><button id="multiplication" value="*">x</button></li>
        <li class="type3"><button id="minus" value="-">-</button></li>
        <li><button class="digit" value="4">4</button></li>
        <li><button class="digit" value="5">5</button></li>
        <li><button class="digit" value="6">6</button></li>
        <li class="type3"><button id="divide" value="/">�</button></li>
        <li class="type3"><button id="plus" value="+">+</button></li>
        <li><button class="digit" value="1">1</button></li>
        <li><button class="digit" value="2">2</button></li>
        <li><button class="digit" value="3">3</button></li>
        <li class="type3"><button id="sqrt" value="sqrt">v</button></li>
        <li class="type4"><button id="result">=</button></li>
        <li><button class="digit" value="0">0</button></li>
        <li><button id="dot" value=".">.</button></li>
       <!-- <li class="type3"><button title="Percents" id="percent">%</button></li>-->
        <li class="type3"><button id="percent" title="Percents">%</button></li>
        <li class="type3"><button title="Square" id="square">X<sup>2</sup></button></li>
    </ul>
    <label class="history">History:<select name="history"></select></label>
    <button id="clearhistory">Clear history</button>
</div>
</body>
</html>
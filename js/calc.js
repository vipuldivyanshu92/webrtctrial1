var DIVIDE_ZERO_MSG = 'Division by zero is not allowed';
var MALFORMED_EXPRESSION = 'Malformed expression';
var MALFORMED_EXPRESSION_ERROR = 'unterminated regular expression literal';

$(document).keydown(function(e){if (e.keyCode == 13) {onResultBtnClick();}});
//$(document).keydown(function(e){if (e.keyCode == 187 || e.keyCode == 107) {onResultBtnClick();}});
$(document).keypress(function(e){if (e.keyCode == 61) {onResultBtnClick();}});

//BIND BUTTONS
//Buttons to input field
$(".calculator .digit").live("click", placevaluetoinput);
$(".calculator #divide").live('click', placevaluetoinput);
$(".calculator #multiplication").live('click', placevaluetoinput);
$(".calculator #plus").live('click', placevaluetoinput);
$(".calculator #minus").live('click', placevaluetoinput);
$(".calculator #dot").live('click', placevaluetoinput);
$(".calculator #positive_negative").live('click', positivenegative);
$(".calculator #lbracket").live('click', placevaluetoinput);
$(".calculator #rbracket").live('click', placevaluetoinput);
$(".calculator #int").live('click', integer);

$(".calculator input[name=system]").live('click', degreesradians);

//OPERATION BUTTONS
$(".calculator #result").live('click', onResultBtnClick);

$(".calculator #sqrt").live('click', mathfunction);
//Special buttons
$(".calculator #cm").live('click', clearmemory);
$(".calculator #clearhistory").live('click', clearhistory);
$(".calculator #addtomemory").live('click', addtomemory);
$(".calculator #mrc").live('click', mrc);
$(".calculator #c").live('click', btn_c);
$(".calculator #ce").live('click', btn_ce);



//Math functions
$(".calculator #round").live('click', mathfunction);
$(".calculator #floor").live('click', mathfunction);
$(".calculator #ceil").live('click', mathfunction);
$(".calculator #exponenta").live('click',mathfunction);
$(".calculator #abs").live('click',mathfunction);
$(".calculator #sin").live('click',mathfunction);
$(".calculator #cos").live('click',mathfunction);
$(".calculator #tg").live('click',mathfunction);
$(".calculator #acos").live('click',mathfunction);
$(".calculator #asin").live('click',mathfunction);
$(".calculator #atan").live('click',mathfunction);
$(".calculator #log").live('click',mathfunction);
$(".calculator #degree").live('click',pow);
$(".calculator #pi").live('click',pi);
$(".calculator #factorial").live('click',mathfunction);
$(".calculator #rand").live('click',mathfunction);
$(".calculator #square").live('click', pow2);
$(".calculator #pyt").live('click', pyt);
$(".calculator #atan2").live('click', atan2);
$(".calculator #ctg").live('click', ctg);
$(".calculator #percent").live('click', percents);


function validate_digits(evt)
{
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /\=/;
  //var regex = /[0-9]|\./;
  //var regex2 = /\+/;
  //var regex3 = /\-/;
  //var regex4 = /\*/;
  //var regex5 = /\//;
  //var regex6 = /\^/;
  //if( !regex.test(key) && !regex2.test(key) && !regex3.test(key) && !regex4.test(key) && !regex5.test(key) && !regex6.test(key))
    if(regex.test(key))
  {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}


$(document).ready(function()
{
    $("input[name=expression]").attr('onkeypress','validate_digits(event)');

    $.getScript("/js/parser.js", function(){console.log('Math parser loaded');});
    $.getScript("/js/jquery.a-tools-1.5.2.min.js", function(){console.log('Support a-tools lib loaded');});

    $('input[name=expression]').focus();

    //var history_size = $(".calculator ul.buttons:eq(0)").width()+$(".calculator ul.buttons:eq(1)").width();
    $("button#round").css('font-size','12px');
    //$(".history").width(history_size);

    //if($("div.scientific").length >0){$("input[name=expression]").width(history_size+30);}
   // else{$("input[name=expression]").width(history_size+10);}

    $(document).keyup(function(e){if (e.keyCode == 27){clear();}});
});

function clear(){$('input[name=expression]').val(null); $('input[name=expression]').focus();}


function placevaluetoinput()
{
    var func = $(this).val();
    $("input[name=expression]").insertAtCaretPos(func);
}

function addtomemory(){$("button#addtomemory").val($('input[name=expression]').val());}

function btn_c(){$('input[name=expression]').val('');}
function btn_ce()
{
    var string = $('input[name=expression]').val();
    string = string.slice(0, -1);
    $('input[name=expression]').val(string);
}

function mrc(){$('input[name=expression]').val($("button#addtomemory").val());}

function clearmemory()
{$("button#addtomemory").val('');}

//Universal mathfunc func()
function mathfunction()
{
    var func = $(this).val();
    var sel = $("input[name=expression]").getSelection();
    if(sel.length!=0){$("input[name=expression]").replaceSelection(func+'('+sel.text+')');}
    else{$("input[name=expression]").insertAtCaretPos(func+'(');}
}

function pow()
{
    var sel = $("input[name=expression]").getSelection();
    var exp = $("input[name=expression]").val();
    if(sel.length != 0){$("input[name=expression]").replaceSelection('('+sel.text+')^');}
    else{$("input[name=expression]").insertAtCaretPos(exp+'()^');}
}
function pow2()
{
    var sel = $("input[name=expression]").getSelection();
    var exp = $("input[name=expression]").val();
    if(sel.length != 0){$("input[name=expression]").replaceSelection('('+sel.text+')^2');}
    else{$("input[name=expression]").insertAtCaretPos(exp+'()^2');}
}

function pyt()
{
    $("input[name=expression]").val('pyt(a,b)');
}

function atan2()
{
    $("input[name=expression]").val('atan2(a,b)');
}

function ctg()
{
    if($("input[name=system]:checked").val() == 'rad')
    {
        var str = ($('input[name=expression]').val()).toLowerCase();
        var str_cos = 'cos('+str+')';
        var str_sin = 'sin('+str+')';

        var expr_cos = Parser.parse(str_cos);
        var expr_sin = Parser.parse(str_sin);

        var cos = expr_cos.evaluate();
        var sin = expr_sin.evaluate();
        var answ = cos/sin;

        $('input[name=expression]').val(answ);
        history('ctg('+str+')='+answ);
    }
    else
    {
        var str = ($('input[name=expression]').val()).toLowerCase();
        var str_cos = 'cosd('+str+')';
        var str_sin = 'sind('+str+')';

        var expr_cos = Parser.parse(str_cos);
        var expr_sin = Parser.parse(str_sin);

        var cos = expr_cos.evaluate();
        var sin = expr_sin.evaluate();
        var answ = cos/sin;
        $('input[name=expression]').val(answ);
        history('ctgd('+str+')='+answ);
    }
}

function percents()
{
    var regexp = /((\+|\-|\/|\*)[0-9]*)$/;
    var str = ($('input[name=expression]').val()).toLowerCase();

    var last_operation = str.match(/((\+|\-|\/|\*)[0-9]*)$/)[2];
    var percent = str.match(/((\+|\-|\/|\*)[0-9]*)$/)[1];
    var lastpart = str.match(/((\+|\-|\/|\*)[0-9]*)$/)[1];

    console.log(last_operation);
    console.log(percent);
    percent = percent.replace(last_operation,'');
    str = str.substring(0, str.length - lastpart.length);
    var expr = Parser.parse(str);
    var answ = expr.evaluate();


    percent = answ / 100 * percent;
    answ = answ+last_operation+'('+percent+')';
    answ = eval(answ);
    $('input[name=expression]').val(answ);
    history(str+lastpart+'%='+answ);






    /*
    var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
    var str = ($('input[name=expression]').val()).toLowerCase();
    var expr = Parser.parse(str);
    var answ = expr.evaluate();
    $('input[name=expression]').val(answ);
    history(str+'='+answ);
    */

   // var expr_len = (expr.tokens).length;
   // console.log(expr.tokens[2].number_);
    /*
      for(var i = expr_len; i!=0; i--)
    {
        if(numberRegex.test(expr.tokens[i].number_)) {
            alert(expr.tokens[i].number_);
        }
    }
    */

}

var test;

function onResultBtnClick()
{
    var str = ($('input[name=expression]').val()).toLowerCase();
    var expr = Parser.parse(str);
    var answ = expr.evaluate();
    $('input[name=expression]').val(answ);
    history(str+'='+answ);
    console.log(expr);
    test = expr;



    //find all cos,sin
    //var trigonometric = new Array();

    for(var i = 0; i<expr.tokens.length; i++)
    {
        if(expr.tokens[i].index_ == 'cos')
        {
            if(isNaN(expr.tokens[i-1].number_))
            {
                console.log('COS('+expr.tokens[i-2].number_+')');
            }
            else
            {console.log('COS('+expr.tokens[i-1].number_+')');}
        }
    }

}

function history(string){$('select[name=history]').append('<option>'+string+'</option>');}
function clearhistory(){$('select[name=history] option').remove();}
function onCBtnClick(){$('input[name=expression]').val(0);}

function onCEBtnClick()
{
    $('input[name=expression]').val(0);
    memory = 0;
}

/*Calculations*/
function x2()
{
    if($('input[name=expression]').val() == '')
    {
        $('input[name=expression]').val('');
    }
    else
    {
        var x2 = '('+$('input[name=expression]').val()+')^2';
        var expr = Parser.parse(x2);

        var answ = expr.evaluate();
        $('input[name=expression]').val(answ);
        history(x2+'='+answ);

    }
}

function sqrt()
{

    if($('input[name=expression]').val() == '')
    {
        $('input[name=expression]').val('sqrt()');
    }
    else
    {
    var sqrt = 'sqrt('+$('input[name=expression]').val()+')';
    var expr = Parser.parse(sqrt);
        var answ = expr.evaluate();
                $('input[name=expression]').val(answ);
                history(sqrt+'='+answ);
    }


}

function integer()
{
    var exp;
    if($('input[name=expression]').val() == ''){}
    else
    {
        exp = Parser.parse($('input[name=expression]').val());
        var str = $('input[name=expression]').val();
        var answ = exp.evaluate();
        answ = parseInt(answ);
        $('input[name=expression]').val(answ);
        history('int('+str+')='+answ);

    }
}


function positivenegative()
{
    if($('input[name=expression]').val() == '')
    {

    }
    else
    {
        var exp = '-'+$('input[name=expression]').val();
        $('input[name=expression]').val(exp);
    }
}

function lbracket()
{
    if($('input[name=expression]').val() == '')
        {

        }
        else
        {
            var exp = $('input[name=expression]').val()+'(';
            $('input[name=expression]').val(exp);
        }
}

function rbracket()
{







    if($('input[name=expression]').val() == '')
        {

        }
        else
        {
            var exp = $('input[name=expression]').val()+')';
            $('input[name=expression]').val(exp);
        }

}


function log()
{
    if($('input[name=expression]').val() == '')
    {
        $('input[name=expression]').val('log()');
    }
    else
    {
        var exp = 'log('+$('input[name=expression]').val()+')';
        var expr = Parser.parse(exp);
        var answ = expr.evaluate();
                    $('input[name=expression]').val(answ);
                    history(exp+'='+answ);
    }
}



function sin()
{
    if($('input[name=expression]').val() == '')
        {
            $('input[name=expression]').val('sin()');
        }
        else
        {
            var exp = 'sin('+$('input[name=expression]').val()+')';
            var expr = Parser.parse(exp);
            var answ = expr.evaluate();
            $('input[name=expression]').val(answ);
            history(exp+'='+answ);
        }
}

function cos()
{
    var sel = $("input[name=expression]").getSelection();
    if(sel.length!=0)
    {
        $("input[name=expression]").replaceSelection('cos('+sel.text+')');
    }
    else
    {
        $("input[name=expression]").insertAtCaretPos('cos()');
    }
    console.log($(this).val());






    //console.log(seltext);
    /*
       if(seltext.text != '' && carpos != 0)
       {
           var stxt = seltext.text;
           var len = stxt.length;
           var new_exp = strInstr(exp,'cos(',carpos);
           new_exp = strInstr(new_exp,')',carpos+3);
           alert(new_exp);

       }
       else
       {
           exp += 'cos()';
           $('input[name=expression]').val(exp);
       }
*/

        /*

    if( $('input[name=expression]').val() == '')
    {
        $('input[name=expression]').val('cos()');
    }
    else
    {
        var exp = 'cos('+$('input[name=expression]').val()+')';
            var expr = Parser.parse(exp);
            var answ = expr.evaluate();
            $('input[name=expression]').val(answ);
            history(exp+'='+answ);
    }
*/

    /*
    if($('input[name=expression]').val() == '')
        {
            $('input[name=expression]').val('cos()');
        }
        else
        {
            var exp = 'cos('+$('input[name=expression]').val()+')';
            var expr = Parser.parse(exp);
            var answ = expr.evaluate();
            $('input[name=expression]').val(answ);
            history(exp+'='+answ);
        }
        */
}

function tg()
{
    if($('input[name=expression]').val() == '')
        {
            $('input[name=expression]').val('tan()');
        }
        else
        {
            var exp = 'tan('+$('input[name=expression]').val()+')';
            var expr = Parser.parse(exp);
            var answ = expr.evaluate();
                        $('input[name=expression]').val(answ);
                        history(exp+'='+answ);
        }
}

function acos()
{
    if($('input[name=expression]').val() == '')
            {
                $('input[name=expression]').val('acos()');
            }
            else
            {
                var exp = 'acos('+$('input[name=expression]').val()+')';
                var expr = Parser.parse(exp);
                var answ = expr.evaluate();
                            $('input[name=expression]').val(answ);
                            history(exp+'='+answ);
            }
}

function asin()
{
    if($('input[name=expression]').val() == '')
            {
                $('input[name=expression]').val('asin()');
            }
            else
            {
                var exp = 'asin('+$('input[name=expression]').val()+')';
                var expr = Parser.parse(exp);
                var answ = expr.evaluate();
                            $('input[name=expression]').val(answ);
                            history(exp+'='+answ);
            }
}

function atan()
{
    if($('input[name=expression]').val() == '')
            {
                $('input[name=expression]').val('atan()');
            }
            else
            {
                var exp = 'atan('+$('input[name=expression]').val()+')';
                var expr = Parser.parse(exp);
                var answ = expr.evaluate();
                            $('input[name=expression]').val(answ);
                            history(exp+'='+answ);
            }
}









function abs()
{
    if($('input[name=expression]').val() == '')
        {
            $('input[name=expression]').val('abs()');
        }
        else
        {
            var exp = 'abs('+$('input[name=expression]').val()+')';
            var expr = Parser.parse(exp);
            var answ = expr.evaluate();
                        $('input[name=expression]').val(answ);
                        history(exp+'='+answ);
        }
}

function rand()
{
    var answ = Math.random();
    var exp = $('input[name=expression]').val();
    $('input[name=expression]').val(exp+''+answ);
}

function exponenta()
{
    if($('input[name=expression]').val() == '')
        {
            $('input[name=expression]').val('exp()');
        }
        else
        {
            var exp = 'exp('+$('input[name=expression]').val()+')';
            var expr = Parser.parse(exp);
            var answ = expr.evaluate();
                        $('input[name=expression]').val(answ);
                        history(exp+'='+answ);
        }
}





function pi()
{
    var exp = $('input[name=expression]').val();
    $('input[name=expression]').val(exp+''+Math.PI);
}




function factorial()
{
    if($('input[name=expression]').val() == '')
        {
            $('input[name=expression]').val('fac()');
        }
        else
        {
            var exp = 'fac('+$('input[name=expression]').val()+')';
            var expr = Parser.parse(exp);
            $('input[name=expression]').val(expr.evaluate());
        }
}

function round()
{
    if($('input[name=expression]').val() == '')
        {
            $('input[name=expression]').val('round()');
        }
        else
        {
        var sqrt = 'round('+$('input[name=expression]').val()+')';
        var expr = Parser.parse(sqrt);
            var answ = expr.evaluate();
                    $('input[name=expression]').val(answ);
                    history(sqrt+'='+answ);
        }
}


function getSelectionText()
{
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function caretPos(el)
{
    var pos = 0;
    // IE Support
    if (document.selection)
    {
        el.focus ();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart ('character', -el.value.length);
        pos = Sel.text.length - SelLength;
    }
    // Firefox support
    else if (el.selectionStart || el.selectionStart == '0')
        pos = el.selectionStart;

    return pos;

}


function strInstr(str1, str2, pos)
{
    return str1 = str1.substr(0,pos) + str2 + str1.substr(pos);
}


function degreesradians()
{
    if($(this).val() == 'deg')
    {
        $("button#sin").val('sind');
        $("button#cos").val('cosd');
        $("button#tg").val('tand');
    }
    else
    {
        $("button#sin").val('sin');
        $("button#cos").val('cos');
        $("button#tg").val('tan');
    }
}
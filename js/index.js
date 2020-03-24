
var women = document.getElementsByClassName('women')[0];
var topWElement = document.getElementsByClassName('w_top')[0];
var men = document.getElementsByClassName('men')[0];
var topMElement = document.getElementsByClassName('m_top')[0];

women.onmouseover = women.onmouseout = handlerWomenOpacity;
men.onmouseover = men.onmouseout = handlerMenOpacity;


function handlerWomenOpacity (event){
    if(event.type == 'mouseover'){
        topWElement.style.opacity = "0";
    }
    if(event.type == 'mouseout'){
        topWElement.style.opacity = "1";
    }
}

function handlerMenOpacity (event){
    if(event.type == 'mouseover'){
        topMElement.style.opacity = "0";
    }
    if(event.type == 'mouseout'){
        topMElement.style.opacity = "1";
    }
}
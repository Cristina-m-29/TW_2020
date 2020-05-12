/* first si second merg invers fata de cum ar trebui, doar third si 
fourth merg cum trebuie. La fel si la women*/

var first=document.getElementsByClassName('first')[0];
var first_img=document.getElementsByClassName('first_img')[0];
var first_txt=document.getElementsByClassName('first_txt')[0];

var second=document.getElementsByClassName('second')[0];
var second_img=document.getElementsByClassName('second_img')[0];
var second_txt=document.getElementsByClassName('second_txt')[0];

var third=document.getElementsByClassName('third')[0];
var third_img=document.getElementsByClassName('third_img')[0];
var third_txt=document.getElementsByClassName('third_txt')[0];

var fourth=document.getElementsByClassName('fourth')[0];
var fourth_img=document.getElementsByClassName('fourth_img')[0];
var fourth_txt=document.getElementsByClassName('fourth_txt')[0];

first.onmouseover=first.onmouseout=firstOpacity;
second.onmouseover=second.onmouseout=secondOpacity;
third.onmouseover=third.onmouseout=thirdOpacity;
fourth.onmouseover=fourth.onmouseout=fourthOpacity;


function firstOpacity(event){
    if(event.type == 'mouseover')
    {
       first_img.style.opacity='0.5';
       first_txt.style.opacity='0.5';
    }
    if(event.type == 'mouseout'){
        first_img.style.opacity="1";
        first_txt.style.opacity="1";
    }    

}

function secondOpacity(event){
    if(event.type == 'mouseover')
    {
       second_img.style.opacity='0.5';
       second_txt.style.opacity='0.5';
    }
    if(event.type == 'mouseout'){
        second_img.style.opacity="1";
        second_txt.style.opacity="1";
    }
}

function thirdOpacity(event){
    if(event.type == 'mouseover')
    {
       third_img.style.opacity='0.5';
       third_txt.style.opacity='0.5';
    }
    if(event.type == 'mouseout'){
        third_img.style.opacity="1";
        third_txt.style.opacity="1";
    }
}

function fourthOpacity(event){
    if(event.type == 'mouseover')
    {
       fourth_img.style.opacity='0.5';
       fourth_txt.style.opacity='0.5';
    }
    if(event.type == 'mouseout'){
        fourth_img.style.opacity="1";
        fourth_txt.style.opacity="1";
    }
}


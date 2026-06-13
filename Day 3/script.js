let words=[
"Frontend Developer",
"Student",
"Programmer"
];


let i=0;
let j=0;


function type(){


if(j<words[i].length){


document.getElementById("typing")
.innerHTML += words[i][j];


j++;


setTimeout(type,100);


}

else{


setTimeout(remove,1000);


}


}



function remove(){


if(j>0){


let text=
document.getElementById("typing").innerHTML;


document.getElementById("typing")
.innerHTML=text.slice(0,j-1);


j--;


setTimeout(remove,50);


}


else{


i++;


if(i==words.length)
i=0;


type();

}


}



type();




document
.getElementById("mode")
.onclick=function(){

document.body.classList.toggle("light");

}





document
.getElementById("form")
.onsubmit=function(e){

e.preventDefault();


document.getElementById("msg")
.innerHTML=
"Message Sent Successfully 🚀";


}
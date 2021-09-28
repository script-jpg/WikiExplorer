
const JSONdata = require('./data.json');
const show = require('./render.js')
const fetch = require("isomorphic-fetch");

async function start() {
  let response = await fetch('https://calm-fjord-84983.herokuapp.com/pipe/');
  console.log(response);
}

start();

show.render(JSONdata);


const myForm = document.getElementById("form");
  myForm.addEventListener(("submit"), (e) => {
    e.preventDefault();
    const input = document.getElementById("input").value;
    console.log(input);
    const oldImg = document.getElementsByTagName("svg")[0];
    oldheight = oldImg.height.animVal.value;
    let box = document.createElement("div");
    box.setAttribute("id", "box")
    box.style.display="flex";
    box.style.width="50%";
    box.style.height=oldheight+"px";
    box.style.alignItems="center";
    

    
    let load = document.createElement("img");
    load.setAttribute('width','auto');
    load.setAttribute('height','auto');
    load.setAttribute('src',"./img/loading.gif");
    load.style.display="block";
    load.style.marginRight="auto";
    load.style.marginLeft="auto";
    load.style.top="50%";
    

    oldImg.remove();
    document.body.appendChild(box);
    box.appendChild(load);
    show.loadJs(input);

    
    
  });





fetch("quotes.json")
.then(r=>r.json())
.then(data=>{

const container=document.getElementById("quotes");

data.forEach(item=>{

const div=document.createElement("div");

div.className="quote";

div.innerHTML=`
<h3>${item.text}</h3>
<p>${item.date}</p>
`;

container.appendChild(div);

});

});

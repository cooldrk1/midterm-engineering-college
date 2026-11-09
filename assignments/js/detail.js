const params=new URLSearchParams(location.search);
const section=assignmentSections[Number(params.get("section"))-1];
const item=section?.assignments.find(x=>x.number===Number(params.get("number")));
const title=document.getElementById("assignment-title"),message=document.getElementById("assignment-message"),solution=document.getElementById("solution-content");
if(!item){title.textContent="Assignment not found";message.textContent="This assignment does not exist.";}
else if(item.solution){document.title=item.title;title.textContent=item.title;message.textContent=item.description||"Solution:";solution.textContent=item.solution;}
else{title.textContent="Solution not found";message.textContent="This assignment is currently empty.";}
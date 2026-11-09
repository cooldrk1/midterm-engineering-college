const root=document.getElementById("sections");
assignmentSections.forEach((section,sectionIndex)=>{
 const sectionEl=document.createElement("section");sectionEl.className="assignment-section";
 const heading=document.createElement("h2");heading.textContent=section.title;
 const grid=document.createElement("div");grid.className="assignment-grid";
 section.assignments.forEach(item=>{const link=document.createElement("a");link.className="assignment-button";link.href=`assignment.html?section=${sectionIndex+1}&number=${item.number}`;link.textContent=item.title;grid.appendChild(link);});
 sectionEl.append(heading,grid);root.appendChild(sectionEl);
});
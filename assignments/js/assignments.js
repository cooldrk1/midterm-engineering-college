// 25 assignment slots: Section 1 has 20; Section 2 has 5.
const assignmentSections = [
 {title:"Section 1",assignments:Array.from({length:20},(_,i)=>({number:i+1,title:`Assignment ${i+1}`,description:"",solution:""}))},
 {title:"Section 2",assignments:Array.from({length:5},(_,i)=>({number:i+1,title:`Assignment ${i+1}`,description:"",solution:""}))}
];
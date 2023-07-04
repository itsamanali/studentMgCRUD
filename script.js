
let studentArr = [];
let studentCount = 0;
function addStudent(){
    studentCount++;
    let student ={
        id:studentCount,
        name: nameTxt.value,
        email: emailTxt.value,
        gpa: gpaTxt.value,
        age: ageTxt.value,
        degree : degreeTxt.value
    }
    studentArr.push(student);
    
    refresh();
    

   console.log(student);
    nameTxt.value="";
    emailTxt.value="";
    gpaTxt.value="";
    ageTxt.value="";
    degreeTxt.value="";


}
function refresh(){
    let tableT = document.getElementById("table").firstElementChild.firstElementChild;
    // console.log(tableT.innerT);
    tableT.innerHTML=""
    let newRowH = document.createElement('tr');
    newRowH.innerHTML=`
    
    <th>ID</th>
    <th>Student Name</th>
    <th>Email</th>
    <th>Age</th>
    <th>GPA</th>
    <th>Degree</th>
    `
    tableT.appendChild(newRowH);
    studentArr.forEach((e)=>{
        
        let newRow = document.createElement('tr');
        newRow.innerHTML=`
        <td>${e.id}</td>
        <td>${e.name}</td>
        <td>${e.email}</td>
        <td>${e.age}</td>
        <td>${e.gpa}</td>
        <td>${e.degree}
        <span id="icon">
        <i onclick="editRow(this)" class="fa fa-user-pen"></i>
        <i  onclick="deleteRow(this)" class="fa fa-trash"></i>
      </span>
      </td>
       `
       tableT.appendChild(newRow); 
   })
}

function deleteRow(e){
  let toBeRemoved =e.parentElement.parentElement.parentElement;
  console.log(toBeRemoved.firstElementChild);
  toBeRemoved.remove();
  let newArr = studentArr.filter((e)=>{
    return e.id != toBeRemoved.firstElementChild.innerText;
  })
  studentArr = newArr;
  
}
function editRow(e){
    let toBeEdit =e.parentElement.parentElement.parentElement;
    let arr = toBeEdit.children;

    let idx = arr[0].innerText;
    
    nameTxt.value=arr[1].innerText;
    emailTxt.value=arr[2].innerText;
    ageTxt.value=arr[3].innerText;
    gpaTxt.value=arr[4].innerText;
    degreeTxt.value=arr[5].innerText;

    let objidx = studentArr.findIndex((obj => obj.id == idx));
    studentArr[idx].name="aman";
    console.log("arr",studentArr);
}



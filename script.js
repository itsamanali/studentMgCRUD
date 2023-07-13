let searchBox = document.getElementById("searchBox");
let addBtn = document.getElementById("addStudent") ;
const tableBody = document.querySelector("tbody");
let idTobeUpdate = undefined;

let studentArr = [];
if(localStorage.getItem("data")){
  studentArr=JSON.parse(localStorage.getItem("data"));
  renderFilteredStudentTable(studentArr);
}
let studentCount = 0;
function addStudent(e){
  if(e.textContent == "Edit Student" && idTobeUpdate){
    
    const student = studentArr.filter((student) => student.id == idTobeUpdate);
    
    student[0].name = nameTxt.value;
    student[0].email = emailTxt.value;
    student[0].gpa = gpaTxt.value;
    student[0].age =  ageTxt.value;
    student[0].degree = degreeTxt.value;
    
   
    addBtn.textContent =  "Add Student";
    refresh();
    saveData();
  }else{

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
  saveData();

  }
}

searchBox.addEventListener('input', function() {
  const searchValue = searchBox.value;
 
 const filteredStudents = studentArr.filter((student) =>
  student.name.toLowerCase().includes(searchValue) ||
  student.email.toLowerCase().includes(searchValue) ||
  student.degree.toLowerCase().includes(searchValue)
    );


  renderFilteredStudentTable(filteredStudents);
  });

  function renderFilteredStudentTable(filteredStudents) {
    let studentTable = document.getElementById("table").firstElementChild.firstElementChild;
    studentTable.innerHTML = `
      <tr>
      <th>ID</th>
      <th>Student Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>GPA</th>
      <th>Degree</th>
      </tr>
    `;
  
    filteredStudents.forEach((student) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}
        <td>${student.age}</td>
        <td>${student.gpa}</td>
        <td>${student.degree}
        <span id="icon">
        <i onclick="editRow(this)" class="fa fa-user-pen"></i>
        <i  onclick="deleteRow(this)" class="fa fa-trash"></i>
      </span>
      </td>
      `;
      studentTable.appendChild(row);
    });
  }

function refresh(){
    let tableT = document.getElementById("table").firstElementChild.firstElementChild;
   
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
        <td >${e.id}</td>
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
   nameTxt.value="";
   emailTxt.value="";
   gpaTxt.value="";
   ageTxt.value="";
   degreeTxt.value="";

 
}

function deleteRow(e){
  let toBeRemoved =e.parentElement.parentElement.parentElement;
 
  toBeRemoved.remove();
  let newArr = studentArr.filter((e)=>{
    return e.id != toBeRemoved.firstElementChild.innerText;
  })
  studentArr = newArr;
  saveData();
}

function editRow(e){
    addBtn.textContent =  "Edit Student";

    
    let toBeEdit =e.parentElement.parentElement.parentElement;
    let arr = toBeEdit.children;

    idTobeUpdate= arr[0].innerText;
    
    nameTxt.value=arr[1].innerText;
    emailTxt.value=arr[2].innerText;
    ageTxt.value=arr[3].innerText;
    gpaTxt.value=arr[4].innerText;
    degreeTxt.value=arr[5].innerText;

    saveData();
}

function saveData(){
  
  localStorage.setItem("data",JSON.stringify(studentArr));
  studentArr = JSON.parse(localStorage.getItem("data"));

}
 



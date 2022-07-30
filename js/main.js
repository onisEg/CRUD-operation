
// var nameInput= document.getElementById("name");
// var ageInput= document.getElementById("age");
// var salaryInput= document.getElementById("salary");
// var genderInput= document.getElementById("gender");
// var addOneBtn=document.getElementById("addOne");
// var users=[]

// addOneBtn.onclick=function(){
//     var user={
//         name:nameInput.value,
//         age:ageInput.value,
//         salary:salaryInput.value,
//         gender:genderInput.value
//     }
//     users.push(user);
 
//     var trs="";
//         for(var i=0;i<users.length;i++){
//             trs+=`
//                 <tr>
//                     <td>${users[i].name}</td>
//                     <td>${users[i].age}</td>
//                     <td>${users[i].salary}</td>
//                     <td>${users[i].gender}</td>
//                 </tr>
//             `
//         }
//         document.getElementById("tableBody").innerHTML=trs;

// }    

// ========================================




var nameInput= document.getElementById("name");
var ageInput= document.getElementById("age");
var salaryInput= document.getElementById("salary");
var genderInput= document.getElementById("gender");
var addBtn= document.getElementById("addOne");
var users;


if(localStorage.getItem("usersList")==null){
     users=[];
}else{
    users=JSON.parse(localStorage.getItem("usersList"));
    dispaly()
}


// =============================================
addBtn.onclick=function(){
    if(addBtn.innerHTML=='add'){
        if(validatName()&&
        validatAge()&&
        validatSalary()&&
        validatGender()==true){
            addUser();
        }
    }else{
        editUser()
    }
    dispaly();
    reset()
}

function addUser(){
    
    var user={
        name:nameInput.value,
        age:ageInput.value,
        salary:salaryInput.value,
        gender:genderInput.value
    }
    users.push(user)
    setToLocalStorege()
}

// ====================================================
function setToLocalStorege(){//set users to localstorege
    localStorage.setItem("usersList",JSON.stringify(users))
}
// ===================================================
function dispaly(){
    var cartona="";
    for(i=0;i<users.length;i++){
        cartona+=`
        <tr>
            <td>${users[i].name}</td>
            <td>${users[i].age}</td>
            <td>${users[i].salary}</td>
            <td>${users[i].gender}</td>
            <td><button onclick="deleteUser(${i})" class="btn bg-danger text-white">Delete</button></td>
            <td><button onclick="updateBtn(${i})" class="btn bg-warning text-white">Update</button></td>
        </tr>`
    }

    document.getElementById("tableBody").innerHTML=cartona
}
// ===============================================
function deleteUser(index){
    users.splice(index,1) 
    dispaly()
    setToLocalStorege()
}

// ===============================================
function reset(){
    var inputs=document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].value="";
    }
}

// ===========================================
function search(searchTxt){
    var cartona="";
    for(i=0;i<users.length;i++){
        if(users[i].name.toLowerCase().includes(searchTxt.toLowerCase())){
            cartona+=`
            <tr>
                <td>${users[i].name}</td>
                <td>${users[i].age}</td>
                <td>${users[i].salary}</td>
                <td>${users[i].gender}</td>
                <td><button onclick="deleteUser(${i})" class="btn bg-danger text-white">Delete</button></td>
            </tr>`
        }
    }
    
    document.getElementById("tableBody").innerHTML=cartona
}
// ==================================================

function updateBtn(index){
    var currentUser=users[index]
    nameInput.value=currentUser.name;
    ageInput.value=currentUser.age;
    salaryInput.value=currentUser.salary;
    genderInput.value=currentUser.gender;

    addBtn.innerHTML="update";
    currenIndex=index;
     
}

// ==================================

var currenIndex;
function editUser(){
    var user={
        name:nameInput.value,
        age:ageInput.value,
        salary:salaryInput.value,
        gender:genderInput.value
    }
    users[currenIndex]=user;
    setToLocalStorege()
    reset()
    addBtn.innerHTML="add"
}

// =====================================

function validatName(){
    var nameRejex=/^[A-Z][a-z]{2,7}$/
    if(!nameRejex.test(nameInput.value)){
        addBtn.disabled="true"
        return false
    } else{
        addBtn.removeAttribute("disabled")
        return true
    }

}
nameInput.onkeyup=function(){
    validatName()
}
// ==================
function validatAge(){
    var ageRejex=/^([2-8][0-8]|80)$/
    if(!ageRejex.test(ageInput.value)){
        addBtn.disabled="true"
        return false
    } else{
        addBtn.removeAttribute("disabled")
        return true
    }
}
ageInput.onkeyup=function(){
    validatAge()
}
// =======================
function validatSalary(){
    var salaryRejex=/^[0-9][0-9]{1,4}$/
    if(!salaryRejex.test(salaryInput.value)){
        addBtn.disabled="true"
        return false
    } else{
        addBtn.removeAttribute("disabled")
        return true
    }
}
salaryInput.onkeyup=function(){
    validatSalary()
}
// ======================
function validatGender(){
    var genderRejex=/^(male)|(female)$/
    
    if(!genderRejex.test(genderInput.value)){
        addBtn.disabled="true"
        return false
    } else{
        addBtn.removeAttribute("disabled")
        return true
    }
}
genderInput.onkeyup=function(){
    validatGender()
}

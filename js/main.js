var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var btnAdd = document.querySelector("#btnAdd");
var searchSite = document.querySelector("#searchSite");

var mood ="create";
var indexUpdate;


var siteArr = [];



// Local Storage 

if(localStorage.getItem("siteStorage") != null){

    siteArr = JSON.parse(localStorage.getItem("siteStorage"));
    displaySite(siteArr);

}




// Add Site 

function addSite (){
    if( validateName ()==true && validateUrl () == true ){
    var site = {
    name : siteName.value,
    url : siteUrl.value
    }

    if(mood == "create"){
    siteArr.push(site);
    } else if (mood == "update"){
        siteArr[indexUpdate]= site;
        mood = "create";
        btnAdd.innerHTML = "Submit";
        btnAdd.classList.replace("btn-warning" , "btn-danger")
    }
    localStorage.setItem("siteStorage" , JSON.stringify(siteArr));
    displaySite(siteArr);
} 
}

// Site in Table 

function displaySite (siteArr , searchItem){
    var cartona = "";
    for(i=0;i<siteArr.length;i++){
        cartona +=`                <tr>
        <td>${i+1}</td>
        <td>${searchItem? siteArr[i].name.replace(searchItem , `<span class="text-danger fw-bolder">${searchItem}</span>`):siteArr[i].name}<S/td>              
        <td>
          <button class="btn btn-success" data-index="${i}">
            <i class="fa-solid fa-eye pe-2"></i><a href="https://${siteArr[i].url}" target="_blank">Visit</a>
          </button>
        </td>
        <td>
        <button class="btn btn-warning text-white" onclick="updateSite(${i})" data-index="${i}">
        <i class="fa-solid fa-pen-to-square pe-2"></i>Update</button>
      </td>

        <td>
          <button class="btn btn-danger pe-2" data-index="${i}" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
    </tr>`
    }
    document.getElementById("tableContent").innerHTML = cartona; 
    ClearInput () 

}

btnAdd.addEventListener('click' , function(){addSite ()});



// Clear 

function ClearInput (){
    siteName.value = "";
    siteUrl.value = "";
}


// Delete

function deleteSite (i){
    siteArr.splice(i , 1);
    localStorage.setItem("siteStorage" , JSON.stringify(siteArr));
    displaySite(siteArr);
}


// Search 

function searchSiteName(searchItem){
var searchArr = [];
searchItem = searchSite.value;

for (i=0 ; i<siteArr.length ; i++){

    if(siteArr[i].name.toLocaleLowerCase().includes(searchItem.toLowerCase()) == true){
        searchArr.push(siteArr[i]);
    }
}
displaySite(searchArr , searchItem );
}

searchSite.addEventListener('input' , function(){searchSiteName()});

// Update

function updateSite(i){

    btnAdd.classList.replace("btn-danger" , "btn-warning");
    btnAdd.innerHTML= "Update";

    siteName.value = siteArr[i].name;
    siteUrl.value = siteArr[i].url;

    mood = "update";
    indexUpdate = i ;

}







// ----------------------------- Validation Data ---------------------

// name 

function validateName (){
    var regexMessegeName = document.querySelector("#regexMessegeName")
    var regexName = /^[A-Z].+$/


    if(regexName.test(siteName.value) == true){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        regexMessegeName.classList.replace("d-block" , "d-none" );

        return true;

    }else if(regexName.test(siteName.value) == false){
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        regexMessegeName.classList.replace("d-none" , "d-block" );

        return false;
    }
}

siteName.addEventListener("input" , function(){validateName ()})


// URL

function validateUrl (){
    var regexMessegeUrl = document.querySelector("#regexMessegeUrl")
    var regexUrl = /^[a-z]+\.com$/

    if(regexUrl.test(siteUrl.value) == true){
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
        regexMessegeUrl.classList.replace("d-block" , "d-none" );

        return true;


    }else if(regexUrl.test(siteUrl.value) == false){
        siteUrl.classList.add("is-invalid");
        siteUrl.classList.remove("is-valid");
        regexMessegeUrl.classList.replace("d-none" , "d-block" );

        return false;
    }

    
}
siteUrl.addEventListener("input" , function(){validateUrl()})
if(localStorage.getItem("currUser") != "admin"){
    if(localStorage.getItem("language") == "ru"){
        alert("Нет доступа")
    }
    else{
        alert("You can't see")
    }
    window.location.replace("../index.html")
}

if(usersArray.length == 0){
    document.querySelector(".user_header").textContent = "There are no users"
    document.querySelector(".user_header").dataset.lang = "empty"
}
else{
    document.querySelector(".user_header").innerHTML += "("+usersArray.length+")" 
    const wrapper = document.querySelector(".users-div")
    for(let i = 0; i < usersArray.length; i++){
        wrapper.appendChild(createElement(usersArray[i], i))
    }
}

function createElement(user, i){
    const newDiv = document.createElement("div");
    newDiv.classList.add("user")
    newDiv.classList.add("b"+i)

    const fname = document.createElement("div")
    fname.innerHTML = user["name"] != undefined ? user["name"] : "-"
    fname.classList.add("user_fname")
    
    const lname = document.createElement("div")
    lname.innerHTML = user["surname"] != undefined ? user["surname"] : "-"
    lname.classList.add("user_lname")

    const mname = document.createElement("div")
    mname.innerHTML = user["patronymic"]  != undefined ? user["patronymic"] : (user["patronymic"]  != "" ? user["patronymic"] : "-")
    mname.classList.add("user_mname")

    const phone = document.createElement("div")
    phone.innerHTML = user["phone"] != undefined ? user["phone"] : "-"
    phone.classList.add("user_phone")

    const email = document.createElement("div")
    email.innerHTML = user["eMail"] != undefined ? user["eMail"] : "-"
    email.classList.add("user_email")

    const date = document.createElement("div")
    date.innerHTML = user["birthDay"] != undefined ? user["birthDay"] : "-"
    date.classList.add("user_date")

    const role = document.createElement("div")
    role.innerHTML = user["role"]
    role.classList.add("user_role")

    newDiv.appendChild(fname)
    newDiv.appendChild(mname)
    newDiv.appendChild(lname)
    newDiv.appendChild(phone)
    newDiv.appendChild(email)
    newDiv.appendChild(date)
    newDiv.appendChild(role)

    return newDiv
}
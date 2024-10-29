var usersArray = JSON.parse(localStorage.getItem("usersData"));

function getUser(){
    console.log(usersArray)
    return usersArray[localStorage.getItem('currUserId')];
}

let user = getUser()

if(localStorage.getItem("language") == "ru"){
    if(user["role"] == "admin")[
        document.querySelector(".login_label").textContent += "Админ"
    ]
    else{
        document.querySelector(".login_label").textContent += "Пользователь"
    }
}
else{
    document.querySelector(".login_label").textContent += user["role"]
}

document.querySelector("#fname").textContent = user["name"]
document.querySelector("#mname").textContent = user["surname"]
document.querySelector("#lname").textContent = user["patronymic"]
document.querySelector("#email").textContent += user["eMail"]
document.querySelector("#phoneNum").textContent += user["phone"]
document.querySelector("#birthDate").textContent += user["birthDay"]

/*document.querySelector(".sign_out").addEventListener("click", () => {
    logout()
    window.location.replace("../pages/index.html")
})*/
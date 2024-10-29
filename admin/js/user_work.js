var usersArray = JSON.parse(localStorage.getItem("usersData"));

function addUser(user){
    usersArray.push(user)
    localStorage.setItem("usersData", JSON.stringify(usersArray))
}

function login(user){
    localStorage.setItem('currUser', user.role)
}

function logout(){
    localStorage.setItem('role', 'none')
    localStorage.setItem('userId', -1)
    localStorage.setItem("cart", JSON.stringify([]))
}
var btn = document.getElementById("theme-button");
var link = document.getElementById("theme-link");
let lightTheme = "css/style.css";
let darkTheme = "css/dark.css";

var currTheme = link.getAttribute("href");
darkThemeSetup();
function darkThemeSetup(){
    const data = localStorage.getItem('theme');
    const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");

    if(data == null){
        if(prefersDarkTheme.matches){
            localStorage.setItem('theme', 'dark');
            currTheme = darkTheme;
        } else{
            localStorage.setItem('theme', 'light');
            currTheme = lightTheme;
        }
    } else{
        if(data === 'dark'){
            currTheme = darkTheme;
        } else{
            currTheme = lightTheme;
        }
    }
    link.setAttribute("href", currTheme);
}

btn.addEventListener("click", function () { ChangeTheme(); });

function ChangeTheme() {
    var theme = "";

    if (currTheme == lightTheme) {
        currTheme = darkTheme;
        theme = "dark";
    }
    else {
        currTheme = lightTheme;
        theme = "light";
    }

    link.setAttribute("href", currTheme);
    localStorage.setItem('theme', theme);
}
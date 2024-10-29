const select = document.querySelector('.header-selct');
const allLang = ['en', 'ru'];
const elems = [];
const data = localStorage.getItem('language');

select.addEventListener('change', changeURLLanguage);

// перенаправить на url с указанием языка
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    localStorage.setItem('language', lang);
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    console.log(hash);
    if (!allLang.includes(hash)) {
        if(data == null){
            location.href = window.location.pathname + '#en';
            localStorage.setItem('language', 'en');
        }
        else{location.href = window.location.pathname + '#' + data;}
        location.reload();
    }
    select.value = hash;
    for (let key in langArr) {
        [...document.querySelectorAll('.lng-' + key)].forEach(item => {
            elems.push(item);
        })
        if (key == 'input') {
            if (document.querySelector('.lng-input')==null)
                {}
            else {document.querySelector('.lng-input').placeholder = langArr[key][hash];}
        }
        elems.forEach(elem => {
            if (elem) {
                elem.innerHTML = langArr[key][hash];
            }
        });
        [...document.querySelectorAll('.lng-' + key)].forEach(item => {
            elems.pop();
        })
    }
}

changeLanguage();
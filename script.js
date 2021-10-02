const carouselSlide = document.querySelector('.carousel-slide');
//querySelector() returneaza primul elemet care se potriveste cu un document css in document. Returneaza doar primul element care se potriveste
const carouselImages = document.querySelectorAll('.carousel-slide img');
//querySelectorAll returneaza toate elementele care se potrivesc cu denumirea din paranteza
//buttons

const Prev = document.querySelector('#Prev');
const Next = document.querySelector('#Next');

//Counter

let counter = 1; //punem let in loc de const pt ca vrem sa modificam pe parcurs aceasta variabila
const size = carouselImages[0].clientWidth;//asta o sa ne dea inapoi width initial

//de vreme ce vrem sa incepem cu prima imagine si nu cu cea duplicat vom selecta carouselul principal

carouselSlide.style.transform = "translateX(" + (-size * counter) + 'px)';

//buttons listeners

Next.addEventListener('click', ()=>{
    if(counter >= carouselImages.length -1) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    carouselSlide.style.transform = "translateX(" + (-size * counter) + 'px)';
});
//Proprietatea 'transition' este o proprietate de prescurtare pentru cele patru proprietăți de tranziție:transitionProperty, transitionDuration, transitionTimingFunction, si transitionDelay. 
//Notă: Specificați întotdeauna proprietatea transitionDuration, altfel durata este 0, iar tranziția nu va avea efect.
Prev.addEventListener('click', ()=>{
    if(counter <=0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    carouselSlide.style.transform = "translateX(" + (-size * counter) + 'px)';
});

//acum adaugam un event listener care o sa se trigaruiasca dupa ce tranzitia se opreste

carouselSlide.addEventListener('transitionend', ()=>{
    if(carouselImages[counter].id ==="lastClone"){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length -2;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + 'px)';
    }
    if(carouselImages[counter].id ==="firstClone"){
        carouselSlide.style.transition = "none";
        counter = carouselImages.length -counter;
        carouselSlide.style.transform = "translateX(" + (-size * counter) + 'px)';
    }
});


//Sending JavaScript Http Requests with XMLHttpRequest

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');

//aici avem 2 functii care sunt trigger uite atunci cand dam click pe getBtn si postBtn
const getData = () => {
const xhr = new XMLHttpRequest();//cam creat un obiect nou xhr, am instantiat un obiect nou XMLHttp
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/');//incepem sa trimitem request ul prin open, pregateste requestul http sa fie trimis. are doua argumente-primul, in cazul nostru, GET reprezinta actiunea pe care vrem sa o facem catre server in cadrul requestului iar cel de-al doilea este URL unde vrem sa trimitem requestul nostru

xhr.onload = () =>{
    const data = JSON.parse(xhr.response);
    console.log(data);
}
xhr.send();
};
const sendData = () => {};

getBtn.addEventListener('click', getData);
postBtn.addEventListener('click', sendData);

let xhr = new XMLHttpRequest();
xhr.onload = function () {
    if (xhr.status === 200) {//status-codul de stare HTTP al raspunsului de la server, in format numeric (200 pt. raspuns corect, 404 pt. "Negasit", 500 pt. o eroare de server, etc.).
        let answer = xhr.responseText;//responseText-returneaza raspunsul primit de la server, in format sir text (string).
        let posts = JSON.parse(answer);
        let postsContainer = document.getElementById(`posts`);
        postsContainer.innerHTML = ``;
        for (let i = 0; i < posts.length; i++) {
            postsContainer.innerHTML += `
            <h3>${posts[i].title}</h3>
            <p>${posts[i].body}</p>
            <hr>
        `;
        }
    }
    else {
        console.log(xhr.statusText);//statusText- codul de stare HTTP al raspunsului de la server, in format text ("OK", "Not found", "Internal Server Error", etc.).
    }
}
xhr.open(`GET`, `https://jsonplaceholder.typicode.com/posts/`);
const buton = document.getElementById(`ajax`);
buton.onclick = function () {
    xhr.send();
}
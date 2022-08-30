const carouselSlide = document.querySelector(".carousel-slide");

const carouselImages = document.querySelectorAll(".carousel-slide img");

const Prev = document.querySelector("#Prev");
const Next = document.querySelector("#Next");

//Counter

let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

//buttons listeners

Next.addEventListener("click", () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});
Prev.addEventListener("click", () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter--;
  carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
});

carouselSlide.addEventListener("transitionend", () => {
  if (carouselImages[counter].id === "lastClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
  if (carouselImages[counter].id === "firstClone") {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
});

const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");

const getData = () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/");
  xhr.onload = () => {
    const data = JSON.parse(xhr.response);
    console.log(data);
  };
  xhr.send();
};
const sendData = () => {};

getBtn.addEventListener("click", getData);
postBtn.addEventListener("click", sendData);

let xhr = new XMLHttpRequest();
xhr.onload = function () {
  if (xhr.status === 200) {
    let answer = xhr.responseText;
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
  } else {
    console.log(xhr.statusText);
  }
};
xhr.open(`GET`, `https://jsonplaceholder.typicode.com/posts/`);
const buton = document.getElementById(`ajax`);
buton.onclick = function () {
  xhr.send();
};

let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle("active");
};
window.onscroll = () => {
  navbar.classList.remove("active");
};

document.getElementById('resume-button-1').addEventListener("click", () => {
  window.open("https://drive.google.com/file/d/1UAj5f-fHiInGHRnJJjCvNHGGwzpm3RMo/view?usp=share_link", "_blank");
});

// document.getElementById('resume-button-2').addEventListener("click", () => {
//   window.open("https://drive.google.com/file/d/1UAj5f-fHiInGHRnJJjCvNHGGwzpm3RMo/view?usp=share_link", "_blank");
// });

// // owl carousel script 
// $('.carousel').owlCarousel({
//   margin: 20,
//   loop: true,
//   autoplay: true,
//   autoplayTimeOut: 2000,
//   autoplayHoverPause: true,
//   responsive: {
//     0: {
//       items: 1,
//       nav: false
//     },
//     800: {
//       items: 2,
//       nav: false
//     },
//     // 1000: {
//     //   items: 3,
//     //   nav: false
//     // }
//   }
// });

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

let darkmode = document.querySelector("#darkmode");

darkmode.onclick = () => {
  if (darkmode.classList.contains("bx-moon")) {
    darkmode.classList.replace("bx-moon", "bx-sun");
    document.body.classList.add("active");
  } else {
    darkmode.classList.replace("bx-sun", "bx-moon");
    document.body.classList.remove("active");
  }
};
document.getElementById('resume-button-1').addEventListener("click", () => {
  // console.log("hhiii1");
  window.open("https://drive.google.com/file/d/1UAj5f-fHiInGHRnJJjCvNHGGwzpm3RMo/view?usp=share_link", "_blank");
});

document.getElementById('resume-button-2').addEventListener("click", () => {
  // console.log('Hiiiiii2');
  window.open("https://drive.google.com/file/d/1-UyBnqRV-GUeVFp4tf0PgL9P5QiTL7l0/view?usp=share_link", "_blank");
});

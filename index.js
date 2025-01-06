document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
  
    if (hamburger && nav) {
      hamburger.addEventListener("click", () => {
        nav.classList.toggle("show");
      });
    } else {
      console.error("Hamburger or nav element not found.");
    }
});

document.getElementById('contact-form').addEventListener('submit', (event) => {
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!email || !message) {
    event.preventDefault();
    alert('Please fill out all fields.');
  }
});   //used Formspree instead of making backend
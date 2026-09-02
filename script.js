const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const correctUsername = "bes";
  const correctPassword = "baron";

  if (username === correctUsername && password === correctPassword) {
    message.textContent = "Login successful! 💙";

    window.location.href = "dashboard.html";
  } else {
    message.textContent = "Wrong username or password 😭💙";
  }
});
const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
event.preventDefault();

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

try {
const response = await fetch("/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
username: username,
password: password
})
});


const result = await response.json();

message.textContent = result.message;

if (response.ok) {
  console.log("Login successful, redirecting...");
  window.location.href = "/dashboard.html";
}


} catch (error) {
console.error("Login error:", error);
message.textContent = "Unable to connect to server.";
}
});

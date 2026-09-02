const choices = document.querySelectorAll(".choice");
const otherChoice = document.getElementById("otherChoice");
const sendOther = document.getElementById("sendOther");
const answer = document.getElementById("answer");

function askAvailability(choice) {
answer.innerHTML = `
<strong>YAYYY! 💙</strong><br>
${choice} it is! 😋<br><br>

<strong>One more important question... 👀</strong><br>
Are you available on September 11? 💙<br><br>

<button class="availabilityButton" data-answer="Yes, I'm free! 😌💙">
  YES, I'M FREE! 😌
</button>

<button class="availabilityButton" data-answer="Maybe 👀">
  MAYBE 👀
</button>

<button class="availabilityButton" data-answer="No, I'm busy 😭">
  NO, I'M BUSY 😭
</button>

<p id="availabilityMessage"></p>

`;

const availabilityButtons = document.querySelectorAll(".availabilityButton");

availabilityButtons.forEach(button => {
button.addEventListener("click", () => {
const availability = button.dataset.answer;

  // If she is not available, don't ask for a time
  if (availability === "No, I'm busy 😭") {
    document.getElementById("availabilityMessage").innerHTML = `
      Aww okay 😭💙 We'll find another day!
      <br><br>

      <button id="continueButton">
        Continue to your surprise → 💙
      </button>
    `;
    
    document.getElementById("continueButton").addEventListener("click", () => {
      window.location.href = "memories.html";
    });

    return;
  }

  // Ask for the time if she chose YES or MAYBE
  document.getElementById("availabilityMessage").innerHTML = `
    <strong>Noted! 👀💙</strong><br>
    You said: ${availability}<br><br>

    <strong>What time are you available? ⏰</strong><br><br>

    <input type="time" id="availableTime">

    <br><br>

    <button id="sendTime" type="button">
      Send Time 💙
    </button>

    <p id="timeMessage"></p>
  `;

  document.getElementById("sendTime").addEventListener("click", () => {
    const time = document.getElementById("availableTime").value;

    if (time === "") {
      document.getElementById("timeMessage").textContent =
        "Choose a time first, Bes 😭💙";
      return;
    }

    document.getElementById("timeMessage").innerHTML = `
      <strong>YAYYY! 💙</strong><br>
      I'll remember that you're available at ${time}. 👀⏰<br><br>

      <button id="continueButton">
        Continue to your surprise → 💙
      </button>
    `;

    document.getElementById("continueButton").addEventListener("click", () => {
      window.location.href = "memories.html";
    });
  });
});

});
}

choices.forEach(choice => {
choice.addEventListener("click", () => {
const selectedChoice = choice.textContent;

choices.forEach(button => {
  button.classList.remove("selected");
});

choice.classList.add("selected");
otherChoice.value = "";

askAvailability(selectedChoice);

});
});

sendOther.addEventListener("click", () => {
const otherValue = otherChoice.value.trim();

if (otherValue === "") {
answer.textContent = "Type your choice first, Bes 😭💙";
return;
}

choices.forEach(button => {
button.classList.remove("selected");
});

askAvailability(otherValue);
});
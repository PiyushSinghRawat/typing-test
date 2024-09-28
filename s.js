let originalText = document.getElementById("originalText");
let textarea2 = document.getElementById("textarea2");
let feedbackDiv = document.getElementById("feedback");
let speedDisplay = document.getElementById("speedDisplay");
let accuracyDisplay = document.getElementById("accuracyDisplay");
let timerDisplay = document.getElementById("timerDisplay");
let retestButton = document.getElementById("retestButton");
let originalTextConten = originalText.innerText.toLowerCase(); 
originalText.innerText=originalTextConten
let originalTextContent=originalTextConten

let startTime;
let timer;
let isTypingStarted = false;
let timeLimit = 30; 


function startTimer() {
    let timeLeft = timeLimit;
    timer = setInterval(() => {
        timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            textarea2.disabled = true; 
            retestButton.disabled = false; 
            retestButton.style.backgroundColor = "grey"; 
            alert("Time's up!"); 
        }
    }, 1000);
}


textarea2.addEventListener("input", () => {
    let userInput = textarea2.value.toLowerCase(); 

    if (!isTypingStarted) {
        startTimer();
        startTime = new Date().getTime();
        isTypingStarted = true;
    }
    feedbackDiv.innerHTML = '';
    let originalWords = originalTextContent.split(/(\s+)/);
    let userWords = userInput.split(/(\s+)/);
    let correctCount = 0;
    for (let i = 0; i < originalWords.length; i++) {
        if (userWords[i] === originalWords[i]) {
            correctCount++;
            feedbackDiv.innerHTML += `<span style="color: green;">${originalWords[i]}</span>`;
        } else if (userWords[i] === undefined) {
            feedbackDiv.innerHTML += `<span>${originalWords[i]}</span>`;
        } else {
            feedbackDiv.innerHTML += `<span style="color: red;">${originalWords[i]}</span>`;
        }
    }

    let timeTaken = (new Date().getTime() - startTime) / 1000 / 60; 
    let wordsTyped = userInput.split(/\s+/).filter(Boolean).length; 

    let typingSpeed = (timeTaken > 0) ? Math.round(wordsTyped / timeTaken) : 0; 
    let accuracy = Math.round((correctCount / originalWords.length) * 100); 


    speedDisplay.innerText = `Speed: ${typingSpeed} WPM`;
    accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;


    if (userInput.length === originalTextContent.length || textarea2.disabled) {
        alert("You typed the text correctly or time is up!");
        textarea2.disabled = true;
        clearInterval(timer); 
        retestButton.disabled = false;
        retestButton.style.backgroundColor = "rgb(194, 165, 68)";
    }
});


retestButton.addEventListener("click", () => {

    textarea2.value = "";
    feedbackDiv.innerHTML = "";
    speedDisplay.innerText = "";
    accuracyDisplay.innerText = "";
    timerDisplay.innerText = "";
    textarea2.disabled = false; 
    retestButton.disabled = true;
    retestButton.style.backgroundColor = "rgb(194, 165, 68)"; 
    isTypingStarted = false; 
    clearInterval(timer);
});

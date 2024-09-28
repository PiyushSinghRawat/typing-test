// Paragraph array
const typingTestParagraphs = [
    {
      id: 1,
      title: "General Knowledge",
      content: "The Great Wall of China is a series of fortifications built along the historical northern borders of ancient Chinese states. It was constructed to protect the Chinese empire from invasions and raids. Stretching over 13,000 miles, it is one of the most remarkable architectural feats in history, and a symbol of strength and perseverance."
    },
    {
      id: 2,
      title: "Motivational",
      content: "Success is not final, failure is not fatal. It is the courage to continue that counts. Every day offers a new opportunity to learn, grow, and push beyond your limits. Remember, the only real failure is when you stop trying. Keep moving forward with determination and belief in yourself."
    },
    {
      id: 3,
      title: "Technology",
      content: "Artificial intelligence is transforming industries by automating tasks, improving efficiency, and providing deep insights from data. Machine learning algorithms allow systems to learn from patterns, making predictions that can optimize business processes. As AI continues to evolve, its impact on society will grow, revolutionizing how we live and work."
    },
    {
      id: 4,
      title: "Creative Writing",
      content: "As the sun dipped below the horizon, the sky exploded into a canvas of vibrant oranges and purples. The gentle hum of the waves, paired with the cool evening breeze, created a serene atmosphere. It was in moments like these that time seemed to stand still, and the worries of the world melted away."
    },
    {
      id: 5,
      title: "Science",
      content: "The human brain is an incredibly complex organ that controls all functions of the body. Composed of over 86 billion neurons, it processes vast amounts of information every second. The brain's plasticity allows it to adapt and change over time, forming new neural pathways in response to learning and experience."
    },
    {
        id: 6,
        title: "History",
        content: "The Renaissance was a fervent period of European cultural, artistic, political, and economic “rebirth” following the Middle Ages. Generally described as taking place from the 14th century to the 17th century, the Renaissance promoted the rediscovery of classical philosophy, literature, and art."
      },
      {
        id: 7,
        title: "Nature",
        content: "Forests are the lungs of our planet. They cover about 31 percent of Earth's land area and play a key role in removing carbon dioxide from the atmosphere. Forests provide habitats for countless species and are crucial to biodiversity and the stability of the global climate."
      },
      {
        id: 8,
        title: "Space Exploration",
        content: "The first human to travel into space was Yuri Gagarin, a Soviet cosmonaut, in 1961. Since then, space exploration has rapidly advanced, with moon landings, space stations, and now, plans for missions to Mars. Space remains one of humanity’s greatest frontiers, filled with both challenges and opportunities for discovery."
      },
      {
        id: 9,
        title: "Health & Fitness",
        content: "Regular physical activity has numerous benefits, including improved cardiovascular health, stronger muscles, and better mental well-being. Whether it’s running, swimming, or yoga, incorporating fitness into your daily routine can lead to a longer and healthier life. Small, consistent efforts make a big difference over time."
      }
  ];
  
  // DOM Elements
  let originalText = document.getElementById("originalText");
  let textarea2 = document.getElementById("textarea2");
  let feedbackDiv = document.getElementById("feedback");
  let speedDisplay = document.getElementById("speedDisplay");
  let accuracyDisplay = document.getElementById("accuracyDisplay");
  let timerDisplay = document.getElementById("timerDisplay");
  let retestButton = document.getElementById("retestButton");
  
  // Random paragraph to be displayed
  let randomParagraph = typingTestParagraphs[Math.floor(Math.random() * typingTestParagraphs.length)];
  originalText.innerText = randomParagraph.content.toLowerCase(); // Set originalText content
  let originalTextContent = randomParagraph.content.toLowerCase(); // Store original text content
  
  // Typing test variables
  let startTime;
  let timer;
  let isTypingStarted = false;
  let timeLimit = 30; // Time limit for the typing test
  
  // Function to start the timer
  function startTimer() {
      let timeLeft = timeLimit;
      timer = setInterval(() => {
          timerDisplay.innerText = `Time Left: ${timeLeft} seconds`;
          timeLeft--;
  
          if (timeLeft < 0) {
              clearInterval(timer);
              textarea2.disabled = true; // Disable input when time is up
              retestButton.disabled = false; // Enable retest button
              retestButton.style.backgroundColor = "grey"; 
              alert("Time's up!");
          }
      }, 1000);
  }
  
  // Event listener for typing input
  textarea2.addEventListener("input", () => {
      let userInput = textarea2.value.toLowerCase(); // Convert user input to lowercase for comparison
  
      if (!isTypingStarted) {
          startTimer();
          startTime = new Date().getTime();
          isTypingStarted = true;
      }
  
      feedbackDiv.innerHTML = '';
      let originalWords = originalTextContent.split(/(\s+)/); // Split original text into words (including spaces)
      let userWords = userInput.split(/(\s+)/); // Split user input into words
  
      let correctCount = 0; // Count of correct words
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
  
      let timeTaken = (new Date().getTime() - startTime) / 1000 / 60; // Time taken in minutes
      let wordsTyped = userInput.split(/\s+/).filter(Boolean).length; // Count words typed (ignore empty)
  
      let typingSpeed = (timeTaken > 0) ? Math.round(wordsTyped / timeTaken) : 0; // Calculate typing speed (WPM)
      let accuracy = Math.round((correctCount / originalWords.length) * 100); // Calculate accuracy percentage
  
      speedDisplay.innerText = `Speed: ${typingSpeed} WPM`;
      accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;
  
      // Check if user has completed typing or time is up
      if (userInput.length === originalTextContent.length || textarea2.disabled) {
          alert("You typed the text correctly or time is up!");
          textarea2.disabled = true;
          clearInterval(timer); // Stop timer
          retestButton.disabled = false;
          retestButton.style.backgroundColor = "rgb(194, 165, 68)";
      }
  });
  
  // Event listener for retest button
  retestButton.addEventListener("click", () => {
      randomParagraph = typingTestParagraphs[Math.floor(Math.random() * typingTestParagraphs.length)];
      originalText.innerText = randomParagraph.content.toLowerCase(); // Reset to a new random paragraph
      originalTextContent = randomParagraph.content.toLowerCase();
  
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
  

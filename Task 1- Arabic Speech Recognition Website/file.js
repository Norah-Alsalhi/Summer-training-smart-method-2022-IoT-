// Check for browser compatibility
if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support speech recognition. Please use Google Chrome or another supported browser.');
  } else {
    // Initialize SpeechRecognition
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true; // Keep listening until manually stopped
    recognition.interimResults = true; // Show results as the user speaks
    recognition.lang = 'en-US'; // Default language
  
    const startBtn = document.getElementById('start-btn');
    const resultText = document.getElementById('result-text');
  
    // Toggle listening state
    let isListening = false;
  
    startBtn.addEventListener('click', () => {
      if (!isListening) {
        recognition.start();
        startBtn.textContent = 'Stop Listening';
      } else {
        recognition.stop();
        startBtn.textContent = 'Start Listening';
      }
      isListening = !isListening;
    });
  
    // Capture speech and display transcription
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      resultText.textContent = transcript;
    };
  
    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech Recognition Error:', event.error);
      resultText.textContent = 'Error occurred: ' + event.error;
    };
  
    // Restart on end
    recognition.onend = () => {
      if (isListening) {
        recognition.start(); // Auto-restart listening
      }
    };
  }
  
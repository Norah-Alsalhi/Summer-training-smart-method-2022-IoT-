if (!('webkitSpeechRecognition' in window) || !('serial' in navigator)) {
    alert('Your browser does not support Speech Recognition or WebSerial. Use Google Chrome.');
} else {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'ar-SA'; 

    const startBtn = document.getElementById('start-btn');
    const connectBtn = document.getElementById('connect-btn');
    const resultText = document.getElementById('result-text');

    let isListening = false;
    let port, writer;

    // Connect to Serial Device
    async function connectSerial() {
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 115200 });
            writer = port.writable.getWriter();
            console.log("Connected to Serial Port");
        } catch (err) {
            console.error("Error connecting to serial port:", err);
        }
    }

    // Speech recognition start/stop
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

    // Speech recognition results
    recognition.onresult = async (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        resultText.textContent = transcript;

        // Send command to Arduino
        if (transcript.includes("يمين") || transcript.toLowerCase().includes("right")) {
            sendCommand("R");
        } else if (transcript.includes("يسار") || transcript.toLowerCase().includes("left")) {
            sendCommand("L");
        }
    };

    // Send command to Serial
    async function sendCommand(command) {
        if (writer) {
            const data = new TextEncoder().encode(command + "\n");
            await writer.write(data);
            console.log("Sent command:", command);
        } else {
            console.error("Serial port not connected");
        }
    }

    // Connect Serial when button is clicked
    connectBtn.addEventListener('click', connectSerial);

    recognition.onerror = (event) => {
        console.error('Speech Recognition Error:', event.error);
        resultText.textContent = 'Error: ' + event.error;
    };

    recognition.onend = () => {
        if (isListening) {
            recognition.start();
        }
    };
}

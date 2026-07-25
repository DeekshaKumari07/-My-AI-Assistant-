// Elements
const functionSelect = document.getElementById("function");
const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const responseBox = document.getElementById("response");

// Generate Button Click
generateBtn.addEventListener("click", () => {

    const prompt = promptInput.value.trim();
    const selectedFunction = functionSelect.value;

    if (prompt === "") {
        responseBox.innerHTML = `
            <h3>⚠️ Empty Prompt</h3>
            <p>Please enter a prompt before generating a response.</p>
        `;
        return;
    }

    // Loading Animation
    responseBox.innerHTML = `
        <h3>🤖 Thinking...</h3>
        <p>Generating your AI response...</p>
    `;

    fetch("/generate", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        prompt: prompt,
        function: selectedFunction
    })
})
.then(response => response.json())
.then(data => {
    responseBox.innerHTML = `
        <h3>🤖 AI Response</h3>
        <p>${data.response}</p>
    `;
})
.catch(error => {
    responseBox.innerHTML = `
        <h3>Error</h3>
        <p>${error}</p>
    `;
});

const helpfulBtn = document.querySelector(".yes");
const notHelpfulBtn = document.querySelector(".no");

helpfulBtn.addEventListener("click", () => {
    helpfulBtn.innerHTML = "✅ Thanks!";
    notHelpfulBtn.disabled = true;
});

notHelpfulBtn.addEventListener("click", () => {
    notHelpfulBtn.innerHTML = "✅ Feedback Saved";
     alert("😊 Thanks for your feedback! We'll improve.");
    helpfulBtn.disabled = true;
});
});
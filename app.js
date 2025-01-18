async function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    const chatbox = document.getElementById("chatbox");

    if (!userInput) {
        alert("অনুগ্রহ করে একটি প্রশ্ন লিখুন!");
        return;
    }

    // Add user message to chatbox
    const userMessage = document.createElement("p");
    userMessage.className = "user";
    userMessage.textContent = `আপনি: ${userInput}`;
    chatbox.appendChild(userMessage);

    // Bot response logic
    let botResponse = "দুঃখিত, আমি তা বুঝতে পারিনি।";

    // Predefined responses for specific questions
    if (userInput.includes("হ্যালো") || userInput.includes("hello")) {
        botResponse = "হ্যালো! আমি আপনাকে কিভাবে সাহায্য করতে পারি?";
    } else if (userInput.includes("তোমার নাম")) {
        botResponse = "আমার নাম Shawon 2.0।";
    } else if (userInput.includes("আবহাওয়া")) {
        botResponse = "আজকের আবহাওয়া সুন্দর!";
    } else {
        // If the question is unknown, search Google
        botResponse = await fetchGoogleSearch(userInput);
    }

    // Add bot response to chatbox
    const botMessage = document.createElement("p");
    botMessage.className = "bot";
    botMessage.textContent = `বট: ${botResponse}`;
    chatbox.appendChild(botMessage);

    // Scroll chatbox to bottom
    chatbox.scrollTop = chatbox.scrollHeight;

    // Clear input field
    document.getElementById("user-input").value = "";
}

// Fetch response from Google Search
async function fetchGoogleSearch(query) {
    const apiKey = "AIzaSyALUWDcGG_228N3uOHHyXY7sB7dEuBB60g"; // Replace with your actual API key
    const cx = "31c6dea9634da413d"; // Replace with your actual Search Engine ID
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        query
    )}&key=${apiKey}&cx=${cx}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
            return data.items[0].snippet; // Return the first search result
        } else {
            return "দুঃখিত, আমি কোনো উত্তর খুঁজে পাইনি।";
        }
    } catch (error) {
        console.error("Error fetching Google Search results:", error);
        return "গুগল সার্চ করতে সমস্যা হয়েছে।";
    }
}


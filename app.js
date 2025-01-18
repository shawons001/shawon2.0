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
    const predefinedResponses = {
        "হ্যালো": "হ্যালো! কেমন আছেন?",
        "তোমার নাম কী?": "আমার নাম Shawon 2.0।",
        "তুমি কি করতে পারো?": "আমি আপনার প্রশ্নের উত্তর দিতে এবং প্রয়োজন হলে গুগল থেকে তথ্য সংগ্রহ করতে পারি।",
        "বাংলাদেশ": "বাংলাদেশ দক্ষিণ এশিয়ার একটি সুন্দর দেশ।",
        "বাংলাদেশের রাজধানী কী?": "বাংলাদেশের রাজধানী ঢাকা।",
        "আজকের তারিখ কত?": new Date().toLocaleDateString("bn-BD"),
        "তুমি কোথায় থাকো?": "আমি একটি ভার্চুয়াল চ্যাটবট, তাই আমি ইন্টারনেটেই থাকি।",
        "তোমার কাজ কী?": "আমার কাজ হলো আপনার প্রশ্নের উত্তর দেওয়া।",
        "বাংলাদেশের প্রধান নদী কোনটি?": "বাংলাদেশের প্রধান নদী হলো পদ্মা।",
        "কেমন আছো?": "আমি ভালো আছি, ধন্যবাদ! আপনি কেমন আছেন?",
        "আজকের আবহাওয়া কেমন?": "আজকের আবহাওয়া বেশ সুন্দর এবং মনোরম।",
        "তুমি কিভাবে কাজ করো?": "আমি আপনার ইনপুটের উপর ভিত্তি করে উত্তর প্রদান করি।",
        "তোমার বয়স কত?": "আমার বয়স নির্ধারণ করা সম্ভব নয়, কারণ আমি একটি চ্যাটবট।",
        "বাংলাদেশের স্বাধীনতার বছর কত?": "বাংলাদেশ ১৯৭১ সালে স্বাধীনতা লাভ করে।",
        "সবচেয়ে বড় মহাসাগর কোনটি?": "পৃথিবীর সবচেয়ে বড় মহাসাগর হলো প্রশান্ত মহাসাগর।",
        "গ্রহগুলির মধ্যে সবচেয়ে বড় কোনটি?": "গ্রহগুলির মধ্যে সবচেয়ে বড় হলো বৃহস্পতি।",
        "চাঁদে কতজন মানুষ গিয়েছে?": "১২ জন মানুষ চাঁদে গিয়েছে।",
        "পৃথিবীর বয়স কত?": "পৃথিবীর বয়স প্রায় ৪.৫৪ বিলিয়ন বছর।",
        "তুমি কি বাংলা বলতে পারো?": "হ্যাঁ, আমি বাংলা বলতে এবং বুঝতে পারি।",
        "ইন্টারনেট কী?": "ইন্টারনেট হলো একটি বৈশ্বিক নেটওয়ার্ক যা তথ্যের আদান-প্রদান করতে ব্যবহৃত হয়।",
        "মোবাইল ফোন কী?": "মোবাইল ফোন হলো একটি যোগাযোগের মাধ্যম যা দূরবর্তী স্থান থেকে কথা বলা এবং তথ্য আদান-প্রদান করতে ব্যবহৃত হয়।",
        "মানুষ কেন ঘুমায়?": "ঘুম শরীর এবং মনের পুনরুদ্ধার এবং শক্তি সঞ্চয়ের জন্য প্রয়োজন।",
        "গুগল কী?": "গুগল হলো বিশ্বের বৃহত্তম সার্চ ইঞ্জিন।",
        "তুমি কি গান গাইতে পারো?": "দুঃখিত, আমি গান গাইতে পারি না।",
        "বাংলাদেশে কয়টি বিভাগ আছে?": "বাংলাদেশে ৮টি বিভাগ আছে।",
        "পৃথিবীর সবচেয়ে উঁচু পর্বত কোনটি?": "পৃথিবীর সবচেয়ে উঁচু পর্বত হলো এভারেস্ট।",
        "পৃথিবীর সবচেয়ে বড় বন কোনটি?": "পৃথিবীর সবচেয়ে বড় বন হলো অ্যামাজন রেইনফরেস্ট।",
        "মানুষের শরীরে কতটি হাড় আছে?": "একজন পূর্ণবয়স্ক মানুষের শরীরে ২০৬টি হাড় রয়েছে।",
        "বিজ্ঞান কী?": "বিজ্ঞান হলো জ্ঞান অর্জনের একটি পদ্ধতি যা পর্যবেক্ষণ এবং পরীক্ষা-নিরীক্ষার মাধ্যমে কাজ করে।",
        "তুমি কীভাবে তৈরি হয়েছো?": "আমাকে কোডিং এবং এআই প্রযুক্তি ব্যবহার করে তৈরি করা হয়েছে।",
        "পৃথিবীর প্রথম উপন্যাস কী?": "পৃথিবীর প্রথম উপন্যাস হলো 'গেনজি মনোগাতারি'।",
        "সূর্য কী দিয়ে তৈরি?": "সূর্য প্রধানত হাইড্রোজেন এবং হিলিয়াম দিয়ে তৈরি।",
        "বাংলাদেশের জাতীয় ফুল কী?": "বাংলাদেশের জাতীয় ফুল হলো শাপলা।",
        "গাছ কেন দরকার?": "গাছ অক্সিজেন সরবরাহ করে এবং পরিবেশ সুস্থ রাখে।",
        "পৃথিবী সূর্যের চারপাশে কত দিনে ঘোরে?": "পৃথিবী সূর্যের চারপাশে ঘুরতে ৩৬৫ দিন সময় নেয়।",
        "বাংলাদেশের জাতীয় সংগীত কে লিখেছেন?": "বাংলাদেশের জাতীয় সংগীত 'আমার সোনার বাংলা' রবীন্দ্রনাথ ঠাকুর লিখেছেন।",
        "মহাশূন্যে কোনো শব্দ হয় কি?": "মহাশূন্যে শব্দ হয় না, কারণ সেখানে কোনো মাধ্যম নেই।",
        "তুমি কি রোবট?": "হ্যাঁ, আমি একটি ভার্চুয়াল চ্যাটবট।",
        "শিক্ষা কেন দরকার?": "শিক্ষা একজন মানুষের জ্ঞান, নৈতিকতা এবং দক্ষতা উন্নত করতে সহায়তা করে।"
    };

    // Check for predefined response
    if (predefinedResponses[userInput]) {
        botResponse = predefinedResponses[userInput];
    } else {
        // If question is unknown, search Google
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

        // Log the full JSON response to Console for debugging
        console.log("Full JSON Response:", data);

        if (data.items && data.items.length > 0) {
            // Log the first search result
            console.log("First Search Result:", data.items[0].snippet);
            return data.items[0].snippet; // Return the first search result
        } else {
            console.warn("No search results found.");
            return "দুঃখিত, আমি কোনো উত্তর খুঁজে পাইনি।";
        }
    } catch (error) {
        console.error("Error fetching Google Search results:", error);
        return "গুগল সার্চ করতে সমস্যা হয়েছে।";
    }
}


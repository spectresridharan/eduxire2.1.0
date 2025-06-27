
document.addEventListener("DOMContentLoaded", function () {
    let nextPageToken = '';
    const YOUTUBE_API_KEY = 'AIzaSyA-X5VK_sXpONGItr1-m9jgYhDtU-o_DeI'; // REPLACE WITH YOUR ACTUAL KEY

    // Fetch videos from YouTube API
    async function fetchVideos(pageToken = '') {
        const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=productivity+motivation&type=video&order=relevance&maxResults=10&pageToken=${pageToken}&key=${YOUTUBE_API_KEY}`;

        try {
            // Show loading state
            document.getElementById("loadMore").textContent = "Loading...";
            
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("API Response:", data); // Debugging

            if (!data.items || data.items.length === 0) {
                throw new Error("No videos found in response");
            }

            displayVideos(data.items);
            nextPageToken = data.nextPageToken || '';
            
            // Update load more button
            document.getElementById("loadMore").textContent = "Load More";
            document.getElementById("loadMore").style.display = nextPageToken ? "block" : "none";
            
        } catch (error) {
            console.error("Error fetching videos:", error);
            document.getElementById("loadMore").textContent = "Load More";
            
            // Fallback to static videos if API fails
            if (!document.getElementById("video-container").hasChildNodes()) {
                displayStaticVideos();
            }
        }
    }

    // Display videos
    function displayVideos(videos) {
        const container = document.getElementById("video-container");

        videos.forEach((video) => {
            // Skip if video ID is missing (sometimes happens with live streams)
            if (!video.id?.videoId) return;

            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const channel = video.snippet.channelTitle;

            const videoElement = document.createElement("div");
            videoElement.classList.add("video-card");
            videoElement.innerHTML = `
                <div class="video-wrapper">
                    <iframe width="320" height="180" 
                        src="https://www.youtube.com/embed/${videoId}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="video-info">
                    <h3>${title}</h3>
                    <p>${channel}</p>
                </div>
            `;

            container.appendChild(videoElement);
        });
    }


    // Load more videos
    document.getElementById("loadMore").addEventListener("click", () => {
        if (nextPageToken) {
            fetchVideos(nextPageToken);
        } else {
            fetchVideos(); // Try initial fetch again
        }
    });

    // Initial load
    fetchVideos();
});
    // ===== AI CHATBOT FUNCTIONALITY =====
    const chatToggle = document.getElementById("chatbot-toggle");
    const chatbox = document.getElementById("chatbox");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    // Toggle chatbot visibility
    chatToggle.addEventListener("click", () => {
        chatbox.classList.toggle("hidden");
    });

    // Send Message to OpenAI API
    sendBtn.addEventListener("click", async () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        // Display user message
        chatMessages.innerHTML += `<div class="message user"><strong>You:</strong> ${userMessage}</div>`;
        chatInput.value = "";
        sendBtn.disabled = true; // Disable send button while waiting

        // Show typing indicator
        chatMessages.innerHTML += `<div id="typingIndicator" class="message bot">Bot is typing...</div>`;
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const aiResponse = await fetchChatGPTResponse(userMessage);
            document.getElementById("typingIndicator").remove(); // Remove typing indicator
            chatMessages.innerHTML += `<div class="message bot"><strong>Bot:</strong> ${aiResponse}</div>`;
        } catch (error) {
            document.getElementById("typingIndicator").remove();
            chatMessages.innerHTML += `<div class="message error"><strong>Bot:</strong> Error fetching response. Try again.</div>`;
        }

        sendBtn.disabled = false; // Re-enable send button
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Fetch AI response from OpenAI API
    async function fetchChatGPTResponse(message) {
        const API_KEY = "xxxx"; // Replace with your actual API key
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            })
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    }
;
// Toggle Subjects
        document.getElementById('toggleSubjects').addEventListener('click', function() {
            const container = document.getElementById('subjectContainer');
            container.style.display = container.style.display === 'none' ? 'flex' : 'none';
        });

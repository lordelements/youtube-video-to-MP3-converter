
const convertBtn = document.getElementById('convertBtn');
const videoUrlInput = document.getElementById('videoUrl');
const statusMessage = document.getElementById('statusMessage');
const previewCard = document.getElementById('previewCard');
const downloadArea = document.getElementById('downloadArea');

convertBtn.addEventListener('click', async () => {
    const url = videoUrlInput.value;
    const videoId = extractId(url);

    if (!videoId) {
        alert("Please enter a valid YouTube URL");
        return;
    }

    // Show Preview Immediately
    document.getElementById('videoThumbnail').src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    document.getElementById('videoTitle').innerText = "Fetching video details...";
    previewCard.style.display = "block";
    statusMessage.innerText = "Connecting to API...";

    // Setup API Call
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b6a9b63181msh3086c4ae302b083p17dc24jsn7ea6ac785e2f',
            'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`, options);
        const data = await response.json();

        if (data.status === "ok") {
            // Update Preview with real data
            document.getElementById('videoTitle').innerText = data.title;
            document.getElementById('videoDuration').innerText = `Duration: ${data.duration}s`;
            
            // Show Download Button
            document.getElementById('downloadLink').href = data.link;
            downloadArea.style.display = "block";
            statusMessage.innerText = "Download Ready!";
        } else {
            statusMessage.innerText = "Error: " + data.msg;
        }
    } catch (error) {
        statusMessage.innerText = "API Error. Check your Key or Internet.";
    }
});

function extractId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return (match) ? match[1] : null;
}
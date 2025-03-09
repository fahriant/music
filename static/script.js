const lyrics = [
    { text: "Karna kamu cantik", time: 4.47 },
    { text: "Kan kuberi segalanya apa yang kupunya", time: 7.901 },
    { text: "Dan hatimu baik", time: 11.833 },
    { text: "Sempurnalah duniaku saat kau di sisiku", time: 14.837 },
    { text: "Bukan karna make up di wajahmu", time: 19.093 },
    { text: "Atau lipstik merah nya", time: 22.912 },
    { text: "Lembut hati tutur kata", time: 26.403 },
    { text: "Terciptalah cinta yang kupuja", time: 30.157 }
];

const audio = document.getElementById("audio");
const lyricsContainer = document.getElementById("lyrics");
const playButton = document.getElementById("playButton");

function animateText(element, text, speed = 50) {
    element.innerHTML = "";
    let i = 0;
    function typeLetter() {
        if (i < text.length) {
            element.innerHTML += text[i];
            i++;
            setTimeout(typeLetter, speed);
        }
    }
    typeLetter();
}

// Add visual effects when displaying lyrics
function addVisualEffects(element, index) {
    const colors = [
        'text-pink-600', 'text-purple-600', 'text-indigo-600', 'text-blue-600',
        'text-red-600', 'text-yellow-600', 'text-green-600', 'text-teal-600'
    ];
    
    element.classList.add('font-bold');
    element.classList.add(colors[index % colors.length]);
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        element.style.transition = 'all 0.8s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }, 100);
}

playButton.addEventListener("click", () => {
    // Change button text
    playButton.innerHTML = '<i class="fas fa-music mr-2"></i>Now Playing';
    playButton.classList.add('bg-green-500');
    playButton.disabled = true;
    
    // Clear previous lyrics
    lyricsContainer.innerHTML = "";
    
    // Play the audio
    audio.play();
    
    // Add heart animation container
    const heartContainer = document.createElement('div');
    heartContainer.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'pointer-events-none', 'z-10');
    document.body.appendChild(heartContainer);
    
    // Create floating hearts randomly
    const createHeart = () => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.opacity = '0';
        heartContainer.appendChild(heart);
        
        // Animate the heart
        const animation = heart.animate([
            { transform: 'translateY(100vh)', opacity: 0 },
            { transform: 'translateY(0vh)', opacity: 0.8 },
            { transform: 'translateY(-100vh)', opacity: 0 }
        ], {
            duration: Math.random() * 5000 + 3000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => heart.remove();
    };
    
    // Create hearts periodically
    const heartInterval = setInterval(createHeart, 1000);
    
    // Start displaying lyrics
    lyrics.forEach(({ text, time }, index) => {
        setTimeout(() => {
            let line = document.createElement("p");
            line.classList.add("lyric-line");
            lyricsContainer.appendChild(line);
            animateText(line, text, 50);
            addVisualEffects(line, index);
        }, time * 1000);
    });
    
    // Stop creating hearts when audio ends
    audio.addEventListener('ended', () => {
        clearInterval(heartInterval);
        heartContainer.remove();
        
        // Reset button
        setTimeout(() => {
            playButton.innerHTML = '<i class="fas fa-play mr-2"></i>Play Again';
            playButton.classList.remove('bg-green-500');
            playButton.disabled = false;
        }, 1000);
    });
});

// Audio will remain hidden and play in the background

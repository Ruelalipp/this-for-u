document.addEventListener("DOMContentLoaded", () => {

  // fade animation saat halaman dibuka
  document.body.classList.add("show");

  // animasi muncul perlahan untuk semua card
  const cards = document.querySelectorAll(".card");

  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("active");
    }, 300 * index);
  });

  // ========== Background Music (loop forever) ==========
  const audio = new Audio("WhatsApp Audio 2026-05-15 at 01.21.50.mpeg");
  audio.loop = true;
  audio.volume = 0.4;

  // Try autoplay
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay blocked — play on first user interaction
      const startMusic = () => {
        audio.play();
        document.removeEventListener("click", startMusic);
        document.removeEventListener("touchstart", startMusic);
      };
      document.addEventListener("click", startMusic);
      document.addEventListener("touchstart", startMusic);
    });
  }

  // Music toggle button
  const musicBtn = document.createElement("button");
  musicBtn.innerHTML = "♫";
  musicBtn.className = "music-btn";
  musicBtn.title = "Toggle music";
  document.body.appendChild(musicBtn);

  let isMuted = false;
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isMuted = !isMuted;
    audio.muted = isMuted;
    musicBtn.innerHTML = isMuted ? "♫̸" : "♫";
    musicBtn.style.opacity = isMuted ? "0.4" : "1";
  });

});


// floating hearts 🌸
function createHeart() {

  const heart = document.createElement("div");

  heart.classList.add("heart");

  heart.innerHTML = "♡";

  heart.style.left = Math.random() * window.innerWidth + "px";

  heart.style.animationDuration =
    Math.random() * 3 + 2 + "s";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 800);
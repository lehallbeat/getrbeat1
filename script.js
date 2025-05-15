// ====================
// Barre de recherche
// ====================
function filterBeats() {
  applyFilters(); // ← Centralisé
}


// ====================
// Variables audio
// ====================
const audio = document.getElementById("mainAudio");
const playPauseBtn = document.getElementById("playPauseBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const timeDisplay = document.getElementById("timeDisplay");


const iconPlay = document.getElementById("iconPlay");
const iconPause = document.getElementById("iconPause");


// Fonction pour afficher l’icône
function toggleIcons(isPlaying) {
  iconPlay.style.opacity = isPlaying ? "0" : "1";
  iconPause.style.opacity = isPlaying ? "1" : "0";
}


// Bouton principal
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    toggleIcons(true);
  } else {
    audio.pause();
    toggleIcons(false);
  }
});


// Temps & progression
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;


  const mins = Math.floor(audio.currentTime / 60);
  const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${mins}:${secs}`;
});


// Barre de progression
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});


// Volume
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});


// ====================
// Clic sur une prod
// ====================
document.querySelectorAll(".beat").forEach(beat => {
  beat.addEventListener("click", (e) => {
    if (e.target.closest('.buy-button')) return;


    const src = beat.getAttribute("data-src");


    if (audio.src !== src) {
      audio.src = src;
      audio.load();
      audio.play();
      toggleIcons(true);
    } else {
      audio.currentTime = 0;
      audio.play();
      toggleIcons(true);
    }
  });
});


// ====================
// Filtres (style + mood)
// ====================
let selectedStyle = "all";
let selectedMood = "all";


const filterGroup = document.querySelector(".filter-group");
const filtersPanel = document.getElementById("filtersPanel");


filterGroup.addEventListener("click", () => {
  const isVisible = getComputedStyle(filtersPanel).display !== "none";
  filtersPanel.style.display = isVisible ? "none" : "flex";
});




document.getElementById('genreSelect').addEventListener('change', applyFilters);
document.getElementById('moodSelect').addEventListener('change', applyFilters);




// Gestion clics filtres
document.querySelectorAll(".filter-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const type = chip.dataset.type;
    const value = chip.dataset.value;


    // Active le bon chip
    document.querySelectorAll(`.filter-chip[data-type="${type}"]`).forEach(c => c.classList.remove("active"));
    chip.classList.add("active");


    if (type === "style") selectedStyle = value;
    if (type === "mood") selectedMood = value;


    applyFilters();
  });
});
















function applyFilters() {
  const beatList = document.querySelector('.beat-list');
  const searchFilter = document.getElementById('searchInput').value.toLowerCase();
  const selectedGenre = document.getElementById('genreSelect').value;
  const selectedMood = document.getElementById('moodSelect').value;
  const sortValue = document.getElementById('sortSelect').value;
  const noResult = document.getElementById('noResultMessage');


  let anyVisible = false;
  const allBeats = Array.from(beatList.querySelectorAll(".beat"));
  const visibleBeats = [];


  // Appliquer les filtres
  allBeats.forEach(beat => {
    const title = beat.querySelector(".beat-main-info h3").textContent.toLowerCase();
    const tags = beat.querySelector(".beat-music-info").textContent.toLowerCase();
    const style = beat.getAttribute("data-style");
    const mood = beat.getAttribute("data-mood");


    const matchSearch = title.includes(searchFilter) || tags.includes(searchFilter);
    const matchStyle = selectedGenre === "all" || style === selectedGenre;
    const matchMood = selectedMood === "all" || mood === selectedMood;


    const isVisible = matchSearch && matchStyle && matchMood;
    beat.style.display = isVisible ? "flex" : "none";


    if (isVisible) {
      visibleBeats.push(beat);
      anyVisible = true;
    }
  });


  noResult.style.display = anyVisible ? "none" : "block";


  // Tri uniquement sur les visibles
  if (sortValue === "newest" || sortValue === "oldest") {
    visibleBeats.sort((a, b) => {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);
      return sortValue === "newest" ? dateB - dateA : dateA - dateB;
    });
  }


  // Réorganise l'affichage sans créer de saut
  visibleBeats.forEach(beat => beatList.appendChild(beat));
}






























function toggleMobileMenu() {
  const menu = document.getElementById('mobileSlideMenu');
  menu.classList.toggle('active');
}










document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.details-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.licence-card');
      card.classList.toggle('expanded');
    });
  });
});












function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}




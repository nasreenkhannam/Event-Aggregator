 let allEvents = [];

// Load events from JSON
async function fetchEvents() {
  try {
    const res = await fetch("events.json");
    allEvents = await res.json();
    displayEvents(allEvents);
  } catch (err) {
    console.error("Failed to load events:", err);
  }
}

// Show events
function displayEvents(events) {
  const container = document.getElementById("events-container");
  container.innerHTML = "";

  if (events.length === 0) {
    container.innerHTML = "<p>No events found.</p>";
    return;
  }

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "event-card";

    let icon = "";
    if (event.type === "Tech") icon = `<i class="fas fa-microchip"></i>`;
    else if (event.type === "Cultural") icon = `<i class="fas fa-theater-masks"></i>`;
    else if (event.type === "Sports") icon = `<i class="fas fa-futbol"></i>`;

    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}" class="event-image" />
      <h2>${icon} ${event.title}</h2>
      <p><strong>Type:</strong> ${event.type}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p>${event.description}</p>
    `;
    container.appendChild(card);
  });
}

// Filter search + type
function filterEvents() {
  const type = document.getElementById("filter").value.toLowerCase();
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = allEvents.filter(event => {
    const matchType = type === "all" || event.type.toLowerCase() === type;
    const matchSearch = event.title.toLowerCase().includes(search);
    return matchType && matchSearch;
  });

  displayEvents(filtered);
}

// Save events
function saveEventsToLocal() {
  localStorage.setItem("campusEvents", JSON.stringify(allEvents));
}

// Load saved or fetch
function loadEventsFromLocal() {
  const saved = localStorage.getItem("campusEvents");
  if (saved) {
    allEvents = JSON.parse(saved);
    displayEvents(allEvents);
  } else {
    fetchEvents();
  }
}

// 🔄 Reset all
function resetEvents() {
  localStorage.removeItem("campusEvents");
  fetchEvents();
}

// 🌙 Toggle dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
}

// When page loads
window.addEventListener("DOMContentLoaded", () => {
  loadEventsFromLocal();
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

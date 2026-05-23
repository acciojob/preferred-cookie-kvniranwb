//your JS code here. If required.
// Get form elements
const form = document.querySelector("form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

// Function to set cookie
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Function to get cookie
function getCookie(name) {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();

    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

// Function to apply styles
function applyPreferences(fontSize, fontColor) {
  document.documentElement.style.setProperty(
    "--fontsize",
    `${fontSize}px`
  );

  document.documentElement.style.setProperty(
    "--fontcolor",
    fontColor
  );
}

// Load saved preferences on page load
window.addEventListener("load", () => {
  const savedFontSize = getCookie("fontsize");
  const savedFontColor = getCookie("fontcolor");

  if (savedFontSize) {
    fontSizeInput.value = savedFontSize;
  }

  if (savedFontColor) {
    fontColorInput.value = savedFontColor;
  }

  applyPreferences(
    savedFontSize || 16,
    savedFontColor || "#000000"
  );
});

// Save preferences
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fontSize = fontSizeInput.value;
  const fontColor = fontColorInput.value;

  // Save cookies
  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  // Apply styles immediately
  applyPreferences(fontSize, fontColor);
});
// Global variables
let htmlEditor, cssEditor, jsEditor;
let currentTheme = "light";
let templates = {};
let currentSnapshotEditor = "current";
let activeTab = "html";

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeEditors();
  createFlyingElements();
  loadFromLocal();
  setupEventListeners();
  initializeTemplates();

  // Hide loader after page loads
  setTimeout(() => {
    const loader = document.getElementById("loader");
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1000);
});

// Initialize CodeMirror editors
function initializeEditors() {
  htmlEditor = CodeMirror(document.getElementById("html-editor"), {
    mode: "htmlmixed",
    theme: "material-darker",
    lineNumbers: true,
    matchBrackets: true,
    styleActiveLine: true,
    value: getDefaultHTML(),
  });

  cssEditor = CodeMirror(document.getElementById("css-editor"), {
    mode: "css",
    theme: "material-darker",
    lineNumbers: true,
    matchBrackets: true,
    styleActiveLine: true,
    value: getDefaultCSS(),
  });

  jsEditor = CodeMirror(document.getElementById("js-editor"), {
    mode: "javascript",
    theme: "material-darker",
    lineNumbers: true,
    matchBrackets: true,
    styleActiveLine: true,
    value: getDefaultJS(),
  });
}

// Initialize code templates
function initializeTemplates() {
  templates = {
    basic: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Basic HTML Template</title>
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section>
      <h2>About Us</h2>
      <p>This is a simple HTML5 template to get you started.</p>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  background-color: #f4f4f4;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 20px;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li a:hover {
  color: #6d28d9;
}

main {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

footer {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
}`,
      js: `// Add your JavaScript here
document.addEventListener('DOMContentLoaded', function() {
  console.log('Document loaded and ready!');
  
  // Example: Change header color on click
  const header = document.querySelector('header');
  if (header) {
    header.addEventListener('click', function() {
      this.style.backgroundColor = getRandomColor();
    });
  }
  
  // Generate random color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});`,
    },
    flexbox: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flexbox Layout</title>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>Flexbox Layout Example</h1>
    </header>
    
    <div class="main-content">
      <nav class="sidebar">
        <h2>Navigation</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      
      <main class="content">
        <h2>Main Content</h2>
        <p>This is a responsive flexbox layout example. Resize the browser window to see how it adapts.</p>
        
        <div class="card-container">
          <div class="card">
            <h3>Card 1</h3>
            <p>This is a card with some content.</p>
          </div>
          <div class="card">
            <h3>Card 2</h3>
            <p>This is a card with some content.</p>
          </div>
          <div class="card">
            <h3>Card 3</h3>
            <p>This is a card with some content.</p>
          </div>
        </div>
      </main>
    </div>
    
    <footer class="footer">
      <p>&copy; 2023 Flexbox Layout. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  background-color: #6d28d9;
  color: white;
  padding: 20px;
  text-align: center;
}

.main-content {
  display: flex;
  flex: 1;
}

.sidebar {
  background-color: #f0e6ff;
  padding: 20px;
  width: 250px;
  flex-shrink: 0;
}

.sidebar h2 {
  margin-bottom: 15px;
  color: #6d28d9;
}

.sidebar ul {
  list-style: none;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.sidebar ul li a:hover {
  color: #6d28d9;
}

.content {
  flex: 1;
  padding: 20px;
}

.content h2 {
  margin-bottom: 15px;
  color: #6d28d9;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 250px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card h3 {
  margin-bottom: 10px;
  color: #6d28d9;
}

.footer {
  background-color: #6d28d9;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

/* Responsive design */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    margin-bottom: 20px;
  }
}`,
      js: `// Add your JavaScript here
document.addEventListener('DOMContentLoaded', function() {
  console.log('Flexbox layout loaded!');
  
  // Add click event to cards
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', function() {
      this.style.backgroundColor = '#f0e6ff';
      setTimeout(() => {
        this.style.backgroundColor = 'white';
      }, 300);
    });
  });
});`,
    },
    form: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form</title>
</head>
<body>
  <div class="container">
    <h1>Contact Us</h1>
    <p class="description">Fill out the form below to get in touch with us.</p>
    
    <form id="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name" required>
        <span class="error-message" id="name-error"></span>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your email" required>
        <span class="error-message" id="email-error"></span>
      </div>
      
      <div class="form-group">
        <label for="subject">Subject</label>
        <select id="subject" name="subject" required>
          <option value="" disabled selected>Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
        <span class="error-message" id="subject-error"></span>
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Your message" rows="5" required></textarea>
        <span class="error-message" id="message-error"></span>
      </div>
      
      <div class="form-group">
        <button type="submit" id="submit-btn">Send Message</button>
      </div>
    </form>
    
    <div id="success-message" class="hidden">
      <h2>Thank You!</h2>
      <p>Your message has been sent successfully. We'll get back to you soon.</p>
      <button id="send-another">Send Another Message</button>
    </div>
  </div>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 100%;
  max-width: 600px;
}

h1 {
  color: #6d28d9;
  margin-bottom: 10px;
  text-align: center;
}

.description {
  text-align: center;
  margin-bottom: 30px;
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus, select:focus, textarea:focus {
  border-color: #6d28d9;
  box-shadow: 0 0 0 3px rgba(109, 40, 217, 0.2);
  outline: none;
}

button {
  background-color: #6d28d9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
  width: 100%;
  font-weight: 600;
}

button:hover {
  background-color: #5b21b6;
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  margin-top: 5px;
  display: block;
}

.hidden {
  display: none;
}

#success-message {
  text-align: center;
}

#success-message h2 {
  color: #6d28d9;
  margin-bottom: 15px;
}

#success-message p {
  margin-bottom: 25px;
}

#send-another {
  background-color: #6c757d;
  margin-top: 15px;
}

#send-another:hover {
  background-color: #5a6268;
}

/* Form validation styles */
input.invalid, select.invalid, textarea.invalid {
  border-color: #ef4444;
}

input.valid, select.valid, textarea.valid {
  border-color: #10b981;
}`,
      js: `// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('success-message');
  const sendAnother = document.getElementById('send-another');
  
  // Validate form on submit
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset previous validation
    resetValidation();
    
    // Validate each field
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    if (!name.value.trim()) {
      showError(name, 'name-error', 'Name is required');
      isValid = false;
    } else if (name.value.trim().length < 2) {
      showError(name, 'name-error', 'Name must be at least 2 characters');
      isValid = false;
    } else {
      markValid(name);
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'email-error', 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, 'email-error', 'Please enter a valid email address');
      isValid = false;
    } else {
      markValid(email);
    }
    
    // Validate subject
    const subject = document.getElementById('subject');
    if (!subject.value) {
      showError(subject, 'subject-error', 'Please select a subject');
      isValid = false;
    } else {
      markValid(subject);
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError(message, 'message-error', 'Message is required');
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError(message, 'message-error', 'Message must be at least 10 characters');
      isValid = false;
    } else {
      markValid(message);
    }
    
    // If form is valid, submit it
    if (isValid) {
      // Simulate form submission
      const submitBtn = document.getElementById('submit-btn');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate server response delay
      setTimeout(function() {
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
      }, 1500);
    }
  });
  
  // Send another message button
  sendAnother.addEventListener('click', function() {
    form.reset();
    resetValidation();
    successMessage.classList.add('hidden');
    form.classList.remove('hidden');
  });
  
  // Helper functions
  function showError(input, errorId, message) {
    input.classList.add('invalid');
    document.getElementById(errorId).textContent = message;
  }
  
  function markValid(input) {
    input.classList.add('valid');
  }
  
  function resetValidation() {
    const inputs = form.querySelectorAll('input, select, textarea');
    const errorMessages = form.querySelectorAll('.error-message');
    
    inputs.forEach(input => {
      input.classList.remove('invalid', 'valid');
    });
    
    errorMessages.forEach(error => {
      error.textContent = '';
    });
  }
});`,
    },
  };

  // Add event listeners to template cards
  document.querySelectorAll(".template-card").forEach((card) => {
    card.addEventListener("click", () => {
      const templateName = card.getAttribute("data-template");
      if (templates[templateName]) {
        applyTemplate(templateName);
        document.getElementById("templates-modal").style.display = "none";
      }
    });
  });
}

// Apply selected template
function applyTemplate(templateName) {
  const template = templates[templateName];
  if (!template) return;

  if (confirm(`Are you sure you want to apply the ${templateName} template? This will replace your current code.`)) {
    htmlEditor.setValue(template.html);
    cssEditor.setValue(template.css);
    jsEditor.setValue(template.js);
    updatePreview();
    showNotification(
      `${templateName.charAt(0).toUpperCase() + templateName.slice(1)} template applied successfully!`,
      "success"
    );
  }
}

// Set up event listeners
function setupEventListeners() {
  // Set up event listeners for editors
  [htmlEditor, cssEditor, jsEditor].forEach((editor) => {
    editor.on("change", () => {
      saveToLocal();
      updatePreview();
    });
  });

  // Close modals when clicking the close button or outside the modal
  document.querySelectorAll(".close-modal").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const modalId = closeBtn.getAttribute("data-modal") || "snapshot-modal";
      document.getElementById(modalId).style.display = "none";
    });
  });

  window.addEventListener("click", (e) => {
    document.querySelectorAll(".modal").forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      switchTab(tabId);
    });
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Ctrl+S: Save to local storage
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      saveToLocal();
      showNotification("Code saved to local storage", "success");
    }

    // Ctrl+E: Export code
    if (e.ctrlKey && e.key === "e") {
      e.preventDefault();
      exportCode();
    }

    // Ctrl+R: Refresh preview
    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      refreshPreview();
    }

    // Ctrl+D: Toggle dark mode
    if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      toggleTheme();
    }

    // Number keys 1-4 for tab switching
    if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
      if (e.key === "1") {
        switchTab("html");
      } else if (e.key === "2") {
        switchTab("css");
      } else if (e.key === "3") {
        switchTab("js");
      } else if (e.key === "4") {
        switchTab("preview");
      }
    }
  });

  // Set up snapshot option buttons
  document.querySelectorAll(".snapshot-option").forEach((option) => {
    option.addEventListener("click", function () {
      document.querySelectorAll(".snapshot-option").forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      currentSnapshotEditor = this.getAttribute("data-editor");
      takeSnapshot();
    });
  });

  // Save snapshot as file
  document.getElementById("save-snapshot").addEventListener("click", () => {
    saveSnapshotAsFile();
  });
}

// Scroll to about section
function scrollToAbout() {
  document.getElementById("about-us-section").scrollIntoView({ behavior: "smooth" });
}

// Switch between tabs
function switchTab(tabId) {
  // Update active tab
  activeTab = tabId;

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((tab) => {
    if (tab.getAttribute("data-tab") === tabId) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    if (content.getAttribute("data-tab") === tabId) {
      content.classList.add("active");
    } else {
      content.classList.remove("active");
    }
  });

  // Refresh CodeMirror if switching to an editor tab
  if (tabId === "html") {
    htmlEditor.refresh();
  } else if (tabId === "css") {
    cssEditor.refresh();
  } else if (tabId === "js") {
    jsEditor.refresh();
  }
}

// Show templates modal
function showTemplatesModal() {
  document.getElementById("templates-modal").style.display = "block";
}

// Create flying elements (circles, squares, triangles)
function createFlyingElements() {
  const container = document.getElementById("flying-elements");
  const elementCount = 20;
  const types = ["circle", "square", "triangle"];

  for (let i = 0; i < elementCount; i++) {
    const element = document.createElement("div");
    const type = types[Math.floor(Math.random() * types.length)];
    element.classList.add("flying-element", type);

    // Random size between 20px and 100px
    const size = Math.random() * 80 + 20;

    if (type !== "triangle") {
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
    }

    // Random position
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;

    // Random animation delay and duration
    element.style.animationDelay = `${Math.random() * 10}s`;
    element.style.animationDuration = `${Math.random() * 20 + 10}s`;

    // Random rotation for non-circles
    if (type !== "circle") {
      element.style.transform = `rotate(${Math.random() * 360}deg)`;
    }

    container.appendChild(element);
  }

  // Create balloons
  const balloonCount = 10;
  const balloonColors = ["red", "blue", "purple", "yellow", "green"];

  for (let i = 0; i < balloonCount; i++) {
    const balloon = document.createElement("div");
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloon.classList.add("balloon", color);

    // Random position
    balloon.style.left = `${Math.random() * 100}%`;
    balloon.style.bottom = `-50px`;

    // Random animation delay and direction
    balloon.style.animationDelay = `${Math.random() * 15}s`;
    balloon.style.setProperty("--direction", Math.random() > 0.5 ? "1" : "-1");

    container.appendChild(balloon);
  }
}

// Update preview with current editor content
function updatePreview() {
  try {
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    const js = `<script>${jsEditor.getValue()}<\/script>`;
    const output = html + css + js;
    const iframe = document.getElementById("preview");
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(output);
    doc.close();
  } catch (error) {
    console.error("Error updating preview:", error);
    showNotification("Error updating preview", "error");
  }
}

// Force refresh the preview
function refreshPreview() {
  updatePreview();
  const refreshBtn = document.querySelector(".refresh-btn i");
  refreshBtn.classList.add("fa-spin");
  setTimeout(() => {
    refreshBtn.classList.remove("fa-spin");
  }, 1000);
  showNotification("Preview refreshed", "info");
}

// Save editor content to localStorage
function saveToLocal() {
  try {
    localStorage.setItem("html", htmlEditor.getValue());
    localStorage.setItem("css", cssEditor.getValue());
    localStorage.setItem("js", jsEditor.getValue());
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    localStorage.setItem("activeTab", activeTab);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    showNotification("Error saving your code", "error");
  }
}

// Load editor content from localStorage
function loadFromLocal() {
  try {
    if (localStorage.getItem("html")) {
      htmlEditor.setValue(localStorage.getItem("html"));
    }
    if (localStorage.getItem("css")) {
      cssEditor.setValue(localStorage.getItem("css"));
    }
    if (localStorage.getItem("js")) {
      jsEditor.setValue(localStorage.getItem("js"));
    }
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      currentTheme = "dark";
      document.getElementById("theme-icon").classList.remove("fa-moon");
      document.getElementById("theme-icon").classList.add("fa-sun");
    }
    if (localStorage.getItem("activeTab")) {
      switchTab(localStorage.getItem("activeTab"));
    }
    updatePreview();
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    showNotification("Error loading your saved code", "error");
  }
}

// Reset editors to default content
function resetEditors() {
  if (confirm("Are you sure you want to reset all editors? This will clear your current code.")) {
    try {
      htmlEditor.setValue(getDefaultHTML());
      cssEditor.setValue(getDefaultCSS());
      jsEditor.setValue(getDefaultJS());
      updatePreview();
      showNotification("Editors reset successfully", "success");
    } catch (error) {
      console.error("Error resetting editors:", error);
      showNotification("Error resetting editors", "error");
    }
  }
}

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle("dark");
  currentTheme = document.body.classList.contains("dark") ? "dark" : "light";

  // Update theme icon
  const themeIcon = document.getElementById("theme-icon");
  if (currentTheme === "dark") {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }

  saveToLocal();
  showNotification(`${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)} theme activated`, "info");
}

// Show notification
function showNotification(message, type = "info") {
  const notificationContainer = document.getElementById("notification-container");
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  let icon = "";
  switch (type) {
    case "success":
      icon = '<i class="fas fa-check-circle"></i>';
      break;
    case "error":
      icon = '<i class="fas fa-exclamation-circle"></i>';
      break;
    default:
      icon = '<i class="fas fa-info-circle"></i>';
  }

  notification.innerHTML = `${icon} <span>${message}</span>`;
  notificationContainer.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notificationContainer.removeChild(notification);
    }, 300);
  }, 3000);
}

// Export code as HTML file
function exportCode() {
  try {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const fullCode = html
      .replace("</head>", `<style>\n${css}\n</style>\n</head>`)
      .replace("</body>", `<script>\n${js}\n</script>\n</body>`);

    const blob = new Blob([fullCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "playground-export.html";
    a.click();
    URL.revokeObjectURL(url);

    showNotification("Code exported successfully!", "success");
  } catch (error) {
    console.error("Error exporting code:", error);
    showNotification("Error exporting code", "error");
  }
}

// Take a snapshot of the code
function takeSnapshot() {
  try {
    const modal = document.getElementById("snapshot-modal");
    const snapshotContainer = document.getElementById("snapshot-container");
    const downloadBtn = document.getElementById("download-snapshot");

    // Clear previous snapshots
    snapshotContainer.innerHTML = "";

    // Show loading indicator
    snapshotContainer.innerHTML =
      '<div style="padding: 20px; text-align: center;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary);"></i><p>Generating snapshot...</p></div>';

    // Show the modal if it's not already visible
    if (modal.style.display !== "block") {
      modal.style.display = "block";
      return; // Exit early, the user will click on an option
    }

    // Determine which editor to snapshot based on the selected option
    let editorToSnapshot;
    let editorName;

    if (currentSnapshotEditor === "html" || (currentSnapshotEditor === "current" && activeTab === "html")) {
      editorToSnapshot = document.querySelector("#html-editor .CodeMirror");
      editorName = "HTML";
    } else if (currentSnapshotEditor === "css" || (currentSnapshotEditor === "current" && activeTab === "css")) {
      editorToSnapshot = document.querySelector("#css-editor .CodeMirror");
      editorName = "CSS";
    } else if (currentSnapshotEditor === "js" || (currentSnapshotEditor === "current" && activeTab === "js")) {
      editorToSnapshot = document.querySelector("#js-editor .CodeMirror");
      editorName = "JavaScript";
    } else if (currentSnapshotEditor === "all") {
      // For "all editors" option, we'll create a combined snapshot
      const allEditorsContainer = document.createElement("div");
      allEditorsContainer.style.backgroundColor = document.body.classList.contains("dark") ? "#1e1e1e" : "#ffffff";
      allEditorsContainer.style.padding = "20px";
      allEditorsContainer.style.borderRadius = "10px";
      allEditorsContainer.style.width = "100%";
      allEditorsContainer.style.maxWidth = "1200px";
      allEditorsContainer.style.margin = "0 auto";

      // Create headers and clone editors
      const htmlHeader = document.createElement("div");
      htmlHeader.innerHTML = '<h3 style="color: #6d28d9; margin-bottom: 10px;"><i class="fab fa-html5"></i> HTML</h3>';
      allEditorsContainer.appendChild(htmlHeader);

      const htmlClone = htmlEditor.getWrapperElement().cloneNode(true);
      allEditorsContainer.appendChild(htmlClone);

      const cssHeader = document.createElement("div");
      cssHeader.innerHTML = '<h3 style="color: #6d28d9; margin: 20px 0 10px;"><i class="fab fa-css3-alt"></i> CSS</h3>';
      allEditorsContainer.appendChild(cssHeader);

      const cssClone = cssEditor.getWrapperElement().cloneNode(true);
      allEditorsContainer.appendChild(cssClone);

      const jsHeader = document.createElement("div");
      jsHeader.innerHTML = '<h3 style="color: #6d28d9; margin: 20px 0 10px;"><i class="fab fa-js"></i> JavaScript</h3>';
      allEditorsContainer.appendChild(jsHeader);

      const jsClone = jsEditor.getWrapperElement().cloneNode(true);
      allEditorsContainer.appendChild(jsClone);

      // Append to document temporarily
      document.body.appendChild(allEditorsContainer);

      editorToSnapshot = allEditorsContainer;
      editorName = "All-Editors";
    } else {
      // Default to HTML if none selected
      editorToSnapshot = document.querySelector("#html-editor .CodeMirror");
      editorName = "HTML";
    }

    // Take the snapshot using html2canvas
    html2canvas(editorToSnapshot, {
      scale: 2,
      backgroundColor: document.body.classList.contains("dark") ? "#1e1e1e" : "#ffffff",
      logging: false,
      useCORS: true,
      allowTaint: true,
    })
      .then((canvas) => {
        // Remove the temporary container if it was created
        if (currentSnapshotEditor === "all" && document.body.contains(editorToSnapshot)) {
          document.body.removeChild(editorToSnapshot);
        }

        // Clear loading indicator
        snapshotContainer.innerHTML = "";

        // Add the canvas to the container
        snapshotContainer.appendChild(canvas);

        // Set up download button
        downloadBtn.onclick = () => {
          const image = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          a.href = image;
          a.download = `${editorName.toLowerCase()}-snapshot-${new Date().toISOString().slice(0, 10)}.png`;
          a.click();
          showNotification("Snapshot downloaded", "success");
        };
      })
      .catch((err) => {
        // Remove the temporary container if it was created
        if (currentSnapshotEditor === "all" && document.body.contains(editorToSnapshot)) {
          document.body.removeChild(editorToSnapshot);
        }

        snapshotContainer.innerHTML = `<p style="color: red;">Error generating snapshot: ${err.message}</p>`;
        console.error("Error taking snapshot:", err);
        showNotification("Error generating snapshot", "error");
      });
  } catch (error) {
    console.error("Error in takeSnapshot function:", error);
    showNotification("Error taking snapshot", "error");
  }
}

// Save snapshot as file
function saveSnapshotAsFile() {
  try {
    const snapshotContainer = document.getElementById("snapshot-container");
    const canvas = snapshotContainer.querySelector("canvas");

    if (!canvas) {
      showNotification("No snapshot to save", "error");
      return;
    }

    // Get the code content based on current snapshot type
    let codeContent = "";
    let fileName = "";

    if (currentSnapshotEditor === "html" || (currentSnapshotEditor === "current" && activeTab === "html")) {
      codeContent = htmlEditor.getValue();
      fileName = "snapshot-html.html";
    } else if (currentSnapshotEditor === "css" || (currentSnapshotEditor === "current" && activeTab === "css")) {
      codeContent = cssEditor.getValue();
      fileName = "snapshot-css.css";
    } else if (currentSnapshotEditor === "js" || (currentSnapshotEditor === "current" && activeTab === "js")) {
      codeContent = jsEditor.getValue();
      fileName = "snapshot-js.js";
    } else if (currentSnapshotEditor === "all") {
      codeContent = `<!-- HTML -->\n${htmlEditor.getValue()}\n\n/* CSS */\n${cssEditor.getValue()}\n\n// JavaScript\n${jsEditor.getValue()}`;
      fileName = "snapshot-all.txt";
    }

    const blob = new Blob([codeContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);

    showNotification("Code file saved successfully", "success");
  } catch (error) {
    console.error("Error saving snapshot as file:", error);
    showNotification("Error saving code file", "error");
  }
}

// Default HTML content
function getDefaultHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Playground</title>
</head>
<body>
  <div class="container">
    <h1>Welcome to the Playground</h1>
    <p>Start typing your HTML here!</p>
    
    <div class="card">
      <h2>HTML, CSS & JavaScript</h2>
      <p>Build amazing web experiences!</p>
      <button id="demo-btn">Click Me</button>
    </div>
  </div>
</body>
</html>`;
}

// Default CSS content
function getDefaultCSS() {
  return `body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f4f4;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #6d28d9;
  text-align: center;
  margin-bottom: 1.5rem;
}

button {
  background-color: #6d28d9;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 15px;
}

button:hover {
  background-color: #5b21b6;
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  margin-top: 30px;
  text-align: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card h2 {
  color: #6d28d9;
  margin-top: 0;
}`;
}

// Default JavaScript content
function getDefaultJS() {
  return `// JavaScript code goes here
document.addEventListener('DOMContentLoaded', function() {
  // Get the button element
  const demoBtn = document.getElementById('demo-btn');
  
  // Add click event listener
  demoBtn.addEventListener('click', function() {
    alert('Hello from the Playground!');
    
    // Create a dynamic element
    const newElement = document.createElement('div');
    newElement.textContent = 'Button was clicked!';
    newElement.style.padding = '10px';
    newElement.style.margin = '10px 0';
    newElement.style.backgroundColor = '#6d28d9';
    newElement.style.color = 'white';
    newElement.style.borderRadius = '5px';
    
    // Add it to the page
    document.querySelector('.container').appendChild(newElement);
  });

  // Log a message to the console
  console.log('Script loaded successfully!');

  // Add a simple animation to the card
  const card = document.querySelector('.card');
  if (card) {
    card.addEventListener('mouseover', function() {
      this.style.backgroundColor = '#f0e6ff';
    });
    
    card.addEventListener('mouseout', function() {
      this.style.backgroundColor = 'white';
    });
  }
});`;
}
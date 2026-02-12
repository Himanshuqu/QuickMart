// API Base URL
const API_URL = "http://localhost:3000";

// Show login form
function showLoginForm() {
    document.getElementById("loginContainer").classList.add("active");
    document.getElementById("signupContainer").classList.remove("active");
}

// Show signup form
function showSignupForm() {
    document.getElementById("loginContainer").classList.remove("active");
    document.getElementById("signupContainer").classList.add("active");
}

// Generate unique ID
function generateShortId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Show message
function showMessage(message, type = "error", containerId = "loginContainer") {
    const container = document.getElementById(containerId);
    let messageEl = container.querySelector(".message");
    
    if (!messageEl) {
        messageEl = document.createElement("div");
        messageEl.className = "message";
        container.querySelector("form").insertAdjacentElement("beforebegin", messageEl);
    }
    
    messageEl.textContent = message;
    messageEl.className = `message ${type}`;
    
    if (type === "success") {
        setTimeout(() => {
            messageEl.style.display = "none";
        }, 2000);
    }
}

// Initialize
window.addEventListener("DOMContentLoaded", () => {
    showLoginForm();
    setupLoginForm();
    setupSignupForm();
    setupFormToggle();
});

// Setup Login Form
function setupLoginForm() {
    const loginForm = document.getElementById("loginForm");
    
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            showMessage("Please fill in all fields", "error", "loginContainer");
            return;
        }

        try {
            // Fetch users from backend
            const response = await fetch(`${API_URL}/users`);
            
            if (!response.ok) {
                throw new Error("Failed to connect to server");
            }

            const users = await response.json();
            
            // Find matching user
            const user = users.find(
                (u) => u.email === email && u.password === password
            );

            if (!user) {
                showMessage("Invalid email or password", "error", "loginContainer");
                return;
            }

            // Save user to localStorage
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            showMessage("Login successful!", "success", "loginContainer");
            
            // Redirect to home page
            setTimeout(() => {
                window.location.href = "src/Home/home.html";
            }, 1500);

        } catch (error) {
            console.error("Login error:", error);
            showMessage("Server connection error. Make sure backend is running on port 3000.", "error", "loginContainer");
        }
    });
}

// Setup Signup Form
function setupSignupForm() {
    const signupForm = document.getElementById("signupForm");
    
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullname = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value.trim();
        const confirmPassword = document.getElementById("signup-confirm").value.trim();

        // Validation
        if (!fullname || !email || !password || !confirmPassword) {
            showMessage("Please fill in all fields", "error", "signupContainer");
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Passwords do not match", "error", "signupContainer");
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters", "error", "signupContainer");
            return;
        }

        try {
            // Check if user already exists
            const response = await fetch(`${API_URL}/users`);
            
            if (!response.ok) {
                throw new Error("Failed to connect to server");
            }

            const users = await response.json();
            
            const userExists = users.some((u) => u.email === email);

            if (userExists) {
                showMessage("Email already registered", "error", "signupContainer");
                return;
            }

            // Create new user
            const createResponse = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: generateShortId(),
                    fullname,
                    email,
                    password,
                    createdAt: new Date().toLocaleString(),
                }),
            });

            if (!createResponse.ok) {
                throw new Error("Failed to create account");
            }

            showMessage("Account created successfully! Redirecting to login...", "success", "signupContainer");
            
            // Clear form
            signupForm.reset();
            
            // Redirect to login
            setTimeout(() => {
                showLoginForm();
                document.getElementById("loginForm").reset();
            }, 2000);

        } catch (error) {
            console.error("Signup error:", error);
            showMessage("Server connection error. Make sure backend is running on port 3000.", "error", "signupContainer");
        }
    });
}

// Setup Form Toggle
function setupFormToggle() {
    const signupLink = document.getElementById("signupLink");
    const loginLink = document.getElementById("loginLink");

    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        showSignupForm();
    });

    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        showLoginForm();
    });
}

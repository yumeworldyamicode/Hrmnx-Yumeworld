import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOyi9JvF1QXdcLY3PiQbkOYf0ksYjkCzI",
  authDomain: "yumeworldyami.net",
  projectId: "yumeworldyami",
  storageBucket: "yumeworldyami.firebasestorage.app",
  messagingSenderId: "612002285332",
  appId: "1:612002285332:web:6ed32c3689461e22856401"
};

// Initialize Firebase
console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Get DOM Elements
const googleBtn = document.getElementById('google-btn');
const signupForm = document.getElementById('signup-form');
const messageText = document.getElementById('message');

// --- GOOGLE SIGN UP LOGIC ---
if (googleBtn) {
    console.log("Google button found in HTML. Event listener attached.");
    googleBtn.addEventListener('click', () => {
        console.log("Google button clicked! Attempting to open popup...");
        
        messageText.style.color = "blue";
        messageText.textContent = "Opening Google login...";

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                console.log("Google Sign-In Success:", user);
                messageText.style.color = "green";
                messageText.textContent = `Google Account connected! Welcome ${user.displayName || user.email}`;
            })
            .catch((error) => {
                console.error("Google Sign-In Error Code:", error.code);
                console.error("Google Sign-In Full Error:", error.message);
                messageText.style.color = "red";
                messageText.textContent = `Google Error: ${error.message}`;
            });
    });
} else {
    console.error("ERROR: Could not find an element with id='google-btn' in your HTML!");
}

// --- EMAIL/PASSWORD SIGN UP LOGIC ---
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        messageText.style.color = "blue";
        messageText.textContent = "Creating account...";

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Email Sign-Up Success:", user);
                messageText.style.color = "green";
                messageText.textContent = `Account created successfully! Welcome ${user.email}`;
                signupForm.reset();
            })
            .catch((error) => {
                console.error("Email Sign-Up Error:", error);
                messageText.style.color = "red";
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        messageText.textContent = "This email is already registered.";
                        break;
                    case 'auth/invalid-email':
                        messageText.textContent = "Please enter a valid email address.";
                        break;
                    case 'auth/weak-password':
                        messageText.textContent = "Password must be at least 6 characters long.";
                        break;
                    default:
                        messageText.textContent = error.message;
                }
            });
    });
}

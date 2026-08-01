import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOyi9JvF1QXdcLY3PiQbkOYf0ksYjkCzI",
  authDomain: "://firebaseapp.com",
  projectId: "yumeworldyami",
  storageBucket: "yumeworldyami.firebasestorage.app",
  messagingSenderId: "612002285332",
  appId: "1:612002285332:web:6ed32c3689461e22856401"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// --- DOM ELEMENTS FOR LOG IN ---
const loginForm = document.getElementById('login-form');
const loginMessageText = document.getElementById('login-message');
const googleLoginBtn = document.getElementById('google-login-btn');

// --- GOOGLE LOG IN LOGIC ---
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
        loginMessageText.style.color = "blue";
        loginMessageText.textContent = "Opening Google login...";

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                loginMessageText.style.color = "green";
                loginMessageText.textContent = `Logged in! Welcome back, ${result.user.displayName || result.user.email}`;
            })
            .catch((error) => {
                loginMessageText.style.color = "red";
                loginMessageText.textContent = `Google Error: ${error.message}`;
            });
    });
}

// --- EMAIL/PASSWORD LOG IN LOGIC ---
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        loginMessageText.style.color = "blue";
        loginMessageText.textContent = "Logging in...";

        // Firebase Sign In Function
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                loginMessageText.style.color = "green";
                loginMessageText.textContent = `Successfully logged in! Welcome back ${user.email}`;
                loginForm.reset();
            })
            .catch((error) => {
                console.error("Login Error:", error.code);
                loginMessageText.style.color = "red";
                switch (error.code) {
                    case 'auth/invalid-credential':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        loginMessageText.textContent = "Incorrect email or password.";
                        break;
                    case 'auth/invalid-email':
                        loginMessageText.textContent = "Please enter a valid email address.";
                        break;
                    default:
                        loginMessageText.textContent = error.message;
                }
            });
    });
}

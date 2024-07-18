document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const homeContainer = document.querySelector(".home-container");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const emailError = document.getElementById("loginEmailError");
            const passwordError = document.getElementById("loginPasswordError");
            const user = JSON.parse(localStorage.getItem(email));

            emailError.textContent = "";
            passwordError.textContent = "";

            if (!user || user.password !== password) {
                if (!user) {
                    emailError.textContent = "*Email not found.";
                } else {
                    passwordError.textContent = "*Incorrect password.";
                }
            } else {
                sessionStorage.setItem("loggedInUser", user.username);
                window.location.href = "home.html";
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("signupUsername").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const usernameError = document.getElementById("usernameError");
            const emailError = document.getElementById("emailError");
            const passwordError = document.getElementById("passwordError");
            const confirmPasswordError = document.getElementById("confirmPasswordError");

           
            usernameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";

          
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

            if (!passwordPattern.test(password)) {
                passwordError.textContent = "*Password must contain at least one uppercase letter, one lowercase letter, and one special character.";
                return;
            }

            if (password !== confirmPassword) {
                confirmPasswordError.textContent = "*Passwords do not match. Please try again.";
                return;
            }

            if (localStorage.getItem(email)) {
                emailError.textContent = "*Email already exists. Please choose another one.";
            } else {
                const user = { username, email, password };
                localStorage.setItem(email, JSON.stringify(user));
               
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            }
        });
    }

    if (homeContainer) {
        const loggedInUser = sessionStorage.getItem("loggedInUser");

        if (!loggedInUser) {
            window.location.href = "index.html";
        } else {
            document.getElementById("username").textContent = loggedInUser;
            document.getElementById("logoutBtn").addEventListener("click", () => {
                sessionStorage.removeItem("loggedInUser");
                window.location.href = "index.html";
            });
        }
    }
});

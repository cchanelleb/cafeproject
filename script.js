/**
 * Author: [Your Full Name]
 * Course: [Course Name]
 * Quarter: [Current Quarter]
 * Description: This script manages the administrative dashboard of a coffee shop website. 
 * It handles user authentication via AJAX requests, session management, and allows logged-in users 
 * to add menu items through a form submission.
 */

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const foodMenuForm = document.getElementById("foodmenu-form");
    const logoutButton = document.getElementById("logout-button");
    const menuUrl = "https://ict4510.herokuapp.com/api/menus"; 


    function checkLoginStatus() {
        const user = sessionStorage.getItem("user");
        if (user) {
            loginForm.style.display = "none";
            foodMenuForm.style.display = "block";
            logoutButton.style.display = "block";
        } else {
            loginForm.style.display = "block";
            foodMenuForm.style.display = "none";
            logoutButton.style.display = "none";
        }
    }
    foodMenuForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user) return;
        
        const item = document.getElementById("item").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        
        fetch(`${menuUrl}/menus?api_key=${user.api_key}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": user.session_token
            },
            body: JSON.stringify({ item, description, price })
        })
        .then(response => {
            if (response.status === 201) {
                alert("Menu item added successfully!");
                menuForm.reset();
            } else {
                alert("Failed to add menu item");
            }
        })
        .catch(error => console.error("Error:", error));
    });

checkLoginStatus();


    // Ensure this is inside the first DOMContentLoaded
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log("Username:", username);
        console.log("Password:", password); // Debugging line

        console.log("Sending data:", JSON.stringify({ username, password }));


        try {
            const response = await fetch("https://ict4510.herokuapp.com/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const user = await response.json();
            sessionStorage.setItem("user", JSON.stringify(user));

            console.log("Login successful!", user);
            showDashboard(); // Call showDashboard() after login

        } catch (error) {
            console.error("Error:", error.message);
        }
    });

    function showDashboard() {
        loginForm.style.display = "none";
        logoutButton.style.display = "block";
    foodMenuFormmenuForm.style.display = "block";
    }

    function hideDashboard() {
        loginForm.style.display = "block";
        logoutButton.style.display = "none";
        foodMenuForm.style.display = "none";
    }

    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("user");
        hideDashboard();
    });

    checkLoginStatus();
});

    
        


   


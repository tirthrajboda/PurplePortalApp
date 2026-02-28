// Function to toggle sections
function showSection(id) {
    document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.form-card').forEach(f => f.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Handle Sign Up logic
document.getElementById('regForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    handleSignUp();
});

function handleSignUp() {
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value;
    const confirmPass = document.getElementById('confirm-pass').value;

    if(localStorage.getItem(username)) {
        return alert("Username already exists. Please choose another.");
    }

    if(pass !== confirmPass) {
        return alert("Passwords do not match!");
    }

    const userData = { firstName, lastName, email, username, pass };
    localStorage.setItem(username, JSON.stringify(userData));
    
    alert("Thank you for Registering");
    
    document.getElementById('regForm').reset();
    showSection('login-form');
}

// Handle User Login
function handleLogin() {
    const userIn = document.getElementById('login-user').value;
    const passIn = document.getElementById('login-pass').value;
    const storedData = localStorage.getItem(userIn);
    
    if (storedData) {
        const userObj = JSON.parse(storedData);
        if (userObj.pass === passIn) {
            document.getElementById('welcome-text').innerText = `Your Welcome, ${userObj.firstName}!`;
            showSection('welcome-page');
        } else { alert("Incorrect Password"); }
    } else { alert("User not found"); }
}

// Handle Admin Login
function handleAdminLogin() {
    const u = document.getElementById('admin-user').value;
    const p = document.getElementById('admin-pass').value;
    if (u === "tirthraj" && p === "Ridhaan") {
        renderUserTable();
        showSection('admin-dashboard');
    } else { alert("Unauthorized!"); }
}

// Render Admin Table
function renderUserTable() {
    const tbody = document.getElementById('user-table-body');
    tbody.innerHTML = "";
    for (let i = 0; i < localStorage.length; i++) {
        try {
            const data = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if (data && data.username) {
                tbody.innerHTML += `<tr>
                    <td>${data.firstName}</td><td>${data.lastName}</td>
                    <td>${data.email}</td><td>${data.username}</td><td>${data.pass}</td>
                </tr>`;
            }
        } catch(e) {}
    }
}

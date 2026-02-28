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
function handleCancel() {
    // Clears the form fields
    document.getElementById('regForm').reset();
    // Takes the user back to the Home/Hero screen
    showSection('hero');
}

// Global arrays to hold session data (resets on refresh)
let customers = [];
let accounts = [];

// UPDATE your existing handleLogin function
function handleLogin() {
    const u = document.getElementById('login-user').value;
    const p = document.getElementById('login-pass').value;
    const d = JSON.parse(localStorage.getItem(u));
    
    if (d && d.pass === p) {
        document.getElementById('dashboard-welcome').innerText = `Welcome, ${d.firstName}!`;
        showSection('user-dashboard'); // Changed from welcome-page
    } else { alert("Invalid credentials"); }
}

// NEW functions for Customer and Account
function saveCustomer() {
    const name = document.getElementById('cust-name').value;
    const phone = document.getElementById('cust-phone').value;
    if(!name) return alert("Enter name");
    
    customers.push({name, phone});
    alert("Customer Added!");
    document.getElementById('cust-name').value = "";
    document.getElementById('cust-phone').value = "";
    showSection('user-dashboard');
}

function saveAccount() {
    const type = document.getElementById('acc-type').value;
    const bal = document.getElementById('acc-balance').value;
    if(!type) return alert("Enter type");

    accounts.push({type, bal});
    alert("Account Added!");
    document.getElementById('acc-type').value = "";
    document.getElementById('acc-balance').value = "";
    showSection('user-dashboard');
}

function generateReport() {
    const reportDiv = document.getElementById('report-content');
    let html = `<h3>Total Customers: ${customers.length}</h3><ul>`;
    customers.forEach(c => html += `<li>${c.name} - ${c.phone}</li>`);
    html += `</ul><h3>Total Accounts: ${accounts.length}</h3><ul>`;
    accounts.forEach(a => html += `<li>${a.type}: $${a.bal}</li>`);
    html += `</ul>`;
    
    reportDiv.innerHTML = html;
    showSection('report-page');
}

let userss = JSON.parse(localStorage.getItem('userss')) || [];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Find the user with the matching email and password
    var user = userss.find(function(user) {
        return user.email === email && user.password === password;
    });

    // If a matching user is found or the inputs are 'admin', allow login
    if (user || (email === 'admin' && password === 'admin')) {
        alert('Logged in successfully');
    } else {
        alert('Invalid credentials');
    }
});

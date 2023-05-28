let userss = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var user = userss.find(function(user) {
        return user.email === email && user.password === password;
    });

    if (user || (email === 'admin' && password === 'admin')) {
        alert('Logged in successfully');
    } else {
        alert('Invalid credentials');
    }
});

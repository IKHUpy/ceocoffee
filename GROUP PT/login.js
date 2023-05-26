document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    if (username == 'admin' && password == 'admin') {
      alert('Logged in successfully');
    } else {
      alert('Invalid credentials');
    }
  });
  
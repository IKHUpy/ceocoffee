let user = JSON.parse(localStorage.getItem('user')) || [];
  document.getElementById('registeruser').addEventListener('click', function (event){
    let fullname = document.getElementById('fullname').value;
    let password = document.getElementById('password').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let zip = document.getElementById('zip').value;
    let cardnumber = document.getElementById('cardnumber').value;
    let valid = document.getElementById('valid').value;
    let cvv = document.getElementById('cvv').value;
    if (fullname && password && address && city && phone && email && zip && cardnumber && valid && cvv){
      
    } else {
      alert('Please fill up the empty spaces, they are all REQUIRED');
    }

  });
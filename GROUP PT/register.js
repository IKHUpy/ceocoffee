let userss = JSON.parse(localStorage.getItem('users')) || [];

  document.getElementById('registeruser').addEventListener('click', function (event){
    event.preventDefault();
    if (document.getElementById('fullname').value && document.getElementById('password').value &&
    document.getElementById('address').value && document.getElementById('city').value && 
    document.getElementById('phone').value && document.getElementById('email').value&&
    document.getElementById('zip').value && document.getElementById('cardnumber').value &&
    document.getElementById('valid').value &&  document.getElementById('cvv').value
    ){
      fetch('users.json')
      .then(response => response.json())
      .then(data=>{
        
        let i = 0;
        let idFound = false;
        if (data !== null){
          while (!idFound) {
              idFound = true;
              data.users.forEach(user1 => {
                  if (user1.id === i) {
                      idFound = false;
                  }
              });
              if (!idFound) {
                  i++;
              }
          }
        }
        let newdata = {
          id: i,
          password: document.getElementById('password').value,
          email: document.getElementById('email').value,
          fullname: document.getElementById('fullname').value,
          address: document.getElementById('address').value,
          city: document.getElementById('city').value,
          phone: document.getElementById('phone').value,
          zipcode: document.getElementById('zip').value,
          cardnumber: document.getElementById('cardnumber').value,
          validthru: document.getElementById('valid').value,
          ccv: document.getElementById('cvv').value
        };
        userss.push(newdata);
        localStorage.setItem('users', JSON.stringify(userss));
        alert('Congratulations! You are sucessfully register!')
        window.location.href = '/login.html';
        })
      
    } else {
      alert('Please fill up the empty spaces, they are all REQUIRED')
    }

  });
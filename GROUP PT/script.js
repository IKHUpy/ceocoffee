const faqs = document.querySelectorAll('.faq-container');

    faqs.forEach(faq => {
      const question = faq.querySelector('.question');
      const answer = faq.querySelector('.answer');

      question.addEventListener('click', function() {
        faqs.forEach(otherFaq => {
          if (otherFaq !== faq) {
            otherFaq.classList.remove('active');
            otherFaq.querySelector('.answer').classList.remove('show');
          }
        });
        faq.classList.toggle('active');
        answer.classList.toggle('show');
      });
    });

    document.getElementById('registerForm').addEventListener('submit', function(event) {
      event.preventDefault();
    
      var fullname = document.getElementById('fullname').value;
      var address = document.getElementById('address').value;
      var city = document.getElementById('city').value;
      var phone = document.getElementById('phone').value;
      var email = document.getElementById('email').value;
      var zip = document.getElementById('zip').value;
      var cardnumber = document.getElementById('cardnumber').value;
      var valid = document.getElementById('valid').value;
      var cvv = document.getElementById('cvv').value;
  
      alert('Form submitted. Check your console for form data');
      console.log({
          fullname,
          address,
          city,
          phone,
          email,
          zip,
          cardnumber,
          valid,
          cvv,
      });
  });
  
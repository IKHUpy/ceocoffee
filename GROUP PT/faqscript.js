document.addEventListener('DOMContentLoaded', () => {
    const faqButton = document.querySelector('.faq-button');
    const notification = document.querySelector('.notification');
    faqButton.addEventListener('click', () => {
      notification.classList.add('show');
      setTimeout(() => {
        notification.classList.remove('show');
      }, 3000); // Remove the notification after 3 seconds
    });
  });
  
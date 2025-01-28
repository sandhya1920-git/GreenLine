document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('email');
  const messageDiv = document.getElementById('form-message');

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (email) {
      storeEmail(email);
      messageDiv.innerHTML = 'Thank you for subscribing!';
      emailInput.value = ''; 
    } else {
      messageDiv.innerHTML = 'Please enter a valid email address.';
    }
  });

  function storeEmail(email) {
    const emailList = JSON.parse(localStorage.getItem('emailList')) || [];
    emailList.push(email);
    localStorage.setItem('emailList', JSON.stringify(emailList));
    console.log('Stored emails:', emailList);
  }
});

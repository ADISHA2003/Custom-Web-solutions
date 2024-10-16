document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');

        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

  // Function to update the visitor count
  function updateVisitorCount() {
    fetch('/api/count')
      .then(response => response.json())
      .then(data => {
        // Extract the visitorCount value from the JSON response
        document.getElementById('visitor-count').textContent = data.visitorCount; 
      });
  }

  // Call the function to initially display the count
  updateVisitorCount();
});

function submitForm(event) {
    event.preventDefault();

    const nameField = document.querySelector('input[type="text"]');
    // const genderValue = document.querySelector('input[name="gender"]:checked').value;
    const mobileNumber = document.querySelector('input[type="tel"]');
    const emailField = document.querySelector('input[type="email"]');
    // const appointmentDate = document.querySelector('input[type="date"]');
    const messageField = document.querySelector('textarea');

    const name = encodeURIComponent(nameField.value);
    // const gender = encodeURIComponent(genderValue);
    const number = encodeURIComponent(mobileNumber.value);
    const email = encodeURIComponent(emailField.value);
    // const date = encodeURIComponent(appointmentDate.value);
    const message = encodeURIComponent(messageField.value);

    const whatsappMessage = `Name: ${name}%0AMobile No.: ${number}%0AEmail: ${email}%0AMessage: ${message}`;

    window.open(`https://api.whatsapp.com/send?phone=9289665096&text=${whatsappMessage}`, '_blank');
}
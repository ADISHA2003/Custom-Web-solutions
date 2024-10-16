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

    // Function to update the visitor count (fetch the initial count)
  function updateVisitorCount() {
    fetch('/api/count')
      .then(response => response.json())
      .then(data => {
        document.getElementById('visitor-count').textContent = data.visitorCount;
      });
  }

  // Function to increment the count (call this on page load or other events)
  function incrementVisitorCount() {
    fetch('/api/count', { method: 'POST' })
      .then(() => {
        // Update the displayed count after incrementing
        updateVisitorCount();
      });
  }

  // Call the functions appropriately:
  
  // Get the initial count on page load
  updateVisitorCount();

  // Increment the count on page load (if you want to count every page view)
  incrementVisitorCount();
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
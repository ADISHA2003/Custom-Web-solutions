    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("scrollToTopBtn").classList.add("show");
        } else {
            document.getElementById("scrollToTopBtn").classList.remove("show");
        }
    }

    function scrollToTop() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, Opera and Edge
    }

// Set the scroll behavior to smooth
window.scrollToTop({
  top: 0,
  behavior: 'smooth'
 });
// Tab functionality for About section
function opentab(tabname, event) {
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");
    
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active-link");
    }
    
    for (var i = 0; i < tabcontents.length; i++) {
        tabcontents[i].classList.remove("active-tab");
    }
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Form submission to Google Sheets
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = document.getElementById('submitBtn');
            const formStatus = document.getElementById('formStatus');
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';
            formStatus.innerText = '';
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Replace with your actual Google Apps Script Web App URL
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxfUqL5TGjsmdgmxh1Ko0hf-x-kS_c8jvCGytKrTvGZZdjO1kxhqKZjr7SpR4fHg-k/exec';
            
            // Create form data object
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);
            
            // Send data to Google Sheet
            fetch(scriptURL, { 
                method: 'POST', 
                body: formData,
                mode: 'no-cors' // Add this to prevent CORS issues
            })
            .then(response => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Submit';
                formStatus.innerText = 'Message sent successfully!';
                formStatus.style.color = '#00CEC9';
                contactForm.reset();
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Submit';
                formStatus.innerText = 'Something went wrong. Please try again.';
                formStatus.style.color = '#FF6B6B';
                console.error('Error!', error.message);
            });
        });
    }
    
    // Add scroll reveal animation
    window.addEventListener('scroll', revealOnScroll);
    
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal');
        
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    }
    
    // Trigger initial scroll reveal
    revealOnScroll();
});

// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('show');
}
const imageContainer = document.querySelector(".main--hero");

    // Set the background image using JavaScript
    imageContainer.style.backgroundImage = "url('./assets/dbdfc26503d1b6150202f1563142a02a.jpg')";
    imageContainer.style.backgroundSize = "100%";
    
function validateSignup () {
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const userName = generateUsername(firstName, lastName);
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    // Perform additional validation if needed

    // If all validation passes, you can submit the form or perform other actions
    alert("Signup successful!");
     // Redirect to the desired page (replace 'dashboard.html' with the actual page URL)
     //window.location.href = 'dashboard.html';
    return 'dashboard.html'
}
const menu = document.querySelector('.header--nav--menu');
const menuBtn = document.querySelector('.header--nav--menu--btn');
let showMenu = false;

menu.addEventListener('click', toggleMenu);
function toggleMenu() {
    if (!showMenu) {
        menuBtn.classList.add('open');
        shownMenu = True;
    } else {
        menuBtn.classList.remove('open');

        showMenu = false;
    }
}
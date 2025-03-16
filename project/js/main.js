// check if there is local storage color option


let mainColors = localStorage.getItem("color-option");


if (mainColors !== null) {
    // console.log("Local storage is not empty, you can set it on root now");
    // console.log(localStorage.getItem("color-option"));

    document.documentElement.style.setProperty('--main-color', mainColors);

    // remove active class from all colors list item (li)
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // add active class on element with data color === local storage item
        if (element.dataset.color === mainColors) {
            // add active class
            element.classList.add("active");
        }
    });


}


// random background option

let backgroundOption = true;


// variable to control the background interval

let backgroundInterval;


// check if there's local storage background item

let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is empty

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    // remove active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}


// toggle spin class on icon


document.querySelector(".toggle-settings i").onclick = function () {
    // toggle class fa-spin on rotation on self
    this.classList.toggle("fa-spin");

    // toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open");
}


// switch colors


const colorsLi = document.querySelectorAll(".colors-list li");

    // loop on all list items (li)

colorsLi.forEach(li => {
    // click on every list items (li)
    li.addEventListener("click", (e) => {
        // set color on root
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        // set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        handleActive(e);
    });
});


// switch random background option


const randomBackEl = document.querySelectorAll(".random-backgrounds span");

    // loop on all spans

randomBackEl.forEach(span => {
    // click on every span
    span.addEventListener("click", (e) => {

        handleActive(e);

        if (e.target.dataset.background === "yes") {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;

            clearInterval(backgroundInterval);
            
            localStorage.setItem("background_option", false);
        }
    });
});


// select landing page element


let landingPage = document.querySelector(".landing-page");


// get array of images


let imagesArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];


// function to randomize images

function randomizeImgs() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            // get random number

            let randomNumber = Math.floor(Math.random() * imagesArr.length);

            // change background image url

            landingPage.style.backgroundImage = 'url("images/' + imagesArr[randomNumber] +'")';
        }, 1000);
    }
}

randomizeImgs();


// select skills selector

let ourSkills = document.querySelector(".skills");

// window.onscroll = function () {
//     // skills offset top

//     let skillsOffsetTop = ourSkills.offsetTop;

//     // skills outer height

//     let skillsOuterHeight = ourSkills.offsetHeight;

//     // window height                                                                             // didn't work

//     let windowHeight = this.innerHeight;

//     // window scroll top

//     let windowScrollTop = this.scrollY;

//     if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
//         this.console.log("skills section reached")
//     }
// }

window.onscroll = function () {
    // skills offset top

    let skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height

    let skillsOuterHeight = ourSkills.offsetHeight;

    // window height

    let windowHeight = this.innerHeight;

    // window scroll top

    let windowScrollTop = this.scrollY;

    if (windowScrollTop + windowHeight > skillsOffsetTop) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        })
    }
};


// create popup with the image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener("click", (e) => {

        //create overlay element

        let overlay = document.createElement("div");

        // add class to overlay

        overlay.className = "popup-overlay";

        // append overlay to the body

        document.body.appendChild(overlay);

        // create popup box

        let popupBox = document.createElement("div");

        // add class to the popup box 

        popupBox.className = "popup-box";

        if (img.alt !== null) {

            // create heading

            let imgHeading = document.createElement("h3");

            //create text for heading

            let imgText = document.createTextNode(img.alt);

            // append text to heading

            imgHeading.appendChild(imgText);

            // append the heading to popup box

            popupBox.appendChild(imgHeading);

        }

        // create the image

        let popupImage = document.createElement("img");

        // set image source

        popupImage.src = img.src;

        // add image to popup box

        popupBox.appendChild(popupImage);

        // append popup box to body

        document.body.appendChild(popupBox);

        // create close span

        let closeButton = document.createElement("span");

        // create close button text

        let closeButtonText = document.createTextNode("X");

        // append text to close button

        closeButton.appendChild(closeButtonText);

        // add class to close button

        closeButton.className = "close-button";

        // add close button to popup box

        popupBox.appendChild(closeButton);

    });
});

// close popup

document.addEventListener("click", (e) => {

    if (e.target.className === "close-button") {

        // remove current popup

        e.target.parentNode.remove();

        // remove overlay

        document.querySelector(".popup-overlay").remove();

    }

});


// select all bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// select all links

const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {

    elements.forEach(ele => {

    ele.addEventListener("click", (e) => {

        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'

        });
    });
});
}

scrollToSomewhere(allBullets);

scrollToSomewhere(allLinks);


// handle active state

function handleActive(ev) {

    // remove active class from all children

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    // add active class on target

    ev.target.classList.add("active");
}


// show and hide bullets

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === "block") {

        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletsContainer.style.display = "none";

        document.querySelector(".bullets-option .no").classList.add("active")

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === "show") {

            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets_option", "block");

        } else {

            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets_option", "none");

        }

        handleActive(e);
    
    });

});


// reset button

document.querySelector(".reset-options").onclick = function () {

    // localStorage.clear();

    localStorage.removeItem("color_option");

    localStorage.removeItem("background_option");

    localStorage.removeItem("bullets_option");

    // reload window

    window.location.reload();

}


// toggle menu

let toggleButton = document.querySelector(".toggle-menu");

let theLinks = document.querySelector(".links");

toggleButton.onclick = function (e) {

    // stop propagation

    e.stopPropagation();

    // toggle class "menu-active" on button

    this.classList.toggle("menu-active");

    // toggle class "open" on button

    theLinks.classList.toggle("open");

};

// click anywhere outside menu and toggle button

document.addEventListener("click", (e) => {

    if (e.target !== toggleButton && e.target !== theLinks) {

        if (theLinks.classList.contains("open")) {

            toggleButton.classList.toggle("menu-active");

            theLinks.classList.toggle("open");

        }

    } 

});

// stop propagation on menu

theLinks.onclick = function (e) {

    e.stopPropagation();

}
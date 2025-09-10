
const lightmode = document.createElement("img");
lightmode.src = "/static/lightmode.png";
lightmode.id = "modeswitcher"

const darkmode = document.createElement("img");
darkmode.src = "/static/darkmode.png";
darkmode.id = "modeswitcher";

lightmode.addEventListener("click", () => {
    toLightMode();
});

darkmode.addEventListener("click", () => {
    toDarkMode();
});

const navbar = document.getElementById("navbar");

navbar.append(darkmode);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toDarkMode();
}

function toDarkMode() {
    navbar.replaceChild(lightmode, darkmode);
    document.body.classList.add("dark");
}

function toLightMode() {
    navbar.replaceChild(darkmode, lightmode);
    document.body.classList.remove("dark");
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const isDarkMode = event.matches

    if (isDarkMode) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
});


// placeholder colors
let colorsArray = ['#C70521', '#FA0629', '#FC3753', '#FD687E', '#FE9AA9'];

const headerForm = document.getElementById('header-form');
const colorInput = document.getElementById('color-input');
const selectColorScheme = document.getElementById('select-color-scheme');
const colorsContainer = document.getElementById('colors-container');

// getting new colors from 'www.thecolorapi.com'
headerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const chosenColorHex = colorInput.value.slice(1);
    const chosenColorScheme = selectColorScheme.value.toLowerCase();
    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColorHex}&mode=${chosenColorScheme}&count=5`)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors.map(newColor => newColor.hex.value);
            renderColors();
        });
});

// rendering HTML
function renderColors() {
    let html = '';
    for (let color of colorsArray) {
        html += `
        <div class="color" id="color">
                <div class="color-block" style="background-color: ${color};"></div>
                <p class="color-name" id="color-name" onclick="copyToClipboard()">${color}</p>
            </div>
        `
    };
    colorsContainer.innerHTML = html;
};

//copying color to Clipboard
function copyToClipboard() {
    let copyText = document.getElementById("color-name").textContent;
    navigator.clipboard.writeText(copyText).then(() => {
        alert(`${copyText} has been copied to Clipboard!`);
    });
}

renderColors();


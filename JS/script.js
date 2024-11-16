const topBar = document.getElementById('top-bar');
const exteriorColorSection = document.getElementById('exterior-buttons');
const interiorColorSection = document.getElementById('interior-buttons');
const extImg = document.querySelector('#exterior-img');
const intImg = document.querySelector('#interior-img');



// Handle Top Bar on Scroll
const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

// Image Mapping to Colors
const extImgs = {
    'Stealth Grey': './images/model-y-stealth-grey.jpg',
    'Pearl White': './images/model-y-pearl-white.jpg',
    'Deep Blue': './images/model-y-deep-blue-metallic.jpg',
    'Solid Black': './images/model-y-solid-black.jpg',
    'Ultra Red': './images/model-y-ultra-red.jpg',
    'Quicksilver': './images/model-y-quicksilver.jpg',
}

const intImgs={
    Dark: './images/model-y-interior-dark.jpg',
    Light: './images/model-y-interior-light.jpg',
}

//Handle Color Sections
const handleColorButtonClick = (event)=>{
    let button;
    if (event.target.tagName == 'IMG'){
        button = event.target.closest('button');
    }
    else if(event.target.tagName == 'BUTTON'){
        button = event.target;
    }
    if(button){
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach((btn)=> btn.classList.remove('btn-selected'));
        button.classList.add('btn-selected');

    // Change Exterior Image
        if (event.currentTarget === exteriorColorSection){
            const color = button.querySelector('img').alt;
            extImg.src = extImgs[color];
        }
        if (event.currentTarget === interiorColorSection){
            const color = button.querySelector('img').alt;
            intImg.src = intImgs[color];
        }
    }
}

// Event Listener for Scrolling
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll)); //requestAnimationFrame is used to handle performance else handleScroll will be called multiple times
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);

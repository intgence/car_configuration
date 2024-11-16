const topBar = document.getElementById('top-bar');
const exteriorColorSection = document.getElementById('exterior-buttons');
const interiorColorSection = document.getElementById('interior-buttons');
const extImage = document.querySelector('#exterior-image');
const intImage = document.querySelector('#interior-image');



// Handle Top Bar on Scroll
const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

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
    }
}

// Event Listener for Scrolling
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll)); //requestAnimationFrame is used to handle performance else handleScroll will be called multiple times
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);

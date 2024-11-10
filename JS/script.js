const topBar = document.getElementById('top-bar');
const atTop = window.scrollY === 0;

// Handle Top Bar on Scroll
const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

// Event Listener for Scrolling
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll)); //requestAnimationFrame is used to handle performance else handleScroll will be called multiple times

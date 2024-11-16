const topBar = document.getElementById('top-bar');
const exteriorColorSection = document.getElementById('exterior-buttons');
const interiorColorSection = document.getElementById('interior-buttons');
const extImg = document.querySelector('#exterior-img');
const intImg = document.querySelector('#interior-img');
const wheelBtns = document.getElementById('wheel-buttons');
const performanceBtn = document.getElementById('performance-pkg');
const totalPriceEle = document.getElementById('total-price');
const fullSelfDrive= document.getElementById('full-self-driving-chkbox');
const accessoryCheckBoxes = document.querySelectorAll('.accessory-form-checkbox');
const downPayment = document.getElementById('down-payment');
const monthlyPayment = document.getElementById('monthly-payment');

const basePrice = 52490;
let currentPrice = basePrice;

const pricing = {
    'Performance Wheels': 2500,
    'Performance Package': 5000,
    'Full Self-Driving': 8000,
    'Accessories': {
        'Center Console Trays': 35,
        'Sunshade': 105,
        'All-Weather Interior Liners': 225,
    }
};

let selectedColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
};

// Update Total Price
const updateTotalPrice = ()=>{
    currentPrice = basePrice;

    if(selectedOptions['Performance Wheels']){
        currentPrice += pricing['Performance Wheels'];
    }

    if(selectedOptions['Performance Package']){
        currentPrice += pricing['Performance Package'];
    }

    if(selectedOptions['Full Self-Driving']){
        currentPrice += pricing['Full Self-Driving'];
    }

    accessoryCheckBoxes.forEach((accessory)=>{
        if(accessory.checked){
            currentPrice += pricing['Accessories'][accessory.closest('label').querySelector('span').textContent.trim()];
        }
    })

    totalPriceEle.textContent = `$${currentPrice.toLocaleString()}`;
    updatePaymentBreakdown();
}

// Update Payment Breakdown
const updatePaymentBreakdown = ()=>{
    const downPaymentAmt = currentPrice * 0.1;
    downPayment.textContent = `$${downPaymentAmt.toLocaleString()}`;

    // Loan details for 60 months and 3% interest rate
    const loanMonths = 60;
    const interestRate = 0.03;
    const loanAmt = currentPrice - downPaymentAmt;
    const monthlyInterestRate = interestRate / 12;
    const monthlyPaymentAmt = (loanAmt * (monthlyInterestRate*Math.pow(1 + monthlyInterestRate, loanMonths)))/(Math.pow(1+monthlyInterestRate, loanMonths)-1);
    monthlyPayment.textContent = `$${monthlyPaymentAmt.toFixed(2).toLocaleString()}`;
}

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
            selectedColor = button.querySelector('img').alt;
            updateExtImg();
        }
        if (event.currentTarget === interiorColorSection){
            const color = button.querySelector('img').alt;
            intImg.src = intImgs[color];
        }
    }
}

// Update exgterior image based on wheel selection
const updateExtImg = ()=>{
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = selectedColor in extImgs ? selectedColor : 'Stealth Grey';
    extImg.src = extImgs[colorKey].replace('.jpg', `${performanceSuffix}.jpg`);
}

// Handle wheel selection
const handleWheelBtnClick = (event)=>{
    if(event.target.tagName == 'BUTTON'){
        const btns = document.querySelectorAll('#wheel-buttons button');
        btns.forEach((btn)=> btn.classList.remove('bg-gray-700', 'text-white'));
        btns.forEach((btn)=> btn.classList.add('bg-gray-200'));
        event.target.classList.add('bg-gray-700', 'text-white');

        // const selectedWheel = event.target.textContent.includes('Performance');

        // extImg.src = selectedWheel ? './images/model-y-stealth-grey-performance.jpg' : './images/model-y-stealth-grey.jpg';
        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');
        updateExtImg();

        updateTotalPrice();
    }

}

const handlePerformancePkgClick = (event)=>{
    const isSelected = performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');
    selectedOptions['Performance Package'] = isSelected;
    updateTotalPrice();
}

// Full self Driving Selection
const fullSelfDriveChange = (event) =>{
    const isSelected = fullSelfDrive.checked;
    selectedOptions['Full Self-Driving'] = isSelected;
    updateTotalPrice();
}

// Handle accessory event listeners
accessoryCheckBoxes.forEach((accessory)=>{
    accessory.addEventListener('change', ()=>{
        updateTotalPrice();
    })
})

// Initial Total Price
updateTotalPrice();

// Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll)); //requestAnimationFrame is used to handle performance else handleScroll will be called multiple times
exteriorColorSection.addEventListener('click', handleColorButtonClick);
interiorColorSection.addEventListener('click', handleColorButtonClick);
wheelBtns.addEventListener('click', handleWheelBtnClick);
performanceBtn.addEventListener('click', handlePerformancePkgClick);
fullSelfDrive.addEventListener('change', fullSelfDriveChange);
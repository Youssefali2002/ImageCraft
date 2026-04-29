const img = document.getElementById('img');
const upload = document.getElementById('upload');
const saturation = document.getElementById('saturation');
const contrast = document.getElementById('contrast');
const brightness = document.getElementById('brightness');
const sepia = document.getElementById('sepia');
const grayscale = document.getElementById('grayscale');
const blur = document.getElementById('blur');
const hueRotate = document.getElementById('hue-rotate');
const reset = document.getElementById('reset');
const download = document.getElementById('download');
const imgbox = document.getElementById('imgBox');
const langToggle = document.getElementById('langToggle');
const langText = document.getElementById('langText');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Value display elements
const valueDisplays = {
    saturation: document.getElementById('saturation-value'),
    contrast: document.getElementById('contrast-value'),
    brightness: document.getElementById('brightness-value'),
    sepia: document.getElementById('sepia-value'),
    grayscale: document.getElementById('grayscale-value'),
    blur: document.getElementById('blur-value'),
    hueRotate: document.getElementById('hue-rotate-value')
};

// Translations
const translations = {
    ar: {
        pageTitle: 'محرر الصور',
        uploadBtn: 'اختر صورة',
        filtersTitle: 'الفلاتر',
        saturation: 'التشبع',
        contrast: 'التباين',
        brightness: 'السطوع',
        sepia: 'اللون البني',
        grayscale: 'التدرج الرمادي',
        blur: 'التمويه',
        hueRotate: 'تدوير الألوان',
        download: 'تحميل',
        reset: 'إعادة',
        langBtn: 'EN',
        madeBy: 'صنع بواسطة',
        authorName: 'يوسف ياسر اسماعيل'
    },
    en: {
        pageTitle: 'Image Editor',
        uploadBtn: 'Choose Image',
        filtersTitle: 'Filters',
        saturation: 'Saturation',
        contrast: 'Contrast',
        brightness: 'Brightness',
        sepia: 'Sepia',
        grayscale: 'Grayscale',
        blur: 'Blur',
        hueRotate: 'Hue Rotate',
        download: 'Download',
        reset: 'Reset',
        langBtn: 'AR',
        madeBy: 'Made by',
        authorName: 'Youssef Yasser Ismail'
    }
};

let currentLang = localStorage.getItem('lang') || 'ar';

function setLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    const t = translations[lang];

    // Set direction
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    html.setAttribute('lang', lang);

    // Update language button
    langText.textContent = t.langBtn;

    // Update all elements with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Save preference
    localStorage.setItem('lang', lang);
}

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
});    

function updateValueDisplays() {
    valueDisplays.saturation.textContent = saturation.value + '%';
    valueDisplays.contrast.textContent = contrast.value + '%';
    valueDisplays.brightness.textContent = brightness.value + '%';
    valueDisplays.sepia.textContent = sepia.value + '%';
    valueDisplays.grayscale.textContent = grayscale.value;
    valueDisplays.blur.textContent = blur.value + 'px';
    valueDisplays.hueRotate.textContent = hueRotate.value + '°';
}

function resetValues() {
    ctx.filter = 'none';
    saturation.value = 100;
    contrast.value = 100;
    brightness.value = 100;
    sepia.value = 0;
    grayscale.value = 0;
    blur.value = 0;
    hueRotate.value = 0;
    updateValueDisplays();
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

window.onload = () => {
    download.style.display = 'none';
    reset.style.display = 'none';
    // Initialize language
    setLanguage(currentLang);
};


upload.onchange = function () {
    const file = upload.files[0];
    
    // Validate file
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    // Check file size (max 10MB for mobile)
    if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
    }

    resetValues();
    download.style.display = 'flex';
    reset.style.display = 'flex';
    imgbox.classList.add('has-image');

    let fileReader = new FileReader();
    
    fileReader.onerror = function() {
        alert('Failed to read the file. Please try again.');
        console.error('FileReader error:', fileReader.error);
    };
    
    fileReader.onload = function () {
        img.onerror = function() {
            alert('Failed to load the image. Please try a different image.');
            console.error('Image loading error');
            imgbox.classList.remove('has-image');
        };
        
        img.onload = function () {
            try {
                // Ensure canvas dimensions are reasonable for mobile
                const maxWidth = window.innerWidth < 768 ? window.innerWidth - 40 : 1200;
                const maxHeight = window.innerHeight < 768 ? window.innerHeight - 200 : 800;
                
                let width = img.width;
                let height = img.height;
                
                // Scale down large images for mobile performance
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width *= ratio;
                    height *= ratio;
                }
                
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                canvas.style.display = 'block';
                img.style.display = 'none';
            } catch (error) {
                alert('Failed to process the image. Please try again.');
                console.error('Canvas drawing error:', error);
            }
        };
        
        img.src = fileReader.result;
    };
    
    fileReader.readAsDataURL(file);
};

let filters = document.querySelectorAll("ul li input");


filters.forEach(filter => {
    filter.addEventListener('input', function() {
        updateValueDisplays();
        ctx.filter = `
            saturate(${saturation.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value}%)
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });
});

reset.addEventListener('click', function() {
  resetValues();
  });

  function downloadImage() {
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  download.addEventListener('click', function() {
    downloadImage();
  });

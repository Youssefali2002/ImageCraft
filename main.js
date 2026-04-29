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
    
    // Only draw if canvas has dimensions and image is loaded
    if (canvas.width > 0 && canvas.height > 0 && img.src && img.complete) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

window.onload = () => {
    download.style.display = 'none';
    reset.style.display = 'none';
    
    // Initialize canvas with default state
    canvas.style.display = 'none';
    img.style.display = 'none';
    
    // Initialize language
    setLanguage(currentLang);
    
    // Add mobile touch event listeners
    upload.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.click();
    });
    
    // Prevent default touch behaviors that might interfere
    document.addEventListener('touchmove', function(e) {
        if (e.target === upload || e.target.closest('label[for="upload"]')) {
            e.preventDefault();
        }
    }, { passive: false });
};


upload.onchange = function () {
    const file = upload.files[0];
    
    // Reset UI state
    imgbox.classList.remove('has-image');
    canvas.style.display = 'none';
    img.style.display = 'none';
    
    // Validate file
    if (!file) return;
    
    // Check file type - be more permissive for mobile
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
    if (!validTypes.includes(file.type) && !file.type.startsWith('image/')) {
        alert(currentLang === 'ar' ? 'الرجاء اختيار ملف صورة صالح' : 'Please select a valid image file');
        return;
    }
    
    // Check file size (max 5MB for better mobile performance)
    if (file.size > 5 * 1024 * 1024) {
        alert(currentLang === 'ar' ? 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' : 'Image size should be less than 5MB');
        return;
    }

    resetValues();
    download.style.display = 'flex';
    reset.style.display = 'flex';
    imgbox.classList.add('has-image');

    // Show loading state
    if (currentLang === 'ar') {
        console.log('جاري تحميل الصورة...');
    } else {
        console.log('Loading image...');
    }

    let fileReader = new FileReader();
    
    fileReader.onerror = function() {
        imgbox.classList.remove('has-image');
        alert(currentLang === 'ar' ? 'فشل في قراءة الملف. الرجاء المحاولة مرة أخرى.' : 'Failed to read the file. Please try again.');
        console.error('FileReader error:', fileReader.error);
    };
    
    fileReader.onload = function () {
        img.onerror = function() {
            imgbox.classList.remove('has-image');
            canvas.style.display = 'none';
            alert(currentLang === 'ar' ? 'فشل في تحميل الصورة. الرجاء تجربة صورة أخرى.' : 'Failed to load the image. Please try a different image.');
            console.error('Image loading error');
        };
        
        img.onload = function () {
            try {
                // Mobile-optimized dimensions
                const isMobile = window.innerWidth < 768;
                const maxWidth = isMobile ? window.innerWidth - 40 : 1200;
                const maxHeight = isMobile ? window.innerHeight - 300 : 800;
                
                let width = img.naturalWidth || img.width;
                let height = img.naturalHeight || img.height;
                
                // Scale down large images for mobile performance
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.floor(width * ratio);
                    height = Math.floor(height * ratio);
                }
                
                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;
                
                // Clear canvas before drawing
                ctx.clearRect(0, 0, width, height);
                
                // Draw image
                ctx.drawImage(img, 0, 0, width, height);
                
                // Show canvas, hide image
                canvas.style.display = 'block';
                img.style.display = 'none';
                
                console.log('Image loaded successfully:', width + 'x' + height);
                
            } catch (error) {
                imgbox.classList.remove('has-image');
                canvas.style.display = 'none';
                alert(currentLang === 'ar' ? 'فشل في معالجة الصورة. الرجاء المحاولة مرة أخرى.' : 'Failed to process the image. Please try again.');
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
        
        // Only apply filters if image is loaded and canvas has dimensions
        if (canvas.width > 0 && canvas.height > 0 && img.src && img.complete) {
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
        }
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

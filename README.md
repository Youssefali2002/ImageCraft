# 🎨 Image Editor - محرر الصور

A modern, responsive web-based image editor with real-time filters and multilingual support (Arabic/English). Built with pure HTML, CSS, and JavaScript using Canvas API for image manipulation.

---

## ✨ Features - المميزات

### 🌍 Multilingual Support - دعم متعدد اللغات
- **Arabic (RTL)** and **English (LTR)** languages - **العربية (من اليمين لليسار)** و**الإنجليزية (من اليسار لليمين)**
- Language toggle with persistent preference - تبديل اللغة مع حفظ التفضيلات
- Full UI translation - ترجمة كاملة للواجهة

### 🎨 Image Filters - فلاتر الصور
- **Saturation** (0-200%) - **التشبع** (0-200%)
- **Contrast** (0-200%) - **التباين** (0-200%)
- **Brightness** (0-200%) - **السطوع** (0-200%)
- **Sepia** (0-100%) - **اللون البني** (0-100%)
- **Grayscale** (0-1) - **التدرج الرمادي** (0-1)
- **Blur** (0-10px) - **التمويه** (0-10px)
- **Hue Rotate** (0-350°) - **تدوير الألوان** (0-350°)

### 📱 Responsive Design - تصميم متجاوب
- Mobile-friendly interface - واجهة صديقة للجوال
- Tablet and desktop optimized - محسن للتابلت والكمبيوتر
- Touch-friendly controls - عناصر تحكم مناسبة للمس

### 🎯 Core Functionality - الوظائف الأساسية
- **Image Upload**: Drag & drop or click to upload - **رفع الصور**: السحب والإفلات أو النقر للرفع
- **Real-time Preview**: Instant filter application - **معاينة فورية**: تطبيق الفلاتر مباشرة
- **Reset Function**: Restore original image - **إعادة التعيين**: استعادة الصورة الأصلية
- **Download**: Save edited image as PNG - **تحميل**: حفظ الصورة المعدلة بصيغة PNG
- **Value Display**: Live filter value indicators - **عرض القيم**: مؤشرات قيم الفلاتر المباشرة

---

## 🛠️ Technologies Used - التقنيات المستخدمة

- **HTML5** - Semantic markup - **HTML5** - ترميز دلالي
- **CSS3** - Modern styling with CSS Grid, Flexbox, and CSS Variables - **CSS3** - تصميم حديث مع CSS Grid, Flexbox, و CSS Variables
- **JavaScript (ES6+)** - Canvas API, File API, Local Storage - **JavaScript (ES6+)** - Canvas API, File API, Local Storage
- **Google Fonts** - Cairo font family - **Google Fonts** - خط Cairo
- **Canvas API** - Image manipulation and filtering - **Canvas API** - معالجة وتصفية الصور

---

## 🚀 Getting Started - البدء

### Prerequisites - المتطلبات
- Modern web browser (Chrome, Firefox, Safari, Edge) - متصفح ويب حديث (Chrome, Firefox, Safari, Edge)
- No additional dependencies required - لا توجد متطلبات إضافية

### Installation - التثبيت
1. Clone or download the repository - استنساخ أو تحميل المستودع
2. Open `index.html` in your web browser - افتح `index.html` في متصفحك
3. Start editing images! - ابدأ في تعديل الصور!

### Usage - الاستخدام
1. **Upload Image**: Click "اختر صورة" / "Choose Image" button - **رفع الصورة**: انقر على زر "اختر صورة" / "Choose Image"
2. **Apply Filters**: Adjust sliders to apply real-time filters - **تطبيق الفلاتر**: اضبط الشرائح لتطبيق الفلاتر المباشرة
3. **Reset**: Click "إعادة" / "Reset" to restore original - **إعادة التعيين**: انقر على "إعادة" / "Reset" لاستعادة الأصل
4. **Download**: Click "تحميل" / "Download" to save edited image - **تحميل**: انقر على "تحميل" / "Download" لحفظ الصورة المعدلة
5. **Language**: Toggle between Arabic/English using the language button - **اللغة**: تبديل بين العربية/الإنجليزية باستخدام زر اللغة

---

## 📁 Project Structure - هيكل المشروع

```
image-editor/
├── index.html          # Main HTML structure - الهيكل الرئيسي
├── style.css           # Styling and responsive design - التصميم والتصميم المتجاوب
├── main.js             # JavaScript functionality - وظائف JavaScript
├── img/               # Sample image directory - مجلد الصور النموذجية
│   └── sample.jpg     # Default sample image - صورة نموذجية افتراضية
└── README.md          # Project documentation - وثائق المشروع
```

---

## 🎨 Design Features - ميزات التصميم

### Visual Design - التصميم البصري
- **Glassmorphism** effects with backdrop filters - **الزجاجية** مع تأثيرات الخلفية
- **Gradient backgrounds** and buttons - **خلفيات متدرجة** وأزرار
- **Smooth animations** and transitions - **رسوم متحركة سلسة** وانتقالات
- **Dark theme** with vibrant accent colors - **سمة داكنة** مع ألوان زاهية
- **Modern card-based layout** - **تخطيط حديث قائم على البطاقات**

### User Experience - تجربة المستخدم
- **Intuitive controls** with visual feedback - **عناصر تحكم بديهية** مع تغذية بصرية
- **Hover effects** on interactive elements - **تأثيرات التمرير** على العناصر التفاعلية
- **Loading states** and smooth transitions - **حالات التحميل** والانتقالات السلسة
- **Accessibility** considerations - **اعتبارات الوصول**

---

## 🔧 Technical Implementation - التنفيذ التقني

### Image Processing - معالجة الصور
- **Canvas API** for pixel manipulation - **Canvas API** لمعالجة البكسل
- **CSS Filters** for real-time effects - **CSS Filters** للتأثيرات المباشرة
- **FileReader API** for image upload - **FileReader API** لرفع الصور
- **Data URLs** for image download - **Data URLs** لتحميل الصور

### State Management - إدارة الحالة
- **LocalStorage** for language preference - **LocalStorage** لتفضيلات اللغة
- **Event-driven** filter updates - **تحديثات الفلاتر القائمة على الأحداث**
- **Real-time value displays** - **عرض القيم المباشر**

### Responsive Breakpoints - نقاط التوقف المتجاوبة
- **Desktop**: >768px - **الكمبيوتر**: >768px
- **Tablet**: 480px-768px - **التابلت**: 480px-768px
- **Mobile**: <480px - **الجوال**: <480px

---

## 🌐 Browser Compatibility - التوافق مع المتصفحات

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

---

## 🤝 Contributing - المساهمة

Contributions are welcome! Please feel free to submit a Pull Request.  
المساهمات مرحب بها! لا تتردد في تقديم طلب سحب.

---

## 📄 License - الرخصة

This project is open source and available under the [MIT License](LICENSE).  
هذا المشروع مفتوح المصدر ومتاح تحت [رخصة MIT](LICENSE).

---

## 👨‍💻 Author - المطور

**Youssef Yasser Ismail** - **يوسف ياسر إسماعيل**  
📧 Email: youseef.ali.2002@gmail.com - 📧 البريد الإلكتروني: youseef.ali.2002@gmail.com  
🔗 GitHub: [Your GitHub Profile] - 🔗 GitHub: [ملفك الشخصي على GitHub]

---

## 🙏 Acknowledgments - الشكر والتقدير

- Google Fonts for the Cairo font family - Google Fonts لخط Cairo
- Canvas API documentation - وثائق Canvas API
- Modern CSS techniques and tutorials - تقنيات CSS الحديثة والدروس

---

**Made with ❤️ by Youssef Yasser Ismail** - **صُنع بـ ❤️ بواسطة يوسف ياسر إسماعيل**

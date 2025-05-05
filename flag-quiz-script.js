// *** GeoQuest: Bayrak Tanıma Oyunu JavaScript Dosyası ***
// *** Bu dosya SADECE Bayrak Tanıma oyunu logic'ini içerir. ***

// Yardımcı Fonksiyon: Diziyi Karıştırma
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[i], shuffled[j]];
    }
    return shuffled;
}

// Kısa bekleme süresi (ms) - Cevap verildikten sonraki bekleme
const feedbackDisplayDelay = 2000; // Cevap verildikten sonra 2 saniye bekle

// Bayrak Tanıma Soruları (Orijinal script.js'ten kopyalandı)
const flagQuizQuestions_data = [
    { country: 'Türkiye', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg', options: ['Türkiye', 'Azerbaycan', 'Tunus', 'Katar'] },
    { country: 'Almanya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg', options: ['Fransa', 'Belçika', 'Almanya', 'Hollanda'] },
    { country: 'Fransa', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg', options: ['İtalya', 'Fransa', 'İrlanda', 'Belçika'] },
    { country: 'İtalya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg', options: ['İtalya', 'Macaristan', 'Meksika', 'İrlanda'] },
    { country: 'Japonya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg', options: ['Seul', 'Pekin', 'Bangkok', 'Tokyo'] },
    { country: 'Kanada', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Flag_of_Canada.svg', options: ['Amerika Birleşik Devletleri', 'Kanada', 'Avustralya', 'Yeni Zelanda'] },
    { country: 'Brezilya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg', options: ['Arjantin', 'Kolombiya', 'Brezilya', 'Şili'] },
    { country: 'Çin', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg', options: ['Hindistan', 'Japonya', 'Tayvan', 'Çin'] },
    { country: 'Rusya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg', options: ['Polonya', 'Rusya', 'Hollanda', 'Sırbistan'] },
    { country: 'İspanya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg', options: ['Portekiz', 'Meksika', 'İtalya', 'İspanya'] },
    { country: 'Meksika', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg', options: ['İtalya', 'Meksika', 'Peru', 'Kolombiya'] },
    { country: 'Güney Kore', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg', options: ['Kuzey Kore', 'Japonya', 'Güney Kore', 'Çin'] },
    { country: 'Avustralya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg', options: ['Yeni Zelanda', 'Birleşik Krallık', 'Kanada', 'Avustralya'] },
    { country: 'Mısır', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt_%28obsolete%29.svg', options: ['Suriye', 'Irak', 'Mısır', 'Libya'] },
    { country: 'Güney Afrika', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/af/Flag_of_South_Africa.svg', options: ['Nijerya', 'Kenya', 'Güney Afrika', 'Gana'] },
     { country: 'Arjantin', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg', options: ['Braz', 'Şili', 'Arjantin', 'Uruguay'] },
     { country: 'Yeni Zelanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg', options: ['Avustralya', 'Birleşik Krallık', 'Kanada', 'Yeni Zelanda'] },
     { country: 'Hindistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg', options: ['Pakistan', 'Hindistan', 'Banglades', 'Nepal'] },
     { country: 'Endonezya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg', options: ['Polonya', 'Monako', 'Singapur', 'Endonezya'] },
     { country: 'İsviçre', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg', options: ['Danimarka', 'İsveç', 'İsviçre', 'Norveç'] },
     // Yeni Bayrak Soruları
     { country: 'Yunanistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg', options: ['Türkiye', 'Kıbrıs', 'İsrail', 'Yunanistan'] },
     { country: 'Hollanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg', options: ['Belçika', 'Lüksemburg', 'Fransa', 'Hollanda'] },
     { country: 'Belçika', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg', options: ['Almanya', 'Hollanda', 'Fransa', 'Belçika'] },
     { country: 'İrlanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg', options: ['İtalya', 'Meksika', 'Hindistan', 'İrlanda'] },
     { country: 'Portekiz', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg', options: ['İspanya', 'Braz', 'Yeşil Burun Adaları', 'Portekiz'] },
     { country: 'İspanya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg', options: ['Portekiz', 'Meksika', 'İtalya', 'İspanya'] },
     { country: 'İsveç', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg', options: ['Norveç', 'Danimarka', 'Finlandiya', 'İsveç'] },
     { country: 'Norveç', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg', options: ['İsveç', 'Danimarka', 'Finlandiya', 'Norveç'] },
     { country: 'Danimarka', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg', options: ['İsveç', 'Norveç', 'Finlandiya', 'Danimarka'] },
     { country: 'Finlandiya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg', options: ['İsveç', 'Norveç', 'Danimarka', 'Finlandiya'] },
     { country: 'Avusturya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg', options: ['İsviçre', 'Almanya', 'Polonya', 'Avusturya'] },
     { country: 'Polonya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg', options: ['Çekya', 'Slovakya', 'Ukrayna', 'Polonya'] },
     { country: 'Çekya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg', options: ['Polonya', 'Slovakya', 'Avusturya', 'Çekya'] },
     { country: 'Macaristan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg', options: ['Polonya', 'Avusturya', 'Romanya', 'Macaristan'] },
     { country: 'Yunanistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg', options: ['Türkiye', 'Kıbrıs', 'İsrail', 'Yunanistan'] }
];


// --- Element Referansları ---
const flagQuizExample = document.querySelector('.flag-quiz-example');
let flagQuizQuestionElement, flagImageElement, flagQuizOptionsElement, flagFeedbackElement, flagCompletionMessageElement;

if(flagQuizExample){
    flagQuizQuestionElement = flagQuizExample.querySelector('.flag-quiz-question');
    flagImageElement = flagQuizExample.querySelector('.flag-image');
    flagQuizOptionsElement = flagQuizExample.querySelector('.quiz-options');
    flagFeedbackElement = flagQuizExample.querySelector('.flag-feedback');
    flagCompletionMessageElement = flagQuizExample.querySelector('.flag-completion-message');
}

// --- Oyun Durumu ---
let currentFlagQuizIndex = 0; // Bu oyun türü için mevcut soru indexini tutar
let shuffledFlagQuestions = []; // Oyun sırasında sorulacak sorular listesi
let isProcessingClick = false; // Tıklama işleniyor mu?

// --- Oyun Logic ---

// Oyunu Başlat
function startFlagQuizGame() {
    console.log("startFlagQuizGame called.");

    // Gerekli elementlerin var olduğunu kontrol et
    if (!flagQuizExample || !flagQuizQuestionElement || !flagImageElement || !flagQuizOptionsElement || !flagFeedbackElement || !flagCompletionMessageElement) {
        console.error("Bayrak Quiz elementleri bulunamadı. Oyun başlatılamadı.");
        return;
    }

    shuffledFlagQuestions = shuffleArray([...flagQuizQuestions_data]); // Soruları karıştır
    currentFlagQuizIndex = 0; // Soru indexini sıfırla
    isProcessingClick = false; // Tıklama işleme bayrağını sıfırla

    flagCompletionMessageElement.style.display = 'none'; // Tamamlama mesajını gizle
    flagFeedbackElement.textContent = ''; // Geri bildirimi temizle

    displayCurrentFlagQuestion(); // İlk soruyu göster
}

// Mevcut soruyu ekranda göster
function displayCurrentFlagQuestion() {
    console.log("displayCurrentFlagQuestion called, index:", currentFlagQuizIndex);

    // Eğer tüm sorular sorulduysa, oyunu bitir
    if (currentFlagQuizIndex >= shuffledFlagQuestions.length) {
        endFlagQuizGame();
        return;
    }

    const question = shuffledFlagQuestions[currentFlagQuizIndex];

    flagQuizQuestionElement.textContent = 'Bu bayrak hangi ülkeye aittir?';
    flagImageElement.src = question.flagUrl;
    flagImageElement.alt = question.country + ' Bayrağı';
    flagImageElement.style.display = 'block'; // Ensure visible

    const shuffledOptions = shuffleArray([...question.options]);
    const optionButtons = flagQuizOptionsElement.querySelectorAll('.quiz-btn');

    flagQuizOptionsElement.style.display = 'flex'; // Ensure visible
    optionButtons.forEach((button, i) => {
        button.textContent = shuffledOptions[i];
        button.classList.remove('correct', 'wrong');
        button.disabled = false; // Enable buttons
        button.style.display = 'inline-block'; // Ensure visible
    });

    flagFeedbackElement.textContent = ''; // Clear feedback
    flagQuizOptionsElement.dataset.correct = question.country; // Doğru cevabı data attribute'e kaydet
}

// Cevap butonuna tıklama olayını yönet
function handleOptionClick(event) {
    console.log("Option button clicked.");

    const clickedButton = event.target.closest('.quiz-btn');

    // Eğer tıklanan bir buton değilse, devre dışıysa veya işlem devam ediyorsa yoksay
    if (!clickedButton || clickedButton.disabled || isProcessingClick) {
        console.log("Tıklanan buton değil, devre dışı veya işlem devam ediyor.");
        return;
    }

    isProcessingClick = true; // Tıklama işlemeye başla

    const selectedAnswer = clickedButton.textContent;
    const correctAnswer = flagQuizOptionsElement.dataset.correct; // Data attribute'ten doğru cevabı al
    const optionButtons = flagQuizOptionsElement.querySelectorAll('.quiz-btn');

    // Tüm butonları devre dışı bırak (kullanıcı başka bir seçeneğe tıklayamasın)
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        console.log("Doğru cevap!");
        clickedButton.classList.add('correct');
        flagFeedbackElement.textContent = 'Doğru!';
        flagFeedbackElement.style.color = 'green';
        // Puanlama logic'i buraya eklenebilir
    } else {
        console.log("Yanlış cevap!");
        clickedButton.classList.add('wrong');
        flagFeedbackElement.textContent = `Yanlış. Doğru cevap: ${correctAnswer}`;
        flagFeedbackElement.style.color = 'red';
        // Doğru cevabı işaretle
        optionButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
        });
    }

    // Kısa bir gecikmeden sonra bir sonraki soruya geçişi yönet
    setTimeout(() => {
        isProcessingClick = false; // İşlem bitti
        currentFlagQuizIndex++; // Bir sonraki soruya geç

        displayCurrentFlagQuestion(); // Yeni soruyu göster veya oyun bittiyse bitir
    }, feedbackDisplayDelay); // Belirlenen gecikme süresi kadar bekle
}

// Oyunu Bitir
function endFlagQuizGame() {
    console.log("endFlagQuizGame called.");

    // Soru alanlarını gizle veya temizle
    flagQuizQuestionElement.style.display = 'none';
    flagImageElement.style.display = 'none';
    flagQuizOptionsElement.style.display = 'none';
    flagFeedbackElement.textContent = ''; // Geri bildirimi temizle

    // Tüm butonları devre dışı bırak (oyun bitti)
    flagQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => btn.disabled = true);

    // Tamamlama mesajını göster
    flagCompletionMessageElement.textContent = `Tebrikler! Bayrak Tanıma oyununu tamamladınız. ${shuffledFlagQuestions.length} sorunun tamamını çözdünüz.`;
    flagCompletionMessageElement.style.color = '#00796b';
    flagCompletionMessageElement.style.display = 'block';

    console.log("Oyun tamamlandı mesajı gösterildi.");
    // İsteğe bağlı: Yeniden başla butonu eklenebilir.
}


// --- Sayfa Yüklendiğinde ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Bayrak Tanıma Oyunu başlatılıyor.");

    // Olay dinleyicisini quiz seçenekleri konteynerine ekle (Event Delegation)
    // Bu sayede her butona tek tek listener eklemek yerine, tıklama olayını
    // ebeveyn elementte yakalayabiliriz.
    if (flagQuizOptionsElement && !flagQuizOptionsElement.dataset.listenerAdded) {
        flagQuizOptionsElement.addEventListener('click', handleOptionClick);
        flagQuizOptionsElement.dataset.listenerAdded = 'true'; // Listener eklendiğini işaretle
        console.log("Bayrak quiz options listener eklendi.");
    } else if (!flagQuizOptionsElement) {
         console.warn("Bayrak quiz options elementi bulunamadı, listener eklenemedi.");
    } else {
         console.log("Bayrak quiz options listener zaten eklenmiş.");
    }


    // Oyunu başlat
    startFlagQuizGame();
});


// *** GeoQuest: Başkent Bulma Oyunu JavaScript Dosyası ***
// *** Bu dosya SADECE Başkent Bulma oyunu logic'ini içerir. ***

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

// Başkent Quiz Soruları (Orijinal script.js'ten kopyalandı)
const capitalQuizQuestions = [
    { country: 'Almanya', correctAnswer: 'Berlin', options: ['Paris', 'Londra', 'Roma', 'Berlin'] },
    { country: 'Fransa', correctAnswer: 'Paris', options: ['Berlin', 'Madrid', 'Roma', 'Paris'] },
    { country: 'İtalya', correctAnswer: 'Roma', options: ['Paris', 'Madrid', 'Berlin', 'Roma'] },
    { country: 'İspanya', correctAnswer: 'Madrid', options: ['Lizbon', 'Barcelona', 'Madrid', 'Madrid'] },
    { country: 'Birleşik Krallık', correctAnswer: 'Londra', options: ['Dublin', 'Edinburg', 'Londra', 'Manchester'] },
    { country: 'Japonya', correctAnswer: 'Tokyo', options: ['Seul', 'Pekin', 'Bangkok', 'Tokyo'] },
    { country: 'Çin', correctAnswer: 'Pekin', options: ['Şangay', 'Hong Kong', 'Pekin', 'Yeni Delhi'] },
    { country: 'Kanada', correctAnswer: 'Ottawa', options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'] },
    { country: 'Avustralya', correctAnswer: 'Canberra', options: ['Sidney', 'Melbourne', 'Brisbane', 'Canberra'] },
    { country: 'Brezilya', correctAnswer: 'Brasília', options: ['Rio de Janeiro', 'Sao Paulo', 'Buenos Aires', 'Brasília'] },
    { country: 'Hindistan', correctAnswer: 'Yeni Delhi', options: ['Mumbai', 'Kalküta', 'Chennai', 'Yeni Delhi'] },
     { country: 'Meksika', correctAnswer: 'Meksiko', options: ['Guadalajara', 'Monterrey', 'Cancún', 'Meksiko'] },
    { country: 'Güney Kore', correctAnswer: 'Seul', options: ['Busan', 'Pyongyang', 'Tokyo', 'Seul'] },
    { country: 'Mısır', correctAnswer: 'Kahire', options: ['İskenderiye', 'Hurgada', 'Luxor', 'Kahire'] },
    { country: 'Güney Afrika', correctAnswer: 'Pretoria', options: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'] },
     { country: 'Arjantin', correctAnswer: 'Buenos Aires', options: ['Cordoba', 'Rosario', 'Mendoza', 'Buenos Aires'] },
    { country: 'Yeni Zelanda', correctAnswer: 'Wellington', options: ['Auckland', 'Christchurch', 'Queenstown', 'Wellington'] },
    { country: 'Endonezya', correctAnswer: 'Cakarta', options: ['Bali', 'Surabaya', 'Bandung', 'Cakarta'] },
    { country: 'İsviçre', correctAnswer: 'Bern', options: ['Zürih', 'Cenevre', 'Lozan', 'Bern'] },
    { country: 'Türkiye', correctAnswer: 'Ankara', options: ['İstanbul', 'İzmir', 'Antalya', 'Ankara'] },
    // Yeni Başkent Soruları
    { country: 'Yunanistan', correctAnswer: 'Atina', options: ['Selanik', 'Girit', 'İzmir', 'Atina'] },
    { country: 'Tayland', correctAnswer: 'Bangkok', options: ['Chiang Mai', 'Phuket', 'Pattaya', 'Bangkok'] },
    { country: 'Portekiz', correctAnswer: 'Lizbon', options: ['Porto', 'Madrid', 'Barselona', 'Lizbon'] },
    { country: 'Norveç', correctAnswer: 'Oslo', options: ['Bergen', 'Stavanger', 'Trondheim', 'Oslo'] },
    { country: 'İsveç', correctAnswer: 'Stockholm', options: ['Oslo', 'Kopenhag', 'Helsinki', 'Stockholm'] },
    { country: 'Danimarka', correctAnswer: 'Kopenhag', options: ['Stockholm', 'Oslo', 'Helsinki', 'Kopenhag'] },
    { country: 'Finlandiya', correctAnswer: 'Helsinki', options: ['Oslo', 'Stockholm', 'Kopenhag', 'Helsinki'] },
    { country: 'Polonya', correctAnswer: 'Varşova', options: ['Krakow', 'Gdansk', 'Wroclaw', 'Varşova'] },
    { country: 'Avusturya', correctAnswer: 'Viyana', options: ['Salzburg', 'Innsbruck', 'Graz', 'Viyana'] },
    { country: 'Belçika', correctAnswer: 'Brüksel', options: ['Anvers', 'Gent', 'Brugge', 'Brüksel'] },
    { country: 'Hollanda', correctAnswer: 'Amsterdam', options: ['Rotterdam', 'Lahey', 'Utrecht', 'Amsterdam'] }
];


// --- Element Referansları ---
const capitalQuizExample = document.querySelector('.capital-quiz-example');
let capitalQuizCountryPromptElement, capitalQuizCountryElement, capitalQuizOptionsElement, capitalFeedbackElement, capitalCompletionMessageElement;

if(capitalQuizExample){
    capitalQuizCountryPromptElement = capitalQuizExample.querySelector('.capital-quiz-country-prompt');
    capitalQuizCountryElement = capitalQuizExample.querySelector('.capital-quiz-country');
    capitalQuizOptionsElement = capitalQuizExample.querySelector('.quiz-options');
    capitalFeedbackElement = capitalQuizExample.querySelector('.capital-feedback');
    capitalCompletionMessageElement = capitalQuizExample.querySelector('.capital-completion-message');
}

// --- Oyun Durumu ---
let currentCapitalQuizIndex = 0; // Bu oyun türü için mevcut soru indexini tutar
let shuffledCapitalQuestions = []; // Oyun sırasında sorulacak sorular listesi
let isProcessingClick = false; // Tıklama işleniyor mu?

// --- Oyun Logic ---

// Oyunu Başlat
function startCapitalQuizGame() {
    console.log("startCapitalQuizGame called.");

    // Gerekli elementlerin var olduğunu kontrol et
    if (!capitalQuizExample || !capitalQuizCountryPromptElement || !capitalQuizCountryElement || !capitalQuizOptionsElement || !capitalFeedbackElement || !capitalCompletionMessageElement) {
        console.error("Başkent Quiz elementleri bulunamadı. Oyun başlatılamadı.");
        return;
    }

    shuffledCapitalQuestions = shuffleArray([...capitalQuizQuestions]); // Soruları karıştır
    currentCapitalQuizIndex = 0; // Soru indexini sıfırla
    isProcessingClick = false; // Tıklama işleme bayrağını sıfırla

    capitalCompletionMessageElement.style.display = 'none'; // Tamamlama mesajını gizle
    capitalFeedbackElement.textContent = ''; // Geri bildirimi temizle

    displayCurrentCapitalQuestion(); // İlk soruyu göster
}

// Mevcut soruyu ekranda göster
function displayCurrentCapitalQuestion() {
    console.log("displayCurrentCapitalQuestion called, index:", currentCapitalQuizIndex);

    // Eğer tüm sorular sorulduysa, oyunu bitir
    if (currentCapitalQuizIndex >= shuffledCapitalQuestions.length) {
        endCapitalQuizGame();
        return;
    }

    const question = shuffledCapitalQuestions[currentCapitalQuizIndex];

    capitalQuizCountryPromptElement.textContent = 'Aşağıdaki ülkenin başkentini bulun:';
    capitalQuizCountryElement.textContent = question.country;
    capitalQuizCountryElement.style.display = 'block'; // Ensure visible

    const shuffledOptions = shuffleArray([...question.options]);
    const optionButtons = capitalQuizOptionsElement.querySelectorAll('.quiz-btn');

    capitalQuizOptionsElement.style.display = 'flex'; // Ensure visible
    optionButtons.forEach((button, i) => {
        button.textContent = shuffledOptions[i];
        button.classList.remove('correct', 'wrong');
        button.disabled = false; // Enable buttons
        button.style.display = 'inline-block'; // Ensure visible
    });

    capitalFeedbackElement.textContent = ''; // Clear feedback
    capitalQuizOptionsElement.dataset.correct = question.correctAnswer; // Doğru cevabı data attribute'e kaydet
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
    const correctAnswer = capitalQuizOptionsElement.dataset.correct; // Data attribute'ten doğru cevabı al
    const optionButtons = capitalQuizOptionsElement.querySelectorAll('.quiz-btn');

    // Tüm butonları devre dışı bırak (kullanıcı başka bir seçeneğe tıklayamasın)
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        console.log("Doğru cevap!");
        clickedButton.classList.add('correct');
        capitalFeedbackElement.textContent = 'Doğru!';
        capitalFeedbackElement.style.color = 'green';
        // Puanlama logic'i buraya eklenebilir
    } else {
        console.log("Yanlış cevap!");
        clickedButton.classList.add('wrong');
        capitalFeedbackElement.textContent = `Yanlış. Doğru cevap: ${correctAnswer}`;
        capitalFeedbackElement.style.color = 'red';
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
        currentCapitalQuizIndex++; // Bir sonraki soruya geç

        displayCurrentCapitalQuestion(); // Yeni soruyu göster veya oyun bittiyse bitir
    }, feedbackDisplayDelay); // Belirlenen gecikme süresi kadar bekle
}

// Oyunu Bitir
function endCapitalQuizGame() {
    console.log("endCapitalQuizGame called.");

    // Soru alanlarını gizle veya temizle
    capitalQuizCountryPromptElement.style.display = 'none';
    capitalQuizCountryElement.style.display = 'none';
    capitalQuizOptionsElement.style.display = 'none';
    capitalFeedbackElement.textContent = ''; // Geri bildirimi temizle

    // Tüm butonları devre dışı bırak (oyun bitti)
    capitalQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => btn.disabled = true);

    // Tamamlama mesajını göster
    capitalCompletionMessageElement.textContent = `Tebrikler! Başkent Bulma oyununu tamamladınız. ${shuffledCapitalQuestions.length} sorunun tamamını çözdünüz.`;
    capitalCompletionMessageElement.style.color = '#00796b';
    capitalCompletionMessageElement.style.display = 'block';

    console.log("Oyun tamamlandı mesajı gösterildi.");
    // İsteğe bağlı: Yeniden başla butonu eklenebilir.
}


// --- Sayfa Yüklendiğinde ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Başkent Bulma Oyunu başlatılıyor.");

    // Olay dinleyicisini quiz seçenekleri konteynerine ekle (Event Delegation)
    // Bu sayede her butona tek tek listener eklemek yerine, tıklama olayını
    // ebeveyn elementte yakalayabiliriz.
    if (capitalQuizOptionsElement && !capitalQuizOptionsElement.dataset.listenerAdded) {
        capitalQuizOptionsElement.addEventListener('click', handleOptionClick);
        capitalQuizOptionsElement.dataset.listenerAdded = 'true'; // Listener eklendiğini işaretle
        console.log("Başkent quiz options listener eklendi.");
    } else if (!capitalQuizOptionsElement) {
         console.warn("Başkent quiz options elementi bulunamadı, listener eklenemedi.");
    } else {
         console.log("Başkent quiz options listener zaten eklenmiş.");
    }


    // Oyunu başlat
    startCapitalQuizGame();
});


// *** GeoQuest: Başkent Bulma Oyunu JavaScript Dosyası ***
// *** Bu dosya SADECE Başkent Bulma oyunu mantığını içerir. ***

// --- Yardımcı Fonksiyonlar ---
// Seçenekleri karıştırmak için gerekli
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Kısa bekleme süresi (ms) - Cevap verildikten sonraki bekleme
const feedbackDisplayDelay = 2000; // Cevap verildikten sonra 2 saniye bekle

// --- Soru Havuzu ---
const capitalQuizQuestions = [
    { country: 'Almanya', correctAnswer: 'Berlin', options: ['Paris', 'Londra', 'Roma', 'Berlin'] },
    { country: 'Fransa', correctAnswer: 'Paris', options: ['Berlin', 'Madrid', 'Roma', 'Paris'] },
    { country: 'İtalya', correctAnswer: 'Roma', options: ['Paris', 'Madrid', 'Berlin', 'Roma'] },
    { country: 'İspanya', correctAnswer: 'Madrid', options: ['Lizbon', 'Barcelona', 'Valensiya', 'Madrid'] },
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
    { country: 'Hollanda', correctAnswer: 'Amsterdam', options: ['Rotterdam', 'Lahey', 'Utrecht', 'Amsterdam'] },
    { country: 'İrlanda', correctAnswer: 'Dublin', options: ['Belfast', 'Cork', 'Galway', 'Dublin'] },
    { country: 'İskoçya', correctAnswer: 'Edinburg', options: ['Glasgow', 'Aberdeen', 'Dundee', 'Edinburg'] },
    { country: 'Çekya', correctAnswer: 'Prag', options: ['Brno', 'Ostrava', 'Pilsen', 'Prag'] },
    { country: 'Macaristan', correctAnswer: 'Budapeşte', options: ['Debrecen', 'Szeged', 'Miskolc', 'Budapeşte'] },
    { country: 'Romanya', correctAnswer: 'Bükreş', options: ['Kaloşvar', 'Temeşvar', 'Yaş', 'Bükreş'] },
    { country: 'Bulgaristan', correctAnswer: 'Sofya', options: ['Filibe', 'Varna', 'Burgaz', 'Sofya'] },
    { country: 'Hırvatistan', correctAnswer: 'Zagreb', options: ['Split', 'Rijeka', 'Dubrovnik', 'Zagreb'] },
    { country: 'Sırbistan', correctAnswer: 'Belgrad', options: ['Novi Sad', 'Niş', 'Priştine', 'Belgrad'] },
    { country: 'Ukrayna', correctAnswer: 'Kiev', options: ['Harkov', 'Odessa', 'Lviv', 'Kiev'] },
    { country: 'Belarus', correctAnswer: 'Minsk', options: ['Gomel', 'Mogilev', 'Vitebsk', 'Minsk'] },
    { country: 'Litvanya', correctAnswer: 'Vilnius', options: ['Kaunas', 'Klaipeda', 'Şiaulyay', 'Vilnius'] },
    { country: 'Letonya', correctAnswer: 'Riga', options: ['Daugavpils', 'Liepaja', 'Jelgava', 'Riga'] },
    { country: 'Estonya', correctAnswer: 'Tallinn', options: ['Tartu', 'Narva', 'Pärnu', 'Tallinn'] },
    { country: 'Yunanistan', correctAnswer: 'Atina', options: ['Selanik', 'Girit', 'İzmir', 'Atina'] }
];


// --- Oyun Durumu Değişkenleri ---
let currentCapitalQuizIndex = 0; // Başkent oyunu için mevcut soru indexini tutar
let shuffledCapitalQuestions = []; // Oyun sırasında sorulacak başkent soruları listesi
let isProcessingClick = false; // Tıklama/cevap işleniyor mu?


// --- HTML Element Referansları ---
// Bu scriptin çalışacağı varsayılan bir kapsayıcı div (.capital-quiz-example) içindeki elementler
const capitalQuizExample = document.querySelector('.capital-quiz-example');
const capitalQuizCountryPromptElement = capitalQuizExample ? capitalQuizExample.querySelector('.capital-quiz-country-prompt') : null;
const capitalQuizCountryElement = capitalQuizExample ? capitalQuizExample.querySelector('.capital-quiz-country') : null;
const capitalQuizOptionsElement = capitalQuizExample ? capitalQuizExample.querySelector('.quiz-options') : null;
const capitalFeedbackElement = capitalQuizExample ? capitalQuizExample.querySelector('.capital-feedback') : null;
const capitalCompletionMessageElement = capitalQuizExample ? capitalQuizExample.querySelector('.capital-completion-message') : null;
// Seçenek butonları optionsElement içinde event delegation ile yönetilecek.


// --- Oyun Mantığı Fonksiyonları ---

// Başkent sorusunu ekranda göster
function displayCapitalQuestion(index) {
    console.log("displayCapitalQuestion called, index:", index);

    // Gerekli elementlerin varlığını kontrol et
     if (!capitalQuizExample || !capitalQuizCountryPromptElement || !capitalQuizCountryElement || !capitalQuizOptionsElement || !capitalFeedbackElement || !capitalCompletionMessageElement) {
          console.error("Başkent Quiz elementlerinden biri veya daha fazlası bulunamadı. Oyun başlatılamıyor.");
          // Elementler eksikse bir hata mesajı gösterilebilir veya oyun durdurulabilir.
          if(capitalQuizExample) capitalQuizExample.innerHTML = "<p style='color: red;'>Oyun yüklenirken bir hata oluştu. Gerekli elementler bulunamadı.</p>";
          return; // Element yoksa devam etme
     }


    if (index < shuffledCapitalQuestions.length) {
        const question = shuffledCapitalQuestions[index];

        capitalQuizCountryPromptElement.textContent = 'Aşağıdaki ülkenin başkentini bulun:';
        capitalQuizCountryElement.textContent = question.country;
        capitalQuizCountryElement.style.display = 'block'; // Ensure visible

        const shuffledOptions = shuffleArray([...question.options]); // Seçenekleri karıştır

        capitalQuizOptionsElement.style.display = 'flex'; // Ensure visible
        const optionButtons = capitalQuizOptionsElement.querySelectorAll('.quiz-btn'); // Butonları tekrar seç

        optionButtons.forEach((button, i) => {
            button.textContent = shuffledOptions[i]; // Karıştırılmış seçeneği butona ata
            button.classList.remove('correct', 'wrong');
            button.disabled = false; // Butonları tekrar aktif yap
            button.style.display = 'inline-block'; // Ensure visible
        });

        capitalFeedbackElement.textContent = ''; // Geri bildirimi temizle
        capitalCompletionMessageElement.style.display = 'none'; // Tamamlama mesajını gizle

        capitalQuizOptionsElement.dataset.correct = question.correctAnswer; // Doğru cevabı data attribute'a kaydet

    } else {
         console.log("Başkent Quiz havuzu bitti.");
         completeCapitalQuiz(); // Tüm sorular bittiğinde tamamlama fonksiyonunu çağır
    }
}

// Başkent Quizi tamamlandığında yapılacaklar
function completeCapitalQuiz() {
     console.log("Başkent Quiz tamamlandı.");
      if (!capitalQuizExample || !capitalCompletionMessageElement || !capitalQuizOptionsElement) {
         console.error("Tamamlama için gerekli elementler eksik.");
         return;
    }

     // Soru ve geri bildirim elementlerini temizle
     if(capitalQuizCountryPromptElement) capitalQuizCountryPromptElement.textContent = '';
     if(capitalQuizCountryElement) capitalQuizCountryElement.textContent = '';
     if(capitalFeedbackElement) capitalFeedbackElement.textContent = '';

     // Seçenek butonlarını gizle veya devre dışı bırak
     capitalQuizOptionsElement.style.display = 'none'; // Seçenek konteynerini gizle
     capitalQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => {
         btn.style.display = 'none'; // Butonları gizle
         btn.disabled = true; // Devre dışı bırak (gizleseniz bile iyi uygulama)
    });
     console.log("Başkent quiz elementleri gizlendi.");


     // Tamamlama mesajını göster
     capitalCompletionMessageElement.textContent = `Tebrikler! Başkent Bulma oyununu tamamladınız. ${shuffledCapitalQuestions.length} sorunun tamamını çözdünüz.`;
     capitalCompletionMessageElement.style.color = '#00796b'; // Yeşil tonu
     capitalCompletionMessageElement.style.display = 'block';
     console.log("Tamamlama mesajı gösterildi.");

     // İsteğe bağlı: Yeniden başla butonu gösterebilir veya ana sayfaya yönlendirebilirsiniz.
     // Örneğin: <button id="restart-capital-quiz">Yeniden Başla</button> gibi bir buton HTML'e eklenip buraya listener eklenir.
}


// Başkent Quizi başlangıç fonksiyonu
function startCapitalQuiz() {
     console.log("startCapitalQuiz called.");

     // Oyun durumunu sıfırla
     currentCapitalQuizIndex = 0;
     isProcessingClick = false;

     // Soruları karıştır
     shuffledCapitalQuestions = shuffleArray(capitalQuizQuestions);

     // İlk soruyu göster
     displayCapitalQuestion(currentCapitalQuizIndex);

      // Element referanslarının doğruluğunu tekrar kontrol et
     if (!capitalQuizExample || !capitalQuizOptionsElement) {
          console.error("Başlangıçta gerekli elementler bulunamadı. Başkent Quiz başlatılamıyor.");
           if(capitalQuizExample) capitalQuizExample.innerHTML = "<p style='color: red;'>Oyun yüklenirken bir hata oluştu.</p>";
           return;
     }

     // Seçenek butonlarına tıklama olay yöneticisini ekle (Event Delegation)
     // Listener'ı sadece bir kere ekle
     if (!capitalQuizOptionsElement.dataset.listenerAdded) {
         capitalQuizOptionsElement.addEventListener('click', function(event) {
             const clickedButton = event.target.closest('.quiz-btn');
             // Tıklanan elementin buton olup olmadığını, işlemde olup olmadığımızı ve butonun aktif olup olmadığını kontrol et
             if (!clickedButton || clickedButton.disabled || isProcessingClick || currentCapitalQuizIndex >= shuffledCapitalQuestions.length) {
                 console.log("Geçersiz tıklama yoksayıldı (Buton değil, işlemde, devre dışı veya oyun bitti).");
                 return;
             }
             isProcessingClick = true; // İşlem başladı

             const selectedAnswer = clickedButton.textContent;
             const correctAnswer = this.dataset.correct;
             const feedbackElement = capitalQuizExample.querySelector('.capital-feedback'); // Feedback elementi tekrar seç
             const optionButtons = this.querySelectorAll('.quiz-btn'); // Butonları tekrar seç
             optionButtons.forEach(btn => btn.disabled = true); // Butonları hemen devre dışı bırak


             if (selectedAnswer === correctAnswer) {
                 console.log("Doğru cevap!");
                 clickedButton.classList.add('correct');
                 if(feedbackElement) { feedbackElement.textContent = 'Doğru!'; feedbackElement.style.color = 'green'; }
                 // Puanlama kaldırıldı

             } else {
                 console.log("Yanlış cevap!");
                 clickedButton.classList.add('wrong');
                 if(feedbackElement) { feedbackElement.textContent = `Yanlış. Doğru cevap: ${correctAnswer}`; feedbackElement.style.color = 'red'; }
                 // Doğru cevabı işaretle
                 optionButtons.forEach(btn => { if (btn.textContent === correctAnswer) { btn.classList.add('correct'); } });
             }

             // Her zaman indexi artır (doğru veya yanlış)
             currentCapitalQuizIndex++;

             // Geri bildirim süresi sonunda bir sonraki soruya geç veya tamamla
             setTimeout(() => {
                 isProcessingClick = false; // İşlem bitti
                 // Butonları tekrar aktif yapmaya gerek yok, bir sonraki soru yüklenecek veya oyun bitecek.

                 // Bir sonraki soruyu göster veya oyunu tamamla
                 displayCapitalQuestion(currentCapitalQuizIndex); // displayCapitalQuestion, index havuz boyutunu aşarsa tamamlama fonksiyonunu çağırır

             }, feedbackDisplayDelay);
         });
         capitalQuizOptionsElement.dataset.listenerAdded = 'true'; // Listener'ın eklendiğini işaretle
         console.log("Başkent quiz options listener eklendi.");
     } else if (capitalQuizOptionsElement) {
         console.log("Başkent quiz options listener zaten eklenmiş.");
         // Eğer listener zaten ekliyse, butonların aktif ve görünür olduğundan emin ol
          capitalQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => {
             btn.disabled = false;
             btn.style.display = 'inline-block';
             btn.classList.remove('correct', 'wrong');
         });
           if(capitalQuizOptionsElement) capitalQuizOptionsElement.style.display = 'flex';
     } else {
         console.warn("Başkent quiz options elementi bulunamadı.");
     }

     console.log("Başkent Quiz başlatıldı.");
}


// Sayfa yüklendiğinde oyunu başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Başkent Quiz başlatılıyor.");
     // Capital Quiz elementlerinin varlığını kontrol et
    if (capitalQuizExample) {
         startCapitalQuiz();
    } else {
         console.error("Başent Quiz oyun alanı elementi (.capital-quiz-example) HTML'de bulunamadı. Başkent Quiz başlatılamıyor.");
         // Eğer element yoksa, kullanıcıya bilgi verilebilir.
         // Örneğin: document.body.innerHTML += "<p style='color: red;'>Başkent Bulma Oyunu alanı bulunamadı.</p>";
    }
     console.log("DOMContentLoaded - Başkent Quiz başlangıç ayarları tamam.");
});

// *** GeoQuest: Boşluk Doldurma Oyunu JavaScript Dosyası ***
// *** Bu dosya SADECE Boşluk Doldurma oyunu logic'ini içerir. ***

// Yardımcı Fonksiyon: Diziyi Karıştırma (Gerekirse)
// Bu oyunda sorular sıralı gelebilir, karıştırma opsiyoneldir.
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

// Boşluk Doldurma Soruları (Orijinal script.js'ten kopyalandı)
const fillInBlankQuestions = [
     { textBefore: 'Nil Nehri, esas olarak Mısır ve ', textAfter: ' ülkelerinden geçer.', correctAnswer: 'Sudan' },
     { textBefore: 'Dünyanın en kalabalık ülkesi şu anda ', textAfter: '.', correctAnswer: 'Hindistan' },
     { textBefore: 'Büyük Sahra Çölü ', textAfter: ' kıtasında bulunur.', correctAnswer: 'Afrika' },
     { textBefore: 'Everest Zirvesi, ', textAfter: ' Dağları\'nda yer alır.', correctAnswer: 'Himalaya' },
     { textBefore: 'Türkiye\'nin en büyük gölü ', textAfter: ' Gölü\'dür.', correctAnswer: 'Van' },
     { textBefore: 'Pasifik ve Atlantik Okyanuslarını birbirine bağlayan önemli bir kanal ', textAfter: ' Kanalıdır.', correctAnswer: 'Panama' },
     { textBefore: 'Amazon Ormanları en çok ', textAfter: ' ülkesinin topraklarında bulunur.', correctAnswer: 'Brezilya' },
     { textBefore: 'Ortadoğu\'da petrol rezervlerinin en zengin olduğu ülkelerden biri ', textAfter: '.', correctAnswer: 'Suudi Arabistan' },
     { textBefore: 'Akdeniz ve Karadeniz\'i birbirine bağlayan doğal su yolları İstanbul ve ', textAfter: ' Boğazlarıdır.', correctAnswer: 'Çanakkale' },
     { textBefore: 'Avrupa\'nın en uzun nehri ', textAfter: ' Nehri\'dir.', correctAnswer: 'Volga' },
     { textBefore: 'Büyük Okyanus, Atlas Okyanusu ve Hint Okyanusu dünyanın en büyük üç ', textAfter: '.', correctAnswer: 'Okyanusu' },
     { textBefore: 'Türkiye\'nin başkenti ', textAfter: '.', correctAnswer: 'Ankara' },
     { textBefore: 'Ekvator çizgisi, Dünya\'yı Kuzey ve Güney ', textAfter: ' olarak ikiye ayırır.', correctAnswer: 'Yarım Küre' },
     { textBefore: 'Bir ülkenin yönetim merkezinin bulunduğu şehre ', textAfter: ' denir.', correctAnswer: 'Başkent' },
     { textBefore: 'Dağların yüksek kısımlarında görülen iklim tipine ', textAfter: ' iklimi denir.', correctAnswer: 'Kutup' },
     { textBefore: 'Levha hareketleri sonucu sıradağların oluşmasına ', textAfter: ' denir.', correctAnswer: 'Orojenez' },
     { textBefore: 'Yer kabuğundaki ani sarsıntılara ', textAfter: ' denir.', correctAnswer: 'Deprem' },
     { textBefore: 'Magmanın yeryüzüne çıkarak veya yeryüzüne yakın yerlerde katılaşması sonucu oluşan kayaçlara ', textAfter: ' kayaçlar denir.', correctAnswer: 'Püskürük' },
     { textBefore: 'Akarsuların taşıdığı malzemeleri deniz kıyısında biriktirmesiyle oluşan verimli ovalara ', textAfter: ' denir.', correctAnswer: 'Delta' },
     { textBefore: 'Rüzgarların aşındırmasıyla çöl bölgelerinde oluşan mantar şekilli kayaçlara ', textAfter: ' denir.', correctAnswer: 'Şeytan Masası' },
     { textBefore: 'Karstik bölgelerde yer altı sularının etkisiyle oluşan büyük boşluklara ', textAfter: ' denir.', correctAnswer: 'Mağara' },
     { textBefore: 'Türkiye\'nin en uzun akarsuyu ', textAfter: ' Nehri\'dir.', correctAnswer: 'Kızılırmak' },
     { textBefore: 'Aktif volkanların bulunduğu Pasifik kıyısındaki fay hattına Pasifik ', textAfter: ' Çemberi denir.', correctAnswer: 'Ateş' },
     { textBefore: 'Tortul veya püskürük kayaçların yüksek sıcaklık ve basınç altında değişmesiyle oluşan kayaçlara ', textAfter: ' kayaçlar denir.', correctAnswer: 'Başkalaşım' },
     { textBefore: 'Göl sularının tatlı veya tuzlu olmasında en önemli faktör gölün ', textAfter: ' olup olmamasıdır.', correctAnswer: 'Gideğeni' },
     // 10. Sınıf Eklemeleri (Volkanizma, Kayaçlar, Yer Şekilleri, İç/Dış Kuvvetler)
     { textBefore: 'Yer kabuğunun kırık hatları boyunca blokların yer değiştirmesi sonucu oluşan çukurluklara ', textAfter: ' adı verilir.', correctAnswer: 'Graben' },
     { textBefore: 'Lavların yeryüzüne çıktığı ana kanala ', textAfter: ' denir.', correctAnswer: 'Volkan Boğazı' },
     { textBefore: 'Akarsu yataklarında eğimin azaldığı yerlerde menderesler ve ', textAfter: ' oluşur.', correctAnswer: 'Taban Seviyesi Ovası' },
     { textBefore: 'Rüzgar aşındırmasıyla oluşan en küçük yer şekillerine ', textAfter: ' adı verilir.', correctAnswer: 'Mantarkaya' },
     { textBefore: 'Buzulların erimesiyle oluşan ve içlerinde moren biriktiren çukurluklara ', textAfter: ' gölleri denir.', correctAnswer: 'Sirk' },
     { textBefore: 'Kimyasal tortul kayaçlara örnektir, deniz kabuklularının fosillerinin birikmesiyle oluşur: ', textAfter: '', correctAnswer: 'Kalker (Kireç Taşı)' },
     { textBefore: 'Fiziksel tortul kayaçlara örnektir, kum taneciklerinin sıkışmasıyla oluşur: ', textAfter: '', correctAnswer: 'Kum Taşı' },
     { textBefore: 'Derinlik püskürük kayaçlara örnektir, genellikle yer kabuğunun temelini oluşturur: ', textAfter: '', correctAnswer: 'Granit' },
     { textBefore: 'Sıvı haldeki lavın yeryüzüne çıkarak hızla soğumasıyla oluşan ince kristalli veya camsı püskürük kayaç: ', textAfter: '', correctAnswer: 'Bazalt' },
     { textBefore: 'Bir akarsuyun denize ulaştığı ağız kısmında taşıdığı alüvyonları biriktirerek oluşturduğu çıkıntıya ', textAfter: ' denir.', correctAnswer: 'Delta' }
];

// --- Element Referansları ---
const fillInBlankExample = document.querySelector('.fill-in-blank-example');
let blankTextBeforeElement, blankTextAfterElement, fillInBlankInputElement, checkBlankButton, fillInBlankFeedbackElement, blankCompletionMessageElement;

if(fillInBlankExample){
    blankTextBeforeElement = fillInBlankExample.querySelector('.blank-text-before');
    blankTextAfterElement = fillInBlankExample.querySelector('.blank-text-after');
    fillInBlankInputElement = fillInBlankExample.querySelector('.fill-in-blank-input');
    checkBlankButton = fillInBlankExample.querySelector('.check-blank-btn');
    fillInBlankFeedbackElement = fillInBlankExample.querySelector('.fill-in-blank-feedback');
    blankCompletionMessageElement = fillInBlankExample.querySelector('.blank-completion-message');
}

// --- Oyun Durumu ---
let currentFillInBlankIndex = 0; // Bu oyun türü için mevcut soru indexini tutar
let shuffledFillInBlankQuestions = []; // Oyun sırasında sorulacak sorular listesi
let isProcessingClick = false; // Tıklama işleniyor mu?

// --- Oyun Logic ---

// Oyunu Başlat
function startFillInBlankGame() {
    console.log("startFillInBlankGame called.");

     // Gerekli elementlerin var olduğunu kontrol et
     if (!fillInBlankExample || !blankTextBeforeElement || !blankTextAfterElement || !fillInBlankInputElement || !checkBlankButton || !fillInBlankFeedbackElement || !blankCompletionMessageElement) {
         console.error("Boşluk Doldurma elementleri bulunamadı. Oyun başlatılamadı.");
         return;
     }


    shuffledFillInBlankQuestions = shuffleArray([...fillInBlankQuestions]); // Soruları karıştır (opsiyonel)
    currentFillInBlankIndex = 0; // Soru indexini sıfırla
    isProcessingClick = false; // Tıklama işleme bayrağını sıfırla

    blankCompletionMessageElement.style.display = 'none'; // Tamamlama mesajını gizle
    fillInBlankFeedbackElement.textContent = ''; // Geri bildirimi temizle

    displayCurrentFillInBlankQuestion(); // İlk soruyu göster
}

// Mevcut soruyu ekranda göster
function displayCurrentFillInBlankQuestion() {
    console.log("displayCurrentFillInBlankQuestion called, index:", currentFillInBlankIndex);

    // Eğer tüm sorular sorulduysa, oyunu bitir
    if (currentFillInBlankIndex >= shuffledFillInBlankQuestions.length) {
        endFillInBlankGame();
        return;
    }

    const question = shuffledFillInBlankQuestions[currentFillInBlankIndex];

    blankTextBeforeElement.textContent = question.textBefore;
    blankTextAfterElement.textContent = question.textAfter;

    fillInBlankInputElement.value = ''; // Inputu temizle
    fillInBlankInputElement.placeholder = question.placeholder || 'Cevabını Yaz';
    fillInBlankInputElement.disabled = false; // Inputu etkinleştir
    fillInBlankInputElement.style.border = '1px solid #ccc'; // Border'ı sıfırla
    fillInBlankInputElement.style.display = 'inline-block'; // Görünür olduğundan emin ol

    checkBlankButton.disabled = false; // Butonu etkinleştir
    checkBlankButton.style.display = 'inline-block'; // Görünür olduğundan emin ol
    checkBlankButton.dataset.correctAnswer = question.correctAnswer.trim().toLowerCase(); // Doğru cevabı data attribute'e kaydet (küçük harf)

    fillInBlankFeedbackElement.textContent = ''; // Geri bildirimi temizle
}

// Kontrol Et butonuna tıklama olayını yönet
function handleCheckClick() {
    console.log("Check button clicked.");

    // Eğer buton devre dışıysa veya işlem devam ediyorsa yoksay
    if (checkBlankButton.disabled || isProcessingClick) {
        console.log("Buton devre dışı veya işlem devam ediyor.");
        return;
    }

    isProcessingClick = true; // Tıklama işlemeye başla

    const userAnswer = fillInBlankInputElement.value.trim().toLowerCase(); // Kullanıcı cevabını küçük harfe çevir
    const correctAnswer = checkBlankButton.dataset.correctAnswer; // Data attribute'ten doğru cevabı al

    fillInBlankInputElement.disabled = true; // Inputu devre dışı bırak
    checkBlankButton.disabled = true; // Butonu devre dışı bırak

    if (userAnswer === correctAnswer) {
        console.log("Doğru cevap!");
        fillInBlankFeedbackElement.textContent = 'Doğru!';
        fillInBlankFeedbackElement.style.color = 'green';
        fillInBlankInputElement.style.border = '1px solid green';
        // Puanlama logic'i buraya eklenebilir
    } else {
        console.log("Yanlış cevap!");
         // currentFillInBlankIndex kontrolü ekle, çünkü endFillInBlankGame çağrılmış olabilir
         const currentQuestion = shuffledFillInBlankQuestions[currentFillInBlankIndex];
         if (currentQuestion) {
             fillInBlankFeedbackElement.textContent = `Yanlış. Doğru cevap: ${currentQuestion.correctAnswer}`; // Orijinal cevabı göster
         } else {
              fillInBlankFeedbackElement.textContent = 'Yanlış.'; // Eğer soru bulunamazsa genel mesaj
         }
        fillInBlankFeedbackElement.style.color = 'red';
        fillInBlankInputElement.style.border = '1px solid red';
    }

    // Kısa bir gecikmeden sonra bir sonraki soruya geçişi yönet
    setTimeout(() => {
        isProcessingClick = false; // İşlem bitti
        currentFillInBlankIndex++; // Bir sonraki soruya geç

        displayCurrentFillInBlankQuestion(); // Yeni soruyu göster veya oyun bittiyse bitir
    }, feedbackDisplayDelay); // Belirlenen gecikme süresi kadar bekle
}

// Oyunu Bitir
function endFillInBlankGame() {
    console.log("endFillInBlankGame called.");

    // Soru alanlarını gizle veya temizle
    blankTextBeforeElement.textContent = '';
    blankTextAfterElement.textContent = '';
    fillInBlankInputElement.style.display = 'none'; // Inputu gizle
    checkBlankButton.style.display = 'none'; // Butonu gizle
    fillInBlankFeedbackElement.textContent = ''; // Geri bildirimi temizle


    // Tamamlama mesajını göster
    blankCompletionMessageElement.textContent = `Tebrikler! Boşluk Doldurma oyununu tamamladınız. ${shuffledFillInBlankQuestions.length} sorunun tamamını çözdünüz.`;
    blankCompletionMessageElement.style.color = '#00796b';
    blankCompletionMessageElement.style.display = 'block';

    console.log("Oyun tamamlandı mesajı gösterildi.");
    // İsteğe bağlı: Yeniden başla butonu eklenebilir.
}


// --- Sayfa Yüklendiğinde ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Boşluk Doldurma Oyunu başlatılıyor.");

    // Olay dinleyicisini Kontrol Et butonuna ekle
    if (checkBlankButton && !checkBlankButton.dataset.listenerAdded) {
        checkBlankButton.addEventListener('click', handleCheckClick);
        checkBlankButton.dataset.listenerAdded = 'true'; // Listener eklendiğini işaretle
         console.log("Boşluk Doldurma check button listener eklendi.");
    } else if (!checkBlankButton) {
         console.warn("Boşluk Doldurma check button elementi bulunamadı, listener eklenemedi.");
    } else {
         console.log("Boşluk Doldurma check button listener zaten eklenmiş.");
    }


    // Oyunu başlat
    startFillInBlankGame();
});


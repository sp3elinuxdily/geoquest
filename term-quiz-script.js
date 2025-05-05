// *** GeoQuest: Coğrafi Terim Oyunu JavaScript Dosyası ***
// *** Bu dosya SADECE Coğrafi Terim oyunu logic'ini içerir. ***

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

// Coğrafi Terim Soruları (Orijinal script.js'ten kopyalandı)
const termQuizQuestions = [
    { definition: 'Dört tarafı sularla çevrili kara parçası.', correctAnswer: 'Ada', options: ['Yarımada', 'Körfez', 'Ada', 'Boğaz'] },
    { definition: 'Üç tarafı sularla çevrili kara parçası.', correctAnswer: 'Yarımada', options: ['Ada', 'Yarımada', 'Lagün', 'Fiyord'] },
    { definition: 'Denizin karanın içine doğru sokulmuş büyük parçası.', correctAnswer: 'Körfez', options: ['Boğaz', 'Lagün', 'Haliç', 'Körfez'] },
    { definition: 'İki denizi veya gölü birbirine bağlayan dar su geçidi.', correctAnswer: 'Boğaz', options: ['Kanal', 'Boğaz', 'Akarsu', 'Delta'] },
    { definition: 'Akarsuyun denize döküldüğü yerde oluşturduğu üçgene benzer ova.', correctAnswer: 'Delta', options: ['Vadi', 'Plato', 'Delta', 'Bataklık'] },
    { definition: 'Çevresine göre yüksekte kalmış geniş düzlükler.', correctAnswer: 'Plato', options: ['Ova', 'Vadi', 'Sıradağ', 'Plato'] },
    { definition: 'Bir akarsuyun kollarıyla birlikte sularını topladığı alan.', correctAnswer: 'Havza', options: ['Vadi', 'Delta', 'Havza', 'Nehir Yatağı'] },
    { definition: 'Dünya nüfusunun en yoğun olduğu kıta.', correctAnswer: 'Asya', options: ['Avrupa', 'Afrika', 'Kuzey Amerika', 'Asya'] },
    { definition: 'Bir bölgede uzun yıllar boyunca etkili olan ortalama hava koşulları.', correctAnswer: 'İklim', options: ['Hava Durumu', 'Atmosfer', 'Meteoroloji', 'İklim'] },
    { definition: 'Bitkisel ve hayvansal kalıntıların birikmesiyle oluşan yanıcı kayaç.', correctAnswer: 'Kömür', options: ['Petrol', 'Doğalgaz', 'Kömür', 'Linyit'] },
    { definition: 'Volkanik patlama sonucu oluşan huni şeklindeki çukurluk.', correctAnswer: 'Krater', options: ['Kaldera', 'Gayzer', 'Maar', 'Krater'] },
    { definition: 'Rüzgarın taşıdığı kum ve tozların birikmesiyle oluşan tepe veya sırt.', correctAnswer: 'Kumul', options: ['Moren', 'Peri Bacası', 'Falez', 'Kumul'] },
    { definition: 'Deniz veya okyanus kıyılarında dalgaların aşındırmasıyla oluşan dik yamaç.', correctAnswer: 'Falez', options: ['Lagün', 'Tombolo', 'Falez', 'Koy'] },
    { definition: 'Gökyüzündeki buharın yoğunlaşarak katı veya sıvı halde yeryüzüne düşmesi.', correctAnswer: 'Yağış', options: ['Nem', 'Sıcaklık', 'Basınç', 'Yağış'] },
    { definition: 'Bir ülke sınırları içinde yaşayan insan topluluğunun toplam sayısı.', correctAnswer: 'Nüfus', options: ['Yerleşme', 'Göç', 'Demografi', 'Nüfus'] },
    // 10. Sınıf Eklemeleri (Volkanizma, Kayaçlar, Yer Şekilleri, İç/Dış Kuvvetler)
    { definition: 'Yer kabuğunun geniş alanlar halinde alçalması veya yükselmesi hareketi.', correctAnswer: 'Epirojenez', options: ['Orojenez', 'Volkanizma', 'Deprem', 'Epirojenez'] },
    { definition: 'Magmanın yeryüzüne kadar yükselerek ya da yeryüzüne çıkarak oluşturduğu yer şekilleri ve olaylar.', correctAnswer: 'Volkanizma', options: ['Deprem', 'Orojenez', 'Epirojenez', 'Volkanizma'] },
    { definition: 'Volkan bacasının tıkanması ve gaz basıncının artmasıyla tepe kısmının çökmesi sonucu oluşan büyük çukurluk.', correctAnswer: 'Kaldera', options: ['Krater', 'Maar', 'Gayzer', 'Kaldera'] },
    { definition: 'Gaz patlaması sonucu oluşan huni şeklindeki küçük patlama çukuru.', correctAnswer: 'Maar', options: ['Krater', 'Kaldera', 'Gayzer', 'Maar'] },
    { definition: 'Yer altındaki sıcak suların belli aralıklarla fışkırması.', correctAnswer: 'Gayzer', options: ['Sıcak Su Kaynağı', 'Kaplıca', 'Gayzer', 'Artezyen Kuyusu'] },
    { definition: 'Mağara tavanlarından sızan suların içindeki minerallerin birikmesiyle oluşan dikitler.', correctAnswer: 'Sarkıt', options: ['Dikit', 'Sütun', 'Traverten', 'Sarkıt'] },
    { definition: 'Akarsuyun yatağını derinleştirmesiyle oluşan "V" şekilli vadi tipi.', correctAnswer: 'Çentik Vadi', options: ['Geniş Tabanlı Vadi', 'Kanyon Vadi', 'Boğaz Vadi', 'Çentik Vadi'] },
    { definition: 'Buzulların aşındırmasıyla oluşan "U" şekilli vadi tipi.', correctAnswer: 'Tekne Vadi', options: ['Çentik Vadi', 'Kanyon Vadi', 'Asılı Vadi', 'Tekne Vadi'] },
    { definition: 'Dalgaların ve akıntıların taşıdığı kumların bir koy veya körfezin önünü kapatmasıyla oluşan yer şekli.', correctAnswer: 'Lagün (Deniz Kulağı)', options: ['Tombolo', 'Lagün (Deniz Kulağı)', 'Falez', 'Koy'] },
    { definition: 'Bir adanın dalga biriktirmesiyle karaya bağlanması sonucu oluşan yer şekli.', correctAnswer: 'Tombolo (Saplı Ada)', options: ['Lagün', 'Tombolo (Saplı Ada)', 'Kumsal', 'Tombolo'] },
    { definition: 'Kimyasal tortul kayaçlara örnektir, kaplıca sularının çökelmesiyle oluşur.', correctAnswer: 'Traverten', options: ['Kalker', 'Jips', 'Kaya Tuzu', 'Traverten'] },
    { definition: 'Fiziksel tortul kayaçlara örnektir, farklı boyuttaki çakılların doğal bir çimento ile birleşmesiyle oluşur.', correctAnswer: 'Konglomera (Çakıl Taşı)', options: ['Kum Taşı', 'Kil Taşı', 'Konglomera (Çakıl Taşı)', 'Mercan Kalkeri'] },
    { definition: 'Başkalaşım kayaçlara örnektir, kalkerin başkalaşmasıyla oluşur.', correctAnswer: 'Mermer', options: ['Elmas', 'Grafit', 'Gnays', 'Mermer'] },
    { definition: 'Başkalaşım kayaçlara örnektir, granit gibi derinlik kayaçlarının başkalaşmasıyla oluşur.', correctAnswer: 'Gnays', options: ['Mermer', 'Elmas', 'Gnays', 'Şist'] },
    { definition: 'Sıvı haldeki magmanın yerin derinliklerinde yavaş yavaş soğumasıyla oluşan iri kristalli püskürük kayaç.', correctAnswer: 'Granit', options: ['Bazalt', 'Andezit', 'Obsidyen', 'Granit'] },
    { definition: 'Sıvı haldeki lavın yeryüzüne çıkarak hızla soğumasıyla oluşan ince kristalli veya camsı püskürük kayaç: ', correctAnswer: 'Bazalt', options: ['Granit', 'Siyenit', 'Gabro', 'Bazalt'] },
    { definition: 'Yer kabuğundaki kırık hatları boyunca meydana gelen ani hareketler.', correctAnswer: 'Fay', options: ['Kıvrım', 'Kırık', 'Antiklinal', 'Fay'] },
    { definition: 'Orman, çayır, çöl gibi kendine özgü bitki ve hayvan topluluklarını barındıran geniş yaşam alanları.', correctAnswer: 'Biyom', options: ['Ekosistem', 'Habitat', 'Flora', 'Biyom'] },
    { definition: 'Yerleşim birimlerinin yol boyunca uzanmasıyla oluşan doku tipi.', correctAnswer: 'Çizgisel Yerleşme', options: ['Dağınık Yerleşme', 'Toplu Yerleşme', 'Kırsal Yerleşme', 'Çizgisel Yerleşme'] },
    { definition: 'Rüzgar biriktirmesiyle oluşan hilal şeklindeki kum yığınları.', correctAnswer: 'Barkan', options: ['Kumul', 'Lös', 'Moren', 'Barkan'] },
    { definition: 'Buzul aşındırmasıyla oluşan sarp kenarlı ve derin çukurluklar.', correctAnswer: 'Sirk', options: ['Lapya', 'Dolin', 'Uvala', 'Sirk'] },
    { definition: 'Akarsu yatağının eğim kırıklığına uğradığı yerden dökülmesiyle oluşan yer şekli.', correctAnswer: 'Şelale (Çağlayan)', options: ['Dev Kazanı', 'Menderes', 'Peribacası', 'Şelale (Çağlayan)'] },
    { definition: 'Yer kabuğunda meydana gelen kıvrılma sonucu oluşan yüksek kısımlar.', correctAnswer: 'Antiklinal', options: ['Senklinal', 'Graben', 'Horst', 'Antiklinal'] },
    { definition: 'Yer kabuğunda meydana gelen kıvrılma sonucu oluşan çukur kısımlar.', correctAnswer: 'Senklinal', options: ['Antiklinal', 'Graben', 'Horst', 'Senklinal'] },
    { definition: 'Magmanın yer kabuğunun içine sokularak damar veya tabaka şeklinde katılaşması.', correctAnswer: 'Derinlik Volkanizması', options: ['Yüzey Volkanizması', 'Deprem', 'Epirojenez', 'Derinlik Volkanizması'] },
    { definition: 'Lavların yeryüzüne çıkarak oluşturduğu koni şeklindeki tepe.', correctAnswer: 'Volkan Konisi', options: ['Krater', 'Kaldera', 'Maar', 'Volkan Konisi'] }
];


// --- Element Referansları ---
const termQuizExample = document.querySelector('.term-quiz-example');
let termQuizDefinitionElement, termQuizOptionsElement, termFeedbackElement, termCompletionMessageElement;

if(termQuizExample){
    termQuizDefinitionElement = termQuizExample.querySelector('.term-quiz-definition');
    termQuizOptionsElement = termQuizExample.querySelector('.quiz-options');
    termFeedbackElement = termQuizExample.querySelector('.term-feedback');
    termCompletionMessageElement = termQuizExample.querySelector('.term-completion-message');
}

// --- Oyun Durumu ---
let currentTermQuizIndex = 0; // Bu oyun türü için mevcut soru indexini tutar
let shuffledTermQuestions = []; // Oyun sırasında sorulacak sorular listesi
let isProcessingClick = false; // Tıklama işleniyor mu?

// --- Oyun Logic ---

// Oyunu Başlat
function startTermQuizGame() {
    console.log("startTermQuizGame called.");

     // Gerekli elementlerin var olduğunu kontrol et
     if (!termQuizExample || !termQuizDefinitionElement || !termQuizOptionsElement || !termFeedbackElement || !termCompletionMessageElement) {
         console.error("Terim Quiz elementleri bulunamadı. Oyun başlatılamadı.");
         return;
     }

    shuffledTermQuestions = shuffleArray([...termQuizQuestions]); // Soruları karıştır
    currentTermQuizIndex = 0; // Soru indexini sıfırla
    isProcessingClick = false; // Tıklama işleme bayrağını sıfırla

    termCompletionMessageElement.style.display = 'none'; // Tamamlama mesajını gizle
    termFeedbackElement.textContent = ''; // Geri bildirimi temizle

    displayCurrentTermQuestion(); // İlk soruyu göster
}

// Mevcut soruyu ekranda göster
function displayCurrentTermQuestion() {
    console.log("displayCurrentTermQuestion called, index:", currentTermQuizIndex);

    // Eğer tüm sorular sorulduysa, oyunu bitir
    if (currentTermQuizIndex >= shuffledTermQuestions.length) {
        endTermQuizGame();
        return;
    }

    const question = shuffledTermQuestions[currentTermQuizIndex];

    termQuizDefinitionElement.textContent = question.definition;

    const shuffledOptions = shuffleArray([...question.options]);
    const optionButtons = termQuizOptionsElement.querySelectorAll('.quiz-btn');

    termQuizOptionsElement.style.display = 'flex'; // Ensure visible
    optionButtons.forEach((button, i) => {
        button.textContent = shuffledOptions[i];
        button.classList.remove('correct', 'wrong');
        button.disabled = false; // Enable buttons
        button.style.display = 'inline-block'; // Ensure visible
    });

    termFeedbackElement.textContent = ''; // Clear feedback
    termQuizOptionsElement.dataset.correct = question.correctAnswer; // Doğru cevabı data attribute'e kaydet
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
    const correctAnswer = termQuizOptionsElement.dataset.correct; // Data attribute'ten doğru cevabı al
    const optionButtons = termQuizOptionsElement.querySelectorAll('.quiz-btn');

    // Tüm butonları devre dışı bırak (kullanıcı başka bir seçeneğe tıklayamasın)
    optionButtons.forEach(btn => btn.disabled = true);

    if (selectedAnswer === correctAnswer) {
        console.log("Doğru cevap!");
        clickedButton.classList.add('correct');
        termFeedbackElement.textContent = 'Doğru!';
        termFeedbackElement.style.color = 'green';
        // Puanlama logic'i buraya eklenebilir
    } else {
        console.log("Yanlış cevap!");
        clickedButton.classList.add('wrong');
        termFeedbackElement.textContent = `Yanlış. Doğru cevap: ${correctAnswer}`;
        termFeedbackElement.style.color = 'red';
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
        currentTermQuizIndex++; // Bir sonraki soruya geç

        displayCurrentTermQuestion(); // Yeni soruyu göster veya oyun bittiyse bitir
    }, feedbackDisplayDelay); // Belirlenen gecikme süresi kadar bekle
}

// Oyunu Bitir
function endTermQuizGame() {
    console.log("endTermQuizGame called.");

    // Soru alanlarını gizle veya temizle
    termQuizDefinitionElement.style.display = 'none';
    termQuizOptionsElement.style.display = 'none';
    termFeedbackElement.textContent = ''; // Geri bildirimi temizle

    // Tüm butonları devre dışı bırak (oyun bitti)
    termQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => btn.disabled = true);

    // Tamamlama mesajını göster
    termCompletionMessageElement.textContent = `Tebrikler! Coğrafi Terim oyununu tamamladınız. ${shuffledTermQuestions.length} sorunun tamamını çözdünüz.`;
    termCompletionMessageElement.style.color = '#00796b';
    termCompletionMessageElement.style.display = 'block';

    console.log("Oyun tamamlandı mesajı gösterildi.");
    // İsteğe bağlı: Yeniden başla butonu eklenebilir.
}


// --- Sayfa Yüklendiğinde ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Coğrafi Terim Oyunu başlatılıyor.");

    // Olay dinleyicisini quiz seçenekleri konteynerine ekle (Event Delegation)
    // Bu sayede her butona tek tek listener eklemek yerine, tıklama olayını
    // ebeveyn elementte yakalayabiliriz.
    if (termQuizOptionsElement && !termQuizOptionsElement.dataset.listenerAdded) {
        termQuizOptionsElement.addEventListener('click', handleOptionClick);
        termQuizOptionsElement.dataset.listenerAdded = 'true'; // Listener eklendiğini işaretle
        console.log("Terim quiz options listener eklendi.");
    } else if (!termQuizOptionsElement) {
         console.warn("Terim quiz options elementi bulunamadı, listener eklenemedi.");
    } else {
         console.log("Terim quiz options listener zaten eklenmiş.");
    }


    // Oyunu başlat
    startTermQuizGame();
});


// *** GeoQuest: Türkiye Harita Oyunları JavaScript Dosyası ***
// *** Bu dosya TÜM Türkiye harita oyunlarının logic'ini içerir (Volkan, Masif). ***
// *** Her oyun kendi harita görselini kullanır ve hotspotları dinamik olarak oluşturulur. ***

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

// --- Soru Havuzları ---
// Dikkat: Koordinatlar, sizin sağladığınız '2a-turkiye-fiziki-haritasi.jpg' görseline göre manuel olarak oluşturulmuştur.
// Bu koordinatların doğruluğu kullanılan görsele bağlıdır.
// Masif koordinatları, sağladığınız image_786b45.jpg görselindeki numaralara göre tahmin edilmiştir.

// Türkiye Volkanik Dağları Görevleri Havuzu
const turkeyVolcanoQuestions = [
    { locationName: 'Ağrı Dağı', hotspotCoords: { top: '28%', left: '95%' } },
    { locationName: 'Süphan', hotspotCoords: { top: '41%', left: '90%' } },
    { locationName: 'Nemrut (Bitlis)', hotspotCoords: { top: '43%', left: '89%' } },
    { locationName: 'Tendürek', hotspotCoords: { top: '34%', left: '94%' } },
    { locationName: 'Erciyes', hotspotCoords: { top: '48%', left: '50%' } },
    { locationName: 'Melendiz', hotspotCoords: { top: '55%', left: '46%' } },
    { locationName: 'Hasan D.', hotspotCoords: { top: '53%', left: '44%' } },
    { locationName: 'Karadağ (Karaman)', hotspotCoords: { top: '61%', left: '38%' } },
    { locationName: 'Karacadağ (Merkez)', hotspotCoords: { top: '56%', left: '42%' } },
    { locationName: 'Karacadağ (Doğu)', hotspotCoords: { top: '56%', left: '74%' } },
    { locationName: 'Kula Konileri', hotspotCoords: { top: '55%', left: '20%' } },
];

// Türkiye Masifleri Görevleri Havuzu (image_786b45.jpg görseline göre tahmin edilen koordinatlar)
const turkeyMassifQuestions = [
    { locationName: 'Yıldız Dağları Masifi', hotspotCoords: { top: '7%', left: '12%' } }, // 1
    { locationName: 'Zonguldak Masifi', hotspotCoords: { top: '14%', left: '32%' } }, // 2
    { locationName: 'Kastamonu - Devrekani', hotspotCoords: { top: '12%', left: '40%' } }, // 3
    { locationName: 'Kırşehir Masifi', hotspotCoords: { top: '42%', left: '44%' } }, // 4
    { locationName: 'Bitlis Masifi', hotspotCoords: { top: '49%', left: '91%' } }, // 5
    { locationName: 'Mardin (Eşiği) Masifi', hotspotCoords: { top: '62%', left: '84%' } }, // 6
    { locationName: 'Anamur Masifi', hotspotCoords: { top: '77%', left: '36%' } }, // 7
    { locationName: 'Menteşe - Saruhan Masifi', hotspotCoords: { top: '60%', left: '13%' } }, // 8
];


// --- Element Referansları ---
// Her oyun için ayrı element referansları
const volcanoGameElements = {
    container: document.querySelector('.volcano-map-game'),
    description: document.querySelector('.volcano-map-game .game-description'),
    mapContainer: document.querySelector('.volcano-map-game .turkey-map-container'),
    mapImage: document.querySelector('.volcano-map-game .turkey-map-image'),
    feedback: document.querySelector('.volcano-map-game .game-feedback'),
    completionMessage: document.querySelector('.volcano-map-game .game-completion-message')
};

const massifGameElements = {
    container: document.querySelector('.massif-map-game'),
    description: document.querySelector('.massif-map-game .game-description'),
    mapContainer: document.querySelector('.massif-map-game .turkey-map-container'),
    mapImage: document.querySelector('.massif-map-game .turkey-map-image'),
    feedback: document.querySelector('.massif-map-game .game-feedback'),
    completionMessage: document.querySelector('.massif-map-game .game-completion-message')
};


// --- Oyun Durumu ---
// Her oyun için ayrı durum değişkenleri
let currentVolcanoQuestionIndex = 0;
let shuffledVolcanoQuestions = [];
let currentMassifQuestionIndex = 0;
let shuffledMassifQuestions = [];

let isProcessingClick = false; // Tıklama işleminin devam edip etmediğini kontrol et

// --- Oyun Logic ---

// Belirli bir oyun için hotspotları kurma fonksiyonu
function setupHotspotsForGame(gameElements, questions) {
    console.log(`Setting up hotspots for game: ${gameElements.container.classList[2]}`); // Log game class

    const mapContainer = gameElements.mapContainer;
    const mapImage = gameElements.mapImage;
    const feedbackElement = gameElements.feedback;

    if (!gameElements.container || !mapContainer || !mapImage || !feedbackElement) {
        console.error(`HATA: Hotspot kurulumu için gerekli elementler eksik for game: ${gameElements.container ? gameElements.container.classList[2] : 'Unknown'}.`);
        if(feedbackElement) {
            feedbackElement.textContent = "Oyun kurulum hatası (Elementler eksik).";
            feedbackElement.style.color = 'red';
        }
        return false; // Kurulum başarısız
    }

    // Önceki hotspotları temizle
    mapContainer.querySelectorAll('.map-hotspot').forEach(hotspot => hotspot.remove());
    console.log(`Existing hotspots cleared for game: ${gameElements.container.classList[2]}.`);

    // Hotspotları oluştur, konumlandır ve ekle
    questions.forEach((locationData, index) => {
        const hotspot = document.createElement('div');
        hotspot.classList.add('map-hotspot');
        hotspot.classList.add(`${gameElements.container.classList[2]}-hotspot`); // Oyuna özel sınıf ekle (örn: volcano-map-game-hotspot)
        hotspot.id = `${gameElements.container.classList[2]}-hotspot-${index}`; // Oyuna özel ID

        hotspot.dataset.locationName = locationData.locationName; // Konum adını kaydet

        hotspot.style.position = 'absolute';
        hotspot.style.top = locationData.hotspotCoords.top;
        hotspot.style.left = locationData.hotspotCoords.left;
        hotspot.style.display = 'block'; // Görünür yap
        // Hotspot boyutunu ve görünümünü style.css dosyasında tanımlayın
        // Örnek: .map-hotspot { width: 20px; height: 20px; background-color: red; border-radius: 50%; cursor: pointer; }


        mapContainer.appendChild(hotspot);
    });
    console.log(`${questions.length} hotspots created and added for game: ${gameElements.container.classList[2]}.`);

    // Tıklama dinleyicisini harita konteynerine ekle (Event Delegation)
    // Listener'ı sadece bir kere eklediğimizden emin olalım
    // Her harita konteyneri için ayrı bir listener eklemek yerine,
    // tek bir listener'ı ortak bir ebeveyn elemente (örneğin .game-area-section)
    // eklemek daha verimli olabilir. Ancak mevcut yapıda her mapContainer'a
    // listener ekliyoruz, bu da çalışacaktır.
    if (!mapContainer.dataset.listenerAdded) {
         mapContainer.addEventListener('click', handleHotspotClick);
         mapContainer.dataset.listenerAdded = 'true'; // Listener eklendiğini işaretle
         console.log(`Click event listener added to map container for game: ${gameElements.container.classList[2]}.`);
    } else {
        console.log(`Click event listener already added for map container for game: ${gameElements.container.classList[2]}.`);
    }

     // Harita konteynerinin tıklanabilir olduğundan emin ol
     mapContainer.style.pointerEvents = 'auto';

    return true; // Kurulum başarılı
}

// Belirli bir oyunun mevcut sorusunu gösterme fonksiyonu
function displayCurrentQuestionForGame(gameElements, questions, currentIndex) {
     console.log(`Displaying question ${currentIndex + 1}/${questions.length} for game: ${gameElements.container.classList[2]}.`);

     // Eğer tüm sorular sorulduysa, oyunu bitir
     if (currentIndex >= questions.length) {
          // İlgili oyunun bitirme fonksiyonunu çağır
          if (gameElements.container.classList.contains('volcano-map-game')) endVolcanoMapGame();
          else if (gameElements.container.classList.contains('massif-map-game')) endMassifMapGame();
          return;
     }

     const currentQuestion = questions[currentIndex];
     gameElements.description.textContent = `Haritada gösterilmesi istenen: ${currentQuestion.locationName}`;
     gameElements.feedback.textContent = ''; // Geri bildirimi temizle

     // Tüm hotspotlardan önceki geri bildirim sınıflarını (doğru/yanlış renkleri) temizle
     // Sadece ilgili oyunun hotspotlarını temizle
     gameElements.mapContainer.querySelectorAll('.map-hotspot').forEach(h => h.classList.remove('correct', 'wrong'));

     console.log(`Question text updated for game: ${gameElements.container.classList[2]} - ${currentQuestion.locationName}`);
}


// Tıklama olayını yöneten fonksiyon (Tüm harita oyunları için tek dinleyici)
function handleHotspotClick(event) {
    console.log("Harita konteynerinde tıklama algılandı.");

    if (isProcessingClick) {
        console.log("Tıklama işlemi devam ediyor, yeni tıklama yoksayılıyor.");
        return;
    }

    const clickedHotspot = event.target.closest('.map-hotspot');

    // Sadece bir .map-hotspot elementine tıklandıysa devam et
    if (!clickedHotspot) {
        console.log("Tıklanan hotspot elementi değil.");
        return;
    }

    isProcessingClick = true; // Tıklama işlemeye başla
    console.log("Hotspot tıklaması işleniyor...");

    // Hangi oyuna ait hotspota tıklandığını belirle
    // Tıklanan hotspotun ebeveyn .map-challenge-example elementini bul
    const parentGameContainer = clickedHotspot.closest('.map-challenge-example');

    if (!parentGameContainer) {
        console.error("HATA: Tıklanan hotspot bir oyun konteyneri içinde değil.");
        isProcessingClick = false;
        return;
    }

    let gameElements, questions, currentIndex;

    // Ebeveyn konteynerin sınıfına göre hangi oyun olduğunu belirle
    if (parentGameContainer.classList.contains('volcano-map-game')) {
        gameElements = volcanoGameElements;
        questions = shuffledVolcanoQuestions;
        currentIndex = currentVolcanoQuestionIndex;
    } else if (parentGameContainer.classList.contains('massif-map-game')) {
        gameElements = massifGameElements;
        questions = shuffledMassifQuestions;
        currentIndex = currentMassifQuestionIndex;
    } else {
        console.error("HATA: Tıklanan hotspot bilinmeyen bir oyun konteynerinde.");
        isProcessingClick = false;
        return;
    }

     // Eğer ilgili oyunun tüm soruları zaten sorulduysa, bu tıklamayı yoksay
     if (currentIndex >= questions.length) {
         console.log(`Tıklanan oyun (${parentGameContainer.classList[2]}) zaten tamamlanmış.`);
         isProcessingClick = false;
         return;
     }

    // Mevcut soruya ait doğru konumu al
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) {
         console.error(`HATA: Mevcut soru bulunamadı (Index: ${currentIndex}, Game: ${parentGameContainer.classList[2]}).`);
         isProcessingClick = false;
         return;
    }
    const currentCorrectLocation = currentQuestion.locationName;
    const clickedLocationName = clickedHotspot.dataset.locationName;


    console.log(`Game: ${parentGameContainer.classList[2]}, Tıklanan: ${clickedLocationName}, Doğru: ${currentCorrectLocation}`);

    // Geri bildirim alanını temizle ve sınıfları kaldır
    // Sadece ilgili oyunun feedback elementini kullan
    gameElements.feedback.textContent = '';
    gameElements.mapContainer.querySelectorAll('.map-hotspot').forEach(h => h.classList.remove('correct', 'wrong'));


    if (clickedLocationName === currentCorrectLocation) {
        console.log("Doğru cevap!");
        clickedHotspot.classList.add('correct');
        gameElements.feedback.textContent = `Doğru! Burası ${currentCorrectLocation}.`;
        gameElements.feedback.style.color = 'green';
    } else {
        console.log("Yanlış cevap!");
        clickedHotspot.classList.add('wrong');
        gameElements.feedback.textContent = `Yanlış. Doğru cevap ${currentCorrectLocation} idi.`;
        gameElements.feedback.style.color = 'red';

        // Doğru hotspotu işaretle
        const correctHotspotElement = gameElements.mapContainer.querySelector(`.map-hotspot[data-location-name="${currentCorrectLocation}"]`);
        if(correctHotspotElement) {
            correctHotspotElement.classList.add('correct');
            console.log("Doğru hotspot işaretlendi.");
        } else {
             console.error(`HATA: Doğru hotspota karşılık gelen element bulunamadı (data-location-name: ${currentCorrectLocation}).`);
        }
    }

    // Kısa bir gecikmeden sonra bir sonraki soruya geçişi yönet
    setTimeout(() => {
        // Geri bildirim sınıflarını kaldır
        gameElements.mapContainer.querySelectorAll('.map-hotspot').forEach(h => h.classList.remove('correct', 'wrong'));

        // İlgili oyunun indexini artır
        if (parentGameContainer.classList.contains('volcano-map-game')) {
            currentVolcanoQuestionIndex++;
            displayCurrentQuestionForGame(volcanoGameElements, shuffledVolcanoQuestions, currentVolcanoQuestionIndex);
        } else if (parentGameContainer.classList.contains('massif-map-game')) {
            currentMassifQuestionIndex++;
            displayCurrentQuestionForGame(massifGameElements, shuffledMassifQuestions, currentMassifQuestionIndex);
        }

        isProcessingClick = false; // İşlem bitti

    }, feedbackDisplayDelay);
}


// Oyun Başlatma Fonksiyonları (Her oyun için ayrı)
function startVolcanoMapGame() {
    console.log("startVolcanoMapGame called.");
     if (!volcanoGameElements.container) { console.warn("Volcano game container not found."); return; }
    shuffledVolcanoQuestions = shuffleArray([...turkeyVolcanoQuestions]);
    currentVolcanoQuestionIndex = 0;
    volcanoGameElements.completionMessage.style.display = 'none';
    volcanoGameElements.feedback.textContent = '';

     // Harita görselinin yüklenmesini bekle, sonra hotspotları oluştur
     // Harita zaten yüklüyse hemen hotspotları kur, yoksa 'load' eventini bekle
     if (volcanoGameElements.mapImage && volcanoGameElements.mapImage.complete) {
          console.log("Volcano map image already loaded.");
          if(setupHotspotsForGame(volcanoGameElements, shuffledVolcanoQuestions)) {
              displayCurrentQuestionForGame(volcanoGameElements, shuffledVolcanoQuestions, currentVolcanoQuestionIndex);
          }
     } else if (volcanoGameElements.mapImage) {
          console.log("Volcano map image loading, waiting for 'load' event.");
          volcanoGameElements.mapImage.addEventListener('load', () => {
               console.log("Volcano map image loaded.");
               if(setupHotspotsForGame(volcanoGameElements, shuffledVolcanoQuestions)) {
                   displayCurrentQuestionForGame(volcanoGameElements, shuffledVolcanoQuestions, currentVolcanoQuestionIndex);
               }
          });
           volcanoGameElements.mapImage.addEventListener('error', () => {
              console.error("HATA: Volcano map image failed to load.");
               if(volcanoGameElements.feedback) {
                   volcanoGameElements.feedback.textContent = "Harita görseli yüklenemedi.";
                   volcanoGameElements.feedback.style.color = 'red';
                   if(volcanoGameElements.mapContainer) volcanoGameElements.mapContainer.style.pointerEvents = 'none'; // Haritayı tıklanamaz yap
               }
          });
     } else {
          console.error("Volcano map image element not found.");
           if(volcanoGameElements.feedback) {
               volcanoGameElements.feedback.textContent = "Oyun elementleri bulunamadı.";
               volcanoGameElements.feedback.style.color = 'red';
           }
     }
}

function startMassifMapGame() {
    console.log("startMassifMapGame called.");
     if (!massifGameElements.container) { console.warn("Massif game container not found."); return; }
    shuffledMassifQuestions = shuffleArray([...turkeyMassifQuestions]);
    currentMassifQuestionIndex = 0;
    massifGameElements.completionMessage.style.display = 'none';
    massifGameElements.feedback.textContent = '';

     // Harita görselinin yüklenmesini bekle, sonra hotspotları oluştur
     if (massifGameElements.mapImage && massifGameElements.mapImage.complete) {
          console.log("Massif map image already loaded.");
          if(setupHotspotsForGame(massifGameElements, shuffledMassifQuestions)) {
              displayCurrentQuestionForGame(massifGameElements, shuffledMassifQuestions, currentMassifQuestionIndex);
          }
     } else if (massifGameElements.mapImage) {
          console.log("Massif map image loading, waiting for 'load' event.");
          massifGameElements.mapImage.addEventListener('load', () => {
               console.log("Massif map image loaded.");
               if(setupHotspotsForGame(massifGameElements, shuffledMassifQuestions)) {
                   displayCurrentQuestionForGame(massifGameElements, shuffledMassifQuestions, currentMassifQuestionIndex);
               }
          });
           massifGameElements.mapImage.addEventListener('error', () => {
              console.error("HATA: Massif map image failed to load.");
               if(massifGameElements.feedback) {
                   massifGameElements.feedback.textContent = "Harita görseli yüklenemedi.";
                   massifGameElements.feedback.style.color = 'red';
                   if(massifGameElements.mapContainer) massifGameElements.mapContainer.style.pointerEvents = 'none'; // Haritayı tıklanamaz yap
               }
          });
     } else {
          console.error("Massif map image element not found.");
           if(massifGameElements.feedback) {
               massifGameElements.feedback.textContent = "Oyun elementleri bulunamadı.";
               massifGameElements.feedback.style.color = 'red';
           }
     }
}


// Oyun Bitirme Fonksiyonları (Her oyun için ayrı)
function endVolcanoMapGame() {
    console.log("endVolcanoMapGame called.");
    if (!volcanoGameElements.container) return;
    volcanoGameElements.description.textContent = '';
    volcanoGameElements.feedback.textContent = '';
    if(volcanoGameElements.mapContainer) {
        // Hotspotları gizle ve tıklamayı devre dışı bırak
        volcanoGameElements.mapContainer.querySelectorAll('.map-hotspot').forEach(hotspot => hotspot.style.display = 'none');
        volcanoGameElements.mapContainer.style.pointerEvents = 'none';
    }
    volcanoGameElements.completionMessage.textContent = `Tebrikler! Türkiye Volkanik Dağları Görevini tamamladınız. ${shuffledVolcanoQuestions.length} sorunun tamamını çözdünüz.`;
    volcanoGameElements.completionMessage.style.color = '#00796b';
    volcanoGameElements.completionMessage.style.display = 'block';
    console.log("Volcano game completed.");
}

function endMassifMapGame() {
    console.log("endMassifMapGame called.");
    if (!massifGameElements.container) return;
    massifGameElements.description.textContent = '';
    massifGameElements.feedback.textContent = '';
     if(massifGameElements.mapContainer) {
        // Hotspotları gizle ve tıklamayı devre dışı bırak
        massifGameElements.mapContainer.querySelectorAll('.map-hotspot').forEach(hotspot => hotspot.style.display = 'none');
        massifGameElements.mapContainer.style.pointerEvents = 'none';
     }
    massifGameElements.completionMessage.textContent = `Tebrikler! Türkiye Masifleri Görevini tamamladınız. ${shuffledMassifQuestions.length} sorunun tamamını çözdünüz.`;
    massifGameElements.completionMessage.style.color = '#00796b';
    massifGameElements.completionMessage.style.display = 'block';
    console.log("Massif game completed.");
}


// Sayfa yüklendiğinde tüm harita oyunlarını başlat
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Tüm Türkiye Harita Oyunları başlatılıyor.");
    startVolcanoMapGame();
    startMassifMapGame();
});


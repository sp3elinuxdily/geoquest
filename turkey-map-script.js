// *** Bu dosya SADECE Türkiye Volkanik Dağları Haritası Görevi oyununa ait JavaScript kodunu içerir. ***
// *** Bu versiyon, harita görselini kullanır ve TÜM volkan konumlarını aynı anda gösterir. ***

// Yardımcı Fonksiyon: Diziyi Karıştırma
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

// TÜRKİYE VOLKANİK DAĞLARI GÖREVLERİ HAVUZU
// Dikkat: Koordinatlar, sizin sağladığınız son listeye ve muhtemelen 'image_edce81.jpg' görseline göre manuel olarak oluşturulmuştur.
// Bu dizi YALNIZCA o görselde işaretli ve sizin belirttiğiniz dağları içermektedir.
const turkeyVolcanoQuestions = [ // Sadece volkanları içeren liste
    { locationName: 'Ağrı Dağı', hotspotCoords: { top: '28%', left: '95%' } }, // image_edce81.jpg tahmini
    { locationName: 'Süphan', hotspotCoords: { top: '41%', left: '90%' } }, // image_edce81.jpg tahmini
    { locationName: 'Nemrut (Bitlis)', hotspotCoords: { top: '43%', left: '89%' } }, // image_edce81.jpg tahmini
    { locationName: 'Tendürek', hotspotCoords: { top: '34%', left: '94%' } }, // image_edce81.jpg tahmini
    { locationName: 'Erciyes', hotspotCoords: { top: '48%', left: '50%' } }, // image_edce81.jpg tahmini
    { locationName: 'Melendiz', hotspotCoords: { top: '55%', left: '46%' } }, // image_edce81.jpg tahmini
    { locationName: 'Hasan D.', hotspotCoords: { top: '53%', left: '44%' } }, // image_edce81.jpg tahmini (Hasan Dağı)
    { locationName: 'Karadağ (Karaman)', hotspotCoords: { top: '61%', left: '38%' } }, // image_edce81.jpg tahmini
    { locationName: 'Karacadağ (Merkez)', hotspotCoords: { top: '56%', left: '42%' } }, // image_edce81.jpg tahmini (İç Anadolu'ya yakın olan)
    { locationName: 'Karacadağ (Doğu)', hotspotCoords: { top: '56%', left: '74%' } }, // image_edce81.jpg tahmini (Diyarbakır/Şanlıurfa civarı olan)
    { locationName: 'Kula Konileri', hotspotCoords: { top: '55%', left: '20%' } }, // image_edce81.jpg tahmini (Kula Volkanları alanı)
    // BURAYA { locationName: 'Yeni Dağ Adı', hotspotCoords: { top: 'Y%', left: 'X%' } }, şeklinde yeni yanardağlar ekleyebilirsiniz.
    // Y ve X değerlerini kullanacağınız harita görseline bakarak belirlemelisiniz.
];


// --- Element Seçimi ---
const mapChallengeExample = document.querySelector('.map-challenge-example'); // Ana oyun kutusu (Harita görselini ve hotspotları içeren div)
let mapChallengeDescriptionElement, turkeyMapContainer, mapChallengeFeedbackElement, mapCompletionMessageElement, turkeyMapImage;

// Ana konteyner bulunduğunda içindeki elementleri seç
if (mapChallengeExample) {
    mapChallengeDescriptionElement = mapChallengeExample.querySelector('.map-challenge-description');
    turkeyMapContainer = mapChallengeExample.querySelector('.turkey-map-container'); // Hotspotları buraya ekleyeceğiz
    mapChallengeFeedbackElement = mapChallengeExample.querySelector('.map-challenge-feedback');
    mapCompletionMessageElement = mapChallengeExample.querySelector('.map-completion-message');

    // Harita konteyneri bulunduğunda içindeki görseli seç
    if (turkeyMapContainer) {
        turkeyMapImage = turkeyMapContainer.querySelector('.turkey-map-image');
        // Tek hotspot elementi artık HTML'de yok, dinamik oluşturulacak
    }
}


// --- Oyun Durumu ve Yönetimi ---
let currentVolcanoQuestionIndex = 0; // Volkan oyunu için soru indexi
let shuffledVolcanoQuestions = []; // Oyun sırasında sorulacak volkanlar listesi (turkeyVolcanoQuestions listesinin karıştırılmış hali)
let isProcessingClick = false; // Tıklama işleminin devam edip etmediğini kontrol et (birden çok tıklamayı engeller)


// Oyun Başlatma/Hazırlık
function startVolcanoMapGame() { // Volkan oyunu için başlangıç fonksiyonu
    console.log("startVolcanoMapGame çağrıldı."); // Konsol kaydı

     // Gerekli tüm elementlerin HTML'de var olduğunu kontrol et
     if (!mapChallengeExample || !mapChallengeDescriptionElement || !turkeyMapContainer || !mapChallengeFeedbackElement || !mapCompletionMessageElement || !turkeyMapImage) {
         console.error("Türkiye Volkan Haritası oyunu başlatılamadı: Gerekli elementler eksik. HTML yapısını kontrol edin."); // Hata kaydı
         if(mapChallengeFeedbackElement) {
             mapChallengeFeedbackElement.textContent = "Oyun yüklenirken bir hata oluştu (Elementler eksik). Lütfen konsolu kontrol edin.";
             mapChallengeFeedbackElement.style.color = 'red';
         }
         return; // Elementler yoksa fonksiyonu çalıştırma
     }

     // Sorulacak volkanları belirle ve karıştır (Listenin bir kopyasını alıp karıştırıyoruz)
     shuffledVolcanoQuestions = shuffleArray([...turkeyVolcanoQuestions]);
     currentVolcanoQuestionIndex = 0; // Soru sayacını sıfırla

     mapCompletionMessageElement.style.display = 'none'; // Önceki oyunun bitiş mesajını gizle
     mapChallengeFeedbackElement.textContent = ''; // Önceki geri bildirimi temizle

     // Harita görselinin yüklenmesini bekle, sonra hotspotları oluştur ve oyunu başlat
     if (turkeyMapImage.complete) { // Görsel zaten yüklenmişse
         console.log("Harita görseli zaten yüklü."); // Konsol kaydı
         setupHotspotsAndStartVolcanoGame(); // Hotspotları oluştur ve oyunu başlat
     } else { // Görsel henüz yüklenmemişse
         console.log("Harita görseli yükleniyor, bekle."); // Konsol kaydı
         turkeyMapImage.addEventListener('load', () => {
             console.log("Harita görseli yüklendi."); // Konsol kaydı
             setupHotspotsAndStartVolcanoGame(); // Hotspotları oluştur ve oyunu başlat
         });
          // Görsel yüklenemezse hata logla ve kullanıcıya bildir
         turkeyMapImage.addEventListener('error', () => {
             console.error("HATA: Türkiye Harita görseli yüklenemedi:", turkeyMapImage.src); // Hata kaydı
             if(mapChallengeFeedbackElement) {
                 mapChallengeFeedbackElement.textContent = "Harita görseli yüklenemedi. Lütfen daha sonra tekrar deneyin veya internet bağlantınızı kontrol edin.";
                 mapChallengeFeedbackElement.style.color = 'red';
                 // Harita alanı tıklanamaz olsun ki oyun oynanmaya çalışılmasın
                 if(turkeyMapContainer) turkeyMapContainer.style.pointerEvents = 'none';
                 console.log("Görsel yükleme hatası nedeniyle oyun devre dışı bırakıldı."); // Konsol kaydı
             }
         });
     }
}

// Hotspotları Haritaya Yerleştirme, Tıklama Dinleyicisini Ekleme ve Oyunu Başlatma
function setupHotspotsAndStartVolcanoGame() { // Kurulum fonksiyonu
     console.log("setupHotspotsAndStartVolcanoGame çağrıldı. Hotspotlar oluşturuluyor."); // Konsol kaydı
     // Gerekli elementlerin hala var olduğunu kontrol et
     if (!mapChallengeExample || !turkeyMapContainer) {
          console.error("HATA: Hotspot kurulumu için gerekli elementler eksik (.map-challenge-example veya .turkey-map-container)."); // Hata kaydı
          return;
     }

    // Önceki hotspotları temizle (Sayfa yenilenmeden tekrar başlatılırsa)
    mapChallengeExample.querySelectorAll('.map-hotspot').forEach(hotspot => hotspot.remove());
    console.log("Mevcut hotspotlar temizlendi."); // Konsol kaydı


    // Her volkan konumu için bir hotspot oluştur, konumlandır ve haritaya ekle
    turkeyVolcanoQuestions.forEach((locationData, index) => { // Volkan listesini kullanıyoruz
        const hotspot = document.createElement('div');
        hotspot.classList.add('map-hotspot'); // CSS stil sınıfı

        // Her hotspota hangi volkan konumunu temsil ettiğini belirten bir data attribute ekle
        // Bu, tıklama olayında hangi noktanın tıklandığını anlamamızı sağlar
        hotspot.dataset.locationName = locationData.locationName;

        // Konumunu ayarla (Koordinatları kullan)
        hotspot.style.top = locationData.hotspotCoords.top;
        hotspot.style.left = locationData.hotspotCoords.left;

        // Hotspotu görünür yap (CSS'inizde başlangıçta display: none olabilir)
        hotspot.style.display = 'block'; // veya 'flex' vb. hotspotun nasıl görünmesini istiyorsanız


        // Oluşturulan hotspotu harita konteynerine ekle
        if(turkeyMapContainer) {
            turkeyMapContainer.appendChild(hotspot);
        } else {
             console.error("HATA: Hotspotlar eklenemiyor, .turkey-map-container elementi bulunamadı."); // Hata kaydı
             // Konteyner yoksa hata mesajı gösterilmeli ve oyun başlatılmamalı
             if(mapChallengeFeedbackElement) {
                 mapChallengeFeedbackElement.textContent = "Oyun kurulum hatası (Harita alanı bulunamadı).";
                 mapChallengeFeedbackElement.style.color = 'red';
             }
             return; // Konteyner yoksa bu fonksiyonu burada bitir
        }
    });
    console.log(`${turkeyVolcanoQuestions.length} adet hotspot oluşturuldu ve haritaya eklendi.`); // Konsol kaydı


    // Tek bir olay dinleyicisini harita konteynerine ekle (Event Delegation)
    // Bu yöntem, her bir hotspota ayrı ayrı tıklama dinleyicisi eklemek yerine daha verimlidir.
    // Tıklama olayı konteynerde yakalanır ve olayın nereden geldiği bulunur.
    // Listener'ı sadece bir kere eklediğimizden emin olalım (Sayfa yenilenmeden fonksiyon tekrar çağrılırsa)
    if(turkeyMapContainer && !turkeyMapContainer.dataset.listenerAdded) {
         turkeyMapContainer.addEventListener('click', handleHotspotClick);
         turkeyMapContainer.dataset.listenerAdded = 'true'; // Listener eklendiğini işaretle
         console.log("Harita konteynerine tıklama event listener'ı eklendi."); // Konsol kaydı
    } else if (turkeyMapContainer) {
        console.log("Harita konteyneri bulundu ancak listener zaten eklenmiş."); // Konsol kaydı
         // Hotspotlar eklendi, konteyner tıklanabilir hale getirilmeli (eğer hata nedeniyle devre dışı kaldıysa)
         turkeyMapContainer.style.pointerEvents = 'auto';
    }


    // Hotspotlar haritaya yerleştirildi. Şimdi ilk soruyu göstererek oyunu başlat
    displayCurrentVolcanoQuestion(); // İlk soruyu gösterme fonksiyonunu çağır
}

// Tıklama olayını yöneten fonksiyon (Event Delegation tarafından yakalanan tıklamaları işler)
function handleHotspotClick(event) {
    console.log("Harita konteynerinde tıklama algılandı."); // Konsol kaydı
     // Eğer tıklama işleniyorsa (yani önceki cevabın geri bildirimi bekleniyorsa) yeni tıklamayı yoksay
    if (isProcessingClick) {
        console.log("Tıklama işlemi devam ediyor, yeni tıklama yoksayılıyor."); // Konsol kaydı
        return;
    }

    // Tıklanan elementin bir hotspot olup olmadığını kontrol et
    // event.target en içteki tıklanan elementtir. .closest('.map-hotspot') ile en yakın ebeveyn hotspota bakarız.
    const clickedHotspot = event.target.closest('.map-hotspot');

    // Eğer tıklanan element bir hotspot değilse (örneğin haritanın boş bir yerine tıklandıysa) dur
    if (!clickedHotspot) {
        console.log("Tıklanan hotspot elementi değil (Haritanın boş alanına tıklandı)."); // Konsol kaydı
        // İsteğe bağlı olarak "Yanlış yer!" gibi bir geri bildirim verilebilir.
        // mapChallengeFeedbackElement.textContent = "Bir noktaya tıklayın.";
        // mapChallengeFeedbackElement.style.color = 'orange';
        return;
    }

    // Tıklanan element bir hotspot! Tıklama işlemeye başla
    isProcessingClick = true;
     console.log("Hotspot tıklaması işleniyor..."); // Konsol kaydı

    // Tıklanan hotspotun temsil ettiği konumun adını al
    const clickedLocationName = clickedHotspot.dataset.locationName;
    // Şu anki sorunun doğru cevabını al
    const currentCorrectLocation = shuffledVolcanoQuestions[currentVolcanoQuestionIndex].locationName; // Karıştırılmış sorulardan doğru cevabı al

    console.log("Tıklanan Hotspot:", clickedLocationName, "Doğru cevap:", currentCorrectLocation); // Konsol kaydı

    // Geri bildirim alanını temizle
    mapChallengeFeedbackElement.textContent = '';
    // Tüm hotspotlardan önceki geri bildirim sınıflarını (doğru/yanlış renkleri) temizle
     mapChallengeExample.querySelectorAll('.map-hotspot').forEach(h => h.classList.remove('correct', 'wrong'));


    if (clickedLocationName === currentCorrectLocation) {
        // Doğru Cevap!
        console.log("Doğru cevap!"); // Konsol kaydı
        clickedHotspot.classList.add('correct'); // Tıklanan hotspota doğru stilini ekle
        mapChallengeFeedbackElement.textContent = `Doğru! Burası ${currentCorrectLocation}.`;
        mapChallengeFeedbackElement.style.color = 'green';
        // Skoru artırma mantığı buraya eklenebilir (eğer puanlama sistemi varsa)

    } else {
        // Yanlış Cevap!
        console.log("Yanlış cevap!"); // Konsol kaydı
        clickedHotspot.classList.add('wrong'); // Tıklanan hotspota yanlış stilini ekle
        mapChallengeFeedbackElement.textContent = `Yanlış. Doğru cevap ${currentCorrectLocation} idi.`;
        mapChallengeFeedbackElement.style.color = 'red';

        // Kullanıcıya doğru hotspotu da gösterelim (doğru olana yeşil stil ekle)
        // Doğru hotspotun dataset.locationName'i currentCorrectLocation ile eşleşen hotspotu bul
        const correctHotspotElement = mapChallengeExample.querySelector(`.map-hotspot[data-location-name="${currentCorrectLocation}"]`);
        if(correctHotspotElement) {
            correctHotspotElement.classList.add('correct'); // Doğru olana yeşil stilini ekle
             console.log("Doğru hotspot işaretlendi."); // Konsol kaydı
        } else {
             console.error("HATA: Doğru hotspota karşılık gelen element bulunamadı (data-location-name:", currentCorrectLocation, "). Listenizi ve element data attribute'lerini kontrol edin."); // Hata kaydı
        }
    }

    // Kısa bir gecikmeden sonra bir sonraki soruya geçişi yönet
    setTimeout(() => {
        // Geri bildirim sınıflarını hotspotlardan kaldır (bir sonraki soruya geçerken temiz kalsınlar)
        mapChallengeExample.querySelectorAll('.map-hotspot').forEach(h => h.classList.remove('correct', 'wrong'));

        currentVolcanoQuestionIndex++; // Bir sonraki soruya geç

        // Tıklama işlemeyi serbest bırak (Yeni tıklamaları kabul etmeye başla)
        isProcessingClick = false;

        // Yeni soruyu göster veya oyun bittiyse bitir
        if (currentVolcanoQuestionIndex < shuffledVolcanoQuestions.length) {
            displayCurrentVolcanoQuestion(); // Yeni soruyu gösterme fonksiyonunu çağır
        } else {
            endVolcanoMapGame(); // Tüm sorular bitti, oyunu bitir
        }
    }, feedbackDisplayDelay); // Belirlenen gecikme süresi kadar bekle
}


// Mevcut soruyu göster (Sadece soru metni değişir, hotspotlar zaten haritada görünürdür)
function displayCurrentVolcanoQuestion() { // Mevcut soruyu görüntüleme fonksiyonu
     console.log("displayCurrentVolcanoQuestion çağrıldı, şu anki soru indexi:", currentVolcanoQuestionIndex); // Konsol kaydı
     // Eğer tüm sorular sorulduysa, oyunu bitir
     if (currentVolcanoQuestionIndex >= shuffledVolcanoQuestions.length) {
          endVolcanoMapGame(); // Oyun bitirme fonksiyonunu çağır
          return;
     }

     // Şu anki soruyu (karıştırılmış listeden) al
     const currentQuestion = shuffledVolcanoQuestions[currentVolcanoQuestionIndex];
     // Oyun alanındaki soru metnini güncelle
     mapChallengeDescriptionElement.textContent = `Haritada gösterilmesi istenen volkanik dağ: ${currentQuestion.locationName}`; // Soru metni güncellendi
     // Geri bildirim alanını temizle
     mapChallengeFeedbackElement.textContent = '';
     console.log("Soru metni güncellendi:", currentQuestion.locationName); // Konsol kaydı

     // Tüm hotspotların tıklanabilir olduğundan emin olmak için (isProcessingClick false olduğunda zaten tıklanabilirler)
     // Görsel olarak tüm hotspotlar zaten görünür durumda kalır.
}


// Oyunu Bitir
function endVolcanoMapGame() { // Oyun bitirme fonksiyonu
    console.log("endVolcanoMapGame çağrıldı."); // Konsol kaydı
     // Gerekli elementlerin var olduğunu kontrol et
     if (!mapChallengeExample || !mapCompletionMessageElement || !turkeyMapContainer) return;

    // Soru metnini ve geri bildirimi temizle
    mapChallengeDescriptionElement.textContent = '';
    mapChallengeFeedbackElement.textContent = '';

    // Tüm hotspotları haritadan kaldır veya gizle (tercihe göre)
    mapChallengeExample.querySelectorAll('.map-hotspot').forEach(hotspot => hotspot.style.display = 'none'); // Hotspotları gizle (remove() da kullanılabilir)
    console.log("Tüm hotspotlar gizlendi."); // Konsol kaydı

    // Oyun tamamlama mesajını göster
    // shuffledVolcanoQuestions.length, sorulan toplam soru sayısıdır.
    mapCompletionMessageElement.textContent = `Tebrikler! Türkiye Volkanik Dağları Görevini tamamladınız. ${shuffledVolcanoQuestions.length} sorunun tamamını çözdünüz.`; // Bitiş mesajı
    mapCompletionMessageElement.style.color = '#00796b';
    mapCompletionMessageElement.style.display = 'block';

     // Harita konteynerinin tıklanamaz olduğundan emin ol (oyun bittikten sonra)
     turkeyMapContainer.style.pointerEvents = 'none';
     console.log("Harita alanı tıklanamaz hale getirildi."); // Konsol kaydı


     // İsteğe bağlı: Oyunu yeniden başlatma butonu eklemek isterseniz buraya logic eklenir.
     // Şu an yeniden başlatma sayfa yenilenerek yapılabilir.
}


// Sayfa yüklendiğinde oyunun başlangıç fonksiyonunu çağır
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOMContentLoaded - Oyun başlatılıyor."); // Konsol kaydı
    startVolcanoMapGame(); // Oyun başlatma fonksiyonunu çağır
});

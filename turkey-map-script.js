// *** Bu dosya SADECE Türkiye Haritası Görevi oyununa ait JavaScript kodunu içerir. ***
// *** Ana oyun mantığı ve diğer quizler script.js dosyasındadır. ***
// *** Bu kod hala tam bir oyun motoru değildir. Soru havuzu 10. sınıf müfredatına uygun olarak genişletildi. ***

// Yardımcı Fonksiyon: Diziyi Karıştırma
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Kısa bekleme süresi (ms)
const displayNextQuestionDelay = 1500; // 1.5 saniye

// TÜRKİYE HARİTASI GÖREVLERİ HAVUZU
// Dikkat: Koordinatlar (top, left) kullanılan harita görseline göre manuel olarak ayarlanmıştır.
// Farklı bir harita görseli kullanırsanız bu koordinatları ayarlamanız gerekir.
// 10. sınıf müfredatına uygun yerler ve volkanlar eklendi.
const turkeyMapQuestions = [
    { locationName: 'Ankara', hotspotCoords: { top: '42%', left: '55%' } },
    { locationName: 'İstanbul', hotspotCoords: { top: '34%', left: '43%' } },
    { locationName: 'İzmir', hotspotCoords: { top: '50%', left: '28%' } },
    { locationName: 'Akdeniz', hotspotCoords: { top: '85%', left: '50%' } }, // Deniz konumu temsili
    { locationName: 'Karadeniz', hotspotCoords: { top: '15%', left: '65%' } }, // Deniz konumu temsili
    { locationName: 'Ege Denizi', hotspotCoords: { top: '65%', left: '20%' } }, // Deniz konumu temsili
    { locationName: 'Marmara Denizi', hotspotCoords: { top: '40%', left: '38%' } }, // Deniz konumu temsili
    { locationName: 'Erciyes Dağı', hotspotCoords: { top: '47%', left: '62%' } }, // Kayseri civarı temsili - Volkanik Dağ
    { locationName: 'Van Gölü', hotspotCoords: { top: '48%', left: '85%' } }, // Van Gölü temsili - Volkanik set gölü
    { locationName: 'Fırat Nehri (Başlangıç)', hotspotCoords: { top: '38%', left: '75%' } }, // Doğu Anadolu temsili
    { locationName: 'Gediz Nehri (Döküldüğü Yer)', hotspotCoords: { top: '53%', left: '28%' } }, // İzmir Körfezi'ne döküldüğü yer temsili
    { locationName: 'Çukurova Deltası', hotspotCoords: { top: '68%', left: '55%' } }, // Adana civarı temsili - Delta Ovası
    { locationName: 'Uludağ', hotspotCoords: { top: '37%', left: '39%' } }, // Bursa civarı temsili - Volkanik değil, kıvrım/masif dağ
    { locationName: 'Tuz Gölü', hotspotCoords: { top: '48%', left: '52%' } }, // Tuz Gölü temsili - Tektonik Göl
    { locationName: 'Antalya Körfezi', hotspotCoords: { top: '72%', left: '45%' } }, // Antalya Körfezi temsili - Körfez
     { locationName: 'Doğu Anadolu Bölgesi (Merkezi)', hotspotCoords: { top: '40%', left: '80%' } }, // Bölge temsili
     { locationName: 'İç Anadolu Bölgesi (Merkezi)', hotspotCoords: { top: '45%', left: '50%' } }, // Bölge temsili
     { locationName: 'Karadeniz Bölgesi (Doğu)', hotspotCoords: { top: '20%', left: '80%' } }, // Bölge temsili
     { locationName: 'Akdeniz Bölgesi (Batı)', hotspotCoords: { top: '70%', left: '38%' } }, // Bölge temsili
     { locationName: 'Gap Bölgesi (Merkezi)', hotspotCoords: { top: '65%', left: '75%' } }, // Bölge temsili
     // Yeni Türkiye Harita Soruları (10. sınıf müfredatına uygun)
     { locationName: 'Ağrı Dağı', hotspotCoords: { top: '38%', left: '90%' } }, // Doğu Anadolu - Volkanik Dağ
     { locationName: 'Nemrut Kalderası (Bitlis)', hotspotCoords: { top: '45%', left: '85%' } }, // Bitlis - Volkanik Dağ & Kaldera
     { locationName: 'Süphan Dağı', hotspotCoords: { top: '45%', left: '87%' } }, // Van Gölü kuzeyi - Volkanik Dağ
     { locationName: 'Hasan Dağı', hotspotCoords: { top: '50%', left: '57%' } }, // Aksaray civarı - Volkanik Dağ
     { locationName: 'Meke Gölü (Acıgöl)', hotspotCoords: { top: '52%', left: '54%' } }, // Konya Karapınar - Maar Gölü
     { locationName: 'Salda Gölü', hotspotCoords: { top: '60%', left: '35%' } }, // Burdur - Tektonik Göl (Önemli jeolojik yapısı var)
     { locationName: 'Manyas (Kuş) Gölü', hotspotCoords: { top: '37%', left: '32%' } }, // Balıkesir - Tektonik Göl
     { locationName: 'Bafa Gölü', hotspotCoords: { top: '62%', left: '25%' } }, // Aydın/Muğla - Alüvyal Set Gölü (eski körfez)
     { locationName: 'Kızılırmak Nehri (Delta)', hotspotCoords: { top: '35%', left: '65%' } }, // Bafra Deltası - Delta Ovası
     { locationName: 'Sakarya Nehri (Denize Döküldüğü Yer)', hotspotCoords: { top: '35%', left: '45%' } }, // Karasu civarı
     { locationName: 'Toros Dağları (Orta Toroslar)', hotspotCoords: { top: '60%', left: '52%' } }, // Akdeniz Bölgesi içi
     { locationName: 'Kaçkar Dağları', hotspotCoords: { top: '25%', left: '80%' } }, // Doğu Karadeniz
     { locationName: 'Amanos Dağları (Nur Dağları)', hotspotCoords: { top: '70%', left: '60%' } }, // Hatay civarı
     { locationName: 'Yıldız (Istranca) Dağları', hotspotCoords: { top: '20%', left: '38%' } }, // Trakya'nın kuzeyi
     { locationName: 'Erzurum-Kars Platosu', hotspotCoords: { top: '35%', left: '85%' } } // Doğu Anadolu
];

const mapChallengeExample = document.querySelector('.map-challenge-example');
// Sayfanın Türkiye Haritası sayfası olduğundan emin olalım
if(mapChallengeExample){
    const mapChallengeDescriptionElement = mapChallengeExample.querySelector('.map-challenge-description');
    const turkeyMapContainer = mapChallengeExample.querySelector('.turkey-map-container');
    const mapHotspotElement = mapChallengeExample.querySelector('.map-hotspot');
    const mapChallengeFeedbackElement = mapChallengeExample.querySelector('.map-challenge-feedback');
    const mapCompletionMessageElement = mapChallengeExample.querySelector('.map-completion-message');
    let currentTurkeyMapIndex = 0;
    let shuffledTurkeyMapQuestions = shuffleArray(turkeyMapQuestions); // Görevleri karıştır

    function displayTurkeyMapChallenge(index) {
        if (index < shuffledTurkeyMapQuestions.length) {
            const question = shuffledTurkeyMapQuestions[index];

            mapChallengeDescriptionElement.textContent = `Haritada gösterilmesi istenen yer: ${question.locationName}`;
            mapChallengeFeedbackElement.textContent = ''; // Geri bildirimi temizle
            mapHotspotElement.style.display = 'block'; // Hotspotu görünür yap
            mapHotspotElement.dataset.clicked = 'false'; // Hotspotun tıklanıp tıklanmadığını takip et

            // Hotspotun konumunu ayarla
            mapHotspotElement.style.top = question.hotspotCoords.top;
            mapHotspotElement.style.left = question.hotspotCoords.left;

            // Hotspotun data attribute'ine doğru cevabı sakla
            mapHotspotElement.dataset.correctLocation = question.locationName;


        } else {
            // Görevler bitti
            mapChallengeDescriptionElement.textContent = '';
            mapHotspotElement.style.display = 'none'; // Hotspotu gizle
            mapChallengeFeedbackElement.textContent = '';

            mapCompletionMessageElement.textContent = `Tebrikler! Türkiye Harita Görevlerini tamamladınız. ${shuffledTurkeyMapQuestions.length} sorunun tamamını çözdünüz.`;
            mapCompletionMessageElement.style.color = '#00796b';
            mapCompletionMessageElement.style.display = 'block';

             // İsteğe bağlı: Yeniden başlatma seçeneği eklenebilir
        }
    }

    // Harita hotspotuna tıklama olayı
    // Olay dinleyicisini sadece bir kere ekle
    mapHotspotElement.addEventListener('click', function() {
        // Eğer hotspot zaten tıklanmışsa tekrar işlem yapma
        if (this.dataset.clicked === 'true') {
            return;
        }
        this.dataset.clicked = 'true'; // Tıklandı olarak işaretle


        const correctLocation = this.dataset.correctLocation;
        mapChallengeFeedbackElement.textContent = `Haritada ${correctLocation} konumunu işaretlediniz. Doğru!`;
        mapChallengeFeedbackElement.style.color = 'green';
        // Hotspotu gizleme veya görselini değiştirme isteğe bağlı
        // mapHotspotElement.style.display = 'none';

         setTimeout(() => {
             currentTurkeyMapIndex++;
             displayTurkeyMapChallenge(currentTurkeyMapIndex);
         }, displayNextQuestionDelay);
    });

    // Türkiye Harita görevini başlat (Sayfa yüklendiğinde veya görsel yüklendikten sonra)
    const turkeyMapImage = turkeyMapContainer.querySelector('.turkey-map-image');
    if (turkeyMapImage && turkeyMapImage.complete) { // Görsel var ve yüklenmişse
        displayTurkeyMapChallenge(currentTurkeyMapIndex);
    } else if (turkeyMapImage) { // Görsel varsa ama yüklenmemişse
        turkeyMapImage.addEventListener('load', () => {
            displayTurkeyMapChallenge(currentTurkeyMapIndex);
        });
    }
    // Eğer turkeyMapImage bulunamazsa (sayfa yanlış), hiçbir şey olmaz.
}
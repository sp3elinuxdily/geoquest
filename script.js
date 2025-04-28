// *** Bu dosya Türkiye Haritası Görevi hariç diğer oyunların JavaScript kodunu içerir. ***
// *** Türkiye Haritası Görevi kodu turkey-map-script.js dosyasındadır. ***
// *** Bu kodlar hala tam bir oyun motoru değildir. Soru havuzları 10. sınıf müfredatına uygun olarak genişletildi. ***

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

// --- Soru Havuzları (Türkiye Haritası Hariç) ---

// Başkent Quiz Soruları (Genel Coğrafya - Eklemeler Yapıldı)
const capitalQuizQuestions = [
    { country: 'Almanya', correctAnswer: 'Berlin', options: ['Paris', 'Londra', 'Roma', 'Berlin'] },
    { country: 'Fransa', correctAnswer: 'Paris', options: ['Berlin', 'Madrid', 'Roma', 'Paris'] },
    { country: 'İtalya', correctAnswer: 'Roma', options: ['Paris', 'Madrid', 'Berlin', 'Roma'] },
    { country: 'İspanya', correctAnswer: 'Madrid', options: ['Lizbon', 'Barcelona', 'Madrid', 'Madrid'] }, // Madrid tekrarı düzeltildi
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

// Harita soruları bu dosyadan kaldırıldı.

// Boşluk Doldurma Soruları (10. sınıf müfredatına uygun olarak genişletildi)
// Boşluk Doldurma Soruları (10. sınıf müfredatına uygun, net ve tek cevaplı)
const fillInBlankQuestions = [
    // İç Kuvvetler ve Yer Şekilleri
    { textBefore: 'Yer kabuğundaki ani sarsıntılara ', textAfter: ' denir.', correctAnswer: 'Deprem' },
    { textBefore: 'Levha hareketleri sonucu sıradağların oluşmasına ', textAfter: ' denir.', correctAnswer: 'Orojenez' },
    { textBefore: 'Yer kabuğunun geniş alanlar halinde alçalması veya yükselmesi hareketi ', textAfter: '\'dir.', correctAnswer: 'Epirojenez' },
    { textBefore: 'Magmanın yeryüzüne çıkarak veya yeryüzüne yakın yerlerde katılaşmasıyla ilgili olaylara ', textAfter: ' adı verilir.', correctAnswer: 'Volkanizma' },
    { textBefore: 'Volkanizma sonucu oluşan huni şeklindeki çukurluğa ', textAfter: ' denir.', correctAnswer: 'Krater' },
    { textBefore: 'Büyük volkanik patlamalar veya çökmeler sonucu oluşan geniş çukurluklara ', textAfter: ' adı verilir.', correctAnswer: 'Kaldera' },
    { textBefore: 'Volkanik gaz patlaması sonucu oluşan küçük çukurluklara ', textAfter: ' denir.', correctAnswer: 'Maar' },
    { textBefore: 'Yer kabuğundaki kırık hatları boyunca blokların yer değiştirmesi sonucu oluşan yüksek kısımlara ', textAfter: ' adı verilir.', correctAnswer: 'Horst' }, // Graben'in zıttı
    { textBefore: 'Yer kabuğundaki kırık hatları boyunca blokların yer değiştirmesi sonucu oluşan çukur kısımlara ', textAfter: ' adı verilir.', correctAnswer: 'Graben' }, // Horst'un zıttı
    { textBefore: 'Aktif volkanların bulunduğu Pasifik kıyısındaki fay hattı Pasifik Ateş ', textAfter: '\'dir.', correctAnswer: 'Çemberi' },

    // Kayaçlar
    { textBefore: 'Magmanın katılaşmasıyla oluşan kayaçlara ', textAfter: ' kayaçlar denir.', correctAnswer: 'Püskürük' },
    { textBefore: 'Akarsu, rüzgar gibi dış kuvvetlerin taşıdığı malzemelerin birikmesiyle oluşan kayaçlara ', textAfter: ' kayaçlar denir.', correctAnswer: 'Tortul' },
    { textBefore: 'Yüksek sıcaklık ve basınç altında değişerek yeniden oluşan kayaçlara ', textAfter: ' kayaçlar denir.', correctAnswer: 'Başkalaşım' },
    { textBefore: 'Derinlik püskürük kayaçlara en bilinen örnek ', textAfter: '\'dir.', correctAnswer: 'Granit' },
    { textBefore: 'Yeryüzü püskürük kayaçlara örnek olarak ', textAfter: ' verilebilir.', correctAnswer: 'Bazalt' },
    { textBefore: 'Kimyasal tortul kayaçlara örnek olan Kireç Taşı\'nın diğer adı ', textAfter: '\'dir.', correctAnswer: 'Kalker' },
    { textBefore: 'Kalkerin başkalaşmasıyla oluşan kayaç ', textAfter: '\'dir.', correctAnswer: 'Mermer' },
    { textBefore: 'Fiziksel tortul kayaçlara örnek olan Kum Taşı, kum taneciklerinin sıkışmasıyla oluşur. Bir diğer fiziksel tortul kayaç ', textAfter: ' (Çakıl Taşı)\'dır.', correctAnswer: 'Konglomera' }, // Parantez içi olmadan da cevap kabul edilebilir

    // Dış Kuvvetler ve Yer Şekilleri (Akarsular, Rüzgarlar, Buzullar, Karst)
    { textBefore: 'Akarsuyun denize döküldüğü yerde oluşturduğu üçgene benzer verimli ovaya ', textAfter: ' denir.', correctAnswer: 'Delta' },
    { textBefore: 'Akarsuyun yatağını derine doğru aşındırmasıyla oluşan "V" şekilli vadi tipine ', textAfter: ' vadi denir.', correctAnswer: 'Çentik' }, // Çentik veya Boğaz vadi olabilir, Çentik daha net.
    { textBefore: 'Akarsuyun eğimin azaldığı yerlerde çizdiği büklümlere ', textAfter: ' denir.', correctAnswer: 'Menderes' },
    { textBefore: 'Rüzgar aşındırmasıyla çöllerde oluşan mantar şekilli kayalara ', textAfter: ' kaya (veya Şeytan Masası) denir.', correctAnswer: 'Mantarkaya' }, // Şeytan Masası da kabul edilebilir
    { textBefore: 'Rüzgarın taşıdığı ince malzemelerin (mil) birikmesiyle oluşan verimli topraklara ', textAfter: ' denir.', correctAnswer: 'Lös' },
    { textBefore: 'Buzulların aşındırmasıyla oluşan "U" şekilli vadilere ', textAfter: ' vadi denir.', correctAnswer: 'Tekne' },
    { textBefore: 'Buzulların erimesiyle oluşan ve içinde buzul taşları (moren) bulunan çukurluklardaki göllere ', textAfter: ' gölleri denir.', correctAnswer: 'Sirk' }, // Sirk Gölünü soruyor
    { textBefore: 'Karstik bölgelerde yer altı sularının etkisiyle oluşan en büyük boşluklara ', textAfter: ' denir.', correctAnswer: 'Mağara' },
    { textBefore: 'Mağara tavanlarından sızan suların birikmesiyle oluşan şekillere ', textAfter: ' denir.', correctAnswer: 'Sarkıt' },
    { textBefore: 'Mağara tabanından yukarı doğru büyüyen şekillere ', textAfter: ' denir.', correctAnswer: 'Dikit' },
    { textBefore: 'Sarkıt ve dikitlerin birleşmesiyle oluşan şekillere ', textAfter: ' denir.', correctAnswer: 'Sütun' },
    { textBefore: 'Karstik alanlarda kireçli suların basamaklar halinde çökelmesiyle oluşan yer şekli ', textAfter: '\'dir.', correctAnswer: 'Traverten' },

    // Genel 10. Sınıf Konuları
    { textBefore: 'Bir ülkenin yönetim merkezinin bulunduğu şehre ', textAfter: ' denir.', correctAnswer: 'Başkent' }, // Genel coğrafya ama tutalım
    { textBefore: 'Bir bölgede uzun yıllar boyunca etkili olan ortalama hava koşulları ', textAfter: '\'dir.', correctAnswer: 'İklim' }, // İklim
    { textBefore: 'Bir akarsuyun kollarıyla birlikte sularını topladığı alana ', textAfter: ' denir.', correctAnswer: 'Havza' }, // Sular
    { textBefore: 'Yerleşim birimlerinin birbirinden uzak ve dağınık olduğu yerleşme tipine ', textAfter: ' yerleşme denir.', correctAnswer: 'Dağınık' }, // Yerleşme
    { textBefore: 'Dünya nüfusunun en yoğun olduğu kıta ', textAfter: '\'dır.', correctAnswer: 'Asya' } // Nüfus
];
// Coğrafi Terim Soruları (10. sınıf müfredatına uygun olarak genişletildi)
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
    { definition: 'Sıvı haldeki lavın yeryüzüne çıkarak hızla soğumasıyla oluşan ince kristalli veya camsı püskürük kayaç.', correctAnswer: 'Bazalt', options: ['Granit', 'Siyenit', 'Gabro', 'Bazalt'] },
    { definition: 'Yer kabuğundaki kırık hatları boyunca meydana gelen ani hareketler.', correctAnswer: 'Fay', options: ['Kıvrım', 'Kırık', 'Antiklinal', 'Fay'] },
    { definition: 'Orman, çayır, çöl gibi kendine özgü bitki ve hayvan topluluklarını barındıran geniş yaşam alanları.', correctAnswer: 'Biyom', options: ['Ekosistem', 'Habitat', 'Flora', 'Biyom'] },
    { definition: 'Yerleşim birimlerinin yol boyunca uzanmasıyla oluşan doku tipi.', correctAnswer: 'Çizgisel Yerleşme', options: ['Dağınık Yerleşme', 'Toplu Yerleşme', 'Kırsal Yerleşme', 'Çizgisel Yerleşme'] },
    { definition: 'Rüzgar biriktirmesiyle oluşan hilal şeklindeki kum yığınları.', correctAnswer: 'Barkan', options: ['Kumul', 'Lös', 'Moren', 'Barkan'] },
    { definition: 'Buzul aşındırmasıyla oluşan sarp kenarlı ve derin çukurluklar.', correctAnswer: 'Sirk', options: ['Lapya', 'Dolin', 'Uvala', 'Sirk'] }, // Sirk gölü oluştuğu yer
    { definition: 'Akarsu yatağının eğim kırıklığına uğradığı yerden dökülmesiyle oluşan yer şekli.', correctAnswer: 'Şelale (Çağlayan)', options: ['Dev Kazanı', 'Menderes', 'Peribacası', 'Şelale (Çağlayan)'] },
    { definition: 'Yer kabuğunda meydana gelen kıvrılma sonucu oluşan yüksek kısımlar.', correctAnswer: 'Antiklinal', options: ['Senklinal', 'Graben', 'Horst', 'Antiklinal'] },
    { definition: 'Yer kabuğunda meydana gelen kıvrılma sonucu oluşan çukur kısımlar.', correctAnswer: 'Senklinal', options: ['Antiklinal', 'Graben', 'Horst', 'Senklinal'] },
    { definition: 'Magmanın yer kabuğunun içine sokularak damar veya tabaka şeklinde katılaşması.', correctAnswer: 'Derinlik Volkanizması', options: ['Yüzey Volkanizması', 'Deprem', 'Epirojenez', 'Derinlik Volkanizması'] },
    { definition: 'Lavların yeryüzüne çıkarak oluşturduğu koni şeklindeki tepe.', correctAnswer: 'Volkan Konisi', options: ['Krater', 'Kaldera', 'Maar', 'Volkan Konisi'] }
];


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
    { country: 'Arjantin', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg', options: ['Brezilya', 'Şili', 'Arjantin', 'Uruguay'] },
    { country: 'Yeni Zelanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg', options: ['Avustralya', 'Birleşik Krallık', 'Kanada', 'Yeni Zelanda'] },
    { country: 'Hindistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg', options: ['Pakistan', 'Hindistan', 'Banglades', 'Nepal'] },
    { country: 'Endonezya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg', options: ['Polonya', 'Monako', 'Singapur', 'Endonezya'] },
    { country: 'İsviçre', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg', options: ['Danimarka', 'İsveç', 'İsviçre', 'Norveç'] },
    { country: 'Yunanistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg', options: ['Türkiye', 'Kıbrıs', 'İsrail', 'Yunanistan'] },
    { country: 'Hollanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg', options: ['Belçika', 'Lüksemburg', 'Fransa', 'Hollanda'] },
    { country: 'Belçika', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg', options: ['Almanya', 'Hollanda', 'Fransa', 'Belçika'] },
    { country: 'İrlanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg', options: ['İtalya', 'Meksika', 'Hindistan', 'İrlanda'] },
    { country: 'Portekiz', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg', options: ['İspanya', 'Brezilya', 'Yeşil Burun Adaları', 'Portekiz'] },
    // Yeni Bayrak Soruları (Eklemeler Yapıldı)
    { country: 'İspanya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg', options: ['Portekiz', 'Meksika', 'İtalya', 'İspanya'] }, // Tekrar eklenmiş, seçenekleri farklılaştırılabilir
    { country: 'İsveç', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Flag_of_Sweden.svg', options: ['Norveç', 'Danimarka', 'Finlandiya', 'İsveç'] },
    { country: 'Norveç', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Norway.svg', options: ['İsveç', 'Danimarka', 'Finlandiya', 'Norveç'] },
    { country: 'Danimarka', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Flag_of_Denmark.svg', options: ['İsveç', 'Norveç', 'Finlandiya', 'Danimarka'] },
    { country: 'Finlandiya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Finland.svg', options: ['İsveç', 'Norveç', 'Danimarka', 'Finlandiya'] },
    { country: 'Avusturya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_Austria.svg', options: ['İsviçre', 'Almanya', 'Polonya', 'Avusturya'] },
    { country: 'Polonya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Flag_of_Poland.svg', options: ['Çekya', 'Slovakya', 'Ukrayna', 'Polonya'] },
    { country: 'Çekya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg', options: ['Polonya', 'Slovakya', 'Avusturya', 'Çekya'] },
    { country: 'Macaristan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_Hungary.svg', options: ['Polonya', 'Avusturya', 'Romanya', 'Macaristan'] },
    { country: 'Yunanistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg', options: ['Türkiye', 'Kıbrıs', 'İsrail', 'Yunanistan'] } // Tekrar eklenmiş
];


// --- Quiz Yönetimi ---

// Başkent Quiz
const capitalQuizExample = document.querySelector('.capital-quiz-example');
// Sadece bu sayfa (index.html) yüklenince Başkent Quiz'i başlat
if(capitalQuizExample) {
    const capitalQuizCountryPromptElement = capitalQuizExample.querySelector('.capital-quiz-country-prompt');
    const capitalQuizCountryElement = capitalQuizExample.querySelector('.capital-quiz-country');
    const capitalQuizOptionsElement = capitalQuizExample.querySelector('.quiz-options');
    const capitalFeedbackElement = capitalQuizExample.querySelector('.capital-feedback');
    const capitalCompletionMessageElement = capitalQuizExample.querySelector('.capital-completion-message');
    let currentCapitalQuizIndex = 0;
    let shuffledCapitalQuestions = shuffleArray(capitalQuizQuestions);

    function displayCapitalQuestion(index) {
        if (index < shuffledCapitalQuestions.length) {
            const question = shuffledCapitalQuestions[index];

            capitalQuizCountryPromptElement.textContent = 'Aşağıdaki ülkenin başkentini bulun:';
            capitalQuizCountryElement.textContent = question.country;
            capitalQuizCountryElement.style.display = 'block';

            const optionButtons = capitalQuizOptionsElement.querySelectorAll('.quiz-btn');
            const shuffledOptions = shuffleArray([...question.options]);

            capitalQuizOptionsElement.style.display = 'flex';
            optionButtons.forEach((button, i) => {
                button.textContent = shuffledOptions[i];
                button.classList.remove('correct', 'wrong');
                button.disabled = false;
                button.style.display = 'inline-block';
            });

            capitalFeedbackElement.textContent = '';
            capitalCompletionMessageElement.style.display = 'none';
            capitalQuizOptionsElement.dataset.correct = question.correctAnswer;

        } else {
            capitalQuizCountryPromptElement.textContent = '';
            capitalQuizCountryElement.style.display = 'none';
            capitalQuizOptionsElement.style.display = 'none';
             capitalQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => btn.style.display = 'none');
            capitalFeedbackElement.textContent = '';

            capitalCompletionMessageElement.textContent = `Tebrikler! Başkent Quizini tamamladınız. ${shuffledCapitalQuestions.length} sorunun tamamını çözdünüz.`;
            capitalCompletionMessageElement.style.color = '#00796b';
            capitalCompletionMessageElement.style.display = 'block';

             // İsteğe bağlı: Yeniden başlatma butonu eklenebilir
        }
    }

    capitalQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(button => {
        button.addEventListener('click', function() {
            const gameExample = this.closest('.game-example');
            const selectedAnswer = this.textContent;
            const correctAnswer = gameExample.querySelector('.quiz-options').dataset.correct;
            const feedbackElement = gameExample.querySelector('.capital-feedback');
            const optionButtons = gameExample.querySelectorAll('.quiz-btn');

            optionButtons.forEach(btn => btn.disabled = true);

            if (selectedAnswer === correctAnswer) {
                this.classList.add('correct');
                feedbackElement.textContent = 'Doğru!';
                feedbackElement.style.color = 'green';
            } else {
                this.classList.add('wrong');
                feedbackElement.textContent = `Yanlış. Doğru cevap: ${correctAnswer}`;
                feedbackElement.style.color = 'red';
                optionButtons.forEach(btn => {
                     if (btn.textContent === correctAnswer) {
                         btn.classList.add('correct');
                     }
                 });
            }

            setTimeout(() => {
                currentCapitalQuizIndex++;
                displayCapitalQuestion(currentCapitalQuizIndex);
            }, displayNextQuestionDelay);
        });
    });

    displayCapitalQuestion(currentCapitalQuizIndex); // Başlat
}


// Harita Görevi kodları bu dosyadan kaldırıldı.


// Örnek 3: Boşluk Doldurma Oyunu
const fillInBlankExample = document.querySelector('.fill-in-blank-example');
// Sadece bu sayfa (index.html) yüklenince Boşluk Doldurma Quiz'i başlat
if(fillInBlankExample){
    const blankTextBeforeElement = fillInBlankExample.querySelector('.blank-text-before');
    const blankTextAfterElement = fillInBlankExample.querySelector('.blank-text-after');
    const fillInBlankInputElement = fillInBlankExample.querySelector('.fill-in-blank-input');
    const checkBlankButton = fillInBlankExample.querySelector('.check-blank-btn');
    const fillInBlankFeedbackElement = fillInBlankExample.querySelector('.fill-in-blank-feedback');
    const blankCompletionMessageElement = fillInBlankExample.querySelector('.blank-completion-message');
    let currentFillInBlankIndex = 0;
    let shuffledFillInBlankQuestions = shuffleArray(fillInBlankQuestions);

    function displayFillInBlankQuestion(index) {
        if (index < shuffledFillInBlankQuestions.length) {
            const question = shuffledFillInBlankQuestions[index];

            blankTextBeforeElement.textContent = question.textBefore;
            blankTextAfterElement.textContent = question.textAfter;
            fillInBlankInputElement.value = '';
            fillInBlankInputElement.placeholder = question.placeholder || 'Cevabını Yaz';
            fillInBlankInputElement.disabled = false;
            fillInBlankInputElement.style.display = 'inline-block';
            checkBlankButton.style.display = 'inline-block';
            fillInBlankFeedbackElement.textContent = '';
            blankCompletionMessageElement.style.display = 'none';
            fillInBlankInputElement.style.border = '1px solid #ccc';

            checkBlankButton.dataset.correctAnswer = question.correctAnswer.toLowerCase();
        } else {
            blankTextBeforeElement.textContent = '';
            blankTextAfterElement.textContent = '';
            fillInBlankInputElement.style.display = 'none';
            checkBlankButton.style.display = 'none';
            fillInBlankFeedbackElement.textContent = '';

            blankCompletionMessageElement.textContent = `Tebrikler! Boşluk Doldurma Oyununu tamamladınız. ${shuffledFillInBlankQuestions.length} sorunun tamamını çözdünüz.`;
            blankCompletionMessageElement.style.color = '#00796b';
            blankCompletionMessageElement.style.display = 'block';
        }
    }

    checkBlankButton.addEventListener('click', function() {
        const userAnswer = fillInBlankInputElement.value.trim().toLowerCase();
        const correctAnswer = this.dataset.correctAnswer;

        fillInBlankInputElement.disabled = true;
        checkBlankButton.style.display = 'none';

        if (userAnswer === correctAnswer) {
            fillInBlankFeedbackElement.textContent = 'Doğru!';
            fillInBlankFeedbackElement.style.color = 'green';
            fillInBlankInputElement.style.border = '1px solid green';
        } else {
            fillInBlankFeedbackElement.textContent = `Yanlış. Doğru cevap: ${shuffledFillInBlankQuestions[currentFillInBlankIndex].correctAnswer}`;
            fillInBlankFeedbackElement.style.color = 'red';
            fillInBlankInputElement.style.border = '1px solid red';
        }

         setTimeout(() => {
             currentFillInBlankIndex++;
             displayFillInBlankQuestion(currentFillInBlankIndex);
         }, displayNextQuestionDelay);
    });

    displayFillInBlankQuestion(currentFillInBlankIndex); // Başlat
}


// Örnek 4: Bayrak Tanıma Oyunu
const flagQuizExample = document.querySelector('.flag-quiz-example');
// Sadece bu sayfa (index.html) yüklenince Bayrak Quiz'i başlat
if(flagQuizExample) {
    const flagImageElement = flagQuizExample.querySelector('.flag-image');
    const flagQuizOptionsElement = flagQuizExample.querySelector('.quiz-options');
    const flagFeedbackElement = flagQuizExample.querySelector('.flag-feedback');
    const flagCompletionMessageElement = flagQuizExample.querySelector('.flag-completion-message');
    const flagQuizQuestionElement = flagQuizExample.querySelector('.flag-quiz-question');

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
         { country: 'Arjantin', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg', options: ['Brezilya', 'Şili', 'Arjantin', 'Uruguay'] },
         { country: 'Yeni Zelanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg', options: ['Avustralya', 'Birleşik Krallık', 'Kanada', 'Yeni Zelanda'] },
         { country: 'Hindistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg', options: ['Pakistan', 'Hindistan', 'Banglades', 'Nepal'] },
         { country: 'Endonezya', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg', options: ['Polonya', 'Monako', 'Singapur', 'Endonezya'] },
         { country: 'İsviçre', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Switzerland.svg', options: ['Danimarka', 'İsveç', 'İsviçre', 'Norveç'] },
         // Yeni Bayrak Soruları
         { country: 'Yunanistan', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Greece.svg', options: ['Türkiye', 'Kıbrıs', 'İsrail', 'Yunanistan'] },
         { country: 'Hollanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Flag_of_the_Netherlands.svg', options: ['Belçika', 'Lüksemburg', 'Fransa', 'Hollanda'] },
         { country: 'Belçika', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Flag_of_Belgium.svg', options: ['Almanya', 'Hollanda', 'Fransa', 'Belçika'] },
         { country: 'İrlanda', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Flag_of_Ireland.svg', options: ['İtalya', 'Meksika', 'Hindistan', 'İrlanda'] },
         { country: 'Portekiz', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Portugal.svg', options: ['İspanya', 'Brezilya', 'Yeşil Burun Adaları', 'Portekiz'] },
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
    let currentFlagQuizIndex = 0;
    let shuffledFlagQuestions = shuffleArray(flagQuizQuestions_data);

    function displayFlagQuestion(index) {
        if (index < shuffledFlagQuestions.length) {
            const question = shuffledFlagQuestions[index];

            flagQuizQuestionElement.textContent = 'Bu bayrak hangi ülkeye aittir?';
            flagImageElement.src = question.flagUrl;
            flagImageElement.alt = question.country + ' Bayrağı';
            flagImageElement.style.display = 'block';

            const optionButtons = flagQuizOptionsElement.querySelectorAll('.quiz-btn');
            const shuffledOptions = shuffleArray([...question.options]);

            flagQuizOptionsElement.style.display = 'flex';
            optionButtons.forEach((button, i) => {
                button.textContent = shuffledOptions[i];
                button.classList.remove('correct', 'wrong');
                button.disabled = false;
                button.style.display = 'inline-block';
            });

            flagFeedbackElement.textContent = '';
            flagCompletionMessageElement.style.display = 'none';

            flagQuizOptionsElement.dataset.correct = question.country;

        } else {
            flagQuizQuestionElement.textContent = '';
            flagImageElement.style.display = 'none';
            flagQuizOptionsElement.style.display = 'none';
             flagQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => btn.style.display = 'none');
            flagFeedbackElement.textContent = '';

            flagCompletionMessageElement.textContent = `Tebrikler! Bayrak Quizini tamamladınız. ${shuffledFlagQuestions.length} sorunun tamamını çözdünüz.`;
            flagCompletionMessageElement.style.color = '#00796b';
            flagCompletionMessageElement.style.display = 'block';
        }
    }

    flagQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(button => {
        button.addEventListener('click', function() {
            const gameExample = this.closest('.game-example');
            const selectedAnswer = this.textContent;
            const correctAnswer = gameExample.querySelector('.quiz-options').dataset.correct;
            const feedbackElement = gameExample.querySelector('.flag-feedback');
            const optionButtons = gameExample.querySelectorAll('.quiz-btn');

            optionButtons.forEach(btn => btn.disabled = true);

            if (selectedAnswer === correctAnswer) {
                this.classList.add('correct');
                feedbackElement.textContent = 'Doğru!';
                feedbackElement.style.color = 'green';
            } else {
                this.classList.add('wrong');
                feedbackElement.textContent = `Yanlış. Doğru cevap: ${correctAnswer}`;
                feedbackElement.style.color = 'red';
                optionButtons.forEach(btn => {
                     if (btn.textContent === correctAnswer) {
                         btn.classList.add('correct');
                     }
                 });
            }

             setTimeout(() => {
                 currentFlagQuizIndex++;
                 displayFlagQuestion(currentFlagQuizIndex);
             }, displayNextQuestionDelay);
        });
    });

    displayFlagQuestion(currentFlagQuizIndex); // Başlat
}


// Örnek 5: Coğrafi Terim Oyunu
const termQuizExample = document.querySelector('.term-quiz-example');
// Sadece bu sayfa (index.html) yüklenince Terim Quiz'i başlat
if(termQuizExample){
    const termQuizDefinitionElement = termQuizExample.querySelector('.term-quiz-definition');
    const termQuizOptionsElement = termQuizExample.querySelector('.quiz-options');
    const termFeedbackElement = termQuizExample.querySelector('.term-feedback');
    const termCompletionMessageElement = termQuizExample.querySelector('.term-completion-message');
    let currentTermQuizIndex = 0;
    let shuffledTermQuestions = shuffleArray(termQuizQuestions);

    function displayTermQuestion(index) {
        if (index < shuffledTermQuestions.length) {
            const question = shuffledTermQuestions[index];

            termQuizDefinitionElement.textContent = question.definition;
            const optionButtons = termQuizOptionsElement.querySelectorAll('.quiz-btn');
            const shuffledOptions = shuffleArray([...question.options]);

            termQuizOptionsElement.style.display = 'flex';
            optionButtons.forEach((button, i) => {
                button.textContent = shuffledOptions[i];
                button.classList.remove('correct', 'wrong');
                button.disabled = false;
                 button.style.display = 'inline-block';
            });

            termFeedbackElement.textContent = '';
            termCompletionMessageElement.style.display = 'none';
            termQuizOptionsElement.dataset.correct = question.correctAnswer;

        } else {
            termQuizDefinitionElement.textContent = '';
            termQuizOptionsElement.style.display = 'none';
            termQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(btn => btn.style.display = 'none');
            termFeedbackElement.textContent = '';

            termCompletionMessageElement.textContent = `Tebrikler! Coğrafi Terim Oyununu tamamladınız. ${shuffledTermQuestions.length} sorunun tamamını çözdünüz.`;
            termCompletionMessageElement.style.color = '#00796b';
            termCompletionMessageElement.style.display = 'block';
        }
    }

    termQuizOptionsElement.querySelectorAll('.quiz-btn').forEach(button => {
        button.addEventListener('click', function() {
            const gameExample = this.closest('.game-example');
            const selectedAnswer = this.textContent;
            const correctAnswer = gameExample.querySelector('.quiz-options').dataset.correct;
            const feedbackElement = gameExample.querySelector('.term-feedback');
            const optionButtons = gameExample.querySelectorAll('.quiz-btn');

            optionButtons.forEach(btn => btn.disabled = true);

            if (selectedAnswer === correctAnswer) {
                this.classList.add('correct');
                feedbackElement.textContent = 'Doğru!';
                feedbackElement.style.color = 'green';
            } else {
                this.classList.add('wrong');
                feedbackElement.textContent = `Yanlış. Doğru terim: ${correctAnswer}`;
                feedbackElement.style.color = 'red';
                optionButtons.forEach(btn => {
                     if (btn.textContent === correctAnswer) {
                         btn.classList.add('correct');
                     }
                 });
            }

            setTimeout(() => {
                currentTermQuizIndex++;
                displayTermQuestion(currentTermQuizIndex);
            }, displayNextQuestionDelay);
        });
    });

    displayTermQuestion(currentTermQuizIndex); // Başlat
}
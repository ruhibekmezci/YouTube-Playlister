// YouTube Linklerini Ekrana Getir (Garanti Yöntem)

async function showLinksPopup() {
    console.log("⏳ Videolar yükleniyor, lütfen bekleyin...");

    // --- 1. ADIM: Sayfayı Aşağı Kaydır ---
    let lastHeight = document.documentElement.scrollHeight;
    let attempts = 0;

    while (true) {
        window.scrollTo(0, document.documentElement.scrollHeight);
        await new Promise(resolve => setTimeout(resolve, 1500)); 

        let newHeight = document.documentElement.scrollHeight;
        if (newHeight === lastHeight) {
            attempts++;
            if (attempts >= 3) break; 
        } else {
            attempts = 0;
            lastHeight = newHeight;
        }
    }

    // --- 2. ADIM: Linkleri Topla ---
    // Sadece playlist öğelerini hedefleyen daha sıkı bir seçici
    const videoElements = document.querySelectorAll('ytd-playlist-video-renderer #video-title');
    let linksText = "";
    let count = 0;

    videoElements.forEach((element) => {
        const href = element.getAttribute('href');
        if (href) {
            // Temiz linki oluştur
            const fullLink = 'https://www.youtube.com' + href.split('&')[0];
            linksText += fullLink + "\n";
            count++;
        }
    });

    // --- 3. ADIM: Ekrana Kutu (Popup) Aç ---
    // Var olan eski kutu varsa sil
    const oldBox = document.getElementById('yt-link-box');
    if (oldBox) oldBox.remove();

    // Yeni kutuyu oluştur
    const textArea = document.createElement('textarea');
    textArea.id = 'yt-link-box';
    textArea.value = linksText;
    
    // Kutunun stili (Ekranın ortasında, büyük ve beyaz)
    textArea.style.position = 'fixed';
    textArea.style.top = '50%';
    textArea.style.left = '50%';
    textArea.style.transform = 'translate(-50%, -50%)';
    textArea.style.width = '600px';
    textArea.style.height = '400px';
    textArea.style.zIndex = '9999';
    textArea.style.padding = '20px';
    textArea.style.border = '2px solid #f00';
    textArea.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    textArea.style.fontSize = '14px';

    document.body.appendChild(textArea);

    // Metni seçili hale getir
    textArea.focus();
    textArea.select();

    console.clear();
    console.log(`✅ ${count} video bulundu! Ekrana gelen kutudan kopyalayabilirsin.`);
}

showLinksPopup();

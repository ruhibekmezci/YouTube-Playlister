# 📺 YouTube Playlist Link Grabber (Console Script)

Bu script, YouTube üzerindeki bir oynatma listesindeki (playlist) **tüm videoların linklerini** saniyeler içinde çeker. Sayfayı otomatik olarak aşağı kaydırır, tüm videoların yüklenmesini bekler ve temizlenmiş linkleri ekrana bir kutu (popup) içinde getirir.

Tek tek kopyalamakla uğraşma, bırak script halletsin. 🚀

## 🔥 Özellikler

* **Otomatik Scroll:** Sayfayı en aşağıya kadar kendisi kaydırır, tüm videoların yüklenmesini sağlar.
* **Temiz Linkler:** URL'lerin sonundaki gereksiz parametreleri (`&index=`, `&list=`) temizler, sadece video linkini verir.
* **Kolay Kopyalama:** Linkleri tarayıcının ortasında açılan bir kutuya (textarea) yazar ve otomatik seçili hale getirir.

## 🛠 Nasıl Kullanılır?

1.  Linklerini almak istediğin **YouTube Playlist** sayfasını aç.
2.  Klavyeden **`F12`** tuşuna bas (veya sağ tık -> *İncele*) ve **Console** sekmesine gel.
3.  Aşağıdaki kodu kopyala ve konsola yapıştır.
4.  **`Enter`** tuşuna bas.
5.  Arkana yaslan ☕️. Script sayfayı kaydıracak ve işi bitince linkleri ekrana getirecektir.

## 💻 Kod

```javascript
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
    const videoElements = document.querySelectorAll('ytd-playlist-video-renderer #video-title');
    let linksText = "";
    let count = 0;

    videoElements.forEach((element) => {
        const href = element.getAttribute('href');
        if (href) {
            const fullLink = '[https://www.youtube.com](https://www.youtube.com)' + href.split('&')[0];
            linksText += fullLink + "\n";
            count++;
        }
    });

    // --- 3. ADIM: Ekrana Kutu (Popup) Aç ---
    const oldBox = document.getElementById('yt-link-box');
    if (oldBox) oldBox.remove();

    const textArea = document.createElement('textarea');
    textArea.id = 'yt-link-box';
    textArea.value = linksText;
    
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

    textArea.focus();
    textArea.select();

    console.clear();
    console.log(`✅ ${count} video bulundu! Ekrana gelen kutudan kopyalayabilirsin.`);
}

showLinksPopup();

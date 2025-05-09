# Art Generator

Bu proje, yapay zeka teknolojisini kullanarak sanat eserleri oluşturmak için geliştirilmiştir.

## Demo Video

Aşağıdaki videoyu izleyerek uygulamanın nasıl çalıştığını görebilirsiniz:

https://github.com/rkymtc/art-generator/raw/main/app/src/assets/videos/app.mp4

[Demo Videosu](app/src/assets/videos/app.mp4)

## Özellikler

- Farklı sanat stillerinde görüntü oluşturma
- Kullanıcı dostu arayüz
- Yüksek kalite çıktılar
- Python ile geliştirilmiş yapay zeka modeli
- Firebase Firestore veritabanı entegrasyonu

## Teknolojiler

### Python
Projede görüntü işleme ve yapay zeka modelleri için Python kullanılmıştır. Kullanılan başlıca kütüphaneler:
- TensorFlow/PyTorch
- NumPy
- Pillow
- Flask (API için)

### Firebase Firestore
Kullanıcı verileri ve oluşturulan sanat eserleri Firestore'da saklanmaktadır:
- Gerçek zamanlı veri senkronizasyonu
- Güvenli kullanıcı kimlik doğrulama
- Ölçeklenebilir NoSQL veritabanı

## Kurulum

```bash
# Projeyi klonlayın
git clone https://github.com/rkymtc/art-generator.git

# Proje dizinine gidin
cd art-generator

# Bağımlılıkları yükleyin
npm install

# Python bağımlılıklarını yükleyin
pip install -r requirements.txt

# Firebase yapılandırması
firebase init

# Uygulamayı başlatın
npm start
```

## Kullanım

Uygulama başladıktan sonra, tarayıcınız otomatik olarak açılacaktır. Eğer açılmazsa, tarayıcınızı açıp `http://localhost:3000` adresine gidin.

## Katkıda Bulunmak

Katkıda bulunmak için lütfen bir "issue" açın veya pull request gönderin.

## Lisans

MIT

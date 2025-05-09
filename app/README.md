# AI Logo Generator Demo

Bu React Native Expo uygulaması, Hexa - AI Logo & Art Generator arayüzünü taklit eden bir demo uygulamasıdır.

## Özellikler

- İki ekranlı uygulama: Giriş ekranı ve Çıktı ekranı
- Logo oluşturmayı başlattığınızda durumu gösteren chip komponenti
- 30-60 saniye arasında rastgele simüle edilmiş oluşturma süreci
- Tamamlanan logoyu görüntüleme ve yeni logo oluşturma seçeneği

## Proje Yapısı

```
/
├── src/
│   ├── components/       # Yeniden kullanılabilir UI bileşenleri
│   ├── screens/          # Uygulama ekranları
│   ├── navigation/       # Navigasyon yapılandırması
│   ├── services/         # Veri servisleri
│   ├── hooks/            # Özel React hooks
│   ├── assets/           # Görseller ve diğer medya dosyaları
│   └── utils/            # Yardımcı işlevler
│
└── App.js                # Giriş noktası
```

## Kurulum

1. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

2. Uygulamayı başlatın:
   ```
   npx expo start
   ```

## Nasıl Çalışır

1. **Giriş Ekranı**:
   - Kullanıcı logo oluşturmak için bir istek girer
   - Kullanıcı bir stil seçer (Stil Yok, Minimal, Gradient, Modern)
   - Kullanıcı oluşturma işlemini başlatmak için "Create" butonuna basar

2. **Durum Göstergesi**:
   - Bir chip görünür ve "Creating Your Design..." mesajını gösterir
   - 30-60 saniye sonra, "Your Design is Ready!" olarak değişir
   - "Ready" chip'ine dokunmak Çıktı ekranına yönlendirir

3. **Çıktı Ekranı**:
   - Oluşturulan logoyu gösterir
   - İstek ve kullanılan stil bilgilerini gösterir
   - Yeni bir logo oluşturmak için geri dönme seçeneği sunar

## Teknolojiler

- React Native (Expo)
- React Context API
- React Navigation 
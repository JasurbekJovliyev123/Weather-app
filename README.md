# Ob-havo Prognoz Ilovasi

React, Tailwind CSS va Framer Motion yordamida yaratilgan zamonaviy va responsive ob-havo prognoz ilovasi. 
Avtomatik joylashuv aniqlash, 5 kunlik prognoz va Light/Dark rejim mavjud.

# Asosiy imkoniyatlar

- Joriy ob-havo va avtomatik joylashuv aniqlash
- 5 kunlik prognoz
- Shahar bo‘yicha qidirish
- Light/Dark rejim (localStorage’da saqlanadi)
- Mobil, planshet va desktop uchun moslashuvchan dizayn
- Chiroyli animatsiyalar (Framer Motion)

# Texnologiyalar

- **React** — frontend framework
- **Tailwind CSS** — styling
- **Framer Motion** — animatsiyalar
- **TanStack Query** — serverdan ma’lumot olish va cache qilish
- **OpenWeatherMap API** — ob-havo ma’lumotlari
- **Vite** — build tool

# Ishga tushirish
1. Repository’ni yuklab oling:
     git clone <repository-url>
     cd weather-forecast-app
2. Kerakli paketlarni o‘rnating: terminalda
     npm install
3. OpenWeatherMap saytida API key oling.
    src/shared/api/weather.js ichida API key’ni o‘zgartiring:
4. Loyihani ishga tushiring: terminalda:  npm run dev
5. Deploy qilish : terminalda: npm run build


# 🎮 MC_sGen 2.0 - Minecraft Skin Generator Pro

Nowoczesny, automatyczny generator skórek Minecraft (64×64 px) na podstawie Twojego zdjęcia, zbudowany w najnowszym stosie technologicznym: **React 18 + Vite + Tailwind CSS + Framer Motion + 3D WebGL**.

🌐 **Działająca strona online:** [https://dibhell.github.io/MC_sGen/](https://dibhell.github.io/MC_sGen/)

---

## ✨ Kluczowe Funkcje

* **Automatyczna Analiza Wizyjna (Computer Vision)**:
  * Segmentacja sylwetki (kolor skóry, włosy/łysina, broda, okulary, ubranie, obuwie).
  * Opcjonalna zaawansowana analiza z wykorzystaniem modelu Google Gemini 1.5 Flash Vision.
* **Interaktywny Model 3D w Czasie Rzeczywistym (WebGL / `skinview3d`)**:
  * Pełne obracanie 360°, przybliżanie i oddalanie.
  * Animacje postaci: chód, bieg, lot, spoczynek oraz pauza.
  * Możliwość pobrania zrzutu ekranu 3D z przezroczystym tłem w dowolnym momencie.
* **Gwarancja Poprawnego Formatu PNG-32 (RGBA)**:
  * Fabrycznie zachowany kanał Alpha (przezroczystość) zapobiegający problemowi „czarnej postaci”.
  * Obsługa modeli **Classic (Steve 4px)** oraz **Slim (Alex 3px)**.
* **Nowoczesny Design w Stylu Bento Grid**:
  * Dark Luxury UI z neonowymi akcentami (Emerald & Cyan).
  * Płynne animacje i przejścia dzięki **Framer Motion**.
  * Animowane tło wektorowe SVG z dynamicznymi wiązkami światła.
  * Ikony wektorowe SVG.
* **Prywatność (100% Client-Side)**:
  * Całe przetwarzanie grafiki i generowanie siatki UV odbywa się lokalnie w Twojej przeglądarce. Żadne zdjęcia nie są wysyłane na serwer.

---

## 🛠️ Stos Technologiczny

* **Baza:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Glassmorphism
* **Animacje:** [Framer Motion](https://www.framer.com/motion/)
* **Ikony:** [Lucide Icons](https://lucide.dev/)
* **Silnik 3D:** [skinview3d](https://github.com/bs-community/skinview3d)
* **Efekty:** Canvas Confetti

---

## 🚀 Uruchomienie Lokalne

```bash
# Sklonuj repozytorium
git clone https://github.com/dibhell/MC_sGen.git
cd MC_sGen

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Zbuduj wersję produkcyjną
npm run build
```

---

## 📄 Licencja
Projekt stworzony na licencji open-source MIT.

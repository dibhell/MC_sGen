# MC_sGen - Generator Skórek Minecraft ze Zdjęcia ⛏️

Automatyczny generator skórek postaci w formacie **64×64 px PNG** (Minecraft 1.8+ Dual Layer) bezpośrednio ze zdjęcia sylwetki lub selfie.

Działa w 100% w przeglądarce po stronie klienta (HTML5 Canvas + WebGL 3D), bez potrzeby posiadania serwera backendowego. Projekt zoptymalizowany pod **GitHub Pages**.

🔗 **Wersja online (GitHub Pages):** [https://dibhell.github.io/MC_sGen/](https://dibhell.github.io/MC_sGen/)

---

## ✨ Funkcje aplikacji

* **📸 Analiza zdjęcia w przeglądarce**:
  * Automatyczna segmentacja stref sylwetki (czubek głowy, twarz, tułów, nogi, obuwie).
  * Ekstrakcja dominant kolorystycznych: odcień skóry, kolor włosów, zarostu, ubrania i obuwia.
  * Detekcja łysiny, okularów, krótkich spodenek, zegarka oraz klapek (np. kultowych klapek Lidl!).
* **🎮 Generowanie tekstury 64×64 px PNG**:
  * Pełna zgodność ze standardem Minecraft 1.8+ (obsługa warstwy bazowej i zewnętrznej nakładki 3D).
  * Obsługa modeli **Classic (Steve - 4px)** oraz **Slim (Alex - 3px)**.
* **🧊 Podgląd 3D w czasie rzeczywistym**:
  * Interaktywny model postaci w technologii WebGL (`skinview3d`).
  * Płynne sterowanie kamerą (obrót, zoom).
  * Animacje postaci: bezruch (idle), chód (walk), bieg (run), machanie ręką (wave).
* **🎨 Interaktywny edytor na żywo**:
  * Pełna kontrola nad detalami: fryzura, broda, okulary, wzory koszulek (np. liście), spodenki, smartwatch.
* **🤖 Opcjonalne wsparcie Google Gemini Vision**:
  * Możliwość podania własnego darmowego klucza API z Google AI Studio do jeszcze dokładniejszego rozpoznawania wzorów i akcesoriów.
* **💾 Eksport jednym kliknięciem**:
  * Bezpośrednie pobieranie pliku `skin.png` gotowego do wgrania na minecraft.net lub w Minecraft Launcher.

---

## 🚀 Uruchomienie lokalne

Ponieważ jest to aplikacja statyczna, wystarczy dowolny prosty serwer HTTP:

```bash
# Sklonuj repozytorium
git clone https://github.com/dibhell/MC_sGen.git
cd MC_sGen

# Uruchom lokalny serwer w Pythonie:
python -m http.server 8000
```
Następnie otwórz w przeglądarce adres: `http://localhost:8000`.

---

## 📖 Jak wgrać wygenerowaną skórkę do gry?

### Minecraft Java Edition
1. Kliknij **Pobierz Skin** i zapisz plik `skin.png`.
2. Otwórz **Minecraft Launcher**.
3. Wejdź w zakładkę **Skins** (Skórki).
4. Kliknij **New Skin** (Nowa skórka), wybierz model **Classic** i wskaż plik `skin.png`.
5. Kliknij **Save & Use**.

### Minecraft Bedrock Edition (Windows, konsole, smartfony)
1. W menu gry wybierz **Garderoba** (Dressing Room).
2. Przejdź do **Klasyczne skórki** -> **Posiadane skórki** -> **Wybierz nową skórkę**.
3. Wskaż plik `skin.png` i zatwierdź model.

---

## 🛠️ Technologie

* **HTML5 Canvas API** – zaawansowana segmentacja i renderowanie siatki UV 64×64.
* **Vanilla CSS (Glassmorphism)** – nowoczesny ciemny design, brak ciężkich frameworków.
* **Three.js & skinview3d** – trójwymiarowy silnik renderowania postaci Minecraft w WebGL.
* **Google Gemini API (opcjonalnie)** – multimodalna analiza wizyjna zdjęć.

/**
 * MC_sGen - Color Extractor & Vision Analyzer
 * Analizuje przesłane zdjęcie na canvasie i ekstraktuje cechy sylwetki
 */

class ColorExtractor {
    /**
     * Wczytuje obraz i zwraca obiekt cech
     * @param {HTMLImageElement|ImageBitmap} img 
     * @returns {Object} Wyekstrahowany profil cech
     */
    static analyzeImage(img) {
        // Skalujemy do bezpiecznego rozmiaru roboczego do analizy
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const W = 300;
        const H = 400;
        canvas.width = W;
        canvas.height = H;

        ctx.drawImage(img, 0, 0, W, H);
        const imgData = ctx.getImageData(0, 0, W, H).data;

        // Pomocnik do pobierania średniego koloru z prostokąta
        function getAverageColor(x0, y0, x1, y1) {
            let r = 0, g = 0, b = 0, count = 0;
            const startX = Math.floor(x0 * W);
            const endX = Math.floor(x1 * W);
            const startY = Math.floor(y0 * H);
            const endY = Math.floor(y1 * H);

            for (let y = startY; y < endY; y += 2) {
                for (let x = startX; x < endX; x += 2) {
                    const idx = (y * W + x) * 4;
                    // ignoruj bardzo białe lub bardzo czarne tła jeśli na brzegach
                    r += imgData[idx];
                    g += imgData[idx + 1];
                    b += imgData[idx + 2];
                    count++;
                }
            }
            if (count === 0) return { r: 230, g: 190, b: 160 };
            return {
                r: Math.round(r / count),
                g: Math.round(g / count),
                b: Math.round(b / count)
            };
        }

        // Pomocnik konwersji RGB na HEX
        function rgbToHex(c) {
            const hex = (v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0');
            return `#${hex(c.r)}${hex(c.g)}${hex(c.b)}`;
        }

        // 1. Strefa Twarzy i Odcienia Skóry (centralna górna strefa)
        const faceColor = getAverageColor(0.40, 0.12, 0.60, 0.22);
        
        // 2. Strefa Czubka Głowy / Włosów (góra głowy)
        const crownColor = getAverageColor(0.35, 0.04, 0.65, 0.11);
        
        // Obliczamy różnicę między skórą a czubkiem głowy
        const hairDiff = Math.hypot(faceColor.r - crownColor.r, faceColor.g - crownColor.g, faceColor.b - crownColor.b);
        const isBald = hairDiff < 28 && (crownColor.r > 150 && crownColor.g > 110);

        // 3. Strefa Dolnej Twarzy / Brody (podbródek)
        const chinColor = getAverageColor(0.42, 0.21, 0.58, 0.27);
        const chinDiff = Math.hypot(faceColor.r - chinColor.r, faceColor.g - chinColor.g, faceColor.b - chinColor.b);
        const hasBeard = chinDiff > 25 || (chinColor.r > 200 && chinColor.g > 200 && chinColor.b > 200);
        
        // 4. Strefa Oczu / Okularów
        const eyeZoneColor = getAverageColor(0.38, 0.13, 0.62, 0.18);
        const hasGlasses = eyeZoneColor.r < 90 && eyeZoneColor.g < 90 && eyeZoneColor.b < 90;

        // 5. Strefa Torsu / Koszulki
        const shirtColor = getAverageColor(0.32, 0.30, 0.68, 0.48);
        
        // Próbkowanie kontrastu koszulki (czy ma wzór np. liście/paski)
        const shirtAccent = getAverageColor(0.42, 0.32, 0.58, 0.42);

        // 6. Strefa Dołu / Spodni
        const pantsColor = getAverageColor(0.34, 0.56, 0.66, 0.74);
        
        // 7. Strefa Kolan / Nóg (czy krótkie spodenki?)
        const kneeColor = getAverageColor(0.36, 0.75, 0.64, 0.83);
        const kneeSkinDiff = Math.hypot(faceColor.r - kneeColor.r, faceColor.g - kneeColor.g, faceColor.b - kneeColor.b);
        const isShorts = kneeSkinDiff < 45 || (kneeColor.r > 130 && kneeColor.g > 90);

        // 8. Strefa Butów / Stóp
        const shoesColor = getAverageColor(0.30, 0.88, 0.70, 0.98);
        
        // Detekcja klapek (np. charakterystyczny niebieski Lidl lub jasne klapki)
        const isLidlOrSlides = (shoesColor.b > shoesColor.r * 1.3 && shoesColor.b > 90) || (shoesColor.r < 50 && shoesColor.g < 50 && shoesColor.b < 50);

        return {
            skinTone: rgbToHex(faceColor),
            hairType: isBald ? 'bald' : 'short',
            hairColor: rgbToHex(crownColor),
            hasBeard: hasBeard,
            beardType: hasBeard ? 'goatee' : 'none',
            beardColor: (chinColor.r > 180 && chinColor.g > 180 && chinColor.b > 180) ? '#f5f5f5' : rgbToHex(chinColor),
            hasGlasses: hasGlasses,
            glassesColor: '#1c1c20',
            eyeColor: '#446688',
            shirtColor: rgbToHex(shirtColor),
            shirtAccent: rgbToHex(shirtAccent),
            shirtPattern: (Math.hypot(shirtColor.r - shirtAccent.r, shirtColor.g - shirtAccent.g, shirtColor.b - shirtAccent.b) > 25) ? 'leaves' : 'solid',
            pantsColor: rgbToHex(pantsColor),
            pantsType: isShorts ? 'shorts' : 'long',
            shoesColor: isLidlOrSlides ? '#0055aa' : rgbToHex(shoesColor),
            shoesType: isLidlOrSlides ? 'slides' : 'sneakers',
            hasWatch: true,
            modelType: 'default' // 'default' = Steve 4px, 'slim' = Alex 3px
        };
    }
}

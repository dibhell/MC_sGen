/**
 * MC_sGen - Gemini Vision API Integration (Optional)
 * Pozwala użytkownikowi opcjonalnie podać swój darmowy klucz Gemini do zaawansowanej analizy AI
 */

class GeminiVision {
    /**
     * Wysyła obraz do Gemini Vision w celu dokładnej kategoryzacji cech sylwetki
     * @param {string} apiKey Klucz Google AI Studio
     * @param {string} base64Image Obraz w formacie base64 (jpeg/png)
     * @returns {Promise<Object>} Profil cech
     */
    static async analyzeWithAI(apiKey, base64Image) {
        // Usuwamy nagłówek data:image/...;base64,
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const prompt = `Jesteś ekspertem analizy wizerunku do generowania skórek postaci w Minecraft 64x64.
Przeanalizuj osobę na zdjęciu i zwróć WYŁĄCZNIE obiekt JSON (bez markdown, bez znaczników \`\`\`json):
{
  "skinTone": "#hex (kolor skóry twarzy)",
  "hairType": "bald" lub "short" lub "long",
  "hairColor": "#hex (kolor włosów lub łysiny)",
  "hasBeard": true lub false,
  "beardType": "none" lub "full" lub "goatee" lub "mustache",
  "beardColor": "#hex (kolor brody/wąsów)",
  "hasGlasses": true lub false,
  "glassesColor": "#hex",
  "eyeColor": "#hex",
  "shirtColor": "#hex (kolor główny koszulki/bluzy)",
  "shirtAccent": "#hex (kolor wzoru/liści/logo jeśli występuje)",
  "shirtPattern": "leaves" lub "stripes" lub "solid",
  "pantsColor": "#hex (kolor spodenek/spodni)",
  "pantsType": "shorts" lub "long",
  "shoesColor": "#hex (kolor butów/klapek)",
  "shoesType": "slides" lub "sneakers" lub "boots",
  "hasWatch": true lub false
}`;

        const payload = {
            contents: [{
                parts: [
                    { text: prompt },
                    {
                        inline_data: {
                            mime_type: "image/jpeg",
                            data: base64Data
                        }
                    }
                ]
            }],
            generationConfig: {
                temperature: 0.1,
                response_mime_type: "application/json"
            }
        };

        const resp = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(`Błąd Gemini API (${resp.status}): ${errText}`);
        }

        const result = await resp.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("Brak odpowiedzi od modelu AI.");

        return JSON.parse(text);
    }
}

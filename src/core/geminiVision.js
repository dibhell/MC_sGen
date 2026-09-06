/**
 * MC_sGen - Gemini Vision Client
 * Analizuje zdjęcie użytkownika za pomocą Google Gemini API
 */

export class GeminiVision {
  static async analyzeWithAI(apiKey, base64Image) {
    if (!apiKey) throw new Error("Brak klucza API Gemini.");

    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, '');

    const prompt = `Jesteś ekspertem grafiki Minecraft i analizy sylwetki. Przeanalizuj przesłane zdjęcie postaci i zwróć WYŁĄCZNIE czysty obiekt JSON (bez znaczników markdown \`\`\`json):
{
  "skinTone": "#hex (kolor skóry twarzy)",
  "hairType": "bald" | "short" | "long",
  "hairColor": "#hex (kolor włosów lub skóry jeśli łysy)",
  "hasBeard": true | false,
  "beardType": "goatee" | "full" | "none",
  "beardColor": "#hex",
  "hasGlasses": true | false,
  "glassesColor": "#hex",
  "eyeColor": "#hex",
  "shirtColor": "#hex (dominujący kolor koszulki/bluzy)",
  "shirtAccent": "#hex (kolor wzoru lub liści)",
  "shirtPattern": "leaves" | "solid" | "stripes" | "plaid",
  "pantsColor": "#hex (kolor spodni)",
  "pantsType": "shorts" | "long",
  "shoesColor": "#hex (kolor obuwia)",
  "shoesType": "slides" | "sneakers" | "boots",
  "hasWatch": true | false,
  "modelType": "default"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: cleanBase64
              }
            }
          ]
        }]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Błąd Gemini API (${response.status})`);
    }

    const resJson = await response.json();
    const rawText = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) throw new Error("Pusta odpowiedź z Gemini.");

    const sanitized = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    return JSON.parse(sanitized);
  }
}

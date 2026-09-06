/**
 * MC_sGen - Procedural Minecraft 64x64 Skin Generator
 * Synthesizes a valid dual-layer 64x64 PNG texture (RGBA 8-bit)
 * Compatible with Minecraft Java Edition & Bedrock Edition
 */

export class SkinGenerator {
  /**
   * Konwertuje HEX na tablicę [r, g, b, a]
   */
  static hexToRgba(hex, alpha = 255) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return [
      (num >> 16) & 255,
      (num >> 8) & 255,
      num & 255,
      alpha
    ];
  }

  /**
   * Zmienia jasność koloru RGBA
   */
  static shade(col, factor) {
    return [
      Math.max(0, Math.min(255, Math.round(col[0] * factor))),
      Math.max(0, Math.min(255, Math.round(col[1] * factor))),
      Math.max(0, Math.min(255, Math.round(col[2] * factor))),
      col[3]
    ];
  }

  /**
   * Generuje canvas 64x64 na podstawie profilu cech
   * @param {Object} profile 
   * @returns {HTMLCanvasElement}
   */
  static generateCanvas(profile = {}) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imgData = ctx.createImageData(64, 64);
    const data = imgData.data;

    // Pomocnik do rysowania piksela
    function setPixel(x, y, color) {
      if (x < 0 || x >= 64 || y < 0 || y >= 64) return;
      const idx = (y * 64 + x) * 4;
      data[idx] = color[0];
      data[idx + 1] = color[1];
      data[idx + 2] = color[2];
      data[idx + 3] = color[3];
    }

    // Paleta na podstawie profilu
    const skinBase = this.hexToRgba(profile.skinTone || '#ecbe9e');
    const skinLight = this.shade(skinBase, 1.05);
    const skinShade = this.shade(skinBase, 0.92);
    const skinDark = this.shade(skinBase, 0.84);
    const skinCheek = this.shade(skinBase, 0.96);
    const noseColor = this.shade(skinBase, 0.90);

    const hairColor = this.hexToRgba(profile.hairColor || '#3b2f28');
    const isBald = profile.hairType === 'bald';

    const beardColor = this.hexToRgba(profile.beardColor || '#f5f5f7');
    const beardLight = this.shade(beardColor, 0.96);
    const beardMid = this.shade(beardColor, 0.88);
    const beardShade = this.shade(beardColor, 0.78);
    const hasBeard = profile.hasBeard !== false;

    const eyeIris = this.hexToRgba(profile.eyeColor || '#415f78');
    const eyeWhite = [255, 255, 255, 255];
    const mouthSmile = [135, 48, 42, 255];

    const glassFrame = this.hexToRgba(profile.glassesColor || '#1c1c20');
    const glassSoft = this.shade(glassFrame, 1.4);

    const shirtBase = this.hexToRgba(profile.shirtColor || '#eae5dc');
    const shirtLight = this.shade(shirtBase, 1.04);
    const shirtShade = this.shade(shirtBase, 0.92);
    const shirtDark = this.shade(shirtBase, 0.85);
    const shirtCollar = this.shade(shirtBase, 0.90);

    const leafMid = this.hexToRgba(profile.shirtAccent || '#546948');
    const leafDark = this.shade(leafMid, 0.75);
    const leafLight = this.shade(leafMid, 1.25);
    const hasLeaves = profile.shirtPattern === 'leaves';
    const isPlaid = profile.shirtPattern === 'plaid';
    const isStripes = profile.shirtPattern === 'stripes';

    const shortBase = this.hexToRgba(profile.pantsColor || '#7c9cbd');
    const shortLight = this.shade(shortBase, 1.08);
    const shortShade = this.shade(shortBase, 0.88);
    const shortDark = this.shade(shortBase, 0.75);
    const shortLine = this.shade(shortBase, 0.80);
    const isShorts = profile.pantsType === 'shorts';

    const shoesBase = this.hexToRgba(profile.shoesColor || '#0055aa');
    const shoesDark = this.shade(shoesBase, 0.75);
    const isSlides = profile.shoesType === 'slides';
    const lidlYellow = [255, 214, 0, 255];
    const lidlRed = [215, 30, 25, 255];
    const sockBlack = [24, 24, 26, 255];

    const watchStrap = [24, 24, 26, 255];
    const watchScreen = [46, 56, 66, 255];
    const watchAcc = [190, 195, 200, 255];

    // ----------------------------------------------------
    // 1. GŁOWA (BAZA: 0..31, 0..15)
    // ----------------------------------------------------
    // Czubek głowy (Top: 8, 0, 8, 8)
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (isBald) {
          let col = skinBase;
          if ((r === 0 || r === 7) && (c === 0 || c === 7)) {
            col = skinDark;
          } else if (r === 0 || r === 7 || c === 0 || c === 7) {
            col = skinShade;
          } else if (r >= 2 && r <= 5 && c >= 2 && c <= 5) {
            col = skinLight;
          }
          setPixel(8 + c, 0 + r, col);
        } else {
          setPixel(8 + c, 0 + r, (r === 0 || r === 7 || c === 0 || c === 7) ? this.shade(hairColor, 0.88) : hairColor);
        }
      }
    }

    // Spód głowy / szyja (Bottom: 16, 0, 8, 8)
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (hasBeard && r < 3) {
          setPixel(16 + c, 0 + r, beardLight);
        } else {
          setPixel(16 + c, 0 + r, r > 5 ? skinDark : skinShade);
        }
      }
    }

    // Boki głowy (Right: 0, 8 / Left: 16, 8 / Back: 24, 8)
    for (let sideX of [0, 16, 24]) {
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          let col = isBald ? (r > 5 ? skinShade : skinBase) : (r < 6 ? hairColor : skinShade);
          if (hasBeard && r >= 5 && sideX !== 24) {
            col = beardLight;
          }
          setPixel(sideX + c, 8 + r, col);
        }
      }
    }

    // Twarz (Front: 8, 8, 8, 8)
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        let col = skinBase;
        if (!isBald && r < 3) {
          col = hairColor; // grzywka
        }
        setPixel(8 + c, 8 + r, col);
      }
    }

    // Policzki i nos
    setPixel(8 + 1, 8 + 5, skinCheek);
    setPixel(8 + 6, 8 + 5, skinCheek);
    setPixel(8 + 3, 8 + 4, noseColor);
    setPixel(8 + 4, 8 + 4, noseColor);

    // Oczy (r=4, kolumny c=1,2 oraz c=5,6)
    setPixel(8 + 1, 8 + 4, eyeWhite);
    setPixel(8 + 2, 8 + 4, eyeIris);
    setPixel(8 + 5, 8 + 4, eyeIris);
    setPixel(8 + 6, 8 + 4, eyeWhite);

    // Baza okularów na twarzy
    if (profile.hasGlasses !== false) {
      for (let c = 0; c < 8; c++) {
        if (c !== 3 && c !== 4) setPixel(8 + c, 8 + 3, glassFrame);
      }
      setPixel(8 + 0, 8 + 4, glassFrame);
      setPixel(8 + 3, 8 + 3, glassSoft); // mostek
      setPixel(8 + 4, 8 + 3, glassSoft);
      setPixel(8 + 7, 8 + 4, glassFrame);
      // Boki oprawek na uszach
      setPixel(0 + 7, 8 + 3, glassFrame);
      setPixel(0 + 6, 8 + 3, glassFrame);
      setPixel(16 + 0, 8 + 3, glassFrame);
      setPixel(16 + 1, 8 + 3, glassFrame);
    }

    // Uśmiech
    setPixel(8 + 3, 8 + 5, mouthSmile);
    setPixel(8 + 4, 8 + 5, mouthSmile);

    // Broda na twarzy
    if (hasBeard) {
      setPixel(8 + 2, 8 + 5, beardMid);
      setPixel(8 + 5, 8 + 5, beardMid);
      for (let c = 1; c <= 6; c++) {
        setPixel(8 + c, 8 + 6, beardLight);
      }
      setPixel(8 + 3, 8 + 7, beardLight);
      setPixel(8 + 4, 8 + 7, beardLight);
      setPixel(8 + 2, 8 + 7, beardMid);
      setPixel(8 + 5, 8 + 7, beardMid);
    }

    // ----------------------------------------------------
    // 2. GŁOWA (NAKŁADKA 3D: 32..63, 0..15)
    // ----------------------------------------------------
    if (profile.hasGlasses !== false) {
      setPixel(40 + 0, 8 + 3, glassFrame);
      setPixel(40 + 1, 8 + 3, glassFrame);
      setPixel(40 + 2, 8 + 3, glassFrame);
      setPixel(40 + 5, 8 + 3, glassFrame);
      setPixel(40 + 6, 8 + 3, glassFrame);
      setPixel(40 + 7, 8 + 3, glassFrame);
      setPixel(40 + 3, 8 + 3, glassSoft);
      setPixel(40 + 4, 8 + 3, glassSoft);
      setPixel(40 + 0, 8 + 4, glassFrame);
      setPixel(40 + 7, 8 + 4, glassFrame);
      // Zauszniki 3D
      setPixel(32 + 6, 8 + 3, glassFrame);
      setPixel(32 + 7, 8 + 3, glassFrame);
      setPixel(48 + 0, 8 + 3, glassFrame);
      setPixel(48 + 1, 8 + 3, glassFrame);
    }

    if (hasBeard) {
      setPixel(40 + 1, 8 + 6, beardLight);
      setPixel(40 + 6, 8 + 6, beardLight);
      setPixel(40 + 2, 8 + 7, beardMid);
      setPixel(40 + 3, 8 + 7, beardLight);
      setPixel(40 + 4, 8 + 7, beardLight);
      setPixel(40 + 5, 8 + 7, beardMid);
      // Podbródek od spodu (48, 0)
      setPixel(48 + 3, 0 + 0, beardLight);
      setPixel(48 + 4, 0 + 0, beardLight);
    }

    // ----------------------------------------------------
    // 3. TUŁÓW (BAZA: 16..39, 16..31)
    // ----------------------------------------------------
    // Ramiona i kołnierz (góra torsu: 20, 16, 8, 4)
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        let col = (r === 3 && (c >= 2 && c <= 5)) ? skinShade :
                  (r === 2 && (c >= 2 && c <= 5)) ? shirtCollar : shirtBase;
        setPixel(20 + c, 16 + r, col);
      }
    }

    // Krocze spodenek (spód torsu: 28, 16, 8, 4)
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 8; c++) {
        setPixel(28 + c, 16 + r, shortShade);
      }
    }

    // Przód torsu (20, 20, 8, 12)
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 8; c++) {
        if (r < 8) {
          let col = shirtBase;
          if (isPlaid && (r % 2 === 0 || c % 2 === 0)) col = shirtLight;
          if (isStripes && r % 2 === 0) col = shirtLight;
          setPixel(20 + c, 20 + r, col);
        } else if (r === 8) {
          setPixel(20 + c, 20 + r, shirtDark); // rąbek koszulki
        } else {
          setPixel(20 + c, 20 + r, shortBase); // spodenki
        }
      }
    }

    // Liście na koszulce
    if (hasLeaves) {
      const leaves = [
        [1, 1], [2, 1], [5, 1], [6, 1],
        [2, 2], [5, 2], [3, 3], [4, 3],
        [0, 4], [1, 4], [4, 4], [7, 4],
        [2, 6], [3, 6], [5, 7], [6, 7]
      ];
      for (let [lx, ly] of leaves) {
        setPixel(20 + lx, 20 + ly, leafMid);
      }
    }

    // Dekolt
    setPixel(20 + 3, 20 + 0, skinShade);
    setPixel(20 + 4, 20 + 0, skinShade);
    setPixel(20 + 2, 20 + 0, shirtCollar);
    setPixel(20 + 5, 20 + 0, shirtCollar);

    // Sznurki w spodenkach
    setPixel(20 + 3, 20 + 9, [245, 245, 245, 255]);
    setPixel(20 + 4, 20 + 9, [245, 245, 245, 255]);
    setPixel(20 + 3, 20 + 10, [240, 240, 240, 255]);
    setPixel(20 + 4, 20 + 10, [240, 240, 240, 255]);

    // Tył i boki torsu
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 8; c++) {
        setPixel(32 + c, 20 + r, r < 8 ? shirtBase : shortBase);
      }
      for (let c = 0; c < 4; c++) {
        setPixel(16 + c, 20 + r, r < 8 ? shirtBase : shortBase);
        setPixel(28 + c, 20 + r, r < 8 ? shirtBase : shortBase);
      }
    }

    // Tors 3D (rąbek koszulki na nakładce)
    for (let c = 0; c < 8; c++) {
      setPixel(20 + c, 36 + 8, shirtBase);
      setPixel(32 + c, 36 + 8, shirtBase);
    }

    // ----------------------------------------------------
    // 4. RAMIONA (PRAWE I LEWE)
    // ----------------------------------------------------
    const isSlim = profile.modelType === 'slim';
    const armW = isSlim ? 3 : 4;

    // Prawe ramię (Baza: 40..55, 16..31)
    for (let faceX of [40, 44, 48, 52]) {
      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < armW; c++) {
          let col = r < 4 ? shirtBase : skinBase;
          if (r === 3) col = shirtDark;
          setPixel(faceX + c, 20 + r, col);
        }
      }
    }
    for (let c = 0; c < armW; c++) {
      for (let r = 0; r < 4; r++) {
        setPixel(44 + c, 16 + r, shirtLight);
        setPixel(48 + c, 16 + r, skinBase);
      }
    }

    // Lewe ramię (Baza: 32..47, 48..63)
    for (let faceX of [32, 36, 40, 44]) {
      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < armW; c++) {
          let col = r < 4 ? shirtBase : skinBase;
          if (r === 3) col = shirtDark;
          if (r === 8 && profile.hasWatch) col = watchStrap;
          setPixel(faceX + c, 52 + r, col);
        }
      }
    }
    for (let c = 0; c < armW; c++) {
      for (let r = 0; r < 4; r++) {
        setPixel(36 + c, 48 + r, shirtLight);
        setPixel(40 + c, 48 + r, skinBase);
      }
    }

    // Tarcza zegarka na zewnątrz lewego ramienia (x=40, y=52, r=8)
    if (profile.hasWatch) {
      setPixel(40 + 1, 52 + 8, watchScreen);
      setPixel(40 + 2, 52 + 8, watchAcc);
      // 3D zegarek
      setPixel(56 + 1, 52 + 8, watchScreen);
      setPixel(56 + 2, 52 + 8, watchAcc);
    }

    // Rękawki 3D na obu ramionach
    for (let faceX of [40, 44, 48, 52]) {
      for (let c = 0; c < armW; c++) setPixel(faceX + c, 36 + 3, shirtBase);
    }
    for (let faceX of [48, 52, 56, 60]) {
      for (let c = 0; c < armW; c++) setPixel(faceX + c, 52 + 3, shirtBase);
    }

    // ----------------------------------------------------
    // 5. NOGI (PRAWA I LEWA)
    // ----------------------------------------------------
    // Prawa noga (Baza: 0..15, 16..31)
    for (let faceX of [0, 4, 8, 12]) {
      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < 4; c++) {
          let col = shortBase;
          if (r >= 5 && r < 9) col = isShorts ? skinBase : shortBase;
          if (r === 9) col = sockBlack;
          if (r >= 10) col = r === 11 ? shoesDark : shoesBase;
          setPixel(faceX + c, 20 + r, col);
        }
      }
    }
    // Lewa noga (Baza: 16..31, 48..63)
    for (let faceX of [16, 20, 24, 28]) {
      for (let r = 0; r < 12; r++) {
        for (let c = 0; c < 4; c++) {
          let col = shortBase;
          if (r >= 5 && r < 9) col = isShorts ? skinBase : shortBase;
          if (r === 9) col = sockBlack;
          if (r >= 10) col = r === 11 ? shoesDark : shoesBase;
          setPixel(faceX + c, 52 + r, col);
        }
      }
    }

    // Podeszwy butów
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        setPixel(8 + c, 16 + r, shoesDark);
        setPixel(24 + c, 48 + r, shoesDark);
        setPixel(4 + c, 16 + r, shortBase);
        setPixel(20 + c, 48 + r, shortBase);
      }
    }

    // Paski i logo klapków (Lidl Slide / Slipper Strap)
    if (isSlides) {
      // Prawa stopa przód (x=4, y=20, r=10)
      setPixel(4 + 1, 20 + 10, lidlYellow);
      setPixel(4 + 2, 20 + 10, lidlRed);
      // Lewa stopa przód (x=20, y=52, r=10)
      setPixel(20 + 1, 52 + 10, lidlYellow);
      setPixel(20 + 2, 52 + 10, lidlRed);

      // Nakładka 3D pasek klapka
      setPixel(4 + 1, 36 + 10, lidlYellow);
      setPixel(4 + 2, 36 + 10, lidlRed);
      setPixel(4 + 1, 52 + 10, lidlYellow);
      setPixel(4 + 2, 52 + 10, lidlYellow);
    }

    // Różowy emblemat na lewej nogawce (x=24, y=52, r=4)
    setPixel(24 + 1, 52 + 4, [220, 95, 110, 255]);
    setPixel(24 + 2, 52 + 4, [245, 145, 155, 255]);

    // Nogawki 3D wokół kolan
    if (isShorts) {
      for (let faceX of [0, 4, 8, 12]) {
        for (let c = 0; c < 4; c++) {
          setPixel(faceX + c, 36 + 5, shortBase);
          setPixel(faceX + c, 52 + 5, shortBase);
        }
      }
    }

    // Zapisz dane do canvasu
    ctx.putImageData(imgData, 0, 0);
    return canvas;
  }
}

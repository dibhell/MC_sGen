/**
 * MC_sGen - Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicjalizacja 3D Skin Viewer (skinview3d)
    const viewerCanvas = document.getElementById('skin_container');
    let viewer = null;
    let walkAnim = null;
    let runAnim = null;
    let flyAnim = null;

    try {
        viewer = new skinview3d.SkinViewer({
            canvas: viewerCanvas,
            width: viewerCanvas.clientWidth || 320,
            height: viewerCanvas.clientHeight || 460,
            skin: 'assets/sample_skin.png'
        });

        viewer.camera.position.z = 70;
        viewer.camera.position.y = -5;
        viewer.controls.enableRotate = true;
        viewer.controls.enableZoom = true;

        // Domyślna animacja - chód
        walkAnim = new skinview3d.WalkingAnimation();
        walkAnim.speed = 0.6;
        runAnim = new skinview3d.RunningAnimation();
        runAnim.speed = 0.8;
        flyAnim = new skinview3d.FlyingAnimation();
        flyAnim.speed = 0.8;

        viewer.animation = walkAnim;
    } catch (e) {
        console.error("Błąd ładowania skinview3d:", e);
    }

    // Stan profilu
    let currentProfile = {
        skinTone: '#ecbe9e',
        hairType: 'bald',
        hairColor: '#3b2f28',
        hasBeard: true,
        beardType: 'goatee',
        beardColor: '#ffffff',
        hasGlasses: true,
        glassesColor: '#1a1a1e',
        eyeColor: '#415f78',
        shirtColor: '#eae5dc',
        shirtAccent: '#546948',
        shirtPattern: 'leaves',
        pantsColor: '#7c9cbd',
        pantsType: 'shorts',
        shoesColor: '#0055aa',
        shoesType: 'slides',
        hasWatch: true,
        modelType: 'default'
    };

    let currentSkinCanvas = null;

    // Elementy UI
    const photoInput = document.getElementById('photo-input');
    const dropZone = document.getElementById('drop-zone');
    const photoPreview = document.getElementById('photo-preview');
    const photoPlaceholder = document.getElementById('photo-placeholder');
    const statusText = document.getElementById('status-text');
    const statusSpinner = document.getElementById('status-spinner');
    const canvas2d = document.getElementById('canvas-2d');
    const downloadBtn = document.getElementById('download-btn');
    const loadDemoBtn = document.getElementById('load-demo-btn');

    // Kontrolki edytora
    const ctrlSkinTone = document.getElementById('ctrl-skin-tone');
    const ctrlHairType = document.getElementById('ctrl-hair-type');
    const ctrlHairColor = document.getElementById('ctrl-hair-color');
    const ctrlBeard = document.getElementById('ctrl-beard');
    const ctrlBeardColor = document.getElementById('ctrl-beard-color');
    const ctrlGlasses = document.getElementById('ctrl-glasses');
    const ctrlGlassesColor = document.getElementById('ctrl-glasses-color');
    const ctrlEyeColor = document.getElementById('ctrl-eye-color');
    const ctrlShirtColor = document.getElementById('ctrl-shirt-color');
    const ctrlShirtPattern = document.getElementById('ctrl-shirt-pattern');
    const ctrlShirtAccent = document.getElementById('ctrl-shirt-accent');
    const ctrlPantsColor = document.getElementById('ctrl-pants-color');
    const ctrlPantsType = document.getElementById('ctrl-pants-type');
    const ctrlShoesColor = document.getElementById('ctrl-shoes-color');
    const ctrlShoesType = document.getElementById('ctrl-shoes-type');
    const ctrlWatch = document.getElementById('ctrl-watch');
    const ctrlModel = document.getElementById('ctrl-model');
    const geminiKeyInput = document.getElementById('gemini-key');

    // Aktualizacja formularza na podstawie profilu
    function syncFormWithProfile() {
        ctrlSkinTone.value = currentProfile.skinTone;
        ctrlHairType.value = currentProfile.hairType;
        ctrlHairColor.value = currentProfile.hairColor;
        ctrlBeard.checked = currentProfile.hasBeard;
        ctrlBeardColor.value = currentProfile.beardColor;
        ctrlGlasses.checked = currentProfile.hasGlasses;
        ctrlGlassesColor.value = currentProfile.glassesColor;
        ctrlEyeColor.value = currentProfile.eyeColor;
        ctrlShirtColor.value = currentProfile.shirtColor;
        ctrlShirtPattern.value = currentProfile.shirtPattern;
        ctrlShirtAccent.value = currentProfile.shirtAccent;
        ctrlPantsColor.value = currentProfile.pantsColor;
        ctrlPantsType.value = currentProfile.pantsType;
        ctrlShoesColor.value = currentProfile.shoesColor;
        ctrlShoesType.value = currentProfile.shoesType;
        ctrlWatch.checked = currentProfile.hasWatch;
        ctrlModel.value = currentProfile.modelType;
    }

    // Aktualizacja profilu z formularza
    function syncProfileFromForm() {
        currentProfile.skinTone = ctrlSkinTone.value;
        currentProfile.hairType = ctrlHairType.value;
        currentProfile.hairColor = ctrlHairColor.value;
        currentProfile.hasBeard = ctrlBeard.checked;
        currentProfile.beardColor = ctrlBeardColor.value;
        currentProfile.hasGlasses = ctrlGlasses.checked;
        currentProfile.glassesColor = ctrlGlassesColor.value;
        currentProfile.eyeColor = ctrlEyeColor.value;
        currentProfile.shirtColor = ctrlShirtColor.value;
        currentProfile.shirtPattern = ctrlShirtPattern.value;
        currentProfile.shirtAccent = ctrlShirtAccent.value;
        currentProfile.pantsColor = ctrlPantsColor.value;
        currentProfile.pantsType = ctrlPantsType.value;
        currentProfile.shoesColor = ctrlShoesColor.value;
        currentProfile.shoesType = ctrlShoesType.value;
        currentProfile.hasWatch = ctrlWatch.checked;
        currentProfile.modelType = ctrlModel.value;

        renderCurrentSkin();
    }

    // Wyrenderowanie i odświeżenie skina
    function renderCurrentSkin() {
        currentSkinCanvas = SkinGenerator.generateCanvas(currentProfile);

        // Rysuj podgląd 2D
        const ctx2d = canvas2d.getContext('2d');
        ctx2d.imageSmoothingEnabled = false;
        ctx2d.clearRect(0, 0, canvas2d.width, canvas2d.height);
        ctx2d.drawImage(currentSkinCanvas, 0, 0, canvas2d.width, canvas2d.height);

        // Załaduj do widoku 3D
        if (viewer) {
            const dataUrl = currentSkinCanvas.toDataURL('image/png');
            viewer.loadSkin(dataUrl, {
                model: currentProfile.modelType === 'slim' ? 'slim' : 'default'
            });
        }
    }

    // Przetwarzanie zdjęcia
    async function processPhoto(file) {
        if (!file || !file.type.startsWith('image/')) {
            alert('Proszę załadować poprawny plik graficzny (JPG, PNG, WebP).');
            return;
        }

        // Pokaż podgląd zdjęcia
        const reader = new FileReader();
        reader.onload = async (e) => {
            const base64Url = e.target.result;
            photoPreview.src = base64Url;
            photoPreview.style.display = 'block';
            photoPlaceholder.style.display = 'none';

            // Status
            statusSpinner.style.display = 'inline-block';
            statusText.textContent = 'Analizowanie sylwetki i cech...';

            try {
                const apiKey = geminiKeyInput.value.trim();
                let detected = null;

                if (apiKey) {
                    statusText.textContent = 'Zaawansowana analiza wizyjna (Gemini AI)...';
                    detected = await GeminiVision.analyzeWithAI(apiKey, base64Url);
                } else {
                    // Natywna analiza Canvas
                    const img = new Image();
                    img.src = base64Url;
                    await img.decode();
                    detected = ColorExtractor.analyzeImage(img);
                }

                currentProfile = { ...currentProfile, ...detected };
                syncFormWithProfile();
                renderCurrentSkin();

                statusSpinner.style.display = 'none';
                statusText.textContent = 'Gotowe! Skin został wygenerowany pomyślnie.';
            } catch (err) {
                console.error("Błąd przetwarzania:", err);
                statusSpinner.style.display = 'none';
                statusText.textContent = 'Błąd analizy: ' + err.message;
            }
        };
        reader.readAsDataURL(file);
    }

    // Obsługa Drag & Drop
    dropZone.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) processPhoto(e.target.files[0]);
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            processPhoto(e.dataTransfer.files[0]);
        }
    });

    // Obsługa wklejania ze schowka (Ctrl+V)
    window.addEventListener('paste', (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;
        for (let item of items) {
            if (item.type.startsWith('image/')) {
                const file = item.getAsFile();
                processPhoto(file);
                break;
            }
        }
    });

    // Zmiany w kontrolkach na żywo
    const allInputs = [
        ctrlSkinTone, ctrlHairType, ctrlHairColor, ctrlBeard, ctrlBeardColor,
        ctrlGlasses, ctrlGlassesColor, ctrlEyeColor, ctrlShirtColor,
        ctrlShirtPattern, ctrlShirtAccent, ctrlPantsColor, ctrlPantsType,
        ctrlShoesColor, ctrlShoesType, ctrlWatch, ctrlModel
    ];
    allInputs.forEach(input => {
        input.addEventListener('input', syncProfileFromForm);
        input.addEventListener('change', syncProfileFromForm);
    });

    // Przełączniki animacji 3D
    document.getElementById('anim-idle')?.addEventListener('click', () => {
        if (viewer) viewer.animation = null;
    });
    document.getElementById('anim-walk')?.addEventListener('click', () => {
        if (viewer) viewer.animation = walkAnim;
    });
    document.getElementById('anim-run')?.addEventListener('click', () => {
        if (viewer) viewer.animation = runAnim;
    });
    document.getElementById('anim-fly')?.addEventListener('click', () => {
        if (viewer) viewer.animation = flyAnim;
    });

    // Przycisk Pobierz Skin
    downloadBtn.addEventListener('click', () => {
        if (!currentSkinCanvas) renderCurrentSkin();
        const link = document.createElement('a');
        link.download = 'skin.png';
        link.href = currentSkinCanvas.toDataURL('image/png');
        link.click();
    });

    // Przycisk Wczytaj Demo
    loadDemoBtn.addEventListener('click', () => {
        currentProfile = {
            skinTone: '#ecbe9e',
            hairType: 'bald',
            hairColor: '#3b2f28',
            hasBeard: true,
            beardType: 'goatee',
            beardColor: '#ffffff',
            hasGlasses: true,
            glassesColor: '#1a1a1e',
            eyeColor: '#415f78',
            shirtColor: '#eae5dc',
            shirtAccent: '#546948',
            shirtPattern: 'leaves',
            pantsColor: '#7c9cbd',
            pantsType: 'shorts',
            shoesColor: '#0055aa',
            shoesType: 'slides',
            hasWatch: true,
            modelType: 'default'
        };
        syncFormWithProfile();
        renderCurrentSkin();
        statusText.textContent = 'Wczytano przykładowy skin demonstracyjny (Klapki Lidl + Liście).';
    });

    // Startowa inicjalizacja
    syncFormWithProfile();
    renderCurrentSkin();
});

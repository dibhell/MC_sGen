# UI/UX Design Workflow & Skills Reference

Niniejszy dokument opisuje architekturę narzędzi projektowych UI/UX, zainstalowane skille AI, zasady kompozycji, workflow projektowy oraz pętlę review dla projektu **MC_sGen**.

---

## 1. Zainstalowane Skille & Zastosowanie

W projekcie zainstalowano 3 główne pakiety narzędzi projektowych (znajdujące się w `.agents/skills/`):

| Pakiet / Skill | Repozytorium źródłowe | Lokalizacja | Zastosowanie |
|---|---|---|---|
| **ui-ux-pro-max** | `nextlevelbuilder/ui-ux-pro-max-skill` | `.agents/skills/ui-ux-pro-max/` | Główny silnik wiedzy projektowej: style UI, typografia, kolory, design systemy, reguły stacku (React/Tailwind/Three.js), skrypt wyszukiwania `search.py`. |
| **better-web-ui** (39 skills) | `aladicf/better-web-ui` | `.agents/skills/*` | Senior design review, hierarchia (`hierarchy`), kompozycja (`arrange`), kolory (`colorize`), typografia (`typeset`), audyt (`audit`), krytyka (`critique`), szlif (`polish`), dostępność (`a11y`). |
| **yafa-ui-dashboard** | `rejourneyco/yafa-ui-dashboard` | `.agents/skills/yafa-ui-dashboard/` | Specjalistyczny skill do gęstych interfejsów sterujących, layoutów narzędziowych, kart metryk/KPI, podziału widoków, kontroli stanu i responsywności. |

### Kluczowe skille Better Web UI i ich role:
- `hierarchy`: Weryfikacja hierarchii ważności informacji na ekranie (gdzie najpierw patrzy użytkownik).
- `arrange`: Organizacja siatek, marginesów, paddingów i relacji przestrzennych.
- `colorize`: Semantyczne przypisanie barw, kontrast i eliminacja przypadkowych ozdobników.
- `typeset`: Skala typograficzna, czytelność etykiet i parowanie fontów.
- `critique`: Samodzielna krytyczna ocena wykonanej implementacji.
- `audit`: Sprawdzenie kontrastu WCAG AA, focus states, responsywności i reduced-motion.
- `polish`: Dopracowanie mikrointerakcji, stanów hover, active i animacji wejścia.

---

## 2. Odtwarzanie Instalacji i Aktualizacje

### Polecenia instalacyjne (odtworzenie środowiska od zera):
```bash
# 1. UI/UX Pro Max (dla Codexa / Antigravity / Gemini)
npx ui-ux-pro-max-cli@latest init --ai codex

# 2. Better Web UI (pakiet 39 skilli)
npx skills add aladicf/better-web-ui --agent codex -y

# 3. Yafa UI Dashboard
npx skills add rejourneyco/yafa-ui-dashboard --agent codex --yes
```

### Aktualizacja skilli:
```bash
# Sprawdzenie aktualizacji UI/UX Pro Max
npx ui-ux-pro-max-cli@latest update

# Aktualizacja zainstalowanych skilli
npx skills update -p -y
```

---

## 3. Lokalny Silnik Wyszukiwania (`search.py`)

UI/UX Pro Max posiada lokalny silnik bazy wiedzy o designie oparty o Pythona:

```bash
# Wygenerowanie i wyświetlenie rekomendacji design systemu
python -X utf8 .agents/skills/ui-ux-pro-max/scripts/search.py "Minecraft 3D character skin generator" --design-system -p "mc-sgen"

# Trwałe zapisanie design systemu do folderu design-system/
python -X utf8 .agents/skills/ui-ux-pro-max/scripts/search.py "Minecraft 3D character skin generator" --design-system --persist -p "mc-sgen" --output-dir .

# Przeszukiwanie stylów i domen
python -X utf8 .agents/skills/ui-ux-pro-max/scripts/search.py "Block-based" --domain style
python -X utf8 .agents/skills/ui-ux-pro-max/scripts/search.py "micro-interactions" --domain style
python -X utf8 .agents/skills/ui-ux-pro-max/scripts/search.py "react" --stack react
```

---

## 4. Lokalizacja Design Systemu

Źródło prawdy (Source of Truth) dla tokenów i wytycznych znajduje się w:
- `design-system/mc-sgen/MASTER.md`
- `.better-web-ui.md`
- `src/styles/index.css` (klasy `.mc-panel-3d`, `.mc-button-3d`, `.mc-slot`)
- `tailwind.config.js`

---

## 5. Workflow Projektowy (Krok po Kroku)

Nie rozpoczynaj implementacji UI od natychmiastowego pisania JSX/CSS. Zawsze stosuj proces:

```text
USER GOAL
    ↓
INFORMATION ARCHITECTURE (3 główne kroki: Wgraj → Personalizuj → Pobierz)
    ↓
CONTENT PRIORITY (Model 3D i wynik są najważniejsze)
    ↓
LAYOUT (Bento Grid: kolumna lewa - formularze, kolumna prawa - interaktywne 3D i CTA)
    ↓
DESIGN SYSTEM (Dark Luxury Voxel: głęboki grafit, szmaragdowa akcja, cyjanowe akcenty techniczne)
    ↓
COLOR SEMANTICS & ACCESSIBILITY (Kontrast >= 4.5:1, semantyczne barwy sukcesu/ostrzeżenia)
    ↓
IMPLEMENTATION
    ↓
VISUAL REVIEW & SCREENSHOT
    ↓
CRITIQUE & AUDIT
    ↓
POLISH
```

---

## 6. Zasady Dotyczące Kolorów i Dashboardów

### Zasady kolorystyczne:
- **Nigdy nie używaj przypadkowego koloru jako czystej dekoracji.**
- **Unikaj generycznego "AI slopu"**: brak fioletowo-różowych gradientów w stylu Midjourney/ChatGPT, brak świecących bezsensownych obwódek, brak gradientu na każdym elemencie.
- **Role kolorów**:
  - `brand-primary / action-primary`: Szmaragd (`#10b981` / `#059669`) – główny przycisk pobierania, potwierdzenie sukcesu.
  - `accent-technical`: Diamentowy Cyjan (`#06b6d4` / `#55FFFF`) – wskaźniki technologii WebGPU / 3D, aktywne przełączniki.
  - `surface-base`: Głęboki kosmiczny grafit (`#090a0f`).
  - `surface-panel`: `#12151f` z chiseled bevels (efekt wyrzeźbionego bloku z ciemnymi krawędziami).
  - `surface-slot`: Inset slot `#0d0f17` dla pól wejściowych i podglądu siatki.
  - `text-primary`: `#ffffff`, `text-secondary`: `#d1d5db`, `text-muted`: `#9ca3af`.

### Zasady gęstości informacji i layoutu:
- Zmniejszaj szum wizualny: każdy element musi mieć przeznaczenie.
- W widoku narzędziowym (jak podgląd 3D) kontrolki animacji, kąta widoku i podestu muszą być zwarte, intuicyjne i nie zasłaniać postaci.
- Wsparcie dla ekranów mobilnych (od 375px) z pionowym przepływem i sticky CTA.
- Dostępność klawiatury i wyraźny stan skupienia (`:focus-visible`).

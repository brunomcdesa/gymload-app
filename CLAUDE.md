# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start Metro dev server
npm start

# Run on Android / iOS
npm run android
npm run ios

# Lint
npm run lint

# Tests
npm test

# Run a single test file
npx jest path/to/test.js
```

## EAS Builds

Requer EAS CLI: `npm install -g eas-cli` e autenticação via `eas login`.

```bash
# Build de desenvolvimento — Android (distribui APK interno via EAS)
eas build --profile development --platform android

# Build de desenvolvimento — iOS (distribui internamente via EAS)
eas build --profile development --platform ios

# Build de produção — Android + iOS (auto-incrementa versão)
eas build --profile production --platform all

# Build de produção — somente Android
eas build --profile production --platform android

# Build de produção — somente iOS
eas build --profile production --platform ios
```

Perfis definidos em `eas.json`:
- **development** — `developmentClient: true`, distribuição interna. Requer app com Expo Dev Client instalado no dispositivo.
- **preview** — distribuição interna, Android gera APK (não AAB).
- **production** — `autoIncrement: true`, gera bundle para lojas (AAB no Android, IPA no iOS).

Expo project ID: `4cc1a22d-3e62-4dc1-becb-c6a0cb559beb` | owner: `brunomcdesa`

## Architecture

**Gymload** is a React Native (Expo) fitness-tracking app. Users manage workouts, exercises, and muscle groups. There is an admin role with additional screens.

### Provider / Navigation hierarchy

```
AuthProvider          ← JWT token + user state (SecureStore)
  HeaderProvider      ← active tab title/subtitle
    ActionSheetProvider
      NavigationContainer
        MainNavigator   ← decides AuthStack vs AppStack based on token validity
```

- **AuthStack** (unauthenticated): Login → CadastroUsuario → EsqueciMinhaSenha  
- **AppStack** → **TabNavigator** (Dashboard / Exercícios / Treinos / Perfil)  
- Admin-only screens (GruposMusculares, TiposVariacoes, GerenciarUsuarios) are nested inside **PerfilStack**, not top-level tabs. Gated with `useIsAdmin` hook.

### State management

Context API only — no Redux/Zustand.

- `AuthContext` (`src/context/AuthProvider.js`) — token, user (`nome`, `roles`, `uuid`, `username`, `imagemPerfilUrl`, `sexo`), `login`, `logout`, `isValidToken`.
- `HeaderContext` (`src/context/HeaderProvider.js`) — header title/subtitle updated on tab focus.

### API layer

Two Axios instances in `src/config/axios.js`:
- `axiosPublic` — no auth (login, password reset).
- `axiosPrivate` — auto-injects `Authorization: Bearer <token>` from SecureStore.

Base URL: defined in `src/comum/constants.js` via `__DEV__` — DEV: `https://gymload-api-dev.onrender.com`, PROD: `https://gymload-api.onrender.com`.

Each feature module owns its own `Api.js` (e.g. `src/modules/treinos/Api.js`). All API calls are wrapped with `pMinDelay` from `src/modules/utils/promisse.js` to enforce a minimum loading time.

### Module structure

Feature modules live in `src/modules/<feature>/` and follow this shape:

```
src/modules/treinos/
├── Api.js            # All axios calls for this feature
├── screens/          # Screen components (List, Form, Detail)
├── components/       # Feature-specific components
├── stack/            # Stack navigator for this feature
└── style/            # Feature-specific StyleSheets
```

Modules: `dashboard`, `exercicios`, `gruposMusculares`, `tipovariacao`, `treinos`, `registrosAtividades`, `usuario`, `utils`.

### Common patterns

**Data fetching in screens** — `useFocusEffect` + `useCallback` with loading state:
```jsx
const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    const { data } = await Api.fetchItems();
    setItems(data);
  } catch {
    throwToastError('Erro ao carregar dados.');
  } finally {
    setLoading(false);
  }
}, [dependency]);

useFocusEffect(fetchData);
```

**Toast notifications** — helpers from `src/modules/utils/`:
```js
throwToastSuccess('Salvo com sucesso!');
throwToastError('Erro ao salvar.');
```

**Form state** — `handleChangeState` utility from `src/modules/utils/stateUtils.js` updates a single field in a state object.

**Header title** — `useScreenTitle(title, subtitle)` from `src/hooks/useScreenTitle.js` sets the tab header on focus via `useFocusEffect`.

### Styling

Centralized theme in `src/components/Styles/ComumStyles.jsx`. Dark theme: background `#222`, primary `#333`, accent `#ff5555`.  
Module-level styles go in `src/modules/<feature>/style/style.jsx`; component-level styles in `src/components/<Component>/style/`.

### Tech notes

- Files use `.jsx` (components/screens) and `.js` (logic/config). TypeScript config exists but the codebase is JS + PropTypes.
- `react-native-reanimated` plugin is required in `babel.config.js` — keep it last.
- Google Mobile Ads are rendered via `src/components/Anuncios/`.
- EAS build config is in `eas.json`; Expo project ID `4cc1a22d-3e62-4dc1-becb-c6a0cb559beb`.

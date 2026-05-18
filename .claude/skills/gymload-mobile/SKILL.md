---
name: gymload-mobile
description: >
  Always trigger on any task or change involving the gymload-app project.
  Use this skill for ALL frontend development tasks in the Gymload app. Always
  trigger when the user mentions: tela, screen, componente, component, layout,
  formulário, form, lista, list, modal, botão, button, estilo, style, navegação,
  navigation, or any visual/UI element. Also trigger for: API integration,
  state management, refactoring components or screens, fixing layout issues,
  adding new features, reviewing existing code, or any time the user shares
  code from src/. This skill knows the Gymload architecture, patterns, and
  conventions in full detail — always use it before writing any code for this
  project.
---

# Gymload Mobile — Frontend Engineering Skill

Gymload é um app React Native (Expo) para acompanhamento de treinos. Stack: React Native 0.76, Expo 52, React Navigation v7, Axios, PropTypes (sem TypeScript de runtime). **Não use TypeScript types em runtime — use PropTypes.**

---

## 1. Arquitetura e Hierarquia de Providers

```
AuthProvider          ← JWT + estado do usuário (expo-secure-store)
  HeaderProvider      ← título/subtítulo da aba ativa
    ActionSheetProvider
      NavigationContainer
        MainNavigator   ← decide AuthStack vs AppStack pelo token
```

- **AuthStack**: Login → CadastroUsuario → EsqueciMinhaSenha
- **AppStack** → DrawerNavigator → TabNavigator (Dashboard / Exercícios / Treinos / Perfil)
- Telas admin são gateadas com `useIsAdmin`.
- Telas admin (Grupos Musculares, Tipos de Variações, Gerenciar Usuários) ficam aninhadas no `PerfilStack`, acessíveis via `MenuRow` na tela de Perfil.

---

## 2. Estrutura de Módulos

Cada feature segue exatamente este formato — **não desvie**:

```
src/modules/<feature>/
├── Api.js            # Todas as chamadas axios do módulo
├── screens/          # Telas (.jsx)
├── components/       # Componentes específicos do módulo (.jsx)
├── stack/            # Stack navigator do módulo (.js)
├── style/
│   └── style.jsx     # StyleSheet do módulo
└── utils/            # Helpers específicos (quando necessário)
```

Módulos existentes: `dashboard`, `exercicios`, `gruposMusculares`, `treinos`, `registrosAtividades`, `usuario`, `utils`.

Componentes reutilizáveis globais ficam em `src/components/<NomeComponente>/`.

---

## 3. Tema e Estilo

### Cores e estilos base — sempre importe de `ComumStyles`

```js
import { colors, ComumStyles } from '../../../components/Styles/ComumStyles';
```

**Paleta de cores (`colors`):**
| Token | Valor | Uso |
|---|---|---|
| `background` | `#222` | Fundo de telas |
| `primary` | `#333` | Cards, containers |
| `secondary` | `#ff5555` | Acento, destaques, botões principais |
| `terciary` | `#AAA` | Texto secundário |
| `inputBackground` | `#2a2a2a` | Fundo de inputs |
| `inputBorder` | `#383838` | Borda de inputs |
| `inputText` | `#fff` | Texto em inputs |
| `danger` | `#dc3545` | Erros, ações destrutivas |
| `success` | `#28a745` | Confirmações |
| `textLight` | `#fff` | Texto em fundo escuro |

**Nunca use cores hardcoded** — sempre referencie `colors.*`.

### Estilos globais reutilizáveis (`ComumStyles`)

Prefira sempre estes estilos antes de criar novos:
- `container` — flex: 1, background, padding: 16
- `formContainer` — padding: 20, flex: 1, background
- `formLabel` — label de campo de formulário
- `formLabelObrigatorio` + `asteriscoObrigatorio` — label com `*` vermelho
- `elementContainer` — card com sombra vermelha sutil
- `inlineContainer` — flexRow, space-between, gap: 10
- `fabContainer` — posição absoluta, right: 24, bottom: 24
- `listContent` — paddingBottom: 20
- `title`, `subTitle` — títulos de tela/seção

### Estilos de módulo

Cada módulo exporta um `StyleSheet` default em `style/style.jsx`. Importe como:
```js
import style from '../style/style';
const { nomeDoEstilo } = style;
```

### Regra de estilo

- **Sempre `StyleSheet.create()`** — nunca objetos inline em JSX.
- Estilos de módulo ficam em `style/style.jsx`, estilos de componente em `src/components/<Nome>/styles/style.jsx`.

---

## 4. Camada de API

### Dois clientes Axios (`src/config/axios.js`)
- `axiosPublic` — sem auth (login, cadastro, reset de senha)
- `axiosPrivate` — injeta `Authorization: Bearer <token>` automaticamente

### Padrão de `Api.js`

```js
import { axiosPrivate } from '../../config/axios';
import { pMinDelay } from '../utils/promisse';

const baseUrl = '/api/recurso';

export const fetchItens = (params, delay = 0) => {
  const response = axiosPrivate.get(baseUrl, { params });
  return pMinDelay(response, delay);
};

export const saveItem = (request, delay = 0) => {
  const response = axiosPrivate.post(baseUrl, { ...request });
  return pMinDelay(response, delay);
};

export const editarItem = ({ id, request }, delay = 0) => {
  const response = axiosPrivate.put(`${baseUrl}/${id}/editar`, { ...request });
  return pMinDelay(response, delay);
};
```

**Sempre envolva com `pMinDelay`** para garantir feedback visual mínimo ao usuário.

---

## 5. Padrões de Tela

### Listagem (padrão canônico)

```jsx
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import AddButton from '../../../components/Button/AddButton';
import SearchInput from '../../../components/Inputs/SearchInput';
import EmptyList from '../../../components/List/EmptyList';
import SeparatorItem from '../../../components/List/SeparatorItem';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const ListRecurso = () => {
  const { container, fabContainer } = ComumStyles;
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchItens();
      setItems(data);
      setFilteredItems(data);
    } catch {
      throwToastError('Erro ao buscar itens.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { fetchItems(); }, [fetchItems]));

  const renderItem = ({ item }) => (
    <SelectableItem
      item={item}
      cancelButtonIndex={2}
      options={['Editar', 'Cancelar']}
      onActionSelected={(idx, it) => { /* switch idx */ }}
    >
      {/* conteúdo do item */}
    </SelectableItem>
  );

  return (
    <View style={container}>
      <SearchInput
        placeholder="Pesquisar..."
        onSearch={setFilteredItems}
        initialData={items}
        searchKeys={['nome']}
      />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={() => <EmptyList value="item" />}
          contentContainerStyle={ComumStyles.listContent}
          ItemSeparatorComponent={SeparatorItem}
        />
      )}
      <View style={fabContainer}>
        <AddButton onPress={() => navigation.navigate('RecursoForm', { data: {}, isEdicao: false })} />
      </View>
    </View>
  );
};

export default ListRecurso;
```

### Formulário (padrão canônico)

**Regras obrigatórias para toda tela de formulário (push screen):**
1. **Footer fixo** — os botões "Voltar" e "Salvar" ficam em uma `View` fora do `ScrollView`, ancorada no fundo da tela naturalmente pelo layout flex. Nunca usar `fabContainer` (FAB absoluto) em formulários com esse padrão.
2. **Botão nativo de voltar oculto** — use `headerLeft: () => null`, `headerBackVisible: false` e `gestureEnabled: false` em `navigation.setOptions`. A navegação de retorno acontece exclusivamente pelo botão "Voltar" do footer.
3. **Título centralizado** — use `headerTitleAlign: 'center'` em `navigation.setOptions`.
4. **Botão Salvar** — `flex: 1`, `flexDirection: 'row'`, `backgroundColor: '#28a745'`, `borderRadius: 12`, ícone `MaterialIcons name="save"`, texto `"SALVAR"`, mostra `ActivityIndicator` no loading.
5. **Botão Voltar** — ghost: borda `#3a3a3a`, fundo transparente, `borderRadius: 12`, desabilitado durante loading.
6. **`headerBackVisible: false`** — obrigatório no `useLayoutEffect` para ocultar o botão de voltar nativo em todas as plataformas.
7. **Screens em PerfilStack** — quando o stack estiver aninhado dentro do `PerfilStackNavigator`, adicionar `useFocusEffect` para esconder/restaurar o header pai:
   ```jsx
   useFocusEffect(
     useCallback(() => {
       const parentNav = navigation.getParent();
       parentNav?.setOptions({ headerShown: false });
       return () => { parentNav?.setOptions({ headerShown: true }); };
     }, [navigation])
   );
   ```

```jsx
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';
import style from '../style/style';

const RecursoForm = ({ navigation, route }) => {
  const { asteriscoObrigatorio } = ComumStyles;
  const { data, isEdicao } = route.params;
  const [formData, setFormData] = useState({ nome: data.nome || null });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    try {
      setLoading(true);
      if (isEdicao) {
        await Api.editarItem({ id: data.id, request: formData });
      } else {
        await Api.saveItem(formData);
      }
      throwToastSuccess('Salvo com sucesso!');
      navigation.goBack();
    } catch {
      throwToastError('Erro ao salvar.');
    } finally {
      setLoading(false);
    }
  };

  const renderHeaderTitle = useCallback(
    () => <HeaderTitle title={isEdicao ? 'Editar Recurso' : 'Adicionar Recurso'} />,
    [isEdicao],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
      headerTitleAlign: 'center',
      headerLeft: () => null,
      headerBackVisible: false,
      gestureEnabled: false,
    });
  }, [navigation, renderHeaderTitle]);

  return (
    <View style={style.screenContainer}>
      <ScrollView contentContainerStyle={style.scrollContent}>
        <Text style={style.formDescription}>Descrição da tela de formulário.</Text>
        <Text style={style.requiredNote}>
          Campos com <Text style={asteriscoObrigatorio}>*</Text> são obrigatórios
        </Text>

        <View style={style.fieldContainer}>
          <Text style={style.fieldLabel}>
            Nome <Text style={asteriscoObrigatorio}>*</Text>
          </Text>
          <TextoInput
            placeholder="Digite o nome"
            value={formData.nome}
            onChangeText={(v) => handleChange('nome', v)}
          />
        </View>
      </ScrollView>

      {/* Footer fixo — fora do ScrollView */}
      <View style={style.formFooter}>
        <TouchableOpacity
          style={style.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={style.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[style.saveButton, loading && style.saveButtonDisabled]}
          onPress={!loading ? handleSave : null}
          disabled={loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <>
              <MaterialIcons name="save" size={18} color="#fff" />
              <Text style={style.saveButtonText}>SALVAR</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

RecursoForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      data: PropTypes.object,
      isEdicao: PropTypes.bool,
    }),
  }),
};

export default RecursoForm;
```

**Estilos obrigatórios no `style/style.jsx` do módulo:**

```js
screenContainer: { flex: 1, backgroundColor: '#222' },
scrollContent: { padding: 20, paddingBottom: 16 },
formDescription: { fontSize: 13, color: '#aaa', marginBottom: 12, lineHeight: 20 },
requiredNote: { fontSize: 12, color: '#777', marginBottom: 20 },
fieldContainer: { marginBottom: 4 },
fieldLabel: { fontSize: 13, fontWeight: '700', color: '#e8e8e8', marginBottom: 6 },
formFooter: {
  flexDirection: 'row', gap: 10, padding: 16, paddingBottom: 24,
  borderTopWidth: 1, borderTopColor: '#333', backgroundColor: '#222', alignItems: 'center',
},
backButton: {
  paddingHorizontal: 18, paddingVertical: 14, borderRadius: 12,
  borderWidth: 1, borderColor: '#3a3a3a', justifyContent: 'center', alignItems: 'center',
},
backButtonText: { color: '#e8e8e8', fontSize: 15, fontWeight: '600' },
saveButton: {
  flex: 1, flexDirection: 'row', backgroundColor: '#28a745',
  paddingVertical: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 8,
},
saveButtonDisabled: { backgroundColor: '#555' },
saveButtonText: { color: '#fff', fontSize: 15, fontWeight: '700' },
```

---

## 6. Componentes Globais Disponíveis

Sempre verifique se já existe um componente antes de criar um novo:

| Componente | Caminho | Uso |
|---|---|---|
| `TextoInput` | `components/Inputs/TextoInput` | Input de texto padrão |
| `SelectInput` | `components/Inputs/SelectInput` | Dropdown (react-native-dropdown-picker) |
| `SearchInput` | `components/Inputs/SearchInput` | Busca com filtro em lista |
| `CheckboxInput` | `components/Inputs/CheckboxInput` | Checkbox customizado |
| `TimePickerInput` | `components/Inputs/TimePickerInput` | Seletor de horário |
| `SaveButton` | `components/Button/SaveButton` | Botão de salvar com loading |
| `AddButton` | `components/Button/AddButton` | FAB de adicionar |
| `LoadingIndicator` | `components/Loading/LoadingIndicator` | Spinner de carregamento |
| `EmptyList` | `components/List/EmptyList` | Estado vazio de lista |
| `SeparatorItem` | `components/List/SeparatorItem` | Separador de FlatList |
| `SelectableItem` | `components/Selectable/SelectableItem/SelectableItem` | Item de lista com action sheet |
| `HeaderTitle` | `components/Header/HeaderTitle` | Título no header da navegação |
| `InfoBlock` | `components/Infos/InfoBlock` | Bloco de informação |
| `AnuncioBanner` | `components/Anuncios/AnuncioBanner` | Banner de anúncio AdMob |

### AnimatedPressable — armadilha de layout

`AnimatedPressable` renderiza um `Animated.View` (wrapper) envolvendo um `Pressable`. O `style` vai pro `Pressable` interno; o `wrapperStyle` vai pro `Animated.View` externo.

**Problema:** colocar `flex: 1` só no `style` não faz o botão expandir numa linha — o `Animated.View` não tem dimensão definida e comprime o conteúdo.

**Regra:** sempre que `AnimatedPressable` precisar expandir em `flexDirection: 'row'`, passe `flex: 1` via **`wrapperStyle`**:

```jsx
// ✗ errado — Animated.View não expande, botão fica comprimido
<AnimatedPressable style={[{ flex: 1, height: 50 }]} ...>

// ✓ correto — wrapperStyle expande o Animated.View; style define aparência do Pressable
<AnimatedPressable wrapperStyle={{ flex: 1 }} style={{ height: 50, ... }} ...>
```

No `StyleSheet`, defina os dois separados:

```js
genderButtonWrapper: { flex: 1 },
genderButton: { height: 50, borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
```

---

## 7. Notificações Toast

```js
import { throwToastSuccess, throwToastError } from '../../utils/toastUtils';

throwToastSuccess('Salvo com sucesso!');
throwToastError('Erro ao salvar.');
```

Sempre use toast para feedback de operações assíncronas. Nunca use `Alert.alert` para feedback de CRUD.

---

## 8. Autenticação e Contexto

```js
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

const { user, token, login, logout } = useContext(AuthContext);
// user: { nome, roles, uuid, username, imagemPerfilUrl, sexo }
```

Para checar admin: use o hook `useIsAdmin` (já existente no projeto).

---

## 9. Navegação

- Use `useNavigation()` para navegar dentro de componentes.
- Screens recebem `navigation` e `route` como props (ver PropTypes no padrão de formulário).
- Parâmetros de rota: sempre passe `{ data: {}, isEdicao: false }` para telas de formulário.
- Stacks de módulo ficam em `<module>/stack/<Modulo>StackNavigator.js`.

---

## 10. Estado de Lista com Filtro Ativo/Inativo

Quando a tela suporta filtro de inativos (padrão usado em Treinos e Exercícios):

```jsx
const [buscarInativos, setBuscarInativos] = useState(false);
// recarrega ao mudar o filtro via useFocusEffect + dependency
```

Use `Checkbox` do `react-native-paper` com `color={colors.secondary}`.

---

## 11. Icons

Use `react-native-vector-icons` (MaterialIcons já presente no projeto):

```js
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
<MaterialIcons name="chevron-right" size={24} color="#aaa" />
```

Ícones de grupos musculares customizados ficam em `src/icons/gruposMusculares/`.

---

## 12. Testes Unitários

**Obrigatório:** toda tela criada ou modificada deve ter teste em `__tests__/screens/<NomeTela>.test.jsx`. Componentes globais vão em `__tests__/components/`. Utilitários em `__tests__/utils/`.

### Stack de testes
- `react-test-renderer` + `ReactTestRenderer.act` — **não** use `@testing-library/react-native`
- Jest 29 — config em `jest.config.js`
- `MaterialIcons` já mapeado globalmente para `__mocks__/MaterialIcons.js`

### Mocks padrão

```js
// API do módulo
const mockSave = jest.fn().mockResolvedValue({ data: {} });
jest.mock('../../src/modules/<feature>/Api', () => ({
  saveItem: (...args) => mockSave(...args),
}));

// Toast
const mockThrowToastError = jest.fn();
const mockThrowToastSuccess = jest.fn();
jest.mock('../../src/modules/utils/toastUtils', () => ({
  throwToastError: (...args) => mockThrowToastError(...args),
  throwToastSuccess: (...args) => mockThrowToastSuccess(...args),
}));

// HeaderTitle
jest.mock('../../src/components/Header/HeaderTitle', () => {
  const { Text } = require('react-native');
  return ({ title }) => <Text testID="header-title">{title}</Text>;
});

// MaterialIcons (já no moduleNameMapper, mas pode sobrescrever com testID)
jest.mock('react-native-vector-icons/MaterialIcons', () => {
  const { Text } = require('react-native');
  return ({ name }) => <Text testID={`icon-${name}`}>{name}</Text>;
});

// Inputs complexos — stub simples com testID
jest.mock('../../src/components/Inputs/SelectInput', () => {
  const { View } = require('react-native');
  return () => <View testID="select-input" />;
});

// useFocusEffect (quando a tela usa hook de navegação)
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: (cb) => {
    const React = require('react');
    React.useEffect(() => { const cleanup = cb(); return cleanup; }, []);
  },
  useNavigation: () => ({ navigate: jest.fn(), setOptions: jest.fn() }),
}));
```

### buildProps e estrutura canônica

```js
const buildProps = ({ data = {}, isEdicao = false } = {}) => ({
  navigation: { goBack: jest.fn(), setOptions: jest.fn(), navigate: jest.fn() },
  route: { params: { data, isEdicao } },
});

describe('MinhaTelaForm screen', () => {
  beforeEach(() => {
    mockSave.mockClear();
    mockThrowToastError.mockClear();
    mockThrowToastSuccess.mockClear();
  });

  it('renderiza sem crash', async () => {
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<MinhaTelaForm {...buildProps()} />);
    });
  });

  it('configura header corretamente', async () => {
    const props = buildProps();
    await ReactTestRenderer.act(async () => {
      ReactTestRenderer.create(<MinhaTelaForm {...props} />);
    });
    const calls = props.navigation.setOptions.mock.calls;
    const opts = calls[calls.length - 1][0];
    expect(opts.headerTitleAlign).toBe('center');
    expect(opts.headerBackVisible).toBe(false);
    expect(opts.gestureEnabled).toBe(false);
  });

  it('valida campos obrigatórios e exibe toast de erro', async () => {
    let instance;
    await ReactTestRenderer.act(async () => {
      instance = ReactTestRenderer.create(<MinhaTelaForm {...buildProps()} />);
    });
    const btnSalvar = instance.root.findByProps({ testID: 'btn-salvar' });
    await ReactTestRenderer.act(async () => { await btnSalvar.props.onPress(); });
    expect(mockThrowToastError).toHaveBeenCalled();
    expect(mockSave).not.toHaveBeenCalled();
  });

  it('salva com sucesso e volta', async () => { /* ... */ });
  it('edita com sucesso', async () => { /* ... */ });
  it('botão Voltar chama goBack', async () => { /* ... */ });
});
```

### Regras obrigatórias para testabilidade

- **Botões do footer** devem ter `testID="btn-salvar"` e `testID="btn-voltar"` — sem eles não é possível simular interação nos testes.
- `console.log` de erro não deve aparecer em testes — remova-os ou substitua por `throwToastError`.
- Warnings de `Animated` pós-teardown são pré-existentes no projeto — não são falhas e podem ser ignorados.

### Casos de teste mínimos por tipo de tela

**Formulário:**
- renderiza sem crash (criar e editar)
- header: título correto, `headerBackVisible: false`, `headerTitleAlign: 'center'`, `gestureEnabled: false`
- validação: cada campo obrigatório faltando → toast de erro + API não chamada
- submit com sucesso (criar) → API correta chamada + toast sucesso + `goBack`
- submit com sucesso (editar) → API de edição chamada
- erro da API → toast de erro com mensagem da API
- botão Voltar → `goBack` chamado

**Listagem:**
- renderiza sem crash
- exibe loading indicator enquanto busca
- exibe EmptyList quando sem dados
- exibe itens quando API retorna dados

---

## 13. Checklist antes de finalizar

- [ ] Componente importa `colors` e `ComumStyles` de `ComumStyles.jsx` — sem cores hardcoded
- [ ] `StyleSheet.create()` usado — sem objetos inline em JSX
- [ ] API call envolto em `pMinDelay`
- [ ] `useFocusEffect` + `useCallback` para fetch de dados
- [ ] `loading` state gerenciado com `try/finally`
- [ ] Toast de sucesso e erro implementados
- [ ] `LoadingIndicator` exibido durante loading
- [ ] `EmptyList` como `ListEmptyComponent` na FlatList
- [ ] `FlatList` usada para listas dinâmicas (nunca `ScrollView + map`)
- [ ] `PropTypes` definidos em todos os componentes que recebem props
- [ ] Arquivo no caminho correto do módulo (`screens/`, `components/`, `style/`)
- [ ] Estilo de módulo em `style/style.jsx` do módulo correspondente
- [ ] **Formulários (push screens)**: footer com "Voltar"+"Salvar" fora do ScrollView; `headerLeft: () => null`; `gestureEnabled: false`; `headerTitleAlign: 'center'` — ver padrão canônico acima
- [ ] **Botões do footer têm `testID="btn-salvar"` e `testID="btn-voltar"`** — obrigatório para testes
- [ ] **Teste criado ou atualizado** em `__tests__/screens/<NomeTela>.test.jsx` cobrindo os casos mínimos da seção 12

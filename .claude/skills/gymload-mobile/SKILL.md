---
name: gymload-mobile
description: >
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
- **AppStack** → DrawerNavigator → TabNavigator (Dashboard / Exercícios / Treinos / Grupos Musculares)
- Telas admin são gateadas com `useIsAdmin`.

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

```jsx
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import SaveButton from '../../../components/Button/SaveButton';
import HeaderTitle from '../../../components/Header/HeaderTitle';
import TextoInput from '../../../components/Inputs/TextoInput';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import * as Api from '../Api';

const RecursoForm = ({ navigation, route }) => {
  const { formContainer, fabContainer, formLabel, formLabelObrigatorio, asteriscoObrigatorio } = ComumStyles;
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
    () => <HeaderTitle title={isEdicao ? 'Editar' : 'Adicionar'} isForm />,
    [isEdicao],
  );

  useLayoutEffect(() => { navigation.setOptions({ headerTitle: renderHeaderTitle }); }, [navigation, renderHeaderTitle]);

  return (
    <View style={formContainer}>
      {/* campos do formulário */}
      <View style={fabContainer}>
        <SaveButton onPress={handleSave} loading={loading} />
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

## 12. Checklist antes de finalizar

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

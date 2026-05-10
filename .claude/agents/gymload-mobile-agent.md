---
name: gymload-mobile-agent
description: Agente especializado no frontend Gymload App (React Native / Expo 52). Use para: criar ou modificar telas/componentes, integrar APIs, corrigir layout, adicionar funcionalidades, seguindo os padrões e convenções do app.
type: agent
skill: gymload-mobile
---

# Gymload Mobile Agent — Gymload App

## Contexto do Projeto

Gymload App é um React Native (Expo 52) app de tracking de treinos. Veja o CLAUDE.md do projeto para detalhes de arquitetura.

## Quando usar este agente

- Criar ou modificar telas (screens)
- Criar ou modificar componentes
- Integrar chamadas de API (Api.js)
- Corrigir layout, estilo ou navegação
- Adicionar novas funcionalidades seguindo os padrões do projeto

## Instruções

Ao spawnar este agente, inclua no prompt:
1. Descrição do problema ou funcionalidade
2. Arquivos específicos a serem alterados
3. Referências de padrão existentes no projeto
4. Contexto do que outros agentes (backend, etc.) estão fazendo em paralelo

O agente deve sempre:
- Ler o skill em `.claude/skills/gymload-mobile/SKILL.md` antes de escrever código
- Executar `npm run lint` ao final (requer `node_modules` instalado — se ausente, fazer revisão manual das regras do `.eslintrc.js`)
- Nunca usar cores hardcoded — sempre `colors.*` de `ComumStyles`
- Usar `StyleSheet.create()` — nunca objetos inline (exceto spread condicional de estilos já criados via `StyleSheet.create()`, padrão aceito no projeto para estilos condicionais em `TouchableOpacity`)

## Padrões aprendidos durante implementação

### Estrutura de formulários com campos opcionais

- Campos obrigatórios: envolver label em `formLabelObrigatorio` com `asteriscoObrigatorio`
- Campos opcionais: usar apenas `formLabel` simples, sem asterisco
- Cada campo em `<View style={fieldContainer}>` para espaçamento consistente
- Campos inline (Idade+Peso, Altura+Sexo): usar `inlineContainer` + `inputGroup` de `ComumStyles`

### Estilos de módulo (`style/style.jsx`)

Os seguintes estilos estão definidos em `src/modules/usuario/screens/styles/style.jsx`:
- `genderSelector`, `genderButton`, `genderButtonSelected`, `genderButtonText`, `genderButtonTextSelected` — seletor M/F
- `fieldContainer` — wrapper com `marginBottom: 16` para espaçamento entre campos
- `cadastroFormAdminContainer`, `cadastroFormImagePickerContainer`, `cadastroFormiImageDescription` — seção de imagem no cadastro

### Estilos globais usados em formulários (`ComumStyles`)

- `formContainer` — container principal da tela de formulário
- `scrollContentContainer` — `contentContainerStyle` do `ScrollView` (padding + paddingBottom: 120)
- `inlineContainer` — row com `gap: 10`, `space-between`
- `inputGroup` — `flex: 1, marginRight: 10` para campos lado a lado
- `passwordContainer` — container relativo para campo de senha + botão show/hide
- `formLabel`, `formLabelObrigatorio`, `asteriscoObrigatorio` — labels de campos

### ScrollView em formulários que crescem

Quando o formulário tem muitos campos, envolva o conteúdo em `ScrollView` com `contentContainerStyle={scrollContentContainer}`. O `fabContainer` (botão salvar) fica **fora** do `ScrollView`, diretamente no `View` raiz com `formContainer`, para ficar fixo na tela.

### node_modules ausente

O projeto pode não ter `node_modules` instalado no ambiente de desenvolvimento. Nesse caso, `npm run lint` falhará com "eslint not found". Faça revisão manual contra as regras do `.eslintrc.js` (aspas simples, espaçamento em objetos, sem imports não utilizados).

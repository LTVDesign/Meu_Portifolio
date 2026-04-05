# Segurança do Portfólio

Este documento detalha todas as medidas de segurança implementadas no portfólio para garantir a proteção contra vulnerabilidades comuns.

## Medidas de Segurança Implementadas

### 1. Prevenção de XSS (Cross-Site Scripting)

- **Correção no script.js**: Substituímos `innerHTML` por métodos seguros de criação de elementos DOM para evitar injeção de scripts maliciosos
- **Sanitização de URLs**: Adicionamos validação para todas as URLs antes de serem usadas com `window.open`
- **CSP (Content Security Policy)**: Implementamos política de segurança no `index.html` para restringir fontes de conteúdo

### 2. Proteção de Dados e Credenciais

- **Remoção de credenciais do frontend**: Eliminamos completamente o uso de credenciais do EmailJS no frontend
- **Serviço de email seguro**: Criamos um mock de serviço de email (`src/utils/emailService.ts`) que pode ser facilmente substituído por uma implementação backend real
- **Migração de email pessoal**: Movemos o email pessoal para variáveis de ambiente
- **Dependência removida**: Removemos `@emailjs/browser` do package.json para evitar uso acidental

### 3. Rate Limiting e Proteção contra Spam

- **Cooldown de 30 segundos**: Implementado no formulário de contato via localStorage
- **Debounce de 2 segundos**: Previne múltiplos cliques rápidos no botão de envio
- **Honeypot**: Campo oculto adicionado ao formulário para detectar e bloquear bots
- **Validação robusta**: Schema Zod com limites de tamanho para todos os campos

### 4. Validação e Sanitização de Dados

- **Validação de localStorage**: Implementamos validação rigorosa para dados armazenados no localStorage
- **Sanitização de entradas**: Adicionamos funções de sanitização para todos os tipos de entrada
- **Validação de URLs**: Implementamos verificação de protocolos e domínios para todas as URLs

### 4. Prevenção de Injeção e Outras Vulnerabilidades

- **Validação de formulários**: Melhoramos a validação tanto no frontend quanto simulando backend
- **Remoção de logs em produção**: Eliminamos logs de erro que poderiam expor informações sensíveis
- **Headers de segurança**: Adicionamos headers de segurança no servidor Vite

### 5. Headers de Segurança Implementados

- `Strict-Transport-Security`: Força o uso de HTTPS
- `X-Content-Type-Options`: Previne MIME-type sniffing
- `X-Frame-Options`: Previne clickjacking
- `X-XSS-Protection`: Habilita proteção XSS no navegador
- `Referrer-Policy`: Controla informações de referência
- `Permissions-Policy`: Restringe APIs perigosas

### 6. Boas Práticas de Segurança

- **Validação de esquema para localStorage**: Usamos validação rigorosa para dados salvos localmente
- **Tratamento seguro de window.open**: Validamos URLs antes de abrir novas janelas
- **Sanitização de strings**: Funções de sanitização para prevenir XSS
- **Validação de email e telefone**: Regras rigorosas para validação de entradas

## Arquivos Afetados

- `src/components/canvas/particulate-shatter/script.js` - Correção de XSS
- `src/components/sections/Contact.tsx` - Remoção de credenciais, rate limiting, honeypot e validação melhorada
- `src/utils/emailService.ts` - Novo serviço de email seguro
- `src/utils/validation.ts` - Funções de validação e sanitização
- `src/contexts/ParticleConfigContext.tsx` - Validação de localStorage
- `src/components/sections/Works.tsx`, `AllWorks.tsx`, `Formacao.tsx` - Validação de URLs em window.open
- `index.html` - CSP implementada
- `vite.config.js` - Headers de segurança
- `src/constants/config.ts` - Migração de email para variáveis de ambiente
- `package.json` - Remoção da dependência `@emailjs/browser`

## Recomendações para Produção

Para um ambiente de produção seguro, recomenda-se:

1. **Implementar backend real**: Substituir o mock de emailService por uma implementação backend real
2. **Usar variáveis de ambiente**: Garantir que todas as credenciais sejam gerenciadas via variáveis de ambiente
3. **Configurar servidor web**: Aplicar os mesmos headers de segurança no servidor web de produção
4. **Monitoramento contínuo**: Implementar sistema de monitoramento para detectar tentativas de exploração
5. **Atualizações regulares**: Manter todas as dependências atualizadas

## Testes de Segurança

Após as implementações, o código foi verificado quanto a:
- Injeção de scripts (XSS)
- Exposição de credenciais
- Validação inadequada de entradas
- Uso inseguro de APIs do navegador
- Configurações de segurança faltantes
- Proteção contra spam e bots (honeypot, rate limiting)

## Detalhes Técnicos das Implementações

### CSP (Content Security Policy)

A CSP configurada em `index.html` restringe:
- Scripts apenas de origem própria, CDNs específicos (jsdelivr, unpkg) e `'unsafe-eval'` (necessário para WebAssembly)
- Estilos apenas inline e próprio
- Imagens de própria origem, data URIs e HTTPS
- Conexões apenas para api.emailjs.com e WebSockets locais do Vite (ws://localhost:5174, ws://localhost:5173) em desenvolvimento
- Frames e objetos bloqueados

**Notas sobre desenvolvimento:**
- `'unsafe-eval'` é necessário para WebAssembly usado por bibliotecas como `@react-three/drei` (MeshoptDecoder)
- WebSockets locais são permitidos apenas para Hot Module Replacement (HMR) do Vite em ambiente de desenvolvimento
- Em produção, essas permissões podem ser removidas se não forem necessárias

### Rate Limiting

Implementado usando `localStorage`:
- Cooldown de 30 segundos entre envios
- Timestamp registrado após cada envio bem-sucedido
- Mensagem de erro clara com contagem regressiva

### Honeypot

- Campo oculto `website` adicionado ao formulário
- Campo com `tabIndex={-1}` e `autoComplete="off"`
- Se preenchido, o envio é silenciosamente bloqueado
- Detecta bots que preenchem todos os campos automaticamente

### Validação de Formulário

- Schema Zod com limites rigorosos:
  - Nome: 1-100 caracteres
  - Email: formato válido
  - Telefone: máximo 20 caracteres
  - Empresa: máximo 100 caracteres
  - Mensagem: 20-1000 caracteres
- Validação em tempo real com feedback de erros por campo
- Limpeza de erros ao editar campos
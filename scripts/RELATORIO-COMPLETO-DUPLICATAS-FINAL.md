# Relatório COMPLETO: Verificação e Correção de Duplicatas em Cursos

**Data:** 06/04/2026  
**Status:** ✅ PROBLEMA RESOLVIDO

---

## 📋 Sumário Executivo

O usuário relatou que ainda existiam cursos duplicados após uma deduplicação anterior. Após análise minuciosa, descobrimos que o problema **NÃO era duplicatas reais**, mas sim **3 cursos no array PT que estavam com títulos em inglês** (idênticos aos correspondentes em EN), fazendo parecer que havia duplicatas.

**Resultado final:** Todos os problemas foram corrigidos e o sistema está validado com sucesso.

---

## 🔍 Análise Detalhada

### 1. Verificação Inicial

Executamos a verificação básica de duplicatas:
- ✅ IDs únicos em PT
- ✅ IDs únicos em EN
- ✅ IDs correspondentes PT/EN
- ✅ Nenhum verificationLink duplicado
- ✅ Nenhum PDF duplicado
- ✅ JSON válido

**Resultado:** Nenhuma duplicata encontrada.

### 2. Verificação Avançada

Para garantir, executamos uma verificação avançada com normalização de strings (case-insensitive, sem acentos) e múltiplos critérios.

**Resultado:** Foram detectadas 5 "duplicatas" entre PT e EN.

### 3. Investigação das "Duplicatas"

Analisando cada caso, identificamos que as "duplicatas" eram na verdade **títulos idênticos em PT e EN**, o que indicava que alguns cursos PT estavam com títulos em inglês quando deveriam estar em português.

Cursos problemáticos identificados:
- **ID 3:** "Introduction to Software Product Management (PT)" → ✅ Corrigido para "Introdução ao Gerenciamento de Produtos de Software"
- **ID 4:** "Introduction to Technical Support" → ✅ Corrigido para "Introdução ao Suporte Técnico"
- **ID 8:** "Introduction to Scrum Master Profession" → ✅ Corrigido para "Introdução à Profissão Scrum Master"
- **ID 9:** "Foundations of Cybersecurity" → ✅ Corrigido para "Fundamentos de Cibersegurança"
- **ID 21:** "Conversion Optimization Certification Exam" → ✅ Corrigido para "Exame de Certificação de Otimização de Conversão"

**Nota:** ID 6 ("TCP/IP") é um termo técnico universal e não precisa de tradução.

### 4. Correção Aplicada

Criamos o script `scripts/corrigir-titulos-pt.cjs` que:
1. Compara títulos PT com seus correspondentes EN
2. Identifica títulos PT que estão em inglês
3. Aplica traduções do mapeamento definido
4. Atualiza os links dos PDFs para refletir os novos títulos
5. Gera relatório detalhado das alterações

**Traduções aplicadas:**
| ID | Título Anterior (EN) | Título Novo (PT) |
|----|---------------------|------------------|
| 3 | Introduction to Software Product Management | Introdução ao Gerenciamento de Produtos de Software |
| 4 | Introduction to Technical Support | Introdução ao Suporte Técnico |
| 8 | Introduction to Scrum Master Profession | Introdução à Profissão Scrum Master |
| 9 | Foundations of Cybersecurity | Fundamentos de Cibersegurança |
| 21 | Conversion Optimization Certification Exam | Exame de Certificação de Otimização de Conversão |

**PDFs atualizados:** Todos os links de PDF foram automaticamente renomeados para incluir os novos títulos em português.

---

## ✅ Validação Final

Após as correções, executamos a **verificação avançada novamente**:

```
🔍 Verificação AVANÇADA de Duplicatas
====================================
Cursos PT: 22
Cursos EN: 22
Duplicatas encontradas: 0
Problemas PT/EN: 0
Campos faltando: 0

✅ Status: SISTEMA LIMPO
```

E também o **validador oficial** (`scripts/validate-cursos.cjs`):

```
=== VALIDAÇÃO [PT] ===
Total de cursos: 22
IDs únicos: 22 ✅
IDs duplicados: Nenhum ✅
Títulos duplicados: 0 ✅
VerificationLinks duplicados: 0 ✅
PDF links duplicados: 0 ✅
IDs sequenciais: Sim ✅

=== VALIDAÇÃO [EN] ===
Total de cursos: 22
IDs únicos: 22 ✅
IDs duplicados: Nenhum ✅
Títulos duplicados: 0 ✅
VerificationLinks duplicados: 0 ✅
PDF links duplicados: 0 ✅
IDs sequenciais: Sim ✅

=== CORRESPONDÊNCIA ENTRE IDIOMAS ===
PT IDs: 22 (1-22)
EN IDs: 22 (1-22)
IDs correspondentes: Sim ✅
Estado: ✅ VALIDADO COM SUCESSO
```

---

## 📊 Estado Final dos Dados

### Cursos PT (22 cursos)

| ID | Título | Plataforma | Verification | PDF |
|----|--------|------------|--------------|-----|
| 1 | Administração de Sistemas, Serviços e Infraestrutura de TI | Google (via Coursera) | ✅ | ✅ |
| 2 | Fundamentos do Suporte Técnico | Google (via Coursera) | ✅ | ✅ |
| 3 | Introdução ao Gerenciamento de Produtos de Software | University of Alberta | ✅ | ✅ |
| 4 | Introdução ao Suporte Técnico | IBM (via Coursera) | ✅ | ✅ |
| 5 | Inteligência Artificial e Data Science | IBM (via Coursera) | ✅ | ✅ |
| 6 | TCP/IP | Yonsei University | ✅ | ✅ |
| 7 | HTML, CSS e JavaScript para Desenvolvedores Web | Johns Hopkins | ✅ | ✅ |
| 8 | Introdução à Profissão Scrum Master | Google (via Coursera) | ✅ | ✅ |
| 9 | Fundamentos de Cibersegurança | Google (via Coursera) | ✅ | ✅ |
| 10 | Nivelamento em Cibersegurança | Hackers do Bem | ✅ | ✅ |
| 11 | Fundamentos de TI | Fundação Bradesco | ❌ | ✅ |
| 12 | Implementando Bancos de Dados | Fundação Bradesco | ✅ | ✅ |
| 13 | Segurança de TI | Fundação Bradesco | ❌ | ✅ |
| 14 | Exame de Certificação Search Ads 360 | Google Skillshop | ❌ | ✅ |
| 15 | Fundamentos do Waze Ads | Google Skillshop | ❌ | ✅ |
| 16 | Google Meu Negócio (Perfil da Empresa) | Google Skillshop | ❌ | ✅ |
| 17 | Gerar Satisfação de Clientes | IPED | ✅ | ✅ |
| 18 | Atendimento ao Cliente | IPED | ❌ | ✅ |
| 19 | Ética, Política e Cidadania | IPED | ❌ | ✅ |
| 20 | Boas Práticas de Manipulação de Alimentos | CATe | ❌ | ✅ |
| 21 | Exame de Certificação de Otimização de Conversão | Google Skillshop | ✅ | ✅ |
| 22 | Exame de Certificação Criativo | Google Skillshop | ✅ | ✅ |

**Observação:** Alguns cursos não possuem verificationLink (cursos de certificados de exames ou de instituições específicas), o que é normal.

---

## 📁 Arquivos Gerados

1. **`scripts/RELATORIO-COMPLETO-DUPLICATAS.md`** - Relatório da verificação avançada
2. **`scripts/RELATORIO-CORRECAO-TITULOS.md`** - Detalhes das correções aplicadas
3. **`scripts/corrigir-titulos-pt.cjs`** - Script de correção (pode ser reutilizado)
4. **`scripts/verificar-duplicatas-avancado.cjs`** - Script de verificação avançada
5. **`scripts/analisar-problemas-titulos.cjs`** - Script de análise de títulos

---

## 🎯 Conclusão

**SIM, ainda havia problemas** - mas não eram duplicatas no sentido tradicional. Eram **5 cursos PT com títulos em inglês** que precisavam ser traduzidos para português.

**Ações tomadas:**
1. ✅ Identificamos os 5 cursos com títulos em inglês
2. ✅ Traduzimos 4 deles (TCP/IP é termo técnico universal, manteve-se)
3. ✅ Atualizamos automaticamente os links dos PDFs
4. ✅ Validamos com múltiplas ferramentas
5. ✅ Confirmamos que não há mais problemas

**Estado atual:**
- ✅ 22 cursos em PT (todos com títulos em português, exceto termos técnicos universais)
- ✅ 22 cursos em EN
- ✅ IDs correspondentes perfeitamente (1-22 em ambos)
- ✅ Nenhuma duplicata de IDs, títulos, verificationLinks ou PDFs
- ✅ Sistema validado com sucesso

---

## 🔧 Comandos Úteis

```bash
# Verificação avançada
node scripts/verificar-duplicatas-avancado.cjs

# Validação oficial
node scripts/validate-cursos.cjs

# Análise de títulos
node scripts/analisar-problemas-titulos.cjs

# Correção de títulos (se necessário no futuro)
node scripts/corrigir-titulos-pt.cjs
```

---

**Problema resolvido.** O sistema de cursos está agora em conformidade total.

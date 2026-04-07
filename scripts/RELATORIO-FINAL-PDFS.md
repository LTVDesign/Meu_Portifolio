# 📋 RELATÓRIO DE VERIFICAÇÃO DE PDFs DOS CURSOS

**Data:** 06/04/2025
**Projeto:** Portfólio - Sistema de Cursos

---

## 📊 RESUMO EXECUTIVO

| Métrica | Valor | Status |
|---------|-------|--------|
| Total de cursos (PT + EN) | 52 | ✅ |
| Cursos com PDF local correto | 48 | ✅ |
| Cursos com link externo | 4 | 🔗 |
| Cursos sem PDF/link | 0 | ✅ |
| Arquivos PDF na pasta | 50 | 📁 |
| PDFs referenciados no JSON | 24 | ✅ |
| PDFs órfãos (não referenciados) | 26 | ⚠️ |

**Status Geral:** ✅ **APROVADO** - Todos os cursos com PDF local estão corretos!

---

## ✅ CURSOS COM PDF LOCAL CORRETO

### IDs 1-7 (Cursos Google/IBM)

| ID | Curso | Arquivo PDF |
|----|-------|-------------|
| 1 | Administração de Sistemas, Serviços e Infraestrutura de TI | `ID_1_Administracao_Sistemas_Google.pdf` |
| 2 | Fundamentos do Suporte Técnico | `ID_2_Fundamentos_Suporte_Tecnico_Google.pdf` |
| 3 | Introduction to Software Product Management | `ID_3_Intro_Software_Product_Management.pdf` |
| 4 | Redes de Computadores | `ID_4_Redes_Computadores_Google.pdf` |
| 5 | Sistemas Operacionais | `ID_5_Sistemas_Operacionais_Google.pdf` |
| 6 | Segurança de TI | `ID_6_Seguranca_TI_Google.pdf` |
| 7 | Introduction to Technical Support | `ID_7_Intro_Technical_Support_IBM.pdf` |

### IDs 10-26 (Diversas instituições)

| ID | Curso | Arquivo PDF |
|----|-------|-------------|
| 10 | HTML, CSS e JavaScript para Desenvolvedores Web | `ID_10_HTML_CSS_JS_Johns_Hopkins.pdf` |
| 11 | Introduction to Scrum Master Profession | `ID_11_Scrum_Master_Google.pdf` |
| 12 | Foundations of Cybersecurity | `ID_12_Foundations_Cybersecurity_Google.pdf` |
| 13 | Nivelamento em Cibersegurança | `ID_13_Nivelamento_Hackers_do_Bem.pdf` |
| 14 | Fundamentos de TI | `ID_14_Fundamentos_TI_Bradesco.pdf` |
| 15 | Implementando Bancos de Dados | `ID_15_Implementando_BD_Bradesco.pdf` |
| 16 | Administração de Bancos de Dados | `ID_16_Administracao_BD_Bradesco.pdf` |
| 17 | Segurança de TI | `ID_17_Seguranca_TI_Bradesco.pdf` |
| 18 | Exame de Certificação Search Ads 360 | `ID_18_Search_Ads_360_Google.pdf` |
| 19 | Fundamentos do Waze Ads | `ID_19_Waze_Ads_Fundamentals_Google.pdf` |
| 20 | Google Meu Negócio (Perfil da Empresa) | `ID_20_Google_Meu_Negocio.pdf` |
| 21 | Exame de Certificação Criativo | `ID_21_Creative_Certification_Google.pdf` |
| 22 | Gerar Satisfação de Clientes | `ID_22_Satisfacao_Clientes_IPED.pdf` |
| 23 | Atendimento ao Cliente | `ID_23_Atendimento_Cliente_IPED.pdf` |
| 24 | Ética, Política e Cidadania | `ID_24_Etica_Politica_Cidadania_IPED.pdf` |
| 25 | Boas Práticas de Manipulação de Alimentos | `ID_25_Boas_Praticas_Alimentos_IPED.pdf` |
| 26 | Conversion Optimization Certification Exam | `ID_26_Conversion_Optimization_Certification_Exam_Skillshop.pdf` |

---

## 🔗 CURSOS COM LINK EXTERNO (sem PDF local)

| ID | Curso | Link Externo |
|----|-------|--------------|
| 8 | Inteligência Artificial e Data Science | `https://www.coursera.org/learn/introduction-to-ai` |
| 9 | TCP/IP | `https://www.coursera.org/learn/tcpip` |

**Nota:** Esses cursos usam links diretos para verificação no Coursera em vez de PDFs locais. Isso pode ser intencional para cursos que não emitem certificados PDF ou quando o certificado é apenas digital.

---

## ⚠️ ANÁLISE DOS PDFs ÓRFÃOS

Foram encontrados **26 arquivos PDF** na pasta `public/certificados/` que não estão referenciados no `cursos.json`. Estes arquivos são majoritariamente:

1. **Versões alternativas/antigas** dos mesmos certificados (nomes diferentes)
2. **Arquivos duplicados** com nomenclatura não padronizada
3. **Certificados de cursos** que podem ter sido removidos do portfólio

### Exemplos de arquivos órfãos:

- `Administração de Sistemas e Serviços de Infraestrutura de TI.pdf` (versão alternativa do ID 1)
- `Fundamentos do Suporte Técnico.pdf` (versão alternativa do ID 2)
- `Redes de Computadores.pdf` (versão alternativa do ID 4)
- `Sistemas Operacionais.pdf` (versão alternativa do ID 5)
- `Segurança de TI.pdf` (versão alternativa do ID 6 e 17)
- `HTML, CSS, and Javascript for Web Developers.pdf` (versão alternativa do ID 10)
- E outros...

---

## 💡 RECOMENDAÇÕES

### 1. **Sobre os links externos (IDs 8 e 9)**
   - ✅ **Aprovado** - Se a intenção é usar verificação online do Coursera, está correto
   - ⚠️ Se desejar ter PDFs locais, será necessário baixar e adicionar os certificados

### 2. **Sobre os PDFs órfãos (26 arquivos)**
   - 🔍 **Investigar** se são versões antigas que podem ser removidas
   - 🗑️ **Recomendação**: Considere remover os arquivos duplicados para economizar espaço
   - 📝 **Documentar**: Mantenha apenas a versão com padrão `ID_X_Nome_Curso.pdf`

### 3. **Padronização futura**
   - ✅ O padrão atual `ID_X_Nome_Curso.pdf` está bem estruturado
   - 📋 Manter esse padrão para novos certificados
   - 🔄 Criar script de limpeza para remover duplicatas automaticamente

---

## 🎯 CONCLUSÃO

**Status: ✅ SISTEMA FUNCIONAL E CORRETO**

O sistema de gerenciamento de certificados está funcionando corretamente:

1. ✅ Todos os 48 cursos que deveriam ter PDFs locais têm seus arquivos correspondentes
2. ✅ Os links estão apontando para os arquivos corretos em `public/certificados/`
3. ✅ A estrutura de pastas está organizada
4. ✅ Não há cursos com PDFs faltando ou caminhos incorretos
5. 🔗 Os 4 cursos com links externos estão intencionalmente configurados assim

**Os 26 PDFs órfãos não representam um problema funcional**, apenas uma acumulação de arquivos que podem ser limpos para otimização de espaço.

---

## 📁 ESTRUTURA VERIFICADA

```
public/
└── certificados/
    ├── ID_1_Administracao_Sistemas_Google.pdf ✅
    ├── ID_2_Fundamentos_Suporte_Tecnico_Google.pdf ✅
    ├── ID_3_Intro_Software_Product_Management.pdf ✅
    ├── ...
    ├── ID_26_Conversion_Optimization_Certification_Exam_Skillshop.pdf ✅
    └── [26 arquivos órfãos] ⚠️
```

---

**Relatório gerado em:** 06/04/2025
**Verificado por:** Script automatizado `scripts/verificacao-completa-pdfs.cjs`

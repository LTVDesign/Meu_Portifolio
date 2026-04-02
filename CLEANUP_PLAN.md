# Plano de Limpeza e Organização do Projeto

## Objetivo
Fazer uma limpeza geral em todos os arquivos, logs, imagens, tudo que não é usado, tudo que é antigo. Organizar completamente todos os arquivos cada um em sua pasta.

## Estrutura de Organização Proposta

### 1. Limpeza de Arquivos Desnecessários
- [ ] Remover arquivos de log
- [ ] Remover arquivos temporários
- [ ] Remover arquivos de backup antigos
- [ ] Remover pastas vazias
- [ ] Remover arquivos duplicados

### 2. Organização de Imagens
- [ ] Mover todas as imagens para `public/assets/images/`
- [ ] Separar por tipo:
  - `public/assets/images/companies/` - logos de empresas
  - `public/assets/images/tech/` - logos de tecnologias
  - `public/assets/images/projects/` - screenshots de projetos
  - `public/assets/images/profile/` - fotos pessoais
  - `public/assets/images/backgrounds/` - backgrounds e texturas
  - `public/assets/images/icons/` - ícones e favicon

### 3. Organização de Assets 3D
- [ ] Mover modelos 3D para `public/assets/3d-models/`
  - `public/assets/3d-models/desktop-pc/`
  - `public/assets/3d-models/planet/`
  - `public/assets/3d-models/other/`

### 4. Organização de Documentos
- [ ] Mover certificados para `public/assets/documents/certificates/`
- [ ] Mover materiais de curso para `public/assets/documents/courses/`

### 5. Organização de Código
- [ ] Verificar se todos os componentes estão em `src/components/`
- [ ] Verificar se todas as páginas estão em `src/pages/`
- [ ] Verificar se todos os hooks estão em `src/hooks/`
- [ ] Verificar se todos os utils estão em `src/utils/`

### 6. Limpeza de Configuração
- [ ] Verificar arquivos de configuração na raiz
- [ ] Mover configs desnecessárias para pasta específica

### 7. Atualização de Referências
- [ ] Atualizar imports nos arquivos TypeScript/React
- [ ] Atualizar referências em arquivos de configuração
- [ ] Atualizar caminhos em componentes que usam imagens

### 8. Verificação Final
- [ ] Testar se o projeto compila
- [ ] Verificar se todas as imagens são carregadas
- [ ] Confirmar que não há arquivos quebrados
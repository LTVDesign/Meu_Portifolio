/**
 * Serviço de email seguro
 *
 * IMPORTANTE: Este é um mock para demonstração. Em produção, você deve:
 * 1. Criar um backend (Node.js, Python, etc.) para lidar com envio de emails
 * 2. Nunca expor credenciais no frontend
 * 3. Usar variáveis de ambiente no backend apenas
 *
 * Exemplo de implementação backend:
 * - Criar API endpoint que recebe os dados do formulário
 * - Usar nodemailer, SendGrid, ou outro serviço de email
 * - Validar e sanitizar todos os inputs no backend
 */

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export interface EmailServiceResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Mock de serviço de email para desenvolvimento
 * Em produção, substituir por chamada real ao backend
 */
export const emailService = {
  async sendContactForm(data: ContactFormData): Promise<EmailServiceResponse> {
    // Validação básica (deve ser duplicada no backend)
    if (!data.name?.trim()) {
      return { success: false, message: 'Nome é obrigatório' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, message: 'Email inválido' };
    }

    if (data.message?.trim().length < 20) {
      return { success: false, message: 'Mensagem deve ter no mínimo 20 caracteres' };
    }

    // Em produção, aqui seria feita a chamada ao backend
    // Exemplo:
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
    // return await response.json();

    // Mock para desenvolvimento
    console.log('Mock: Enviando email com dados:', data);
    return {
      success: true,
      message: 'Obrigado. Entrarei em contato o mais breve possível.',
    };
  },
};

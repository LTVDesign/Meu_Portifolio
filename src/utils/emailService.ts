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
 * Serviço de e-mail funcional enviando para a API local /api/contact
 */
export const emailService = {
  async sendContactForm(data: ContactFormData): Promise<EmailServiceResponse> {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Erro ao enviar e-mail. Tente novamente.',
          error: result.error,
        };
      }

      return {
        success: true,
        message: result.message || 'Mensagem enviada com sucesso!',
      };
    } catch (error: any) {
      console.error('Erro de conexão ao enviar e-mail:', error);
      return {
        success: false,
        message: 'Erro de conexão. Verifique sua internet.',
        error: error.message,
      };
    }
  },
};


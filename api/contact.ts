import nodemailer from 'nodemailer';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas aceitar requisições POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  const { name, email, phone, company, message } = req.body;

  // Validação básica dos campos
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Campos obrigatórios faltando' });
  }

  // Configurações do transportador SMTP (Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Senha de App configurada no .env
    },
  });

  try {
    // Configurar o conteúdo do e-mail
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Nome do remetente + e-mail de autenticação
      to: process.env.EMAIL_TO,
      replyTo: email, // Quando você responder, vai para o e-mail de quem te mandou
      subject: `Novo Contato Portfolio: ${name}`,
      text: `
        Nome: ${name}
        Email: ${email}
        Telefone: ${phone || 'Não informado'}
        Empresa: ${company || 'Não informado'}
        
        Mensagem:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #915eff;">Novo Contato Portfolio</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone || 'Não informado'}</p>
          <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
          <hr />
          <h3>Mensagem:</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    // Enviar o e-mail
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado com sucesso!' 
    });

  } catch (error: any) {
    console.error('Erro no Nodemailer:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Falha ao enviar e-mail', 
      error: error.message 
    });
  }
}

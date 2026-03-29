import { motion } from 'framer-motion';
import type React from 'react';
import { useRef, useState } from 'react';
import { FaBuilding, FaEnvelope, FaPaperPlane, FaPhone, FaUser } from 'react-icons/fa';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { emailService } from '../../utils/emailService';
import { slideIn } from '../../utils/motion';
import { Header } from '../atoms/Header';
import { EarthCanvas } from '../canvas';

const INITIAL_STATE = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    if (value.length > 9) value = `${value.slice(0, 10)}-${value.slice(10)}`;
    setForm((prev) => ({ ...prev, phone: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validação acessível
    if (!form.name?.trim()) return setError('Por favor, preencha o seu nome.');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return setError('Por favor, informe um email válido.');
    if (form.phone.replace(/\D/g, '').length < 10)
      return setError('Por favor, informe um telefone válido.');
    if (!form.message?.trim() || form.message.trim().length < 20) {
      return setError('A mensagem deve ter no mínimo 20 caracteres.');
    }

    setLoading(true);
    try {
      const result = await emailService.sendContactForm({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company?.trim() || 'Não informada',
        message: form.message.trim(),
      });

      if (result.success) {
        alert(result.message);
        setForm(INITIAL_STATE);
      } else {
        setError(result.message);
      }
    } catch {
      setError('Algo deu errado. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-16 items-center">
          {/* FORMULÁRIO */}
          <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className="flex-1 w-full">
            <div className="glass p-8 sm:p-10 relative group">
              <Header useMotion={true} {...config.contact} />

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-6"
                noValidate
              >
                {/* Nome + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="form-label">
                      <FaUser className="text-[#915EFF]" /> Seu Nome{' '}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="form-input"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="text-[#915EFF]" /> Seu Email{' '}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      className="form-input"
                      placeholder="exemplo@email.com"
                    />
                  </div>
                </div>

                {/* Telefone + Empresa */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label htmlFor="phone" className="form-label">
                      <FaPhone className="text-[#915EFF]" /> Telefone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      className="form-input"
                      placeholder="(XX) XXXXX-XXXX"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="company" className="form-label">
                      <FaBuilding className="text-[#915EFF]" /> Empresa
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Onde você trabalha?"
                    />
                  </div>
                </div>

                {/* Mensagem */}
                <div className="flex flex-col">
                  <label htmlFor="message" className="form-label">
                    <FaPaperPlane className="text-[#915EFF]" /> Mensagem{' '}
                    <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    rows={6}
                    className="form-input resize-y min-h-[160px]"
                    placeholder="Escreva sua mensagem aqui..."
                  />
                </div>

                {/* Erro acessível */}
                {error && (
                  <div role="alert" aria-live="assertive" className="error-alert">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 bg-gradient-to-r from-[#915EFF] to-[#00FFFF] text-white font-bold py-5 rounded-3xl hover:scale-[1.03] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-lg focus-visible:ring-4 focus-visible:ring-offset-4 focus-visible:ring-[#915EFF]"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  <FaPaperPlane />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Canvas 3D */}
          <motion.div
            variants={slideIn('right', 'tween', 0.2, 1)}
            className="flex-1 w-full xl:w-1/2"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Contact;

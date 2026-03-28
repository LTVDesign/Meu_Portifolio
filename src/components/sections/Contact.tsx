import { motion } from 'framer-motion';
import type React from 'react';
import { useRef, useState } from 'react';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { type ContactFormData, emailService } from '../../utils/emailService';
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

  // Phone mask logic (XX) XXXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 9) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    setForm({ ...form, phone: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validação básica
    if (!form.name?.trim()) {
      setError('Por favor, preencha o seu nome.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Por favor, informe um email válido.');
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Por favor, informe um telefone válido com código de área (DDD).');
      return;
    }

    if (!form.message?.trim() || form.message.trim().length < 20) {
      setError('Sua mensagem deve ter no mínimo 20 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const formData: ContactFormData = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company?.trim() || 'Não informada',
        message: form.message.trim(),
      };

      const result = await emailService.sendContactForm(formData);

      if (result.success) {
        alert(result.message);
        setForm(INITIAL_STATE);
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Erro ao enviar formulário:', err);
      setError('Algo deu errado ao enviar a mensagem. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col-reverse gap-6 overflow-hidden sm:gap-8 md:gap-10 xl:mt-12 xl:flex-row items-center justify-center`}
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="bg-black-100 flex-[0.75] rounded-2xl p-4 sm:p-6 md:p-8 border border-white/5 w-full"
      >
        <Header useMotion={true} {...config.contact} />

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-6 sm:mt-10 sm:gap-8 md:mt-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-[var(--dynamic-text-color)] text-sm sm:text-base">
                Seu Nome *
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Como devo te chamar?"
                className="bg-tertiary placeholder:text-[var(--dynamic-text-secondary)] rounded-lg border border-white/10 px-4 py-3 font-medium text-[var(--dynamic-text-color)] outline-none focus:border-[#915EFF] transition-colors sm:px-6 sm:py-4"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-4 font-medium text-[var(--dynamic-text-color)] text-sm sm:text-base">
                Email *
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Seu melhor email"
                className="bg-tertiary placeholder:text-[var(--dynamic-text-secondary)] rounded-lg border border-white/10 px-4 py-3 font-medium text-[var(--dynamic-text-color)] outline-none focus:border-[#915EFF] transition-colors sm:px-6 sm:py-4"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col">
              <span className="mb-4 font-medium text-[var(--dynamic-text-color)] text-sm sm:text-base">
                Telefone (DDD) *
              </span>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handlePhoneChange}
                placeholder="(11) 90000-0000"
                maxLength={15}
                className="bg-tertiary placeholder:text-[var(--dynamic-text-secondary)] rounded-lg border border-white/10 px-4 py-3 font-medium text-[var(--dynamic-text-color)] outline-none focus:border-[#915EFF] transition-colors sm:px-6 sm:py-4"
              />
            </label>

            <label className="flex flex-col">
              <span className="mb-4 font-medium text-[var(--dynamic-text-color)] text-sm sm:text-base">
                Empresa (Opcional)
              </span>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Onde você trabalha?"
                className="bg-tertiary placeholder:text-[var(--dynamic-text-secondary)] rounded-lg border border-white/10 px-4 py-3 font-medium text-[var(--dynamic-text-color)] outline-none focus:border-[#915EFF] transition-colors sm:px-6 sm:py-4"
              />
            </label>
          </div>

          <label className="flex flex-col">
            <span className="mb-4 font-medium text-[var(--dynamic-text-color)] text-sm sm:text-base">
              Sua Mensagem * (Mín. 20 carac.)
            </span>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="O que você gostaria de conversar?"
              className="bg-tertiary placeholder:text-[var(--dynamic-text-secondary)] rounded-lg border border-white/10 px-4 py-3 font-medium text-[var(--dynamic-text-color)] outline-none focus:border-[#915EFF] transition-colors sm:px-6 sm:py-4 resize-y"
            />
          </label>

          <button
            type="submit"
            className="glass-btn mt-2 w-full sm:w-auto rounded-xl px-8 py-4 font-bold text-[var(--dynamic-text-color)] uppercase tracking-widest text-[16px] transition-all hover:scale-[1.02]"
          >
            {loading ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="h-[250px] sm:h-[300px] md:h-[450px] xl:h-[500px] xl:flex-[0.6] flex justify-center items-center"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');

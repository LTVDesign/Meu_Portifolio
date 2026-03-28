import { motion } from 'framer-motion';
import type React from 'react';
import { useRef, useState } from 'react';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { emailService } from '../../utils/emailService';
import { slideIn } from '../../utils/motion';
import { Header } from '../atoms/Header';
import { EarthCanvas } from '../canvas';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaPaperPlane } from 'react-icons/fa';

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
    setForm({ ...form, phone: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!form.name?.trim()) { setError('Por favor, preencha o seu nome.'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { setError('Por favor, informe um email válido.'); return; }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) { setError('Por favor, informe um telefone válido.'); return; }
    if (!form.message?.trim() || form.message.trim().length < 20) { setError('A mensagem deve ter no mínimo 20 caracteres.'); return; }

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
    } catch (err) {
      setError('Algo deu errado. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-10 overflow-hidden items-stretch">
      
      {/* Container do Formulário (Glassmorphism) */}
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="relative flex-[0.75] group"
      >
        {/* Border Glow Effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#915EFF] to-[#00FFFF] rounded-3xl blur-[2px] opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        
        <div className="bg-[#151030]/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/5 relative z-10 h-full shadow-2xl">
          <Header useMotion={true} {...config.contact} />

          <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nome */}
              <div className="flex flex-col gap-3 group/field">
                <span className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-60">
                  <FaUser className="text-[#915EFF] text-xs" /> Seu Nome
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#915EFF] focus:bg-[#915EFF]/10 transition-all placeholder:text-white/20 text-white font-medium shadow-inner"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-3 group/field">
                <span className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-60">
                  <FaEnvelope className="text-[#915EFF] text-xs" /> Seu Email
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="exemplo@email.com"
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#915EFF] focus:bg-[#915EFF]/10 transition-all placeholder:text-white/20 text-white font-medium shadow-inner"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Telefone */}
              <div className="flex flex-col gap-3 group/field">
                <span className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-60">
                  <FaPhone className="text-[#915EFF] text-xs" /> Telefone
                </span>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handlePhoneChange}
                  placeholder="(XX) XXXXX-XXXX"
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#915EFF] focus:bg-[#915EFF]/10 transition-all placeholder:text-white/20 text-white font-medium shadow-inner"
                />
              </div>

              {/* Empresa */}
              <div className="flex flex-col gap-3 group/field">
                <span className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-60">
                  <FaBuilding className="text-[#915EFF] text-xs" /> Empresa
                </span>
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Onde você trabalha?"
                  className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#915EFF] focus:bg-[#915EFF]/10 transition-all placeholder:text-white/20 text-white font-medium shadow-inner"
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="flex flex-col gap-3 group/field">
              <span className="text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 opacity-60">
                <FaPaperPlane className="text-[#915EFF] text-xs" /> Mensagem
              </span>
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Como posso te ajudar hoje?"
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#915EFF] focus:bg-[#915EFF]/10 transition-all placeholder:text-white/20 text-white font-medium shadow-inner resize-none h-[150px]"
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm font-bold">
                * {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glass-btn mt-4 w-full py-5 rounded-2xl font-bold text-white uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-[#915EFF] transition-all group/btn shadow-xl disabled:opacity-50"
            >
              <FaPaperPlane className={`transition-transform duration-500 ${loading ? 'animate-ping' : 'group-hover:translate-x-2 group-hover:-translate-y-2'}`} />
              {loading ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Earth Canvas Section */}
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-[0.6] h-[400px] md:h-auto min-h-[500px] flex justify-center items-center relative overflow-visible"
      >
        {/* Glow behind globe */}
        <div className="absolute inset-0 bg-[#915EFF]/5 blur-[120px] rounded-full" />
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');

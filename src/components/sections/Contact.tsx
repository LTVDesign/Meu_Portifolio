import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaBuilding, FaEnvelope, FaPaperPlane, FaPhone, FaUser } from 'react-icons/fa';
import { config } from '../../constants/config';
import { SectionWrapper } from '../../hoc';
import { emailService } from '../../utils/emailService';
import { slideIn } from '../../utils/motion';
import { Header } from '../atoms';
import { EarthCanvas } from '../canvas';

const INITIAL_FORM = { name: '', email: '', phone: '', company: '', message: '' };

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    if (val.length > 10) val = `${val.slice(0, 10)}-${val.slice(10)}`;
    setForm(prev => ({ ...prev, phone: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (!form.name.trim()) return setError('Nome é obrigatório');
    if (!form.email.includes('@')) return setError('Email inválido');
    if (!form.message.trim() || form.message.length < 20) return setError('Mensagem muito curta');

    setLoading(true);
    try {
      const res = await emailService.sendContactForm(form);
      if (res.success) {
        alert('Mensagem enviada com sucesso!');
        setForm(INITIAL_FORM);
      } else {
        setError(res.message);
      }
    } catch {
      setError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-20 items-center">
          {/* Formulário */}
          <motion.div variants={slideIn('left', 'tween', 0.2, 1)} className="flex-1 w-full">
            <div className="glass p-8 sm:p-10 md:p-12">
              <Header useMotion={true} {...config.contact} />

              <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      <FaUser className="text-[var(--cyber-purple)]" /> Nome <span className="text-red-400">*</span>
                    </label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="form-input w-full" />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="text-[var(--cyber-purple)]" /> Email <span className="text-red-400">*</span>
                    </label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="form-input w-full" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="form-label">
                      <FaPhone className="text-[var(--cyber-purple)]" /> Telefone
                    </label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handlePhoneChange} className="form-input w-full" />
                  </div>
                  <div>
                    <label htmlFor="company" className="form-label">
                      <FaBuilding className="text-[var(--cyber-purple)]" /> Empresa
                    </label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} className="form-input w-full" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    <FaPaperPlane className="text-[var(--cyber-purple)]" /> Mensagem <span className="text-red-400">*</span>
                  </label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={7} required className="form-input w-full resize-y min-h-[180px]" />
                </div>

                {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}

                <button type="submit" disabled={loading} className="btn-primary w-full text-lg">
                  {loading ? 'Enviando...' : 'Enviar Mensagem'} <FaPaperPlane />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Canvas 3D */}
          <motion.div 
            variants={slideIn('right', 'tween', 0.2, 1)} 
            className="flex-1 w-full xl:w-1/2 h-[350px] sm:h-[450px] md:h-[550px] xl:h-[600px] flex items-center justify-center relative overflow-hidden"
          >
            <div className="w-full h-full">
              <EarthCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');

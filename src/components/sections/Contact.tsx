import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBuilding, FaEnvelope, FaPaperPlane, FaPhone, FaUser } from 'react-icons/fa';
import { z } from 'zod';
import { SectionWrapper } from '../../hoc';
import { emailService } from '../../utils/emailService';
import { slideIn } from '../../utils/motion';
import { Header } from '../atoms';
import { EarthCanvas } from '../canvas';

// Schema de validação com Zod
const contactSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  email: z.string().email('Email inválido'),
  phone: z.string().max(20, 'Telefone muito longo').default(''),
  company: z.string().max(100, 'Empresa muito longa').default(''),
  message: z.string().min(20, 'Mensagem muito curta').max(1000, 'Mensagem muito longa')
});

type ContactForm = z.infer<typeof contactSchema>;

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (fieldErrors[name as keyof ContactForm]) {
      setFieldErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    if (val.length > 10) val = `${val.slice(0, 10)}-${val.slice(10)}`;
    setForm(prev => ({ ...prev, phone: val }));
  };

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(form);
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<Record<keyof ContactForm, string>> = {};
        err.issues.forEach(issue => {
          if (issue.path[0]) {
            errors[issue.path[0] as keyof ContactForm] = issue.message;
          }
        });
        setFieldErrors(errors);
        setError(t('contact.validationErrors.correctForm'));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Garantir que phone e company sejam strings (não undefined)
      const formData = {
        ...form,
        phone: form.phone || '',
        company: form.company || ''
      };
      const res = await emailService.sendContactForm(formData);
      if (res.success) {
        alert('Mensagem enviada com sucesso!');
        setForm(INITIAL_FORM);
        setFieldErrors({});
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
              <Header useMotion={true} p={t('contact.p')} h2={t('contact.h2')} />

              <form ref={formRef} onSubmit={handleSubmit} className="mt-10 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="form-label">
                      <FaUser className="text-[var(--cyber-purple)]" /> {t('contact.form.name.span')} <span className="text-red-400">*</span>
                    </label>
                    <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required className="form-input w-full" />
                    {fieldErrors.name && <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      <FaEnvelope className="text-[var(--cyber-purple)]" /> {t('contact.form.email.span')} <span className="text-red-400">*</span>
                    </label>
                    <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required className="form-input w-full" />
                    {fieldErrors.email && <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="form-label">
                      <FaPhone className="text-[var(--cyber-purple)]" /> {t('contact.form.phone.span')}
                    </label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handlePhoneChange} className="form-input w-full" />
                    {fieldErrors.phone && <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="company" className="form-label">
                      <FaBuilding className="text-[var(--cyber-purple)]" /> {t('contact.form.company.span')}
                    </label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} className="form-input w-full" />
                    {fieldErrors.company && <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.company}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    <FaPaperPlane className="text-[var(--cyber-purple)]" /> {t('contact.form.message.span')} <span className="text-red-400">*</span>
                  </label>
                  <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={7} required className="form-input w-full resize-y min-h-[180px]" />
                  {fieldErrors.message && <p role="alert" className="text-red-400 text-sm mt-1">{fieldErrors.message}</p>}
                </div>

                {error && <p role="alert" className="text-red-400 text-sm">{error}</p>}

                <button type="submit" disabled={loading} className="btn-primary w-full text-lg">
                  {loading ? t('contact.sending') : t('contact.submit')} <FaPaperPlane />
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

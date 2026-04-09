import { useMemo, useRef, useState } from 'react';
import { useInView, m } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaBuilding, FaEnvelope, FaPaperPlane, FaPhone, FaUser } from 'react-icons/fa';
import { z } from 'zod';
import { SectionWrapper } from '../../hoc';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { emailService } from '../../utils/emailService';
import { slideIn } from '../../utils/motion';
import { Header } from '../atoms';
import { EarthCanvas } from '../canvas';
import { useViewport } from '../../hooks/useViewport';

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website?: string;
};

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  website: undefined,
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactForm, string>>
  >({});
  const { t } = useTranslation();
  const prefersReduced = useReducedMotion();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(canvasContainerRef, { once: true, amount: 0.1 });
  const { width: viewportWidth } = useViewport();

  // Show globe only on Desktop, Notebooks, TVs (width >= 1024px)
  const showGlobe = viewportWidth >= 1024;

  // Create validation schema with translated messages
  const contactSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t('contact.validationErrors.nameRequired')).max(100, t('contact.validationErrors.nameTooLong')),
        email: z.string().email(t('contact.validationErrors.emailInvalid')),
        phone: z.string().max(20, t('contact.validationErrors.phoneTooLong')).default(''),
        company: z.string().max(100, t('contact.validationErrors.companyTooLong')).default(''),
        message: z.string().min(20, t('contact.validationErrors.messageTooShort')).max(1000, t('contact.validationErrors.messageTooLong')),
        website: z.string().optional(),
      }),
    [t]
  );

  // Rate limiting: cooldown de 30 segundos entre envios
  const getLastSubmitTime = (): number => {
    const stored = localStorage.getItem('contact_last_submit');
    return stored ? parseInt(stored, 10) : 0;
  };

  const setLastSubmitTime = (): void => {
    localStorage.setItem('contact_last_submit', Date.now().toString());
  };

  const canSubmit = (): boolean => {
    const lastSubmit = getLastSubmitTime();
    const cooldownMs = 30 * 1000; // 30 segundos
    return Date.now() - lastSubmit > cooldownMs;
  };

  const getRemainingCooldown = (): number => {
    const lastSubmit = getLastSubmitTime();
    const cooldownMs = 30 * 1000;
    const remaining = cooldownMs - (Date.now() - lastSubmit);
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  };

  // Debounce: prevenir múltiplos cliques rápidos
  const [submitLocked, setSubmitLocked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (fieldErrors[name as keyof ContactForm]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handler específico para o honeypot (não dispara validação)
  const handleHoneypotChange = () => {
    // Intencionalmente vazio - o honeypot não deve ser preenchido por usuários reais
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
    if (val.length > 10) val = `${val.slice(0, 10)}-${val.slice(10)}`;
    setForm((prev) => ({ ...prev, phone: val }));
  };

  const validateForm = (): boolean => {
    try {
      contactSchema.parse(form);
      setFieldErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Partial<Record<keyof ContactForm, string>> = {};
        err.issues.forEach((issue) => {
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

    // Verificar rate limiting
    if (!canSubmit()) {
      const remaining = getRemainingCooldown();
      setError(t('contact.rateLimit', { seconds: remaining }));
      return;
    }

    // Verificar honeypot (campo oculto)
    if (form.website) {
      return; // Silenciosamente ignorar
    }

    if (!validateForm()) {
      return;
    }

    // Debounce: bloquear envios múltiplos rápidos
    if (submitLocked) {
      return;
    }
    setSubmitLocked(true);

    setLoading(true);
    try {
      // Garantir que phone e company sejam strings (não undefined)
      const formData = {
        ...form,
        phone: form.phone || '',
        company: form.company || '',
      };
      const res = await emailService.sendContactForm(formData);
      if (res.success) {
        setSuccess(true);
        setForm(INITIAL_FORM);
        setFieldErrors({});
        setLastSubmitTime(); // Registrar timestamp do envio
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(res.message);
      }
    } catch {
      setError('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
      // Debounce: liberar após 2 segundos
      setTimeout(() => setSubmitLocked(false), 2000);
    }
  };

  return (
    <div className='py-[clamp(3rem,8vw,6rem)]'>
      <div className='max-w-7xl mx-auto px-[clamp(1rem,4vw,1.5rem)]'>
        {/* Box de texto informativo com animação */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-[clamp(2rem,5vw,4rem)]'
        >
          <div className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--cyber-purple)]/10 via-[var(--cyber-cyan)]/5 to-[var(--cyber-purple)]/10 border border-[var(--cyber-cyan)]/20 backdrop-blur-xl p-[clamp(1.5rem,5vw,3rem)] shadow-2xl group hover:border-[var(--cyber-cyan)]/40 transition-all duration-500'>
            {/* Efeito de brilho animado no fundo */}
            <div className='absolute inset-0 opacity-30'>
              <m.div
                className='absolute inset-0'
                style={{
                  background:
                    'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                }}
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(145, 94, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Conteúdo da box */}
            <div className='relative z-10'>
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Header useMotion={true} p={t('contact.p')} h2={t('contact.h2')} />
              </m.div>

              {/* Linha com animação discreta de brilho */}
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className='relative w-full max-w-xl mx-auto my-[clamp(2rem,5vw,2rem)]'
              >
                <div className='h-[1px] bg-gradient-to-r from-transparent via-[var(--cyber-cyan)] to-transparent relative'>
                  {/* Brilho esquerdo */}
                  <m.div
                    className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-cyan)] blur-sm'
                    style={{ left: '50%' }}
                    animate={{
                      left: ['50%', '0%', '50%'],
                      opacity: [0.8, 0.3, 0.8],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* Brilho direito */}
                  <m.div
                    className='absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[var(--cyber-purple)] blur-sm'
                    style={{ right: '50%' }}
                    animate={{
                      right: ['50%', '0%', '50%'],
                      opacity: [0.8, 0.3, 0.8],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              </m.div>

              {/* Badges de destaque */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className='flex flex-wrap justify-center gap-[clamp(0.5rem,1.5vw,0.75rem)] mt-[clamp(1.5rem,3vw,2rem)]'
              >
                {[
                  { text: t('contactPage.secureEmail'), color: 'from-blue-500 to-cyan-500' },
                  { text: t('contactPage.quickResponse'), color: 'from-green-500 to-emerald-500' },
                  { text: t('contactPage.directContact'), color: 'from-purple-500 to-pink-500' },
                ].map((badge, idx) => (
                  <m.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`px-[clamp(0.75rem,2vw,1rem)] py-[clamp(0.375rem,1vw,0.5rem)] rounded-full text-[clamp(0.625rem,1.5vw,0.75rem)] font-bold uppercase tracking-wider bg-gradient-to-r ${badge.color} text-white shadow-lg shadow-[0_0_20px_rgba(145,94,255,0.3)] border border-white/20`}
                  >
                    {badge.text}
                  </m.span>
                ))}
              </m.div>
            </div>

            {/* Borda decorativa com glow */}
            <div className='absolute inset-0 rounded-3xl border border-[var(--cyber-cyan)]/10 pointer-events-none' />
            <div className='absolute -inset-1 bg-gradient-to-r from-[var(--cyber-purple)] via-[var(--cyber-cyan)] to-[var(--cyber-purple)] rounded-3xl opacity-20 blur-xl -z-10' />
          </div>
        </m.div>

        <div className='flex flex-row gap-[clamp(2rem,6vw,5rem)] items-center'>
          {/* Formulário */}
          <m.div
            variants={prefersReduced ? {} : slideIn('left', 'tween', 0.2, 1)}
            className='flex-1 w-full'
          >
            <div className='glass p-[clamp(1.25rem,4vw,3rem)]'>
              <form ref={formRef} onSubmit={handleSubmit} className='mt-[clamp(1.5rem,4vw,2.5rem)] space-y-[clamp(1.25rem,3vw,2rem)]'>
                {/* Honeypot: campo oculto para bots */}
                <div className='hidden' aria-hidden='true'>
                  <label htmlFor='website'>Não preencha este campo</label>
                  <input
                    id='website'
                    name='website'
                    type='text'
                    value={form.website || ''}
                    onChange={handleHoneypotChange}
                    tabIndex={-1}
                    autoComplete='off'
                  />
                </div>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(1rem,3vw,1.5rem)]'>
                  <div>
                    <label htmlFor='name' className='form-label'>
                      <FaUser className='text-[var(--cyber-purple)]' />{' '}
                      {t('contact.form.name.span')}{' '}
                      <span className='text-red-400'>*</span>
                    </label>
                    <input
                      id='name'
                      name='name'
                      type='text'
                      value={form.name}
                      onChange={handleChange}
                      required
                      className='form-input w-full'
                    />
                    {fieldErrors.name && (
                      <p role='alert' className='text-red-400 text-sm mt-1'>
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='email' className='form-label'>
                      <FaEnvelope className='text-[var(--cyber-purple)]' />{' '}
                      {t('contact.form.email.span')}{' '}
                      <span className='text-red-400'>*</span>
                    </label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      value={form.email}
                      onChange={handleChange}
                      required
                      className='form-input w-full'
                    />
                    {fieldErrors.email && (
                      <p role='alert' className='text-red-400 text-sm mt-1'>
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-[clamp(1rem,3vw,1.5rem)]'>
                  <div>
                    <label htmlFor='phone' className='form-label'>
                      <FaPhone className='text-[var(--cyber-purple)]' />{' '}
                      {t('contact.form.phone.span')}
                    </label>
                    <input
                      id='phone'
                      name='phone'
                      type='tel'
                      value={form.phone}
                      onChange={handlePhoneChange}
                      className='form-input w-full'
                    />
                    {fieldErrors.phone && (
                      <p role='alert' className='text-red-400 text-sm mt-1'>
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor='company' className='form-label'>
                      <FaBuilding className='text-[var(--cyber-purple)]' />{' '}
                      {t('contact.form.company.span')}
                    </label>
                    <input
                      id='company'
                      name='company'
                      type='text'
                      value={form.company}
                      onChange={handleChange}
                      className='form-input w-full'
                    />
                    {fieldErrors.company && (
                      <p role='alert' className='text-red-400 text-sm mt-1'>
                        {fieldErrors.company}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor='message' className='form-label'>
                    <FaPaperPlane className='text-[var(--cyber-purple)]' />{' '}
                    {t('contact.form.message.span')}{' '}
                    <span className='text-red-400'>*</span>
                  </label>
                  <textarea
                    id='message'
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    rows={7}
                    required
                    className='form-input w-full resize-y min-h-[clamp(7.5rem,20vw,11.25rem)]'
                  />
                  {fieldErrors.message && (
                    <p role='alert' className='text-red-400 text-sm mt-1'>
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {error && (
                  <p role='alert' className='text-red-400 text-sm'>
                    {error}
                  </p>
                )}

                {/* Mostrar cooldown se estiver ativo */}
                {!canSubmit() && !loading && (
                  <p role='status' className='text-yellow-400 text-sm text-center'>
                    ⏳ Aguarde {getRemainingCooldown()}s antes do próximo envio
                  </p>
                )}

                {success && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className='p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm'
                  >
                    ✅ {t('contact.success', 'Mensagem enviada com sucesso!')}
                  </m.div>
                )}

                <button
                  type='submit'
                  disabled={loading || success}
                  className='btn-primary w-full text-lg'
                >
                  {loading ? t('contact.sending') : t('contact.submit')} <FaPaperPlane />
                </button>
              </form>
            </div>
          </m.div>

          {/* Globo 3D - mostra apenas em Desktop/Notebook/TV (>= 1024px) */}
          {showGlobe && (
            <m.div
              ref={canvasContainerRef}
              variants={slideIn('right', 'tween', 0.2, 1)}
              className='flex flex-1 w-full h-[clamp(400px,60vw,700px)] items-center justify-center relative overflow-hidden'
            >
              <div className='w-full h-full flex items-center justify-center'>
                {isInView && (
                  <EarthCanvas />
                )}
              </div>
            </m.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');

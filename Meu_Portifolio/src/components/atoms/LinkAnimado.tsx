import { type ReactNode, forwardRef } from 'react'
import { m } from 'framer-motion'

interface Props {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

const LinkAnimado = forwardRef<HTMLAnchorElement, Props>(
  ({ href, children, className, target, rel, onClick }, ref) => (
    <m.a
      ref={ref}
      href={href}
      className={`link-glow ${className || ''}`}
      target={target}
      rel={rel}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95, opacity: 0.8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {children}
    </m.a>
  ),
)

LinkAnimado.displayName = 'LinkAnimado'
export default LinkAnimado
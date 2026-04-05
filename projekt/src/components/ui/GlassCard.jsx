export default function GlassCard({ children, className = '', hover = false, as: Tag = 'div' }) {
  return (
    <Tag className={`glass-card p-6 ${hover ? 'glass-card-hover cursor-default' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

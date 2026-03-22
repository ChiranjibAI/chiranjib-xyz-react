type Props = { children: React.ReactNode; color?: 'cyan'|'purple'|'green'|'orange'|'default' }
const colors = { cyan:'bg-cyan/8 text-cyan border-cyan/20', purple:'bg-purple/8 text-[#7c3aed] border-purple/20', green:'bg-green/8 text-green border-green/20', orange:'bg-orange-400/8 text-orange-400 border-orange-400/20', default:'bg-white/5 text-muted border-white/10' }
export default function Badge({ children, color='default' }: Props) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>{children}</span>
}

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const CustomTitle = ({ title = 'text', subtitle = '', className = '' }: Props) => {
  return (
    <div className={className}>
        <h1 className="text-2xl font-semibold">{title}</h1>
        { subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p> }
    </div>
  )
}

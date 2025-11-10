import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Props extends React.ComponentProps<typeof Button> {
  loading?: boolean
}

// ✅ Agregado forwardRef
export const CustomButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ loading, children, className, ...props }, ref) => {
    return (
      <Button
        ref={ref} // ✅ compatible con Radix asChild
        className={cn(className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        {children}
      </Button>
    )
  }
)

CustomButton.displayName = 'CustomButton'

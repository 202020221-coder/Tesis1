import * as DialogPrimitive from '@radix-ui/react-dialog';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";

interface Props extends React.ComponentProps<typeof DialogPrimitive.Root> {
  title: string;
  description?: string;
  // children: React.ReactNode;
  // className?: string;
}

export const ModalWrapper = ({
  title,
  description,
  children,
  ...rest
}: Props) => {
  return (
    <DialogContent {...rest} className='overflow-y-scroll max-h-[645px]'>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>
      {children}
    </DialogContent>
  );
};

import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu'

import { ChevronDown, type LucideIcon } from 'lucide-react'

interface Props {
  actions: IAction[]
}

export interface IAction {
  title: string
  Icon: LucideIcon
  action: () => void
}

export const DataTableActions = ({ actions }: Props) => {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='flex items-center gap-2'>
            Ver Acciones
            <ChevronDown className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {actions.map(({ title, Icon, action }) => (
              <DropdownMenuItem
                key={title}
                onClick={() => {
                  setTimeout(() => {
                    action()
                  }, 10) // 👈 Pequeño delay
                }}
              >
                <Icon className='mr-2 h-4 w-4' />
                <span>{title}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

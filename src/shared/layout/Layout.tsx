import {type ReactElement} from 'react'

import { Separator } from '@/shared/components/ui/separator';
import { CustomBreadcrumb, type IBreadcrumb } from '@/shared/components/custom/CustomBreadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';

import { AppSidebar } from './partials/app-sidebar';

interface Props {
  children: ReactElement | ReactElement[];
  breadcrumbs?: IBreadcrumb[];
  title: string;
}

export const Layout = ({children, breadcrumbs = [], title}: Props) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4"/>
              <CustomBreadcrumb links={breadcrumbs} title={title} />
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 pt-2">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>    
    </>
  )
}

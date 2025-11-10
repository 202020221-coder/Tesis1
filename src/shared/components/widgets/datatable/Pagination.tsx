import { Input } from "@/shared/components/ui/input";
import { Button } from '@/shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/shared/components/ui/tooltip";

import type { DatatablePaginationProps, PageControlsProps, PageNavigatorProps, RowSetterProps } from "./datatable.interface";

import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';

const PageNavigator = <TData,>({table, pagination, setPagination}: PageNavigatorProps<TData>)=>{
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value !== "" ? parseInt(e.target.value) - 1:0
        setPagination({ ...pagination, pageIndex:(value) });
    }

    const handleClick = (e:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.currentTarget.select()
    }

    return (
        <div className="ml-auto flex p-2 items-center gap-x-2 text-zinc-500">
            Página
            <Input 
                className="shadow-none w-[40px] rounded-md border-2 text-center px-1 focus-visible:ring-0"
                value={pagination.pageIndex+1}
                onClick={handleClick}
                onChange={handleChange}
            />
            de {table.getPageCount()!==0?table.getPageCount():1}
        </div>
    )
}

const PageControls = <TData,>({table}: PageControlsProps<TData>) => {
    return (
        <div className="w-fit border-2 rounded-md overflow-hidden ml-auto">
            <Tooltip>
                <TooltipTrigger asChild 
                children={                        
                    <Button
                    className="w-10 h-10 overflow-hidden rounded-none cursor-pointer"
                    onClick={table.firstPage}
                    disabled={!table.getCanPreviousPage()}
                    children={<ChevronsLeft/>}
                    variant={'ghost'}/>
                }/>
                <TooltipContent children={'Primera página'}/>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild 
                children={                        
                    <Button
                    className="w-10 h-10 overflow-hidden rounded-none cursor-pointer"
                    disabled={!table.getCanPreviousPage()}
                    onClick={table.previousPage}
                    children={<ChevronLeft/>}
                    variant={'ghost'}/>
                }/>
                <TooltipContent children={'Página anterior'}/>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild 
                children={                        
                    <Button 
                    className="w-10 h-10 overflow-hidden rounded-none cursor-pointer" 
                    disabled={!table.getCanNextPage()}
                    onClick={table.nextPage}
                    children={<ChevronRight/>}
                    variant={'ghost'}/>
                }/>
                <TooltipContent children={'Página siguiente'}/>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild 
                children={                        
                    <Button 
                    className="w-10 h-10 overflow-hidden rounded-none cursor-pointer" 
                    disabled={!table.getCanNextPage()}
                    onClick={table.lastPage}
                    children={<ChevronsRight/>}
                    variant={'ghost'}/>
                }/>
                <TooltipContent children={'Última página'}/>
            </Tooltip>
        </div>
    )
}
    
const RowSetter = ({pagination, setPagination}: RowSetterProps)=>{
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value!==""?parseInt(e.target.value):1
        setPagination(
            {
                pageIndex:0,
                pageSize:value
            }
        );
    }

    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) =>{
        e.currentTarget.select()
    }

    return (
        <div className="flex gap-x-2 items-center text-zinc-500">
            Filas/Página:
            <Input value={pagination.pageSize} className="w-[50px] shadow-none rounded-md border-2 text-center px-1 focus-visible:ring-0" onChange={handleChange} onClick={handleClick}/>
        </div>
    );
}

export const DatatablePagination = <TData,>({table, pagination, setPagination}: DatatablePaginationProps<TData>) => {
    const numPages = Math.ceil(table.getPrePaginationRowModel().rows.length / pagination.pageSize);
    
    return (
        <div className="flex items-center mt-1.5">
            <RowSetter pagination={pagination} setPagination={setPagination}/>
            {
                numPages>1 && (
                    <PageControls table={table}/>
                )
            }
            <PageNavigator table={table} pagination={pagination} setPagination={setPagination}/>
        </div>
    );
}
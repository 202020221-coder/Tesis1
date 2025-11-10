import * as React from "react";

import {Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator,} from "@/shared/components/ui/breadcrumb";

export interface IBreadcrumb {
  link: string;
  label: string;
}

interface Props {
  links: IBreadcrumb[];
  title: string;
}

export const CustomBreadcrumb = ({ links, title }: Props) => {
  return (
    <>
        <Breadcrumb>
            <BreadcrumbList>
                {links.map(({ link, label }) => (
                    <React.Fragment key={link}>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={link}>{label}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                    </React.Fragment>
                ))}
                <BreadcrumbItem>
                    <BreadcrumbPage className="font-bold">{title}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    </>
  );
};

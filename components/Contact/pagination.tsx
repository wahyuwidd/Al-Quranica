"use client"

import { generatePagination } from "@/lib/contact/utils";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export const Pagination = ({ totalPages }: { totalPages : number }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentpage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: string | number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${ pathname }?${ params.toString() }`;
    }

    const allPages = generatePagination(currentpage, totalPages);

    const PagenationNumber = ({
      page,
      href,
      position,
      isActive
    }:{
      page: number | string;
      href: string;
      position?: "first" | "last" | "middle" | "single";
      isActive: boolean;
    }) => {
      
      const className = clsx("flex h-10 w-10 items-center justify-center text-sm border",
        {
          "rounded-1-sm": position === "first" || position === "single",
          "rounded-r-sm": position === "last" || position === "single",
          "z-10 bg-blue-100 border-blue-500 text-white": isActive,
          "hover:bg-gray-100": !isActive && position !== "middle",
          "text-grey-300 pointer-event-one": position === "middle"
        }
      );
      return isActive && position === "middle" ? (
        <div className={ className }>{page}</div>
      ):(
        <Link href={href} className={ className }>{page}</Link>
      );
    };

    const PaginationArrow = ({
      href,
      direction,
      isDisabled
    }:{
      href: string;
      direction: "left" | "right",
      isDisabled: boolean
    }) => {

      const className = clsx("flex h-10 w-10 items-center justify-center text-sm border",
        {
          "pointer-event-none text-gray-300": isDisabled,
          "hover:bg-gray-100": !isDisabled,
          "mr-2": direction === "left",
          "ml-2": direction === "right",
        }
      );

      const icon = direction === "left" ? (
        <HiChevronLeft size = { 20 }/>
      ):(
        <HiChevronRight size = { 20 } />
      )

      return isDisabled ? (
        <div className={ className }>{ icon }</div>
      ): (
        <Link href={ href } className={ className }>{ icon }</Link>
      )
    }

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="left"
        href={createPageURL(currentpage - 1)}
        isDisabled={currentpage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page,index) => {
          let position: "first" | "last" | "single" | "middle" | undefined;

          if(index === 0) position = "first";
          if(index === allPages.length -1) position = "last";
          if(allPages.length === 1) position = "single";
          if(page === "...") position = "middle";

          return(
            <PagenationNumber 
              key={ index }
              href={ createPageURL(page) }
              page={ page }
              position={ position }
              isActive={ currentpage === page}
            />
          )
        })}
      </div>

      <PaginationArrow
        direction="right"
        href={createPageURL(currentpage + 1)}
        isDisabled={currentpage >= totalPages}
      />
    </div>
  );
}

export default Pagination
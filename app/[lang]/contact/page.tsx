import { Createdbutton } from '@/components/Contact/buttons'
import ContactTable from '@/components/Contact/contact-table'
import Pagination from '@/components/Contact/pagination';
import Search from '@/components/Contact/search'
import { TableSkeleton } from '@/components/Contact/skeleton';
import { getContactsPages } from '@/lib/contact/data';
import { Suspense } from 'react';

const  Contact = async ({  searchParams } : { searchParams?:{
  query?: string;
  page?: number;
} }) => {
  const query = searchParams?.query || ""
  const currentpage = Number(searchParams?.page) || 1

  const totalPages = await getContactsPages(query)
  
  return (
    <div className='max-w-screen-md mx-auto mt-5'>
        <div className='flex items-center justify-between gap-1 mb-5'>
            <Search />
            <Createdbutton />
        </div>
        <Suspense key={query + currentpage} fallback={< TableSkeleton />}>
          <ContactTable query={query} currentpage={currentpage} />
        </Suspense>
        <div className='flex justify-center mt-4'>
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  )
}

export default Contact
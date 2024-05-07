import { getContacts } from "@/lib/contact/data"
import { Deletebutton, Editbutton } from "./buttons"
import { formatDate } from "@/lib/contact/utils"

const ContactTable = async ({query, currentpage}: {query: string, currentpage: number}) => {
    const contacts = await getContacts(query, currentpage)
  return (
    <table className='w-full text-sm text-left text-gray-500'>
        <thead className='text-sm text-gray-700 uppercase bg-gray-50'>
            <tr>
                <th className='py-3 px-6'>#</th>
                <th className='py-3 px-6'>Nama</th>
                <th className='py-3 px-6'>No Hp</th>
                <th className='py-3 px-6'>Created At</th>
                <th className='py-3 px-6 text-center'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {contacts.map((contact, index) => (
                <tr key={contact._id.toString()} className="bg-white border-b">
                <td className='py-3 px-6'>{index + 1}</td>
                <td className='py-3 px-6'>{contact.name}</td>
                <td className='py-3 px-6'>{contact.phone}</td>
                <td className='py-3 px-6'>{formatDate(contact.createdAt.toString())}</td>
                <td className="flex justify-center gap-1 py-3">
                    <Editbutton id={contact._id.toString()} />
                    <Deletebutton id={contact._id.toString()} />
                </td>
            </tr>
            ))}
        </tbody>
    </table>
  )
}

export default ContactTable

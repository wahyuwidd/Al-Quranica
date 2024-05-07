import UpdateForm from "@/components/Contact/edit-form"
import { getContactsById } from "@/lib/contact/data"
import { notFound } from "next/navigation"

const UpdateContactPage = async ({ params } : { params :{ id : string } }) => {
    const id = params.id
    const contact = await getContactsById(id)
    const contacts = JSON.parse(JSON.stringify(contact));

    if(!contact){
        notFound()
    }
    
  return (
    <div className="max-w-screen-md mx-auto mt-5">
        <h1 className="text-2xl text-center mb-2">Edit Contact</h1>
        <UpdateForm contacts={contacts} />
    </div>
  )
}

export default UpdateContactPage
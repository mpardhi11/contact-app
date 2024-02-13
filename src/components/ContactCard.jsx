import { deleteDoc, doc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { db } from "../config/firebase";
import { useDisclosure } from "../hooks/useDisclosure";
import { AddAndUpdateContact } from "./AddAndUpdateContact";

export const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const deleteContact = async (id) => {
    try {
      const result = await deleteDoc(doc(db, "contacts", id));
      console.log("deleteContact ~ result: ", result);
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log("deleteContact ~ error: ", error);
      toast.error("Error while deleting contact");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between rounded-lg bg-yellow p-2">
        <div className="flex items-center gap-2">
          <HiOutlineUserCircle className="text-4xl text-orange" />
          <div className="">
            <h2 className="font-medium">{contact?.name}</h2>
            <p className="text-sm">{contact?.email}</p>
          </div>
        </div>
        <div className="flex text-2xl text-orange">
          <IoMdTrash
            className="cursor-pointer text-red-500 transition duration-300 hover:text-red-700"
            onClick={() => {
              deleteContact(contact?.id);
            }}
          />
          <RiEditCircleLine
            onClick={onOpen}
            className="cursor-pointer text-orange transition duration-300 hover:text-red-700"
          />
        </div>
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

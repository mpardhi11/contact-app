import { collectionGroup, onSnapshot } from "firebase/firestore";

import { AddAndUpdateContact } from "./components/AddAndUpdateContact";
import { ContactCard } from "./components/ContactCard";
import { NavBar } from "./components/NavBar";
import NotFoundContact from "./components/NotFoundContact ";

import { useEffect, useState } from "react";

import { FaCirclePlus } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

import { ToastContainer } from "react-toastify";

import { useDisclosure } from "./hooks/useDisclosure";

import { db } from "./config/firebase";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
export default function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log("App ~ isOpen: 👆👆👆👆👆👆👆", isOpen);

  useEffect(() => {
    async function getContacts() {
      try {
        const contactCollection = collectionGroup(db, "contacts");
        // const data = await getDocs(contactCollection);

        onSnapshot(contactCollection, (data) => {
          const contactList = data?.docs.map((doc) => {
            return { id: doc?.id, ...doc?.data() };
          });
          setContacts(contactList);
          // console.log("getContacts ~ contactList: ", contactList);
          return contactList;
        });
      } catch (error) {
        console.log("getContacts ~ error: ", error);
      }
    }

    getContacts();
  }, []);

  const filterContact = (e) => {
    const value = e?.target?.value?.toLowerCase();
    try {
      const contactCollection = collectionGroup(db, "contacts");
      // const data = await getDocs(contactCollection);

      onSnapshot(contactCollection, (data) => {
        const contactList = data?.docs.map((doc) => {
          return { id: doc?.id, ...doc?.data() };
        });

        const filteredContacts = contactList.filter((contact) =>
          contact?.name?.toLowerCase().includes(value),
        );
        setContacts(filteredContacts);
        // console.log("getContacts ~ contactList: ", contactList);
        return filteredContacts;
      });
    } catch (error) {
      console.log("getContacts ~ error: ", error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <NavBar />
        <div className="flex gap-2">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-1 text-3xl text-white" />
            <input
              onChange={filterContact}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>

          <FaCirclePlus
            onClick={onOpen}
            className="ml-2 cursor-pointer gap-2 text-4xl text-white"
          />
        </div>
        <div className="mt-4  flex flex-col gap-4">
          {contacts?.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts?.map((contact) => (
              <ContactCard contact={contact} key={contact?.id} />
            ))
          )}
        </div>
      </div>

      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer autoClose />
    </>
  );
}

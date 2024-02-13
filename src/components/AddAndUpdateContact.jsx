import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { db } from "../config/firebase";
import { Model } from "./Model";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("emial issue").required("Name is required"),
});
export const AddAndUpdateContact = ({ onClose, isOpen, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      if (contact?.name === "" || contact?.email === "") {
        throw new Error("Name or Email Cannot be empty");
      }
      const contactCollection = collection(db, "contacts");
      const data = await addDoc(contactCollection, contact);
      console.log("addContact ~ data: ", data);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log("addContact ~ error: ", error);
      toast.error(error.message);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactCollection = doc(db, "contacts", id);
      const data = await updateDoc(contactCollection, contact);
      console.log("addContact ~ data: ", data);
      toast.success("Contact Updated Successfully");
      onClose();
    } catch (error) {
      console.log("addContact ~ error: ", error);
    }
  };

  return (
    <>
      <Model onClose={onClose} IsOpen={isOpen}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={isUpdate ? { ...contact } : { name: "", email: "" }}
          onSubmit={(values) => {
            console.log("AddAndUpdateContact ~ values:", values);
            isUpdate
              ? updateContact(values, contact?.id)
              : addContact({ name: values?.name, email: values?.email });
          }}
        >
          <Form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="h-10 border" />
              <div className=" text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button type="submit" className="self-end bg-orange px-2 py-1.5">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Model>
    </>
  );
};

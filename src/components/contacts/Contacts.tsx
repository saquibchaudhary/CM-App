import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/store";
import {
  Contact,
  addContact,
  updateContact,
  deleteContact,
} from "../../Store/contactSlice";
import { Formik, Form, Field } from "formik";
import ContactList from "./ContactList";

const Contacts = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleAddContact = (values: Omit<Contact, "id">) => {
    const newContact: Contact = {
      id: Date.now(),
      ...values,
    };
    dispatch(addContact(newContact));
    setShowAddModal(false);
  };

  const handleEditContact = (values: Omit<Contact, "id">) => {
    if (selectedContact) {
      const updatedContact: { id: number; contact: Contact } = {
        id: selectedContact.id,
        contact: {
          ...selectedContact,
          ...values,
        },
      };
      dispatch(updateContact(updatedContact));
      setShowEditModal(false);
    }
  };

  const handleDeleteContact = (id: number) => {
    dispatch(deleteContact(id));
  };

  const handleEditButtonClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedContact(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {contacts.length === 0 ? (
        <div className="text-center">
          No contacts available.{" "}
          <button
            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => setShowAddModal(true)}
          >
            Add Contact
          </button>
        </div>
      ) : (
        <>
          <ContactList
            contacts={contacts}
            onEdit={handleEditButtonClick}
            onDelete={handleDeleteContact}
          />
          <button
            className="m-5 px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => setShowAddModal(true)}
          >
            Add Contact
          </button>
        </>
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-4 bg-white rounded-lg">
            <h3 className="mb-4 text-lg font-semibold">Add Contact</h3>
            <Formik
              initialValues={{ firstName: "", lastName: "", status: "" }}
              onSubmit={(values) => handleAddContact(values)}
            >
              <Form>
                <div className="mb-2">
                  <label htmlFor="firstName">First Name:</label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="lastName">Last Name:</label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="status">Status:</label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    as="select"
                    id="status"
                    name="status"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 mr-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}

      {showEditModal && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-4 bg-white rounded-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit Contact</h3>
            <Formik
              initialValues={{
                firstName: selectedContact.firstName,
                lastName: selectedContact.lastName,
                status: selectedContact.status,
              }}
              onSubmit={(values) => handleEditContact(values)}
            >
              <Form>
                <div className="mb-2">
                  <label htmlFor="firstName">First Name:</label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    id="firstName"
                    name="firstName"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="lastName">Last Name:</label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    id="lastName"
                    name="lastName"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="status">Status:</label>
                  <Field
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    as="select"
                    id="status"
                    name="status"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Field>
                </div>
                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 mr-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    type="submit"
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;

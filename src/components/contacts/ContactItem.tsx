import React from "react";
import { Contact } from "../../Store/types";

interface ContactItemProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: number) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
  contact,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 m-5 border-2">
      <div>
        Name: {contact.firstName} {contact.lastName} | Status: {contact.status}
      </div>
      <button
        className="px-2 py-1 mt-2 mr-2 text-sm font-semibold border border-gray-400 rounded-lg hover:bg-gray-200"
        onClick={() => onEdit(contact)}
      >
        Edit
      </button>
      <button
        className="px-2 py-1 mt-2 text-sm font-semibold border border-red-500 rounded-lg text-red-500 hover:bg-red-500 hover:text-white"
        onClick={() => onDelete(contact.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default ContactItem;

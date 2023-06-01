import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
    updateContact: (
      state,
      action: PayloadAction<{ id: number; contact: Contact }>
    ) => {
      const { id, contact } = action.payload;
      const index = state.contacts.findIndex((c) => c.id === id);
      if (index !== -1) {
        state.contacts[index] = contact;
      }
    },
  },
});

export const { addContact, deleteContact, updateContact } =
  contactSlice.actions;

export default contactSlice.reducer;

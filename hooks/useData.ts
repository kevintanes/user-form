import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useAddData = () => {
  const addUser = async (username: string, email: string, phone: string, address: string) => {
    try {
      await addDoc(collection(db, "user"), {
        username,
        email,
        phone,
        address,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { addUser };
};

const useDeleteData = () => {
  const deleteUser = async (docId: string) => {
    try {
      const data = doc(db, "user", docId);
      await deleteDoc(data);
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteUser };
};

const useUpdateData = () => {
  const updateUser = async (docId: string, username: string, email: string, phone: string, address: string) => {
    try {
      const data = doc(db, "user", docId);
      await updateDoc(data, {
        username,
        email,
        phone,
        address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { updateUser };
};

export { useAddData, useDeleteData, useUpdateData };

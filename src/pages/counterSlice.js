import { createSlice } from '@reduxjs/toolkit';
import { doc, setDoc, deleteDoc } from "firebase/firestore"; 
import { fireDB } from "../firebase/FirebaseConfig"; 

let initialState = JSON.parse(localStorage.getItem('counterValue')) || { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementByTen: (state) => {
      state.value += 10;
      localStorage.setItem('counterValue', JSON.stringify(state));
      updateCounterInFirestore(state.value); // update counter in Firestore
    },
    incrementByOne: (state) => {
      state.value += 1;
      localStorage.setItem('counterValue', JSON.stringify(state));
      updateCounterInFirestore(state.value); // update counter in Firestore
    },
    decrement: (state) => {
      state.value -= 1;
      localStorage.setItem('counterValue', JSON.stringify(state));
      updateCounterInFirestore(state.value); // update counter in Firestore
    },
    deleteValue: (state) => {
      state.value = 0;
      localStorage.removeItem('counterValue');
      deleteCounterInFirestore(); // delete counter in Firestore
    },
  },
});

export const { incrementByTen, incrementByOne, decrement, deleteValue } = counterSlice.actions;

export default counterSlice.reducer;

async function updateCounterInFirestore(counterValue) {
  const counterRef = doc(fireDB, "counters", "counter1");

  await setDoc(counterRef, { value: counterValue });
}

async function deleteCounterInFirestore() {
  const counterRef = doc(fireDB, "counters", "counter1");

  await deleteDoc(counterRef);
}

import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [bookedCabs, setBookedCabs] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const bookingsSnapshot = await getDocs(collection(db, "CarsBooking"));
      const bookings = bookingsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookedCabs(bookings);
    };

    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider value={{ bookedCabs, setBookedCabs }}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingProvider };
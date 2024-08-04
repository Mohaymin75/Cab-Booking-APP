import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { doc, getDoc, addDoc, collection } from "firebase/firestore/lite";
import { db } from "../firebase";
import { BookingContext } from "../context/BookingContext";
import Icon from "react-native-vector-icons/Ionicons";

const CabDetailScreen = ({ route, navigation }) => {
  const { carId } = route.params;
  const [car, setCar] = useState(null);
  const { bookedCabs, setBookedCabs } = useContext(BookingContext);

  useEffect(() => {
    const fetchCar = async () => {
      const carRef = doc(db, "Cars", carId);
      const carSnapshot = await getDoc(carRef);
      setCar({ id: carSnapshot.id, ...carSnapshot.data() });
    };

    fetchCar();
  }, [carId]);

  const handleBookCab = async () => {
    if (bookedCabs.length < 2) {
      const bookingData = {
        carId: car.id,
        carName: car.carName,
        carNumber: car.carNumber,
        costPerHour: car.costPerHour,
      };
      const bookingRef = await addDoc(collection(db, "CarsBooking"), bookingData);
      setBookedCabs([...bookedCabs, { id: bookingRef.id, ...bookingData }]);

      Alert.alert("Cab Booked", "Your cab has been successfully booked.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("CabsList"),
        },
      ]);
    } else {
      alert("You cannot book more than 2 cabs at a time.");
    }
  };

  if (!car) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="car" size={48} color="#4a90e2" style={styles.icon} />
        <Text style={styles.carName}>{car.carName}</Text>
        <Text style={styles.carNumber}>{car.carNumber}</Text>
        <View style={styles.infoRow}>
          <Icon name="people-outline" size={24} color="#666666" />
          <Text style={styles.infoText}>Passengers: {car.passengers}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="cash-outline" size={24} color="#666666" />
          <Text style={styles.infoText}>Price: ${car.costPerHour}/hour</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="star-outline" size={24} color="#666666" />
          <Text style={styles.infoText}>Rating: {car.rating}</Text>
        </View>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookCab}>
          <Text style={styles.bookButtonText}>Book Cab</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginBottom: 16,
  },
  carName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  carNumber: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#333333",
    marginLeft: 8,
  },
  bookButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginTop: 24,
  },
  bookButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CabDetailScreen;
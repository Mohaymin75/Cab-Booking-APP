import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebase";
import Icon from "react-native-vector-icons/Ionicons";

const CabsListScreen = ({ navigation }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsCollection = collection(db, "Cars");
      const carsSnapshot = await getDocs(carsCollection);
      const carList = carsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCars(carList);
    };

    fetchCars();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("CabDetail", { carId: item.id })}
          >
            <Icon name="car-outline" size={24} color="#4a90e2" style={styles.icon} />
            <View style={styles.itemContent}>
              <Text style={styles.itemText}>{item.carName}</Text>
              <Text style={styles.itemSubtext}>{item.carNumber}</Text>
            </View>
            <Icon name="chevron-forward-outline" size={24} color="#4a90e2" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  itemSubtext: {
    fontSize: 14,
    color: "#666666",
  },
});

export default CabsListScreen;
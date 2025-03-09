import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

// ✅ Ensure file names match exactly
const artsCraftsImage = require("../asset/hobbies/artscrafts.jpg");
const gardenImage = require("../asset/hobbies/garden.jpg");

const hobbies = [
  { id: "arts-crafts", title: "Arts & Crafts 🎨✂️", image: artsCraftsImage },
  { id: "garden", title: "Gardening 🌿", image: gardenImage },
];

const Hobbies: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Hobbies 🎨🌿</Text>
      <ScrollView contentContainerStyle={styles.gallery}>
        {hobbies.map((hobby) => (
          <TouchableOpacity key={hobby.id} onPress={() => router.push(`/hobbies/${hobby.id}`)}>
            <View style={styles.card}>
              <Image source={hobby.image} style={styles.image} />
              <Text style={styles.caption}>{hobby.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  gallery: {
    alignItems: "center",
  },
  card: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
  },
  caption: {
    color: "white",
    fontSize: 18,
    marginTop: 8,
  },
});

export default Hobbies;

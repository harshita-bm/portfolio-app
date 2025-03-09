import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import {
  PinchGestureHandler,
  GestureHandlerRootView,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const categoryData = {
  "arts-crafts": [
    require("../asset/hobbies/arts1.jpg"),
    require("../asset/hobbies/arts2.jpg"),
    require("../asset/hobbies/arts3.jpg"),
    require("../asset/hobbies/arts4.jpg"),
  ],
  garden: [
    require("../asset/hobbies/garden1.jpg"),
    require("../asset/hobbies/garden2.jpg"),
    require("../asset/hobbies/garden3.jpg"),
    require("../asset/hobbies/garden4.jpg"),
  ],
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const HobbyCategory: React.FC = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  
  const validId = id && categoryData.hasOwnProperty(id) ? (id as keyof typeof categoryData) : null;
  const images = validId ? categoryData[validId] : [];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Zooming Variables
  const scale = useSharedValue(1);

  const handleZoomEvent = (event: any) => {
    scale.value = event.nativeEvent.scale;
  };

  const handleZoomStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      scale.value = Math.max(1, Math.min(scale.value, 4)); // Limits zoom between 1x and 4x
    }
  };

  // Double Tap to Reset Zoom
  const handleDoubleTap = () => {
    scale.value = withSpring(1);
  };

  const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));


  return (
    <GestureHandlerRootView style={styles.container}>
      {/* ✅ Fixed Back Button (Navigates to Hobbies Page) */}
      <TouchableOpacity onPress={() => navigation.navigate("Hobbies")} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{validId ? validId.toUpperCase() : "Not Found"} Gallery</Text>

      {/* Image Grid (Ensures 2 in a Row) */}
      <ScrollView contentContainerStyle={styles.gallery}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <TouchableOpacity key={index} onPress={() => { setSelectedImage(img); setModalVisible(true); }}>
              <Image source={img} style={styles.image} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.errorText}>No images found for this category.</Text>
        )}
      </ScrollView>

      {/* Full-Screen Image Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Pinch-to-Zoom & Double Tap Handler */}
          <TapGestureHandler onActivated={handleDoubleTap} numberOfTaps={2}>
            <PinchGestureHandler onGestureEvent={handleZoomEvent} onHandlerStateChange={handleZoomStateChange}>
              <Animated.View style={[styles.zoomContainer, animatedStyle]}>
                {selectedImage && (
                  <Image source={selectedImage} style={styles.fullImage} resizeMode="contain" />
                )}
              </Animated.View>
            </PinchGestureHandler>
          </TapGestureHandler>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 80,
  },
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  image: {
    width: screenWidth * 0.45, // Ensures 2 in a row
    height: screenWidth * 0.45,
    borderRadius: 15,
    marginBottom: 10,
  },
  errorText: {
    color: "white",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: screenWidth,
    height: screenHeight * 0.8,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
  zoomContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: screenHeight * 0.8,
  },
});

export default HobbyCategory;

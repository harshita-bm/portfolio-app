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
    require("../asset/hobbies/a11.jpg"),
    require("../asset/hobbies/a12.jpg"),
    require("../asset/hobbies/a13.jpg"),
    require("../asset/hobbies/arts1.jpg"),
    require("../asset/hobbies/arts2.jpg"),
    require("../asset/hobbies/arts3.jpg"),
    require("../asset/hobbies/arts4.jpg"),
    require("../asset/hobbies/arts5.jpg"),
    require("../asset/hobbies/arts6.jpg"),
    require("../asset/hobbies/arts7.jpg"),
    require("../asset/hobbies/arts8.jpg"),
    require("../asset/hobbies/arts9.jpg"),
    require("../asset/hobbies/arts10.jpg"),
    require("../asset/hobbies/arts11.jpg"),
    require("../asset/hobbies/arts12.jpg"),
    require("../asset/hobbies/arts13.jpg"),
    require("../asset/hobbies/arts14.jpg"),
    require("../asset/hobbies/arts15.jpg"),
    require("../asset/hobbies/arts16.jpg"),
    require("../asset/hobbies/arts17.jpg"),
    require("../asset/hobbies/arts18.jpg"),
    require("../asset/hobbies/arts19.jpg"),
    require("../asset/hobbies/arts20.jpg"),
    require("../asset/hobbies/arts21.jpg"),
    
  ],
  garden: [
    require("../asset/hobbies/g1.jpg"),
    require("../asset/hobbies/g2.jpg"),
    require("../asset/hobbies/g3.jpg"),
    require("../asset/hobbies/g4.jpg"),
    require("../asset/hobbies/g5.jpg"),
    require("../asset/hobbies/g6.jpg"),
    require("../asset/hobbies/g7.jpg"),
    require("../asset/hobbies/g8.jpg"),
    require("../asset/hobbies/g9.jpg"),
    require("../asset/hobbies/g10.jpg"),
    require("../asset/hobbies/g11.jpg"),
   
    require("../asset/hobbies/g14.jpg"),
    require("../asset/hobbies/g15.jpg"),
    require("../asset/hobbies/g16.jpg"),
    require("../asset/hobbies/g17.jpg"),
    require("../asset/hobbies/g18.jpg"),
    require("../asset/hobbies/g19.jpg"),
    require("../asset/hobbies/g21.jpg"),
   
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
      {/* <TouchableOpacity onPress={() => navigation.navigate("Hobbies")} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity> */}

      <Text style={styles.title}>{validId ? validId.toUpperCase() : "Not Found"} </Text>

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
    width: screenWidth * 0.3, // Adjust for spacing
    height: screenWidth * 0.3,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: screenWidth * 0.01, // Add small horizontal margin
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

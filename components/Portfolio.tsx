import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Linking, Platform, Animated } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons"; // Importing icons

const openResume = () => {
  const url = "https://harshita-bm.github.io/myresume/harshita_bm_resume.pdf";
  
  if (Platform.OS === "web") {
    window.open(url, "_blank");
  } else {
    Linking.openURL(url);
  }
};

const Portfolio: React.FC = () => {
  const [smileyOpacity] = useState(new Animated.Value(0));

  const sayHi = () => {
    Animated.timing(smileyOpacity, {
      toValue: 0.6,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(smileyOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, 1000);
    });
  };

  return (
    <ImageBackground
      source={require("../assets/images/portfoliobg.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <Link href="/about" asChild>
          <TouchableOpacity>
            <Text style={styles.navText}>About</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={openResume}>
          <Text style={styles.navText}>Resume</Text>
        </TouchableOpacity>

        <Link href="/projects" asChild>
          <TouchableOpacity>
            <Text style={styles.navText}>Projects</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/hobbies" asChild>
          <TouchableOpacity>
            <Text style={styles.navText}>Hobbies</Text>
          </TouchableOpacity>
        </Link>

        {/* "Say Hi!" Button in Navbar */}
        <TouchableOpacity style={styles.sayHiButton} onPress={sayHi}>
          <Text style={styles.buttonText}>👋 Say Hi!</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>Hello!, I'm</Text>
        <Text style={styles.name}>Harshita B M</Text>
        <Text style={styles.role}>Welcome To My Portfolio</Text>

        {/* "View Resume" Button */}
        <TouchableOpacity style={styles.resumeButton} onPress={openResume}>
          <Text style={styles.buttonText}>📄 My RESUME</Text>
        </TouchableOpacity>

        {/* Smiley Below "Say Hi!" */}
        <Animated.Text style={[styles.smiley, { opacity: smileyOpacity }]}>😊</Animated.Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Living, learning, & leveling up one day at a time.</Text>
        
        {/* Social Links */}
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/yourprofile/")}>
            <FontAwesome name="linkedin" size={28} color="white" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://harshita-bm.github.io/")}>
            <FontAwesome name="globe" size={28} color="white" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("https://github.com/harshita-bm")}>
            <FontAwesome name="github" size={28} color="white" style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Linking.openURL("mailto:harshithamohan535@gmail.com")}>
            <FontAwesome name="envelope" size={28} color="white" style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Footer Credit */}
        <Text style={styles.credit}>Handcrafted by me ❤️ twentytwentyfive</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.63)",
  },
  navbar: {
    position: "absolute",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  navText: {
    color: "#f8f8f8",
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 28,
    color: "white",
    fontWeight: "300",
  },
  name: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  role: {
    fontSize: 18,
    color: "white",
    marginTop: 5,
  },
  resumeButton: {
    marginTop: 10,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  sayHiButton: {
    backgroundColor: "#808080",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  smiley: {
    fontSize: 50,
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 12,
  },
  credit: {
    color: "white",
    fontSize: 14,
    fontWeight: "400",
  },
});

export default Portfolio;

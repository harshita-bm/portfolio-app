import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 

const { width } = Dimensions.get("window");

const About: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Profile Photo */}
        <Image source={require("../asset/about/me.png")} style={styles.profileImage} />

        {/* Personal Info */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.separator} />
          <Text style={styles.text}>Harshita B M</Text>

          {/* Icons Row - Email, LinkedIn, GitHub, Portfolio */}
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:harshithamohan535@gmail.com")}>
              <Icon name="envelope" size={28} color="white" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL("https://www.linkedin.com/in/harshita-b-m-593566237")}>
              <Icon name="linkedin" size={28} color="#0A66C2" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL("https://github.com/harshita-bm")}>
              <Icon name="github" size={28} color="white" style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL("https://delicate-boba-d6db5b.netlify.app/")}>
              <Icon name="globe" size={28} color="white" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Career Objective */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Career Objective</Text>
          <View style={styles.separator} />
          <Text style={styles.text}>
            Passionate Full Stack Developer eager to build impactful and scalable applications. Enthusiastic about learning new technologies and solving real-world problems through innovative solutions.
          </Text>
        </View>

        {/* Education */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Education</Text>
          <View style={styles.separator} />
          <Text style={styles.text}>🎓 Master's in Computer Applications (2022-2024)</Text>
          <Text style={styles.text1}>Mangalore Institute of Technology and Engineering</Text>
          <Text style={styles.text}>🎓 Bachelor's in Computer Applications (2019-2022)</Text>
          <Text style={styles.text1}>SDM College of Business Management</Text>
        </View>

        {/* Skills */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.separator} />
          <Text style={styles.text}>✔ Python Full Stack Developer</Text>
          <Text style={styles.text}>✔ Data Analytics</Text>
          <Text style={styles.text}>✔ React Native & Expo</Text>
          <Text style={styles.text}>✔ Git & GitHub</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingVertical: 30,
  },
  contentWrapper: {
    width: width * 0.8,
    alignItems: "center",
  },
  profileImage: {
    width: 200,
    height: 260,
    borderRadius: 60,
    marginBottom: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  sectionBox: {
    width: "90%",
    backgroundColor: "#1e1e1e",
    padding: 15,
    marginBottom: 30,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: "EBGaramond-VariableFont_wght",
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  separator: {
    height: 2,
    backgroundColor: "#333",
    marginVertical: 8,
    width: "100%",
  },
  text: {
    fontFamily: "EBGaramond-VariableFont_wght",
    fontSize: 22,
    color: "#bbb",
    textAlign: "center",
    marginBottom: 4,
  },
  text1: {
    fontStyle: "italic",
    fontSize: 18,
    color: "#bbb",
    textAlign: "center",
    marginBottom: 4,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 12,
  },
});

export default About;

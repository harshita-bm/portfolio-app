import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { useRouter } from "expo-router";

// Sample project data
const projects = [
  {
    id: "project1",
    title: "Harvest Today",
    image: require("../asset/projects/harvest1.jpg"),
    github: "https://github.com/harshita-bm/harvest-today",
  },
  {
    id: "project2",
    title: "Recipe App",
    image: require("../asset/projects/recipie.jpg"),
    github: "https://github.com/harshita-bm/recipes-book",
  },
  {
    id: "project3",
    title: "Corn Leaf Disease Detection",
    image: require("../asset/projects/corn.jpg"),
    github: "https://github.com/harshita-bm/corn-leaf-disease-detection",
  },
  {
    id: "project4",
    title: "Portfolio",
    image: require("../asset/projects/corn.jpg"),
    github: "https://github.com/harshita-bm/myportfolio",
  },
];

const Projects: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Projects 💻🚀</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {projects.reduce((rows, project, index) => {
          if (index % 2 === 0) {
            rows.push([project]); // Start a new row
          } else {
            rows[rows.length - 1].push(project); // Add to the existing row
          }
          return rows;
        }, [] as any[][]).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((project) => (
              <View key={project.id} style={styles.card}>
                {/* Image with Overlay */}
                <View style={styles.imageContainer}>
                  <Image source={project.image} style={styles.image} />
                  <View style={styles.overlay}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => router.push(`/projects/${project.id}`)}
                    >
                      <Text style={styles.buttonText}>Demo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.githubButton]}
                      onPress={() => Linking.openURL(project.github)}
                    >
                      <Text style={styles.buttonText}>GitHub</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Project Title */}
                <Text style={styles.projectTitle}>{project.title}</Text>
              </View>
            ))}
          </View>
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
  grid: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 15,
    padding: 10,
    margin: 10,
    alignItems: "center",
    width: 180, // Adjust width for 2 per row
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 160, // Increased size
    height: 160,
    borderRadius: 10,
    opacity: 0.7, // Reduced opacity
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#777", // Grey button
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  githubButton: {
    backgroundColor: "#555", // Darker grey for GitHub button
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
});

export default Projects;

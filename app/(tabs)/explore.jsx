import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, FlatList, Button, TextInput, Image } from 'react-native';
import tw from 'twrnc'
import SearchFood from '../../components/SearchFood';
import { Link } from 'expo-router';
const explore = () => {
  const main = require('../../assets/images/gym1.jpg')
  const girl1 = require('../../assets/images/back.jpg')
  const gymai = require('../../assets/images/gymai.jpg')
  const exerciseImages = [gymai, girl1, main]
  return (
    <>
      <View style={tw`flex-1 bg-white`}>
        <ScrollView contentContainerStyle={styles.container}>

          {/* Explore Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ready To <Text style={tw`text-red-400`}>Workout</Text></Text>
            {/* Replace with your explore content */}
            <FlatList
              data={exerciseImages}
              horizontal={true} // Make scrolling horizontal
              showsHorizontalScrollIndicator={false} // Hide scroll indicator
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card}>
                  <ImageBackground
                    source={item}
                    style={styles.cardImage}
                    imageStyle={styles.cardImage}
                  >
                    <Text style={styles.cardText}>Pump Again </Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
            {/* Repeat TouchableOpacity for each item */}
          </View>

          {/* Featured Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Workouts</Text>
            {/* <Link href={'/home'}> */}
              <TouchableOpacity style={styles.card}>
                <ImageBackground
                  source={girl1}
                  style={styles.cardImage2}
                  imageStyle={styles.cardImage2}
                >
                  <Text style={styles.cardText}>Back</Text>
                </ImageBackground>
              </TouchableOpacity>
            {/* </Link> */}
          </View>
          {/* food  */}
        </ScrollView>
        <SearchFood />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 350,
    height: 200, // Adjust as needed
    marginRight: 8,
    // justifyContent: 'flex-end',
    borderRadius: 10,
    padding: 10,
  },
  cardImage2: {
    height: 180, // Adjust as needed
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default explore;

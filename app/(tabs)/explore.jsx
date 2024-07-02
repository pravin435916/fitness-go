import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, FlatList, Button, TextInput, Image } from 'react-native';
import tw from 'twrnc';
import SearchFood from '../../components/SearchFood';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
const Explore = () => {
  const main = require('../../assets/images/gym1.jpg');
  const girl1 = require('../../assets/images/back.jpg');
  const gymai = require('../../assets/images/gymai.jpg');
  const exerciseImages = [{img : gymai,title : "chest"},{img : main,title : "main"},{img : girl1,title : "gri1"}];
  const router = useRouter()
  return (
    <>
      <View style={tw`flex-1 bg-white`}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Explore Section */}
          <View style={styles.section}>
            <View style={tw`flex flex-row mt-4 mb-2 items-center gap-2`}>
              <Text style={tw`text-3xl font-bold`}>Ready To <Text style={tw`text-red-400`}>Workout</Text></Text>
              <FontAwesome6 name="dumbbell" size={24} color="black" />
            </View>
                <TouchableOpacity style={styles.card}>
                  <ImageBackground
                    source={gymai}
                    style={styles.cardImage}
                    imageStyle={styles.cardImage}
                  >
                    <Text style={styles.cardText}>Pump Again</Text>
                  </ImageBackground>
                </TouchableOpacity>
          </View>

          {/* Featured Section */}
          <View style={styles.section}>
            <Text style={tw`text-3xl font-bold`}>Featured Workouts</Text>
            <TouchableOpacity style={styles.card}>
              <ImageBackground
                source={girl1}
                style={styles.cardImage2}
                imageStyle={styles.cardImage2}
              >
                <Text style={styles.cardText} onPress={()=> router.push('workouts')}>Start Your Workout</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* Popular Exercises Section */}
          <View style={styles.section}>
            <Text style={tw`text-3xl font-bold`}>Popular Exercises</Text>
            <FlatList
              data={exerciseImages}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card}>
                  <ImageBackground
                    source={item.img}
                    style={styles.cardImage}
                    imageStyle={styles.cardImage}
                  >
                    <Text style={styles.cardText}>{item.title}</Text>
                  </ImageBackground>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Nutrition Tips Section */}
          <View style={styles.section}>
            <Text style={tw`text-3xl font-bold`}>Nutrition Tips</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>Stay hydrated and maintain a balanced diet.</Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>Incorporate plenty of fruits and vegetables.</Text>
            </View>
            <View style={styles.tipCard}>
              <Text style={styles.tipText}>Incorporate plenty of fruits and vegetables.</Text>
            </View>
          </View>
        </ScrollView>
        <SearchFood />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: 400,
    height: 200,
    marginRight: 8,
    borderRadius: 10,
    padding: 10,
  },
  cardImage2: {
    height: 180,
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
  },
  navigationSection: {
    marginTop: 20,
  },
});

export default Explore;

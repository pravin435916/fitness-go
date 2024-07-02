import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native';
import axios from 'axios';
import tw, { style } from 'twrnc';
import { MaterialIcons } from '@expo/vector-icons';
const exerciseCategories = ['Chest', 'Biceps', 'Legs', 'Back', 'Shoulder','neck','lower arms','lower legs'];
const gymai = require('../../assets/images/gymai.jpg');
const Workouts = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Null initially to show the categories list
  const [searchText, setSearchText] = useState('');
  
  useEffect(() => {
    if (selectedCategory) {
      const fetchData = async () => {
        const options = {
          method: 'GET',
          url: `https://exercisedb.p.rapidapi.com/exercises/name/${selectedCategory.toLowerCase()}`,
          headers: {
            'x-rapidapi-key': 'f36b266ac8msh1e8085559b5219fp19e229jsnf82032baabb6', // Replace with your API key
            'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
          },
        };

        try {
          const response = await axios.request(options);
          setExercises(response.data);
          // console.log(response.data);
          setFilteredExercises(response.data);
        } catch (err) {
          setError(err);
        }
      };

      fetchData();
    }
  }, [selectedCategory]);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category); // Update selected category on click
    setSearchText(''); // Clear search text when a category is selected
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (selectedCategory) {
      const filteredData = exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExercises(filteredData);
    }
  };

  const renderCategoryItem = ({ item }) => {
    let categoryImage;
    switch (item.toLowerCase()) {
      case 'chest':
        categoryImage = require('../../assets/images/chest.jpg');
        break;
      case 'biceps':
        categoryImage = require('../../assets/images/biceps.jpg');
        break;
      case 'legs':
        categoryImage = require('../../assets/images/girl2.jpg');
        break;
      case 'back':
        categoryImage = require('../../assets/images/back.jpg');
        break;
      case 'neck':
        categoryImage = require('../../assets/images/neck.jpg');
        break;
      case 'lower legs':
        categoryImage = require('../../assets/images/lower.webp');
        break;
      case 'shoulder':
        categoryImage = require('../../assets/images/girl1.jpg');
        break;
      default:
        categoryImage = require('../../assets/images/girl2.jpg');
        break;
    }
  
    return (
        <TouchableOpacity style={styles.card} 
        onPress={() => handleCategoryPress(item)}>
        <ImageBackground
          source={categoryImage} // Replace with actual image URL
          style={styles.cardImage}
          imageStyle={styles.cardImage}
        >
          <Text style={styles.cardText}>{item}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  

  const renderExerciseItem = ({ item }) => (
    <View style={tw`w-42 bg-gray-400 shadow-sm overflow-hidden rounded-lg items-center mb-4`}>
      <Text style={tw`uppercase font-semibold`}>{item.equipment}</Text>
      <Image source={{ uri: item.gifUrl }} style={tw`w-42 h-42 mt-2`} />
    </View>
  );

  const filteredCategories = exerciseCategories.filter((category) =>
    category.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={tw`flex-1 mt-4 px-4 `}>
      {error && <Text style={tw`text-red-500`}>Error fetching data: {error.message}</Text>}
      {!selectedCategory ? (
        <>
           <Text style={tw`text-4xl mt-4 my-2 font-bold`}>Ready To <Text style={tw`text-red-400`}>Workout</Text></Text>
          <TextInput
            style={tw`p-2 border rounded-lg mb-4`}
            placeholder="Search categories..."
            value={searchText}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredCategories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            contentContainerStyle={tw`pb-2`}
          />
        </>
      ) : (
        <>
          <TouchableOpacity style={tw`p-4 w-36 rounded-lg my-2`} onPress={() => setSelectedCategory(null)}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity>
          <Text style={tw`text-3xl font-bold py-2 uppercase text-red-500`}>{selectedCategory} Exercises</Text>
          <TextInput
            style={tw`p-2 bg-white rounded-lg mb-4`}
            placeholder="Search exercises..."
            value={searchText}
            onChangeText={handleSearch}
          />
          <FlatList
            data={filteredExercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={tw`justify-between`}
            contentContainerStyle={tw`pb-2`}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectedExerciseContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
  },
    card: {
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardImage: {
      height: 150, // Adjust as needed
      justifyContent: 'flex-end',
      padding: 10,
    },
    cardText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
});

export default Workouts;

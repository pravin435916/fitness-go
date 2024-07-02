import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import axios from 'axios'
import { Entypo } from '@expo/vector-icons'
const SearchFood = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const food = require('../assets/images/food.jpg')
    const fetchFoodData = async (foodname) => {
        const options = {
            method: 'GET',
            url: `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodname)}`,
            headers: {
                'X-Api-Key': 'Q3H7PrTz+IbtinLdYawPhA==fcOckMZVFHVFNDDG'
            },
        };

        try {
            setLoading(true)
            const response = await axios.request(options);
            setSearchResults(response.data.items); // Assuming the API response structure has an items array
            setError(null); // Clear any previous error
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    };

    const handleSearch = () => {
        if (searchText.trim() !== '') {
            fetchFoodData(searchText);
        }else{
            fetchFoodData(null)
        }
    };

    const renderFoodItem = ({ item }) => (
        <View style={tw`flex flex-row gap-4 justify-center items-center mb-4`}>
            <Image style={tw`w-24 h-24 rounded-xl`} source={food} />
            <View style={tw`flex flex-col`}>
                <Text style={tw`font-bold text-xl`}>{item.name}</Text>
                <Text>Calories: {item.calories.toFixed(1)}</Text>
                <Text>Carbohydrates: {item.carbohydrates_total_g.toFixed(1)}g</Text>
                <Text>Fat: {item.fat_total_g.toFixed(1)}g</Text>
                <Text>Protein: {item.protein_g.toFixed(1)}g</Text>
            </View>
            <Text onPress={()=> fetchFoodData(null)}><Entypo name="cross" size={24} color="black" /></Text>
        </View>
    );
    return (
        <View style={tw`flex flex-col gap-4`}>
            <View style={tw`w-full flex gap-4 flex-row justify-center items-center`}>
                <TextInput
                    style={tw`w-72 px-4 py-2 my-2 border rounded-xl`}
                    placeholder="Search for food..."
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
                <Button style={tw` px-4 py-2 my-2 bg-red-600 rounded-2xl`} title="Search" onPress={handleSearch} />
                {/* {error && <Text style={tw`text-red-400`}>Error: {error}</Text>} */}
            </View>
            {
                loading ? <Text>Loading...</Text>
                    :
                    <FlatList
                        data={searchResults}
                        renderItem={renderFoodItem}
                        keyExtractor={(item) => item.name} // Assuming 'name' is unique for each item
                    />
            }
        </View>
    )
}

export default SearchFood

const styles = StyleSheet.create({})
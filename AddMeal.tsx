import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // For selecting images
import { Picker } from '@react-native-picker/picker'; // For selecting meal course
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import MenuScreen from './Menu';
import { useEffect } from 'react';

interface Props {
  currentUser: { christoffel: boolean };
}

const currentUser = {
  christoffel: true, // Make sure only host users have access to this screen
};




type Meal = {
  id: string;
  image: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

export const AddMealScreen = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('starter');
  const [price, setPrice] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);

  // Redirect non-host users
  useEffect(() => {
  if (!currentUser.christoffel) {
    navigation.navigate('Menu'); //  non-host users to the Menu screen
  } 
}, [currentUser, navigation]);
if (!currentUser?.christoffel) {
  return null; 
}


  // Open Image Picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
  };

  // Add a meal
  const addMeal = () => {
    if (!name || !description || !price || !image) {
      Alert.alert('All fields are required!');
      return;
    }
    
    const newMeal: Meal = {
      id: Date.now().toString(),
      image,
      name,
      description,
      course,
      price,
    };

    setMeals([...meals, newMeal]);
    resetForm();
  };

  // Remove a meal
  const removeMeal = (mealId: string) => {
    setMeals(meals.filter(meal => meal.id !== mealId));
  };

  // Reset form after adding a meal
  const resetForm = () => {
    setImage(null);
    setName('');
    setDescription('');
    setCourse('starter');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      (alias) class ScrollView
      import ScrollView
    <ScrollView>
      <Text style={styles.title}>Add a Meal</Text>
      
      {/* Meal Image */}
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text>Pick an Image</Text>
          </View>
        )}
      </TouchableOpacity>
      
      {/* Meal Name */}
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />

      {/* Meal Description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Meal Course */}
      (alias) class Picker =
        selectedValue={course}
        onValueChange={(itemValue: any) => setCourse(itemValue)}
        style={styles.picker}
      
        <Picker.Item label="Starter" value="starter" />
        <Picker.Item label="Main" value="main" />
        <Picker.Item label="Dessert" value="dessert" />

      {/* Price */}
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Add Meal Button */}
      <TouchableOpacity>
        <Button title="Add Meal" onPress={addMeal} />
      </TouchableOpacity>

      {/* List of Meals */}
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.mealItem}>
            <Image source={{ uri: item.image }} style={styles.mealImage} />
            <View style={styles.mealInfo}>
              <Text>{item.name} - {item.course}</Text>
              <Text>{item.description}</Text>
              <Text>${item.price}</Text>
            </View>
            <Button title="Remove" onPress={() => removeMeal(item.id)} />
          </View>
        )}
      />
      </ScrollView>
  </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    textShadowColor: 'grey',
    color: 'White',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  mealImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  mealInfo: {
    flex: 1,
  },
});

export default AddMealScreen;

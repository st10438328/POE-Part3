import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, Button, View, StyleSheet, ScrollView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


interface MenuItem {
  name: string;
  description: string;
  price: number;
}


const MainScreen = ({ navigation }: any) => {
  
  const [starter, setStarter] = useState<MenuItem>({ name: '', description: '', price: 0 });
  const [mainCourse, setMainCourse] = useState<MenuItem>({ name: '', description: '', price: 0 });
  const [dessert, setDessert] = useState<MenuItem>({ name: '', description: '', price: 0 });

  
  const [input, setInput] = useState<{ name: string; description: string; price: string }>({
    name: '',
    description: '',
    price: '',
  });

  
  const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);

  
  const handleAddMenuItem = (course: 'starter' | 'mainCourse' | 'dessert') => {
    const newItem: MenuItem = {
      name: input.name,
      description: input.description,
      price: parseFloat(input.price),
    };

    
    if (course === 'starter') setStarter(newItem);
    if (course === 'mainCourse') setMainCourse(newItem);
    if (course === 'dessert') setDessert(newItem);

    
    setInput({ name: '', description: '', price: '' });
  };

 
  const handleSelectItem = (item: MenuItem) => {
    setSelectedItems((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item); 
      } else {
        return [...prevItems, item]; 
      }
    });
  };

  
  const totalPrice = selectedItems.reduce((total, item) => total + item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.MRLq4-iPnKtBDE1vWdUQeQHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7' }} 
        style={styles.headerImage}
      />
      
      <Text style={styles.header}>Three-Course Meal Menu</Text>

      <ScrollView contentContainerStyle={styles.formContainer}>
       
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={input.name}
          onChangeText={(text) => setInput({ ...input, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={input.description}
          onChangeText={(text) => setInput({ ...input, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={input.price}
          keyboardType="numeric"
          onChangeText={(text) => setInput({ ...input, price: text })}
        />

        
        <View style={styles.buttonContainer}>
          <Button title="Add Starter" onPress={() => handleAddMenuItem('starter')} color="#E91E63" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add Main Course" onPress={() => handleAddMenuItem('mainCourse')} color="#E91E63" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Add Dessert" onPress={() => handleAddMenuItem('dessert')} color="#E91E63" />
        </View>

       
        <Text style={styles.menuHeader}>Menu</Text>

        <View style={styles.menuContainer}>
          <Text style={styles.courseTitle}>Starter:</Text>
          <Text>{starter.name ? `${starter.name} - $${starter.price.toFixed(2)}` : 'Not added yet'}</Text>
          <Text>{starter.description || 'No description'}</Text>
          <Button
            title={selectedItems.includes(starter) ? 'Remove from Menu' : 'Add to Menu'}
            onPress={() => handleSelectItem(starter)}
            color={selectedItems.includes(starter) ? '#FF4081' : '#E91E63'}
          />
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.courseTitle}>Main Course:</Text>
          <Text>{mainCourse.name ? `${mainCourse.name} - $${mainCourse.price.toFixed(2)}` : 'Not added yet'}</Text>
          <Text>{mainCourse.description || 'No description'}</Text>
          <Button
            title={selectedItems.includes(mainCourse) ? 'Remove from Menu' : 'Add to Menu'}
            onPress={() => handleSelectItem(mainCourse)}
            color={selectedItems.includes(mainCourse) ? '#FF4081' : '#E91E63'}
          />
        </View>

        <View style={styles.menuContainer}>
          <Text style={styles.courseTitle}>Dessert:</Text>
          <Text>{dessert.name ? `${dessert.name} - $${dessert.price.toFixed(2)}` : 'Not added yet'}</Text>
          <Text>{dessert.description || 'No description'}</Text>
          <Button
            title={selectedItems.includes(dessert) ? 'Remove from Menu' : 'Add to Menu'}
            onPress={() => handleSelectItem(dessert)}
            color={selectedItems.includes(dessert) ? '#FF4081' : '#E91E63'}
          />
        </View>

        
        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

        
        <View style={styles.buttonContainer}>
          <Button
            title="Go to Checkout"
            onPress={() => navigation.navigate('Checkout', { selectedItems, totalPrice })}
            color="#E91E63"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const CheckoutScreen = ({ route }: any) => {
  const { selectedItems, totalPrice } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.menuHeader}>Selected Items</Text>
        
        
        {selectedItems.length > 0 ? (
          selectedItems.map((item: MenuItem, index: number) => (
            <View key={index} style={styles.menuContainer}>
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>R{item.price.toFixed(2)}</Text>
            </View>
          ))
        ) : (
          <Text>No items selected</Text>
        )}

        <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

        <View style={styles.buttonContainer}>
          <Button title="Confirm Order" onPress={() => alert('Order Confirmed')} color="#E91E63" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  formContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  menuHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
  },
  menuContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default App;

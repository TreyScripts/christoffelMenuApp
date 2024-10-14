import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const signUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpScreen = ({ navigation }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log('SignUp Data:', data);
    // Handle sign-up logic here
  };

  return (
    <View style={styles.container}>
      
       <Image source={require('C:\Users\leboc\OneDrive\Desktop\christoffelMenuApp\...christoffelMenuApp\assets\logo2.png')} style={styles.image} />
      
      <Text style={styles.title}>Sign Up</Text>

    <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}

      <TouchableOpacity>
        <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E6E6FA',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E6E6FA',
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
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  image: {
    width: 300,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: 'white',
    resizeMode: 'contain',
  }
});

export default SignUpScreen;


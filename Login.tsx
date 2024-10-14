import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {useState} from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

let hostEmail = "christoffel@gmail.com";
let hostPassword = "christoffel";

type LoginFormData = {
  email: string;
  password: string;
  hostEmail: string;
  hostPassword: string;
};

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  hostEmail: yup.string().email('Invalid email').required('Email is required'),
  hostPassword: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const LoginScreen = ({ navigation }: any) => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login Data:', data);
    // Handle login logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      <Button title="Login" onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.switchText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E6E6FA',
    
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'grey',
    color: 'White',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  switchText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007bff',
  },
});

export default LoginScreen;

/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
function App() {
  const red = ['Obesidade Mórbida', 'Obesidade'];
  const yellow = ['Sobrepeso', 'Magreza'];
  const [values, setValues] = useState({
    peso: 0,
    altura: 0,
    result: 0,
    status: '--',
  });
  const [errors, setErrors] = useState([false, false]);
  function calc() {
    if (errors.find(i => i)) return;

    const result = Number(
      (values.peso / (values.altura * values.altura)).toFixed(2),
    );

    let status = '';
    if (result < 18.5) status = 'Magreza';
    else if (result >= 18.5 && result < 25) status = 'Normal';
    else if (result >= 25 && result < 30) status = 'Sobrepeso';
    else if (result >= 30 && result < 40) status = 'Obesidade';
    else status = 'Obesidade Mórbida';

    setValues({
      ...values,
      result,
      status,
    });
  }

  return (
    <View style={styles.app}>
      <Text style={styles.legenda}>Seu Imc</Text>
      <View
        style={{
          ...styles.result_box,
          backgroundColor: red.includes(values.status)
            ? '#e63946'
            : yellow.includes(values.status)
            ? '#fcbf49'
            : '#006400',
        }}>
        <Text style={styles.imc}>{values.result}</Text>
        <Text style={styles.imc_status}>{values.status}</Text>
      </View>
      <View>
        <TextInput
          style={{
            ...styles.inputs,
            borderColor: errors[0] ? '#ff0000' : '#000000',
          }}
          keyboardType="number-pad"
          placeholder="Peso"
          onChangeText={e => {
            setErrors(prev => {
              prev[0] = e.trim() === '';
              return prev;
            });
            setValues({...values, peso: Number(e.replace(',', '.'))});
          }}
        />
        <TextInput
          style={{
            ...styles.inputs,
            borderColor: errors[1] ? '#ff0000' : '#000000',
          }}
          keyboardType="number-pad"
          placeholder="Altura"
          onChangeText={e => {
            setErrors(prev => {
              prev[1] = e.trim() === '';
              return prev;
            });
            setValues({...values, altura: Number(e.replace(',', '.'))});
          }}
        />
        <Button onPress={calc}>Calcular</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  legenda: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  resultado: {
    fontSize: 20,
  },
  result_box: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#006400',
    marginHorizontal: 'auto',
    width: 200,
    borderRadius: 10,
  },
  imc: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imc_status: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  inputs: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 250,
    borderRadius: 10,
    backgroundColor: '#444444',
    paddingHorizontal: 15,
    marginVertical: 5,
  },
});

export default App;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DiscountCalculator = () => {
  const [numeroInicial, setNumeroInicial] = useState('');
  const [operaciones, setOperaciones] = useState(['', '', '', '', '', '']);
  const [resultado, setResultado] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleChangeOperacion = (text, index) => {
    const newOperaciones = [...operaciones];
    newOperaciones[index] = text;
    setOperaciones(newOperaciones);
  };

  const handleDeleteOperacion = (index) => {
    const newOperaciones = [...operaciones];
    newOperaciones[index] = '';
    setOperaciones(newOperaciones);
  };

  const calcularDescuento = () => {
    let totalDescuento = 0;
    operaciones.forEach(operacion => {
      if (operacion !== '') {
        totalDescuento += parseFloat(operacion) + 300;
      }
    });
    const resultadoFinal = parseFloat(numeroInicial) - totalDescuento;
    const resultadoSinDecimales = Math.floor(resultadoFinal); // Convertir a entero
    setResultado(resultadoSinDecimales.toString()); // Convertir a cadena para mostrarlo en el componente Text
  };
  
  return (
    <View style={[styles.container, darkMode && styles.darkModeContainer]}>
      <Switch
        value={darkMode}
        onValueChange={setDarkMode}
        style={styles.darkModeSwitch}
        thumbColor={darkMode ? '#fff' : '#007bff'} // Color del pulgar del interruptor
        trackColor={{ false: '#007bff', true: '#fff' }} // Color de la pista del interruptor
      />
      <Text style={[styles.title, darkMode && styles.darkModeText]}>Viaje-pronto Calculator</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input_general}
          placeholder="Número Inicial"
          keyboardType="numeric"
          value={numeroInicial}
          onChangeText={text => setNumeroInicial(text)}
        />
      </View>
      {operaciones.map((operacion, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Insertar Número"
            keyboardType="numeric"
            value={operacion}
            onChangeText={text => handleChangeOperacion(text, index)}
          />
          <TouchableOpacity onPress={() => handleDeleteOperacion(index)}>
            <Ionicons name="close-circle-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={calcularDescuento}>
        <Text style={styles.buttonText}>Calcular Descuento</Text>
      </TouchableOpacity>
      {resultado !== '' && (
  <Text style={[styles.resultado, darkMode && styles.darkModeTextResultado]}>
    TOTAL: {resultado}
  </Text>
)}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
  },
  darkModeContainer: {
    backgroundColor: '#333',
  },
  darkModeSwitch: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff', // Color azul brillante
  },
  darkModeText: {
    color: '#fff', // Color blanco para modo oscuro
  },
  input_general: {
    width: '100%',
    marginBottom: 20,
    fontFamily: 'sans-serif',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginRight: 20,
    fontFamily: 'sans-serif',
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 18
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  darkModeTextResultado: {
    color: '#fff', // Color blanco para modo oscuro
  },
});

export default DiscountCalculator;

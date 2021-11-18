import React, { useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
  Platform,
} from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

export default function App() {
  const [form, setForm] = useState(false);

  // definimos el state de citas
  const [citas, setCitas] = useState([
    // {
    //   id: '1',
    //   paciente: 'Hook',
    //   propietario: 'Marcos',
    //   sintomas: 'Aprendiendo',
    // },
    // {
    //   id: '2',
    //   paciente: 'Profe',
    //   propietario: 'Emiliano',
    //   sintomas: 'Trabajando',
    // },
    // {
    //   id: '3',
    //   paciente: 'Native',
    //   propietario: 'Sebastian',
    //   sintomas: 'Cantando',
    // },
  ]);

  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter((cita) => cita.id !== id);
    });
  };

  const mostrarFormulario = () => {
    setForm(!form);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.container}>
        <Text style={styles.title}> Administrador de Citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}
          >
            <Text style={styles.textoMostrarForm}>
              {' '}
              {form ? 'Cancelar Crear Cita' : 'Crear Nueva Cita'}
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {form ? (
            <>
              <Text style={styles.title}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                mostrarFormulario={mostrarFormulario}
              />
            </>
          ) : (
            <>
              <Text style={styles.title}>
                {citas.length > 0 ? 'Administra tus Citas' : 'No hay citas'}
              </Text>
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({ item }) => {
                  return <Cita cita={item} eliminarPaciente={eliminarPaciente} />;
                }}
                keyExtractor={(cita) => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#6510D2',
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: 'green',
    marginVertical: 10,
    borderRadius: 8,
  },
  textoMostrarForm: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

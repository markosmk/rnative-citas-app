import React, { useState, useEffect } from 'react';
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
import Storage from './utils/Storage';

// components
import Cita from './components/Cita';
import Formulario from './components/Formulario';

export default function App() {
  const [form, setForm] = useState(false);
  // definimos el state de citas
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    Storage.get()
      .then((data) => {
        if (data) {
          setCitas(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // interactuamos con la clase Storage para eliminar y guardar
  const eliminarPaciente = async (id) => {
    const citasFiltradas = await Storage.remove(id);
    if (citasFiltradas) {
      setCitas(citasFiltradas);
    }
  };
  const guardarCita = async (data) => {
    const listaCitas = await Storage.set(data);
    if (listaCitas) {
      setCitas(listaCitas);
    }
  };

  // ocultar el formulario luego de enviar
  const mostrarFormulario = () => {
    setForm(!form);
  };

  // cerrar el teclado al hacer click afuera
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.container}>
        <Text style={styles.title}> Administrador de Citas</Text>
        <View style={styles.contenido}>
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

          {form ? (
            <>
              <Text style={styles.title}>Crear Nueva Cita</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                mostrarFormulario={mostrarFormulario}
                guardarCita={guardarCita}
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
    backgroundColor: '#fff',
    flex: 1,
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
    marginBottom: 50,
  },
  title: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#005CFF',
    marginVertical: 10,
    borderRadius: 12,
  },
  textoMostrarForm: {
    color: '#fff',
    fontSize: 18,
    padding: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

export default function Formulario({ citas, setCitas, mostrarFormulario }) {
  const [paciente, setPaciente] = useState('');
  const [propietario, setPropietario] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = (date) => {
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' };
    setFecha(date.toLocaleDateString('es-ES', opciones));
    hideDatePicker();
  };

  // muestra u oculta el time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = (time) => {
    const opciones = { hour: 'numeric', minute: '2-digit' };
    setHora(hora.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    //Validar
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      // fecha.trim() === '' ||
      // hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }

    const cita = { paciente, propietario, telefono, sintomas };
    cita.id = shortid.generate();
    // console.log(cita);
    // agregamos al state
    const nuevasCitas = [...citas, cita];
    setCitas(nuevasCitas);
    // ocultar formulario
    mostrarFormulario();
  };

  // mostrar alerta si falla validacion
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los campos son requridos',
      [
        {
          text: 'OK',
        },
      ]
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput style={styles.input} onChangeText={(texto) => setPaciente(texto)} />
        </View>
        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => setTelefono(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
            headerTextIOS="Elige una Hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
          />
          <Text>{hora}</Text>
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={(texto) => setSintomas(texto)}
          />
        </View>

        <View>
          <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Submit</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8,
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: 'green',
    marginVertical: 10,
    borderRadius: 8,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default function Cita({ cita, eliminarPaciente }) {
  const dialogoEliminar = (id) => {
    eliminarPaciente(id);
  };
  return (
    <View style={styles.cita}>
      <View style={styles.field}>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{cita.paciente}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Propietario:</Text>
        <Text style={styles.texto}>{cita.propietario}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Sintomas:</Text>
        <Text style={styles.texto}>{cita.sintomas}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(cita.id)}
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#F6F6F7',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  texto: {
    fontSize: 18,
    marginLeft: 8,
    color: '#7d7c83',
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  textoEliminar: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    padding: 4,
  },
});

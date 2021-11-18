import AsyncStorage from '@react-native-async-storage/async-storage';

// eliminamos una cita
export const eliminarCita = async (id) => {
  setCitas((citasActuales) => {
    return citasActuales.filter((cita) => cita.id !== id);
  });
};

// obtenemos las citas en el storage
export const obtenerCitas = async () => {
  try {
    citas = await AsyncStorage.getItem('citas');
    return citas;
  } catch (err) {
    console.log(err);
  }
};

// almacenar las citas en el storage
export const guardarCitasStorage = async (citasJSON) => {
  try {
    await AsyncStorage.setItem('citas', citasJSON);
  } catch (err) {
    console.log(err);
  }
};

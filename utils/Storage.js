import AsyncStorage from '@react-native-async-storage/async-storage';

// key indiferente, simplemente para guardar los datos a un nombre
const keyStorage = 'HkdiqHslo34';

class Storage {
  constructor() {
    // en _synchronized guardamos los datos sincronizados
    this._synchronized = null;
    // solo para almacenar los datos iniciales en ._synchronized
    this.initial();
  }

  // establecemos los datos iniciales
  initial() {
    AsyncStorage.getItem(keyStorage)
      .then((data) => {
        if (data) {
          this._synchronized = JSON.parse(data);
        }
      })
      .catch((err) => console.log('Error al iniciar AsyncStorage', err));
  }

  // obtener datos del storage
  get() {
    return new Promise((resolve, reject) => {
      // con esto obtendremos los datos rápidamente
      // y no llamaremos a async una y otra vez
      if (this._synchronized) return resolve(this._synchronized);
      // sino buscamos en el storage
      AsyncStorage.getItem()
        .then((data) => {
          // transformamos string a objeto
          const result = data ? JSON.parse(data) : null;
          // devolvemos
          resolve(result);
        })
        .catch((err) => reject(err));
    });
  }

  // guardar datos en el storage
  set(data) {
    return new Promise((resolve, reject) => {
      let dataHolder = data;
      if (data) {
        this._synchronized = data;
        // si el tipo de dato no es un string lo pasamos a objecto
        if (typeof dataHolder !== 'string') {
          dataHolder = JSON.stringify(dataHolder);
        }
        AsyncStorage.setItem(keyStorage, dataHolder)
          .then(() => {
            resolve(data);
          })
          .catch((err) => reject(err));
      } else {
        reject('Error guardando datos en AsyncStorage');
      }
    });
  }

  // remover un item de los datos del storage -> solo con id
  remove(id) {
    return new Promise((resolve, reject) => {
      let dataActual = this._synchronized;
      if (dataActual && id) {
        const filtered = dataActual.filter((item) => item.id !== id);
        this._synchronized = filtered;
        // guardamos nuevos datos
        AsyncStorage.setItem(keyStorage, JSON.stringify(filtered))
          .then(() => {
            // devolvemos nueva lista filtrada
            resolve(this._synchronized);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject('Error al procesar los datos en AsyncStorage');
      }
    });
  }

  // limpiar el storage
  clear() {
    this._synchronized = null;
    return AsyncStorage.removeItem(keyStorage);
  }
}

// exportamos e inicializamos
export default new Storage();

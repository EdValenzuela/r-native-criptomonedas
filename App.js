import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

const App = () => {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect( () =>{
    const cotizarCriptomoneda = async () =>{
      try {
        if(consultarAPI){
          //consultar la api para obtener la cotizacion
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
          const resultado = await axios.get(url);

          guardarCargando(true);

          // Ocultar el spinner y mostrar el resultado
          setTimeout( () =>{
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            guardarConsultarAPI(false);
            guardarCargando(false);
          }, 3000 );
        }
      } catch (error) {
        console.log(error);
      }
    }
    cotizarCriptomoneda();
  },[consultarAPI] );

  // Mostrar el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size='large' color='#5e49e2' /> : <Cotizacion resultado={resultado} />

  return (
    <>
      <ScrollView>
        <Header />
        <Image style={styles.imagen} source={ require('./assets/img/cryptomonedas.png') }/>
        <View style={styles.contenido}>
          <Formulario 
              moneda={moneda}
              guardarMoneda= {guardarMoneda}
              criptomoneda={criptomoneda}
              guardarCriptomoneda={guardarCriptomoneda}
              guardarConsultarAPI={guardarConsultarAPI}
          />
        </View>
        <View style={{marginTop: 40}}>
          {componente}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App;

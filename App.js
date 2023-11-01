import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const api = {
  key: "9b2e069ec37a6e020e7a6b62a2fbd392",
  base: "https://api.openweathermap.org/data/2.5/"
};

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  console.log(api)
  const search = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      })
      .catch(error => console.error(error));
  };

  const dateBuilder = (d) => {
    let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <View style={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? styles.warm : styles.container)
      : styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          onChangeText={text => setQuery(text)}
          value={query}
          onSubmitEditing={search}
        />
        <TouchableOpacity style={styles.searchButton} onPress={search}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      {(typeof weather.main != "undefined") ? (
        <View>
          {/* <Image
          style={styles.icon}
          source={{
            uri: `http://openweathermap.org/img/wn${weather.weather[0].icon}@4x.png`
          }}/> */}
          <Text style={styles.country}>{weather.name}, {weather.sys.country}</Text>
          <Text style={styles.country}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.extras}>{weather.weather[0].main}</Text>
          <Text style={styles.extras}>Feels Like:{Math.round(weather.main.feels_like)}</Text>
          <Text style={styles.extras}>Humidity:{(weather.main.humidity)}</Text>
          <Text style={styles.extras}>Pressure:{Math.round(weather.main.pressure)}</Text>
          <Text style={styles.extras}>Min:{Math.round(weather.main.temp_min)}</Text>
          <Text style={styles.extras}>Max:{Math.round(weather.main.temp_max)}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  warm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02a2ad',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 60,
    height:60,
  },

  country:{
    fontSize:25,
    fontWeight:700,
    color:'green',
    textAlign:'center'
  },

  extras:{
    fontSize:20,
    fontWeight:500
  }

});

export default App;

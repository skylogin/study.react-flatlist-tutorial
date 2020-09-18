import React from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet, StatusBar  } from 'react-native';


const DATA = [
    {title: 'Item 1'},
    {title: 'Item 2'},
    {title: 'Item 3'},
];

const Item = ({item}) => (
    <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
    </View>
);

export default function Flat(){
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={Item}
                keyExtractor={item => item.title}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    title: {
        fontSize: 32,
    },
  });
  

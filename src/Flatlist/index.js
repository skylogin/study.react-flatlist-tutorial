import React, { useState, useCallback} from 'react';
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


const apiCallToGetItems = () => {
    return new Promise(resolve => {
        const newItem = [{title: 'added Item'}];
        setTimeout(() => {
            resolve(newItem);
        }, 2000);
    });
}

export default function Flat(){
    //Pull to Refresh
    const [items, setItems] = useState(DATA);
    const [refreshing, setRefreshing] = useState(false);
    const fetchItems = useCallback(async () => {
        if(refreshing) return;
        setRefreshing(true);
        const newItems = await apiCallToGetItems();
        setItems(newItems.concat(items));
        setRefreshing(false);
    }, [refreshing]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                onRefresh={fetchItems}
                refreshing={refreshing}
                data={items}
                renderItem={Item}
                keyExtractor={(item, index) => index.toString()}
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
  

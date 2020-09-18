import React, { useState, useCallback} from 'react';
import { ActivityIndicator, SafeAreaView, View, FlatList, Text, StyleSheet, StatusBar } from 'react-native';


const DATA = [
    {title: 'Item 1'},
    {title: 'Item 2'},
    {title: 'Item 3'},
    {title: 'Item 4'},
    {title: 'Item 5'},
    {title: 'Item 6'},
    {title: 'Item 7'},
    {title: 'Item 8'},
];

const SCROLL_DATA = [
    {title: 'Scroll Item 1'},
    {title: 'Scroll Item 2'},
    {title: '=============='},
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

const apiCallToLoadMoreItems = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(SCROLL_DATA);
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

    //Infinite Scroll
    const [loading, setLoading] = useState(false);
    const loadMoreItems = useCallback(async () => {
        if(loading) return;
        setLoading(true);
        const newItems = await apiCallToLoadMoreItems();
        setItems(items.concat(newItems));
        setLoading(false);
    }, [loading]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                onEndReached={loadMoreItems}
                ListFooterComponent={() => {
                    if(!loading) return null;
                    return <ActivityIndicator />;
                }}
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
  

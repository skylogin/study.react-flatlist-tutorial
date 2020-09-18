import React from 'react';
import { StyleSheet } from 'react-native';

import Flat from "./Flatlist";

export default function App() {
  return (
      <Flat />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

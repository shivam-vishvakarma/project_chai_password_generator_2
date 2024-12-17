import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import Home from './pages/home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
  },
});

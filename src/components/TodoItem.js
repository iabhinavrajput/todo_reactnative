import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const TodoItem = ({ task, deleteTask }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{task.task}</Text>
      <Button title="Delete" onPress={() => deleteTask(task.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f4f4f4',
    marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default TodoItem;

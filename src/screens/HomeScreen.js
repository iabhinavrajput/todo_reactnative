import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Load tasks from AsyncStorage on screen load
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { id: Date.now().toString(), task: newTask }];
      setTasks(updatedTasks);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setNewTask('');
    } else {
      Alert.alert('Please enter a task');
    }
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TodoInput newTask={newTask} setNewTask={setNewTask} addTask={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem task={item} deleteTask={deleteTask} />
        )}
      />
    </View>
  );
};

export default HomeScreen;

import React from 'react';
import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { 
        backgroundColor: '#0A1128', 
        borderTopWidth: 0,
        height: 60,
        paddingBottom: 8
      },
      tabBarActiveTintColor: '#D4AF37', // Aktif sekme altın rengi
      tabBarInactiveTintColor: '#A0A0A0', // Pasif sekme gri
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Menü',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="program"
        options={{
          title: 'Program',
          tabBarIcon: ({ color }) => <FontAwesome name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Antrenman',
          tabBarIcon: ({ color }) => <FontAwesome name="bolt" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Tarifler',
          tabBarIcon: ({ color }) => <FontAwesome name="cutlery" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
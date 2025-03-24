import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, Button, Divider } from 'react-native-paper';

interface SettingsOption {
  title: string;
  description: string;
  type: 'toggle' | 'select';
  value: boolean;
}

const SettingsScreen = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    notifications: true,
    soundEffects: true,
    backgroundMusic: false,
    highContrast: false,
    largeText: false,
    dataCollection: true,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const settingsOptions: SettingsOption[] = [
    {
      title: 'Notifications',
      description: 'Receive updates about progress and achievements',
      type: 'toggle',
      value: settings.notifications,
    },
    {
      title: 'Sound Effects',
      description: 'Play sounds during activities',
      type: 'toggle',
      value: settings.soundEffects,
    },
    {
      title: 'Background Music',
      description: 'Play background music during activities',
      type: 'toggle',
      value: settings.backgroundMusic,
    },
    {
      title: 'High Contrast Mode',
      description: 'Increase visual contrast for better visibility',
      type: 'toggle',
      value: settings.highContrast,
    },
    {
      title: 'Large Text',
      description: 'Increase text size for better readability',
      type: 'toggle',
      value: settings.largeText,
    },
    {
      title: 'Data Collection',
      description: 'Allow data collection for personalized learning',
      type: 'toggle',
      value: settings.dataCollection,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <List.Section>
        <List.Subheader>App Settings</List.Subheader>
        {settingsOptions.map((option, index) => (
          <React.Fragment key={option.title}>
            <List.Item
              title={option.title}
              description={option.description}
              right={() => (
                <Switch
                  value={option.value}
                  onValueChange={() => toggleSetting(option.title.toLowerCase().replace(' ', ''))}
                />
              )}
            />
            {index < settingsOptions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List.Section>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => {}}
          style={styles.button}
        >
          Save Changes
        </Button>
        <Button
          mode="outlined"
          onPress={() => {}}
          style={styles.button}
        >
          Reset to Defaults
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  buttonContainer: {
    padding: 16,
    gap: 8,
  },
  button: {
    marginVertical: 4,
  },
});

export default SettingsScreen; 
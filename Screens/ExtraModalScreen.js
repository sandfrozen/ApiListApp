import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableHighlight, ListView, Linking, TextInput, ActivityIndicator } from 'react-native';


export default class ExtraModalScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30 }}>App by FrozenSand!</Text>
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Hide me"
          />
        </View>
      );
    }
  }
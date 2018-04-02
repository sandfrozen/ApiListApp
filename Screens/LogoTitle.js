import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableHighlight, ListView, Linking, TextInput, ActivityIndicator } from 'react-native';
import { List, ListItem, Tile } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Display from 'react-native-display';

export default class LogoTitle extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <Image
            source={require('../Images/fsv.jpg')}
            style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 8 }}
          />
        </TouchableOpacity>
      );
    }
  }
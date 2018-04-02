import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableHighlight, ListView, Linking, TextInput, ActivityIndicator } from 'react-native';
import { List, ListItem, Tile } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Display from 'react-native-display';

export default class ArticleImageView extends React.Component {
    render() {
      const article = this.props.article
      const urlToImage = article.urlToImage
      if (urlToImage) {
        return (
          <Image source={{ uri: urlToImage }} style={{ minWidth: '100%', height: 250 }} />
        )
      } else {
        return (
          <Image source={require('../Images/NoImage.png')} style={{ minWidth: '100%', height: 250 }} />
        )
      }
    }
  }
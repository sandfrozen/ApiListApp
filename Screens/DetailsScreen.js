import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableHighlight, ListView, Linking, TextInput, ActivityIndicator } from 'react-native';
import { List, ListItem, Tile } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Display from 'react-native-display';

import ArticleImageView from './ArticleImageView'

const mainColor = "#bababa"
const secdColor = "#000"
const linkColor = "#4F8EF7"

export default class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
  
      return {
        title: params && params.article ? params.article.title : 'A Nested Details Screen',
      }
    };
  
    ArticleView(props) {
      article = props.article
      urlToImage = article.urlToImage
      return (
        <ScrollView style={{ flex: 1 }}>
          <ArticleImageView article={article} />
  
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 }}>
            <Text style={{ color: '#bbbbbb', backgroundColor: 'black', paddingLeft: 13, paddingRight: 4, paddingVertical: 2 }}>{article.source.name}</Text>
            <TimeAgo style={{ borderColor: 'black', marginRight: 4, borderRadius: 5, borderWidth: 1, paddingVertical: 2, paddingHorizontal: 5 }} time={article.publishedAt} />
          </View>
  
          <Text style={{ paddingHorizontal: 12, paddingBottom: 12, fontSize: 30, justifyContent: 'center' }}>{article.title}</Text>
          <Text style={{ paddingHorizontal: 12, paddingBottom: 12, }}>{article.description}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
            <Text style={{ paddingHorizontal: 12, paddingBottom: 12, color: linkColor, fontSize: 20 }}>Link</Text>
          </TouchableOpacity>
        </ScrollView>
      )
    }
  
    render() {
      /* 2. Read the params from the navigation state */
      const { params } = this.props.navigation.state;
      const article = params && params.article ? params.article : null
  
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <this.ArticleView article={article} />
        </View>
      );
    }
  }
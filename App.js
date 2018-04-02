import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableHighlight, ListView, Alert, Linking, TextInput, ActivityIndicator } from 'react-native';
import { List, ListItem, Tile } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Display from 'react-native-display';

import HomeScreen from './HomeScreen'

const mainColor = "#bababa"
const secdColor = "#000"
const linkColor = "#4F8EF7"

const styles = {
  row: {
    height: 100,
    width: '100%',
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: '#BBBBBB',
    paddingLeft: 0,
    padding: 8,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 0,
    color: 'grey',
    fontSize: 10,
  }
}

class DetailsScreen extends React.Component {
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

class ArticleImageView extends React.Component {
  render() {
    const article = this.props.article
    const urlToImage = article.urlToImage
    if (urlToImage) {
      return (
        <Image source={{ uri: urlToImage }} style={{ minWidth: '100%', height: 250 }} />
      )
    } else {
      return (
        <Image source={require('./NoImage.png')} style={{ minWidth: '100%', height: 250 }} />
      )
    }
  }
}

class RefreshIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Icon name="ios-refresh" size={36} color={linkColor} style={{ marginRight: 8, marginTop: 8 }} />
      </TouchableOpacity>
    );
  }
}

class ModalScreen extends React.Component {
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

class WebSiteScreen extends React.Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://github.com/facebook/react-native' }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    WebSite: {
      screen: WebSiteScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: mainColor,
      },
      headerTintColor: secdColor,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',
    headerMode: 'none',
  },
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}


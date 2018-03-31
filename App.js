import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableHighlight, ListView, Alert, Linking } from 'react-native';
import { List, ListItem, Tile } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import TimeAgo from 'react-native-timeago';

const mainColor = "#c7c1c9"
const secdColor = "#000"
const linkColor = "#4F8EF7"

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      link: 'https://newsapi.org/v2/top-headlines?country=pl&apiKey=bedefbb1d71346c2a2795c2113f469fd',
    }

    this.renderRow = this.renderRow.bind(this);
  }

  componentDidMount() {
    this.loadDataFromNewsAPI()
  }

  componentWillMount() {
    this.props.navigation.setParams({ loadData: this.loadDataFromNewsAPI })
    this.props.navigation.setParams({ updateHeader: this.updateHeader })
  }

  updateHeader() {
    this.props.navigation.setParams({ title: 'Updated!' })
  }

  loadDataFromNewsAPI = () => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('bedefbb1d71346c2a2795c2113f469fd');
    newsapi.v2.topHeadlines({
      country: 'pl'
    }).then(response => {
      //console.log(response);

      if (response["status"] == "ok" && response["totalResults"] != "0") {
        console.log("znaleziono")
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.articles),
        })
      } else if (response["totalResults"] == "0") {
        console.log("nie znaleziono")
        Alert.alert(
          'Articles not found',
          'Recieved 0 items.',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }
    });
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state || {};
    const param = navigation.state.params || {};
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('bedefbb1d71346c2a2795c2113f469fd');

    return {
      title: params && params.title ? params.title : 'Articles',
      headerLeft: (
        <LogoTitle onPress={() => navigation.navigate('MyModal')} />
      ),
      headerRight: (
        <RefreshIcon onPress={param.loadData} />
      ),
    }
  };

  loadDataFromNewsAPI2() {
    // fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=bedefbb1d71346c2a2795c2113f469fd')
    // .then( (response) => response.json())
    // .then( (responseJson) => {
    //   console.log(responseJson)
    //   data = responseJson["articles"]
    //   if( responseJson["status"] == "ok" && responseJson["totalResults"] != "0") {
    //     console.log("znaleziono")
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRows(data),
    //     })
    //   } else {
    //     console.log("nie znaleziono")
    //   }

    // })
    // .catch( (error) => {
    //   console.error(error)
    // })
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        avatarStyle={{ borderColor: mainColor, borderWidth: 1, width: 40, height: 40, borderRadius: 20 }}
        title={rowData.title}
        titleNumberOfLines={4}
        rightIcon={{ name: 'chevron-right' }}
        subtitle={
          <View style={styles.subtitleView}>
            <Text style={styles.ratingText}><TimeAgo time={rowData.publishedAt} /></Text>
          </View>
        }
        avatar={rowData.urlToImage ? rowData.urlToImage : require('./NoImage.png')}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('Details', {
            article: rowData
          });
        }}
      />
    )
  }

  // tryin to do own row, but decided to use ListItem by react-native-elements ^
  renderRow2(rowData, sectionID) {
    const image = rowData && rowData.urlToImage ? rowData.urlToImage : './NoImage.png'
    return (

      <TouchableOpacity style={{ flex: 1 }}
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          this.props.navigation.navigate('Details', {
            article: rowData
          });
        }}>

        <View style={styles.row}>
          <Image
            source={require('./NoImage.png')}
            style={{ height: 80, width: 80 }}
          />
          <Text style={{ flex: 1, paddingLeft: 8 }}>{rowData.title}</Text>
        </View >
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView style={{ width: "100%" }}>
          <List>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
          </List>
        </ScrollView>
      </View>
    );
  }
}

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

  componentDidMount() {
    console.log()
  }


  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const article = params && params.article ? params.article : null
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView>
          <Tile
            imageSrc={{ uri: article.urlToImage ? article.urlToImage : './NoImage.png' }}
            activeOpacity={0}
            title={article.title}
            contentContainerStyle={{ height: 70 }}
          >
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text>{article.description}</Text>

              <TouchableOpacity style={{ flex: 1 }} onPress={() => Linking.openURL(article.url)}>

                <Text style={{ color: linkColor, fontSize: 18, paddingVertical: 8 }}>Link</Text>
              </TouchableOpacity>
            </View>
          </Tile>

        </ScrollView>
      </View>
    );
  }
}

class LogoTitle extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image
          source={require('./fsv.jpg')}
          style={{ width: 30, height: 30, borderRadius: 15, marginLeft: 8 }}
        />
      </TouchableOpacity>
    );
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


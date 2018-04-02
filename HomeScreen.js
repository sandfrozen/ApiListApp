import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, TouchableHighlight, ListView, Alert, Linking, TextInput, ActivityIndicator } from 'react-native';
import { List, ListItem, Tile } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';
import TimeAgo from 'react-native-timeago';
import Display from 'react-native-display';

const mainColor = "#bababa"
const secdColor = "#000"
const linkColor = "#4F8EF7"

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      link: 'https://newsapi.org/v2/top-headlines?country=pl&apiKey=bedefbb1d71346c2a2795c2113f469fd',
      country: "pl",
      count: 0,
      infoHeight: 20,
      animate: false
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

  showAndHideInfo() {
    Animated.sequence([
      Animated.timing(this.state.infoHeight, {
        toValue: 20,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.infoHeight, {
        toValue: 0,
        useNativeDriver: true,
      })
    ]).start();
  }

  loadDataFromNewsAPI = () => {
    this.setState({
      animate: true
    })
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('bedefbb1d71346c2a2795c2113f469fd');
    newsapi.v2.topHeadlines({
      country: this.state.country ? this.state.country : "" // hehe taki trik jesli nikt nic nie wpisze xdd
    }).then(response => {
      //console.log(response);
      //this.showAndHideInfo()
      if (response["status"] == "ok" && response["totalResults"] != "0") {
        console.log("znaleziono")
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.articles),
          count: response.articles.length
        })
      } else if (response["totalResults"] == "0") {
        console.log("nie znaleziono")
        this.setState({
          count: response.articles.length
        })
        Alert.alert(
          'Articles not found',
          'Recieved 0 items.',
          [
            { text: 'OK' },
          ],
          { cancelable: false }
        )
      }
      this.setState({
        animate: false
        })
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
    }
  };

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

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8, borderBottomColor: mainColor, borderBottomWidth: 1, backgroundColor: 'white' }} >
          <Text style={{ flexBasis: "auto", paddingRight: 14 }}>Country:</Text>
          <TextInput
            spellCheck={false}
            returnKeyType="search"
            autoCapitalize="none"
            clearButtonMode="always"
            blurOnSubmit={true}
            onSubmitEditing={() => this.loadDataFromNewsAPI()}
            placeholder="us, gb, pl.."
            style={{ flex: 1, padding: 8, margin: 8, backgroundColor: 'rgb(239,239,244)', borderRadius: 4 }}
            onChangeText={(country) => this.setState({ country })}
            value={this.state.country}
          />
          <ActivityIndicator
            hidesWhenStopped={true}
            animating={this.state.animate}
            style={{ flexBasis: "auto" }}
          />
          {/* <Display
            enable={this.state.animate}
            enterDuration={500}
            exitDuration={250}
            enter='fadeIn'
            exit='fadeOut'
            style={{ flexBasis: "auto" }}
          >
            <ActivityIndicator
              hidesWhenStopped={true}
              animating={this.state.animate}
              style={{ flexBasis: "auto" }}
            />
          </Display> */}
          <TouchableOpacity onPress={this.loadDataFromNewsAPI}>
            <Icon name="ios-search" size={24} style={{ flexBasis: "auto", paddingLeft: 20, paddingRight: 12, paddingTop: 2 }} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{ width: "100%" }}>
          <List>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow}
            />
          </List>
        </ScrollView>
        {/* <View style={{ backgroundColor: "green", width: "100%", height: this.state.infoHeight, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{this.state.count} news founded</Text>
        </View> */}
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
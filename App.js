import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, ListView, FlatList, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      link: 'https://newsapi.org/v2/top-headlines?country=pl&apiKey=bedefbb1d71346c2a2795c2113f469fd',
    }
  }

  componentDidMount() {
    // this.loadDataFromNewsAPI()
  }

  componentWillMount() {
    this.props.navigation.setParams({ loadData: this.loadDataFromNewsAPI })
  }

  loadDataFromNewsAPI = () => {
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('bedefbb1d71346c2a2795c2113f469fd');
    newsapi.v2.topHeadlines({
      country: 'pl'
    }).then(response => {
      console.log(response);

      if (response["status"] == "ok" && response["totalResults"] != "0") {
        console.log("znaleziono")
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(response.articles),
        })
      } else if(response["totalResults"] == "0") {
        console.log("nie znaleziono")
        Alert.alert(
          'Articles not found',
          'Recieved 0 items.',
          [
            {text: 'OK'},
          ],
          { cancelable: false }
        )
      }
    });
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    // const { params } = navigation.state || {};
    const params = navigation.state.params || {};
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('bedefbb1d71346c2a2795c2113f469fd');

    return {
      title: "Home",
      headerTitle: params ? params.title : 'Articles',
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
      headerLeft: (
        <LogoTitle onPress={() => navigation.navigate('MyModal')} />
      ),
      headerRight: (
        <RefreshIcon onPress={params.loadData} />
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
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}
        avatar={{ uri: rowData.avatar_url }}
      />
    )
  }

  render() {
    const list2 = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
    ]
    const list3 = [
      {
        title: 'Appointments',
        icon: 'av-timer'
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff'
      },
      {
        title: 'Reservations',
        icon: 'hotel'
      },
      {
        title: 'Cars',
        icon: 'directions-car'
      },
      {
        title: 'Ships',
        icon: 'directions-boat'
      },
      {
        title: 'Best offers',
        icon: 'local-offer'
      },
    ]
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            });
          }}
        />
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({ title: 'Updated!' })}
        />
        <Button
          title="Load data"
          onPress={() => this.loadDataFromNewsAPI()}
        />
        <ScrollView style={{ width: "100%" }}>

          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>
              <View><Text>{rowData.title}</Text></View>
            }
          />

          <List>
            <ListItem
              roundAvatar
              title='Limited supply! Its like digital gold!'
              subtitle={
                <View style={styles.subtitleView}>
                  <Image source={require('./fsv.jpg')} style={styles.ratingImage} />
                  <Text style={styles.ratingText}>5 months ago</Text>
                </View>
              }
              avatar={require('./fsv.jpg')}
            />
          </List>

          <List containerSstyle={{ marginBottom: 20 }}>
            {
              list2.map((l, i) => (
                <ListItem
                  style={{ height: 100 }}
                  avatar={{ uri: l.avatar_url }}
                  key={i}
                  title={l.name}

                />
              ))
            }
          </List>

          <List>
            {
              list3.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.title}
                  leftIcon={{ name: item.icon }}
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    var t = item.title
                    this.props.navigation.navigate('Details', {
                      itemId: { i },
                      otherParam: t,
                    });
                  }}
                />
              ))
            }
          </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params;

    return {
      title: params ? params.otherParam : 'A Nested Details Screen',
    }
  };


  render() {
    /* 2. Read the params from the navigation state */
    const { params } = this.props.navigation.state;
    const itemId = params ? params.itemId : null;
    const otherParam = params ? params.otherParam : null;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Update the title"
          onPress={() => this.props.navigation.setParams({ otherParam: 'Updated!' })}
        />
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
        <Icon name="ios-refresh" size={40} color="#4F8EF7" style={{ marginRight: 8, marginTop: 12 }} />
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

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#8c0076',
      },
      headerTintColor: '#fff',
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


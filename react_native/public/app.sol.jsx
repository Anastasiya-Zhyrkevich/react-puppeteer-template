const { Button, Image, StyleSheet, Text, View, TouchableOpacity, FlatList } = window.RN;

const {NavigationContainer} = reactNavigationNative;
const {createStackNavigator} = reactNavigationStack;

const redHex = '#a6330d';
const blueHex = '#3944db';
const grayHex = '#7d807a';

const CARD_SVG_TEMPLATE = (cardColor) => `data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 100 200" width="100" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="200" fill="${cardColor}" stroke="black" rx="15" stroke-width="1" /></svg>`;

const redCard = CARD_SVG_TEMPLATE(redHex);
const blueCard = CARD_SVG_TEMPLATE(blueHex);
const backCard = CARD_SVG_TEMPLATE(grayHex);


const colorMapping = {
  'red': redCard,
  'blue': blueCard
}

const styles = {
  rowContainerStyle: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'center' 
  },
  card: {
    width: 100, 
    height: 200,
    margin: 10
  },
  buttonsArea: {
    justifyContent: 'space-between'
  },
  buttonRedStyle: {
    alignItems: "center",
    backgroundColor: redHex,
    padding: 10
  },
  buttonBlueStyle: {
    alignItems: "center",
    backgroundColor: blueHex,
    padding: 10
  },
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      side: 0,
    };
  }

  _onPressCard = () => {
    const newSide = (this.state.side + 1) % 2;
    this.setState({side: newSide});
    console.log(newSide);
  }

  _onRef = (ref) => {
    if (ref && typeof ref.setNativeProps === 'function') {
      ref.setNativeProps({id: this.props.valueId});
    }
  }

  render() {
    let imgUrl = backCard;
    if (this.state.side === 1) {
      imgUrl = colorMapping[this.props.color];
    }

    return (
        <TouchableOpacity 
          onPress={this._onPressCard}>
          <Image
              accessibilityLabel="Card"
              source={{ uri: imgUrl }}
              resizeMode="contain"
              style={styles.card}
              ref={this._onRef}
          />
        </TouchableOpacity>
    );
  }
}

class AddingCardButton extends React.Component {
  _onRef = (ref) => {
    if (ref && typeof ref.setNativeProps === 'function') {
      ref.setNativeProps({id: this.props.valueId});
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity 
          onPress={this.props.onPress}
          style={this.props.style}>
          <Text ref={this._onRef}>
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInd: 3,
      data: [{id: "card1", color: "blue"}, {id: "card2", color: "red"}]
    };
  }

  addCard(color) {
    const newCard = {id: "card" + this.state.currentInd.toString(), color};
    this.setState({
      data: [...this.state.data, newCard],
      currentInd: this.state.currentInd + 1
    });
  } 

  _renderMyList = ({item}) => {
    return (<Card valueId={item.id} color={item.color}/>);
  }
  
  _renderMyKeyExtractor = (item, index) => item.id.toString();

  render() {
      return (
      <View>
        <View style={styles.buttonsArea}> 
          <AddingCardButton 
            valueId="buttonRed" 
            onPress={() => this.addCard("red")} 
            title="Add Red"
            style={styles.buttonRedStyle}
          />
          <AddingCardButton 
            valueId="buttonBlue" 
            onPress={() => this.addCard("blue")} 
            title="Add Blue"
            style={styles.buttonBlueStyle}
          />
        </View>
        <FlatList
          numColumns={2}
          style={styles.rowContainerStyle}
          extraData={this.state.data}
          data={this.state.data}
          renderItem={this._renderMyList}
          keyExtractor={this._renderMyKeyExtractor}
        />
      </View>
    );
  }
}

RN.AppRegistry.registerComponent("App", () => App);

RN.AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

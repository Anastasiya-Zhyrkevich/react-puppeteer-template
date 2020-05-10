const { Button, Image, StyleSheet, Text, View, TouchableOpacity, FlatList } = window.RN;

const {NavigationContainer} = reactNavigationNative;
const {createStackNavigator} = reactNavigationStack;


const redCard = `data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 100 200" width="100" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="200" fill="#a6330d" stroke="black" rx="15" stroke-width="1" /></svg>`
const blueCard = `data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 100 200" width="100" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="200" fill="#3944db" stroke="black" rx="15" stroke-width="1" /></svg>`
const backCard =`data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 100 200" width="100" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="200" fill="#7d807a" stroke="black" rx="15" stroke-width="1" /></svg>`

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
  }
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
      <View>
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
      </View>
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
        <Button
          onPress={this.props.onPress}
          title={this.props.title}
          color="#841584"
          ref={this._onRef}
        />
    );
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInd: 3,
      data: [{id: "card1", color: "red"}, {id: "card2", color: "red"}]
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
          <AddingCardButton valueId="buttonRed" onPress={() => this.addCard("red")} title="Add Red"/>
          <AddingCardButton valueId="buttonBlue" onPress={() => this.addCard("blue")} title="Add Blue"/>
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

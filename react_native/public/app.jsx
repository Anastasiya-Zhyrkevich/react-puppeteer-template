const { Button, Image, StyleSheet, Text, View, TouchableOpacity } = window.RN;

const {NavigationContainer} = reactNavigationNative;
const {createStackNavigator} = reactNavigationStack;


const redCard = `data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 100 200" width="100" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="200" fill="#a6330d" stroke="black" rx="15" stroke-width="1" /></svg>`
const backCard =`data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 100 200" width="100" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="200" fill="#7d807a" stroke="black" rx="15" stroke-width="1" /></svg>`

const styles = {
  rowContainerStyle: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'center' 
  },
  card: {
    width: 100, 
    height: 200,
    margin: 10
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
      imgUrl = redCard;
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


function App() {
  return (
    <View style={styles.rowContainerStyle}>
      <Card valueId="card1"/>
      <Card valueId="card2"/>
    </View>
  );
}

RN.AppRegistry.registerComponent("App", () => App);

RN.AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

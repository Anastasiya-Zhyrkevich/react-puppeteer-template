const { Button, Image, StyleSheet, Text, View, TouchableOpacity } = window.RN;

const {NavigationContainer} = reactNavigationNative;
const {createStackNavigator} = reactNavigationStack;


const redHex = '#a6330d';
const blueHex = '#3944db';
const grayHex = '#7d807a';

const CARD_SVG_TEMPLATE = (cardColor) => `data:image/svg+xml;utf8,<svg role="img" viewBox="0 0 100 200" width="100" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="200" fill="${cardColor}" stroke="black" rx="15" stroke-width="1" /></svg>`;

const redCard = CARD_SVG_TEMPLATE(redHex);
const blueCard = CARD_SVG_TEMPLATE(blueHex);
const backCard = CARD_SVG_TEMPLATE(grayHex);


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
  },
  button: {
    alignItems: "center",
    backgroundColor: redHex,
    padding: 10
  },
}

class Card extends React.Component {
  _onPressCard = () => {}

  _onRef = (ref) => {
    if (ref && typeof ref.setNativeProps === 'function') {
      ref.setNativeProps({id: this.props.valueId});
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity 
          onPress={this._onPressCard}>
          <Image
              accessibilityLabel="Card"
              source={{ uri: this.props.color }}
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
      <View>
        <TouchableOpacity
          style={styles.button}>
          <Text ref={this._onRef}>
            {this.props.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function App() {
  return (
    <View>
      <AddingCardButton valueId="buttonRed" title="Add Red"/>
      <View style={styles.rowContainerStyle}>
        <Card valueId="card1" color={blueCard}/>
        <Card valueId="card2" color={redCard}/>
      </View>
    </View>
  );
}

RN.AppRegistry.registerComponent("App", () => App);

RN.AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

// import React from "react";
// import { AppRegistry, Button, Image, StyleSheet, Text, View } from "react-native";

const { Button, Image, StyleSheet, Text, View } = window.RN;

const {NavigationContainer} = reactNavigationNative;
const {createStackNavigator} = reactNavigationStack;

const withNativeProps = (Component, attrs = ['id']) => React.forwardRef((props, forwardedRef) => {
  const onRef = (ref) => {
    if (ref && typeof ref.setNativeProps === 'function') {
      const selectedProps = attrs.reduce((p, attr) => (p[attr] = props[attr], p), {});
      ref.setNativeProps(selectedProps);
    }
    if (forwardedRef && 'current' in forwardedRef) {
      forwardedRef.current = ref;
    }
    if (forwardedRef && typeof forwardedRef === 'function') {
      forwardedRef(ref);
    }
  }

  return <Component ref={onRef} {...props} />
});

class MyInput extends React.Component {
  ref = React.createRef();

  constructor(props) {
    super(props);
    setInterval(() => this.my_focus(), 3000);
  }

  my_focus() {
    this.ref.current && this.ref.current.focus()
  }

  setNativeProps(p) {
    this.nativeProps = p;
  }

  render() {
    return <input {...this.nativeProps} type="text" ref={this.ref} />
  }
}

const MyInput2 = React.forwardRef((props, ref) => (
  <input type="text" ref={ref} {...props} />
));

const MyInput3 = React.forwardRef((props, ref) => {
  class Meow extends React.Component {
    render() {
      console.log(ref);
      return <input {...this.props} type="text" ref={ref} />;
    }
  }
  return <Meow {...props} /> // React.createElement(Meow, props);
});

class MyApp extends React.Component {
  ref = React.createRef();
  ref2 = React.createRef();

  lunarPhase() {
    this.ref && this.ref.my_focus();
    this.ref2 && this.ref2.focus();
  }

  render() {
    return (
      <React.Fragment>
        <MyInput ref={this.ref} />
        <MyInput2 ref={this.ref2} />
        <MyInput3 ref={{meow: 1}} woof="10" />
      </React.Fragment>
    );
  }
}

const WrappedText = withNativeProps(Text);

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text forwardedRef={console.log} id="woof">Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <MyApp />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

RN.AppRegistry.registerComponent("App", () => App);

RN.AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});

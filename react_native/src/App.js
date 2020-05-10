import React from 'react';
import logo from './logo.svg';
import './App.css';
import faker from 'faker';
import Fuse from 'fuse.js';

import {COLORS} from './colors';


const TagsInput = () => {
  return (
    <input
      defaultValue="Empty input"
      type="text"
    />
  );
};

function App() {
  return (
    <div className="App">
      <TagsInput />
    </div>
  );
}

export default App;

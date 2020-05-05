import React from 'react';
import logo from './logo.svg';
import './App.css';
import faker from 'faker';
import Fuse from 'fuse.js';

import {COLORS} from './colors';

/*
const TagsInput = () => {
  const [tags, setTags] = React.useState(["one", "two", "three"]);
  const [tagInput, setTagInput] = React.useState("");
  const handleRemoveTag = React.useCallback(
    (tag) => {
      setTags(tags.filter((t) => t !== tag));
    },
    [tags]
  );
  const handleChange = React.useCallback((event) => {
    setTagInput(event.target.value);
  }, []);
  const isDuplicate = React.useCallback(
    (tag) => {
      return tags.some((t) => t.toLowerCase() === tag.toLowerCase());
    },
    [tags]
  );
  const handleKeyPress = React.useCallback(
    (event) => {
      if (event.key === "Enter" && !isDuplicate(tagInput)) {
        setTags([...tags, tagInput]);
        setTagInput("");
      }
    },
    [tags, tagInput, isDuplicate]
  );
  const suggestions = React.useMemo(() => {
    return COLORS
      .filter(
        (color) =>
          color.name.toLowerCase().indexOf(tagInput.toLowerCase()) !== -1 &&
          tags.indexOf(color.name) === -1
      )
      .map((color) => color.name);
  }, [tagInput, tags]);
  const handleSuggestionClick = React.useCallback(
    (suggestion) => {
      if (!isDuplicate(suggestion)) {
        setTags([...tags, suggestion]);
        setTagInput("");
      }
    },
    [tags, isDuplicate]
  );
  return (
    <div className="TagsInput">
      {tags.map((tag) => (
        <div className="Tag" key={tag} onClick={() => handleRemoveTag(tag)}>
          <span className="TagRemove">X</span>
          <span>{tag}</span>
        </div>
      ))}
      <input
        value={tagInput}
        type="text"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      {tagInput.length > 0 && suggestions.length > 0 && (
        <div className="TagSuggestions">
          {suggestions.map((suggestion) => (
            <div
              className="TagSuggestion"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <TagsInput />
    </div>
  );
}

*/


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

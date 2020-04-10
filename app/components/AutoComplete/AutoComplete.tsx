import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const Input = styled.input`
  width: 200;
  height: 44;
  transform: 'translate(339 202)';
`;

const items = ['Alagu', 'Selvan', 'David', 'Damien', 'Sara', 'Jane'];

const AutoComplete: React.FC = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState(['']);

  useEffect(() => {
    let newSuggestions: string[] = [];
    if (search.length > 0) {
      const regex = new RegExp(`^${search}`, 'i');
      newSuggestions = items
        .sort()
        .filter((suggestion) => regex.test(suggestion));
    }
    setSuggestions(newSuggestions);
  }, [search]);

  const onTextChanged = (value: string) => {
    let newSuggestions: string[] = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      newSuggestions = items.sort().filter((item) => regex.test(item));
    }
    setSuggestions(newSuggestions);
    setSearch(value);
  };

  const renderSuggestion = () => {
    if (suggestions.length === 0) {
      return null;
    } else {
      return (
        <ul>
          {suggestions.map((item, id) => (
            <li key={id}>{item}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div>
      <Input value={search} onChange={(e) => onTextChanged(e.target.value)} />
      {renderSuggestion()}
    </div>
  );
};

export default AutoComplete;

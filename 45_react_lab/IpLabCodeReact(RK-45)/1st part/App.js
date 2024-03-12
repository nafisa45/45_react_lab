import React, { useState } from 'react';
import './App.css';

function App() {
  const [textboxes, setTextboxes] = useState([{ id: 0, value: 0 }]);
  const [warnings, setWarnings] = useState({});
  const [sum, setSum] = useState(0);

  const addTextbox = () => {
    const id = textboxes.length > 0 ? textboxes[textboxes.length - 1].id + 1 : 0;
    setTextboxes([...textboxes, { id, value: 0 }]);
    setWarnings({...warnings, [id]: ''}); // Initialize warning for the new textbox
  };

  const deleteTextbox = (id) => {
    const newTextBoxes = textboxes.filter((textbox) => textbox.id !== id);
    setTextboxes(newTextBoxes);
    setSum(newTextBoxes.reduce((acc, curr) => acc + curr.value, 0));
    // Remove warning for the deleted textbox
    const {[id]: deleted, ...rest} = warnings;
    setWarnings(rest);
  };

  const handleChange = (id, event) => {
    const newValue = event.target.value;
    if (!/^\d+$/.test(newValue)) {
      setWarnings({...warnings, [id]: 'Please enter digits only'});
      return;
    }
    const newTextBoxes = textboxes.map((textbox) =>
      textbox.id === id ? { ...textbox, value: parseInt(newValue) } : textbox
    );
    setTextboxes(newTextBoxes);
    setSum(newTextBoxes.reduce((acc, curr) => acc + curr.value, 0));
    // Clear warning when valid input is provided
    setWarnings({...warnings, [id]: ''});
  };

  return (
    <div className="App">
      {textboxes.map((textbox) => (
        <div key={textbox.id} className="textbox-container">
          <input
            type="text"
            value={textbox.value}
            onChange={(event) => handleChange(textbox.id, event)}
          />
          <button onClick={() => deleteTextbox(textbox.id)}>Delete</button>
          {warnings[textbox.id] && <div className="warning">{warnings[textbox.id]}</div>}
        </div>
      ))}
      <button onClick={addTextbox}>Add</button>
      <div>Total: {sum}</div>
    </div>
  );
}

export default App;

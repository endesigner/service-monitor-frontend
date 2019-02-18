import * as React from 'react';
import { Input, Link, Row, Status, CheckBox } from './Components';

export default function ServiceList({ services, onCheckChange, onServiceUpdate }) {
  if (!services) return null;

  const DEFAULT_STATE = { index: -1, name: null, url: null };

  const [state, updateState] = React.useState(DEFAULT_STATE);

  let focusedElement, inputUrlElement;

  const enableEditor = (index) => (event) => {
    event.preventDefault();
    updateState({ ...services[index], index: index });
  };

  const disableEditor = () => updateState(DEFAULT_STATE);

  const handleKeyPress = (event) => {
    if (event.key !== "Enter") return;

    onServiceUpdate(state);
    disableEditor();
  };

  const handleFocus = (event) => focusedElement = event.target;

  const handleBlur = (event) => {
    const target = event.target;
    setTimeout(() => {
      if (focusedElement === target) disableEditor();
    }, 0);
  };

  const createInputs = ({ name, url, index }) => {
    return (
      <div>
        <Input
          type="text"
          value={name}
          onChange={({target}) => updateState({
            ...state
            , name: target.value
          })}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />
        <Input
          type="text"
          value={url}
          onChange={({target}) => updateState({
            ...state
            , url: target.value
          })}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={(el) => inputUrlElement = el}
          />
      </div>
    );
  };

  const createLink = ({ name, url, index }) =>
    <Link href="#" onClick={enableEditor(index)}><span className="name">{name}</span><span className="url">{url}</span></Link>;

  const formatDate = (date) => new Date(date).toLocaleString();
  return services.map((service, index) => (
    <Row key={index}>
      <CheckBox
        type="checkbox"
        onChange={onCheckChange(index)}
        checked={service.checked ? true : false}
      />
      {state.index == index
        ? createInputs(state)
        : createLink({...service, index: index})}
      <Status>{service.lastStatus}</Status> <div>{formatDate(service.lastChecked)}</div>
    </Row>
  ));
}

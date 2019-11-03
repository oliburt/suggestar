import React from "react";
import { Form } from "semantic-ui-react";
import PlacesAutocomplete from "react-places-autocomplete";

const AutoComplete = ({ address, setAddress, handleSelect }) => {
  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <Form.Input {...getInputProps({ placeholder: "Type address..." })} />
          <div>
            {loading ? <div>...Loading</div> : null}
            {suggestions.map(suggestion => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
              };

              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AutoComplete;

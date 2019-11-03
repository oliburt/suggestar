import React from "react";
import { Form, Button } from "semantic-ui-react";
import AutoComplete from "./AutoComplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import API from "../adapters/API";

const NewVenueForm = () => {
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [placeId, setPlaceId] = React.useState(null);
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });

  const handleAutocompleteSelect = async value => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    setPlaceId(results[0].place_id);
    setCoordinates(latlng);
  };

  const handleChangeAddress = () => {
    setPlaceId(null);
    setCoordinates({ lat: null, lng: null });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const venue = {
        name,
        description,
        place_id: placeId,
        latitude: coordinates.lat,
        longitude: coordinates.lng
    }
    API.postVenue(venue).then(console.log)
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        placeholder="name..."
        value={name}
        name="name"
        onChange={e => setName(e.target.value)}
      />
      <Form.TextArea
        placeholder="description..."
        value={description}
        name="description"
        onChange={e => setDescription(e.target.value)}
      />
      {!placeId ? (
        <AutoComplete
          address={address}
          setAddress={setAddress}
          handleSelect={handleAutocompleteSelect}
        />
      ) : (
        <div>
          <p>{address}</p>
          <Button onClick={handleChangeAddress}>Change address</Button>
        </div>
      )}
      <Button type="submit">Create Venue</Button>
    </Form>
  );
};

export default NewVenueForm;

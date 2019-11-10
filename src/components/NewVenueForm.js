import React from "react";
import { Form, Button, Image, Icon } from "semantic-ui-react";
import AutoComplete from "./AutoComplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import API from "../adapters/API";
import ImageUploader from "./ImageUploader";
import Cloudinary from "../adapters/Cloudinary";

const NewVenueForm = ({ history, addVenueToCurrentUser, user }) => {
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [placeId, setPlaceId] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const [imagePublicId, setImagePublicId] = React.useState('')
  const [loadingImage, setLoadingImage] = React.useState(false);
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
      address,
      description,
      place_id: placeId,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      image_url: imageUrl,
      image_public_id: imagePublicId
    };
    API.postVenue(venue).then(venue => {
      if (venue && venue.id) {
        addVenueToCurrentUser(user, venue);
        history.push(`/venues/${venue.id}`);
      } else {
        console.log("todo: handle errors for new venue");
      }
    });
  };

 

  const uploadImage = async e => {
    Cloudinary.uploadImage(e, setImageUrl, setImagePublicId, setLoadingImage)
  }

  // const changeImage = async e => {
  //   setImageUrl('')

  //   const resp = await Cloudinary.destroyImage(imagePublicId, setLoadingImage)

  //   if (resp.result === 'ok') {
  //     setImagePublicId('')
  //   } else {
  //     console.log(resp)
  //   }
  // }

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
      {loadingImage ? 
        <Icon loading size='big' name='spinner' /> :
        (imageUrl.length > 0 ? <Image src={imageUrl} style={{width: '200px'}} /> : null)
      }
      {imageUrl.length > 0 ? null : <ImageUploader handleChange={uploadImage} />}
      
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
/* <div id="photo-form-container">
        {imageUrl.length > 0 ? (
          <Image src={imageUrl} alt="image to upload" />
        ) : (
          <Button type="button" onClick={() => showWidget(widget)}>
            Upload Photo
          </Button>
        )}
      </div> */
import React, { useEffect } from "react";
import { Form, Button, Image, Icon, Message } from "semantic-ui-react";
import AutoComplete from "./AutoComplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import API from "../adapters/API";
import ImageUploader from "./ImageUploader";
import Cloudinary from "../adapters/Cloudinary";
import { formatAddress } from "../helpers/helperFunctions";
import FormWrapper from "./FormWrapper";

const NewVenueForm = ({
  history,
  addVenueToCurrentUser,
  user,
  windowWidth,
  activeUserMenuItem,
  setActiveUserMenuItem,
  activeListingMenuItem,
  setActiveListingMenuItem,
  activeVenueMenuItem,
  setActiveVenueMenuItem,
  activeHomeMenuItem,
  setActiveHomeMenuItem,
  selectedListingId,
  setSelectedListingId
}) => {
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [placeId, setPlaceId] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const [imagePublicId, setImagePublicId] = React.useState("");
  const [loadingImage, setLoadingImage] = React.useState(false);
  const [coordinates, setCoordinates] = React.useState({
    lat: null,
    lng: null
  });
  const [errors, setErrors] = React.useState([]);


  useEffect(() => {
    if (activeUserMenuItem !== "My Venues") {
      setActiveUserMenuItem("My Venues");
    }
    if (activeListingMenuItem !== "Details") {
      setActiveListingMenuItem("Details");
    }
    if (activeVenueMenuItem !== "About") {
      setActiveVenueMenuItem("About");
    }
    if (activeHomeMenuItem !== "Listings") {
      setActiveHomeMenuItem("Listings");
    }
    if (selectedListingId) {
      setSelectedListingId(null);
    }
  }, [
    activeUserMenuItem,
    setActiveUserMenuItem,
    activeListingMenuItem,
    setActiveListingMenuItem,
    activeVenueMenuItem,
    setActiveVenueMenuItem,
    activeHomeMenuItem,
    setActiveHomeMenuItem,
    selectedListingId,
    setSelectedListingId
  ]);

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

    if (placeId && address.length > 0 && description.length > 0 && name.length > 0) {
      API.postVenue(venue).then(venue => {
        if (venue && venue.id) {
          addVenueToCurrentUser(user, venue);
          history.push(`/venues/${venue.id}`);
        } else if (venue && venue.error) {
          setErrors([venue.error]);
        } else if (venue && venue.errors) {
          setErrors([...venue.errors]);
        } else {
          setErrors(["Something went wrong! Please try again later."]);
          console.error("Returned: ", venue);
        }
      });
    } else {
      const nameError = !name ? "Please provide a name" : null;
      const descriptionError = !description ? "Please provide a description" : null;
      const addressError = (address.length === 0 && placeId) || (!placeId) ? "Please choose one of the suggested places for the address" : null;
      
      const errors = [
        nameError,
        descriptionError,
        addressError
      ];
      const nonNullErrors = errors.filter(e => e);
      setErrors(nonNullErrors);
    }
  };

  const uploadImage = async e => {
    Cloudinary.uploadImage(e, setImageUrl, setImagePublicId, setLoadingImage);
  };

  const handleChangeImage = () =>
    this.setState({ imagePublicId: "", imageUrl: "" });

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
    <FormWrapper windowWidth={windowWidth}>
    {errors.length > 0 ? (
        <Message warning>
          <Message.Header warning>Something went Wrong!</Message.Header>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Message>
      ) : null}
      <Form onSubmit={handleSubmit}>
        <Form.Input
          placeholder="Name..."
          value={name}
          name="name"
          label="Venue Name"
          required
          onChange={e => setName(e.target.value)}
        />
        <Form.TextArea
          placeholder="Description..."
          value={description}
          name="description"
          label="Description"
          required
          onChange={e => setDescription(e.target.value)}
        />
        {loadingImage ? (
          <Icon loading size="big" name="spinner" />
        ) : imageUrl.length > 0 ? (
          <>
            <Image src={imageUrl} centered />
            <Button type="button" onClick={handleChangeImage}>
              Change Image
            </Button>
          </>
        ) : null}
        {imageUrl.length > 0 ? null : (
          <ImageUploader handleChange={uploadImage} />
        )}
        <div className="required field">
          <label>Address (Please Select from the Suggestions)</label>
          {!placeId ? (
            <AutoComplete
              address={address}
              setAddress={setAddress}
              handleSelect={handleAutocompleteSelect}
            />
          ) : (
            <div>
              {formatAddress(address)}
              <Button onClick={handleChangeAddress}>Change address</Button>
            </div>
          )}
        </div>

        <Button primary type="submit">
          Create Venue
        </Button>
        <Button secondary type="button" onClick={() => history.push("/")}>
          Cancel
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default NewVenueForm;

import React, { useState, useEffect } from "react";
import { Dropdown, Header } from "semantic-ui-react";

const FilterForm = ({
  listings,
  changeFilter,
  filter,
  radius,
  setRadius
}) => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  const getCategories = listings => {
    const categories = listings.map(l => l.categories);
    return categories.flat().reduce((acc, currentCat) => {
      if (acc.find(cat => cat.id === currentCat.id)) return acc;
      return [...acc, currentCat];
    }, []);
  };

  const handleChange = (e, data) => changeFilter(data.value);

  const handleRadiusChange = (e, data) => setRadius(data.value);

  useEffect(() => {
    if (listings) {
      setCategoryOptions(
        getCategories(listings).map(cat => ({
          key: cat.id,
          text: cat.name,
          value: cat.name
        }))
      );
    }
  }, [listings]);

  const radiusOptions = [
    {
      key: 1,
      text: "1km",
      value: 1000
    },
    {
      key: 2,
      text: "2km",
      value: 2000
    },
    {
      key: 3,
      text: "3km",
      value: 3000
    },
    {
      key: 4,
      text: "4km",
      value: 4000
    },
    {
      key: 5,
      text: "5km",
      value: 5000
    },
    {
      key: 6,
      text: "6km",
      value: 6000
    },
    {
      key: 7,
      text: "7km",
      value: 7000
    },
    {
      key: 8,
      text: "8km",
      value: 8000
    },
    {
      key: 9,
      text: "9km",
      value: 9000
    },
    {
      key: 10,
      text: "10km",
      value: 10000
    },
  ]

  return (
    <div>
      <Header as='h4'>Filters</Header>
      <span>Filter by category:</span>
      <Dropdown
        
        onChange={handleChange}
        value={filter}
        options={[
          {
            key: 0,
            text: "All",
            value: "All"
          },
          ...categoryOptions
        ]}
      />
      <br/>
      <span>Change search radius:</span>
      <Dropdown
        
        onChange={handleRadiusChange}
        value={radius}
        options={radiusOptions}
      />
     
      
    </div>
  );
};

export default FilterForm;

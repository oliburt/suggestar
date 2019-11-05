import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";

const HomeFilterForm = ({ listings, changeFilter, filter }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  const getCategories = listings => {
    const categories = listings.map(l => l.categories);
    return categories.flat().reduce((acc, currentCat) => {
      if (acc.find(cat => cat.id === currentCat.id)) return acc;
      return [...acc, currentCat];
    }, []);
  };

  const handleChange = (e, data) => changeFilter(data.value);

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

  return (
    <div>
      <span>Filter by category:</span>
      <Dropdown
        fluid
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
    </div>
  );
};

export default HomeFilterForm;

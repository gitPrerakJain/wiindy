import React, { useEffect, useState } from "react";

import AsyncSelect from "react-select/async";
import axios from "axios";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
const BASE_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const LOCATION_COORDS_BASE_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=`;
const API_KEY = process.env.REACT_APP_API_KEY;

const AsyncSelectBox = ({ childToParent }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  let data = [];

  const handleChange = async (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    async function GW() {
      await getWeather(selectedValue?.lat, selectedValue?.lon);
      if (data) {
        childToParent(data);
      }
    }
    GW();
  }, [selectedValue]);

  const fetchLocation = async (inputValue) => {
    return await axios
      .get(
        `${LOCATION_COORDS_BASE_API_URL}${inputValue}&limit=5&appid=${API_KEY}`
      )
      .then((result) => {
        return result.data;
      });
  };

  const getWeather = async (lat, lon) => {
    let res = await fetch(
      `${BASE_API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    data = await res.json();
  };

  return (
    <SimpleGrid minW={"100%"} row={2}>
      <Box
        display={"block"}
        // justifyContent={"space-between"}
        border={"3px solid white"}
        minW={"80%"}
      >
        <AsyncSelect
          placeholder="Enter city name to search weather"
          value={selectedValue}
          width="100%"
          getOptionLabel={(e) => `${e.name}, ${e.country}`}
          getOptionValue={(e) => e.name}
          loadOptions={fetchLocation}
          onChange={handleChange}
        />
      </Box>
      {selectedValue && (
        <>
          <SimpleGrid
            maxW={"60"}
            mx={"auto"}
            mt={"4rem"}
            rows={2}
            spacingX="40px"
            spacingY="20px"
          >
            <Box height="80px">
              <Text
                minH={"inherit"}
                display={"flex"}
                alignItems={"center"}
                alignContent={"center"}
                justifyContent={"center"}
                fontSize={["xl", "xl"]}
                fontWeight={"bold"}
                paddingRight={"0.5rem"}
              >
                Latitude: {selectedValue?.lat?.toFixed(5)}
                <br />
                Longitude: {selectedValue?.lon?.toFixed(5)}
              </Text>
            </Box>
          </SimpleGrid>
        </>
      )}
    </SimpleGrid>
  );
};

export default AsyncSelectBox;

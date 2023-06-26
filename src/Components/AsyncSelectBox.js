import React, { useState } from "react";

import AsyncSelect from "react-select/async";
import axios from "axios";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
const BASE_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const LOCATION_COORDS_BASE_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=`;
const API_KEY = "adf229037bb123f36b0e9cdb8586b7f3";

const AsyncSelectBox = ({ childToParent }) => {
  let time = 0;
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  let data = [];

  const handleInputChange = (value) => {
    setValue(value);
  };

  const handleChange = async (value) => {
    setSelectedValue(value);
    await getWeather(selectedValue?.lat, selectedValue?.lon);
    console.log("data from ASB handleChange: ", data);
    if (data) {
      time = data.dt - data.timezone;
      console.log("data", data);
      console.log("time: ", time);
      console.log("data from handleChange passed to parent: ", data);
      childToParent(data);
    }
  };

  const fetchLocation = async (inputValue) => {
    return await axios
      .get(
        `${LOCATION_COORDS_BASE_API_URL}${inputValue}&limit=5&appid=${API_KEY}`
      )
      .then((result) => {
        // console.log("result: ", result.data);
        return result.data;
      });
  };

  const getWeather = async (lat, lon) => {
    let res = await fetch(
      `${BASE_API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    data = await res.json();
    console.log("data from ASB getWeather ", data);
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
          onInputChange={handleInputChange}
          onChange={handleChange}
        />
      </Box>
      {selectedValue && (
        <>
          {/* <div> {selectedValue?.lat} </div>
          <div>
            {"\n"}
            {new Intl.DateTimeFormat("en-US", {
              // year: "numeric",
              // month: "2-digit",
              // day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              // second: "2-digit",
            }).format(selectedValue?.timezone)}{" "}
          </div> */}
          <SimpleGrid
            maxW={"60"}
            mx={"auto"}
            // border={"2px solid red"}
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
                Latitude: {selectedValue?.lat}
                <br />
                Longitude: {selectedValue?.lon}
              </Text>
            </Box>
            <Box height="80px">
              <Text
                minH={"inherit"}
                display={"flex"}
                alignItems={"center"}
                alignContent={"center"}
                // justifyContent={"space-between"}
                fontSize={["xl", "xl"]}
                fontWeight={"bold"}
                paddingRight={"0.5rem"}
              >
                {new Intl.DateTimeFormat("en-US", {
                  // year: "numeric",
                  // month: "2-digit",
                  // day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  // second: "2-digit",
                }).format(selectedValue?.dt)}
              </Text>
            </Box>
          </SimpleGrid>
        </>
      )}
    </SimpleGrid>
  );
};

export default AsyncSelectBox;

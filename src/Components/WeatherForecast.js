import React, { useLayoutEffect, useState } from "react";
import { Box, Container, Flex, Stack } from "@chakra-ui/react";
import AsyncSelectBox from "./AsyncSelectBox";
import Weather from "./Weather";

const BASE_API_URL =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&";
const API_KEY = process.env.REACT_APP_API_KEY;

const WeatherForecast = () => {
  const [weatherInfo, setWeatherInfo] = useState([]);

  const childToParent = (childData) => {
    setWeatherInfo(childData);
  };

  const getPosition = async (options) => {
    return await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  const getWeather = async (lat, lon) => {
    let res = await fetch(
      `${BASE_API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const data = await res.json();
    setWeatherInfo(data);
  };

  useLayoutEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        .then((position) => {
          // call API
          getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch(() => {
          alert(
            "You have disabled location service for the app. You can still enter your location manually."
          );
        });
    } else {
      alert("Geolocation not available. Please enter your location manually.");
    }
  }, []);

  return (
    <Container minWidth={"100vw"} minHeight={"99vh"}>
      <Stack display={"flex"} direction={["column", "row"]}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          minWidth={["100%", "50%", "65%"]}
          height={["100%"]}
          m={"auto"}
          backdropFilter={"auto"}
          backdropBlur={"4px"}
          marginTop={"2rem"}
          borderRight={"3px solid #333"}
        >
          <Weather weatherInfo={weatherInfo} />
        </Box>
        <Box
          // border={"2px solid red"}
          minWidth={["100%", "50%", "35%"]}
          height={["lg"]}
        >
          <Flex
            minH={"100%"}
            alignItems={["start", "center"]}
            justifyContent={"center"}
            paddingTop={"2rem"}
          >
            <AsyncSelectBox childToParent={childToParent} />
          </Flex>
        </Box>
      </Stack>
    </Container>
  );
};

export default WeatherForecast;

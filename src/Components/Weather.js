import { Box, Divider, Img, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

const Weather = ({ weatherInfo }) => {
  return (
    <SimpleGrid
      minWidth={["100vw", "auto"]}
      //   border={"2px solid red"}
      marginTop={"2rem"}
      textAlign={"center"}
      columns={[1, null, 3]}
      spacing="20px"
    >
      <Box
        gridColumn={[1, null, "span 3"]}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"4rem"}
      >
        <Text
          textAlign={"center"}
          alignSelf={"center"}
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight={"extrabold"}
          color={"gray.700"}
        >
          {weatherInfo?.name}, {weatherInfo?.sys?.country}
        </Text>
        <Img
          src={`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`}
          width={"120px"}
          height={"120px"}
          alt="weather_icon"
        />
      </Box>
      <Box gridColumn={[1, null, "span 3"]} height="5rem">
        <Text
          textAlign={"center"}
          fontSize={["5xl", "3xl", "5xl"]}
          fontWeight={"extrabold"}
        >
          {weatherInfo?.main?.temp}&#8451;
        </Text>
      </Box>
      <Box marginBottom={"10px"} gridColumn={[1, null, "span 3"]} height="5rem">
        <Text
          textAlign={"center"}
          fontSize={["4xl", "4xl", "4xl"]}
          fontWeight={"extrabold"}
        >
          {weatherInfo?.weather?.[0]?.main}
          <br />
        </Text>
        <Text
          textAlign={"center"}
          fontSize={["4xl", "4xl", "2xl"]}
          fontWeight={"bold"}
        >
          {weatherInfo?.weather?.[0]?.description} <br />
        </Text>
      </Box>
      <Box minHeight="100px">
        <Text
          //   border={"2px solid #aaa"}
          borderRight={[0, "2px solid #aaa"]}
          borderBottom={["2px solid #aaa", 0]}
          minH={"inherit"}
          display={"flex"}
          alignSelf={"center"}
          justifyContent={"center"}
          //   alignItems={"center"}
          //   alignContent={"center"}
          fontSize={["xl", "3xl"]}
          fontWeight={"bold"}
          paddingRight={"0.5rem"}
        >
          Feels like <br />
          {weatherInfo?.main?.feels_like}&#8451;
        </Text>
      </Box>
      <Box minHeight="100px">
        <Text
          borderRight={[0, "2px solid #aaa"]}
          borderBottom={["2px solid #aaa", 0]}
          minH={"inherit"}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          fontSize={["xl", "3xl"]}
          fontWeight={"bold"}
          paddingRight={"0.5rem"}
        >
          <p style={{ paddingRight: "2px" }}>
            <ArrowDownIcon boxSize={"0.9em"} />
            {weatherInfo?.main?.temp_min}&#8451;
          </p>
          <br />
          <p style={{ paddingLeft: "2px" }}>
            <ArrowUpIcon boxSize={"0.9em"} /> {weatherInfo?.main?.temp_max}
            &#8451;
          </p>
        </Text>
      </Box>{" "}
      <Box minHeight="100px">
        <Text
          minH={"inherit"}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          fontSize={["xl", "3xl"]}
          fontWeight={"bold"}
          paddingRight={"0.5rem"}
        >
          Winds
          <br />
          {weatherInfo?.wind?.speed}km/h
        </Text>
      </Box>
      <Divider
        maxWidth={"3xl"}
        gridColumn={"1/4"}
        borderColor={"gray"}
        borderWidth={"1px"}
      />
      <Box
        // borderTop={"2px solid #aaa"}
        minH={"100px"}
        borderRight={"2px solid #aaa"}
      >
        <Text
          minH={"inherit"}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          fontSize={["xl", "3xl"]}
          fontWeight={"bold"}
          paddingRight={"0.5rem"}
        >
          Pressure
          <br />
          {weatherInfo?.main?.pressure} milliBar
        </Text>
      </Box>
      <Box borderRight={"2px solid #aaa"} minH={"100px"}>
        <Text
          minH={"inherit"}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          fontSize={["xl", "3xl"]}
          fontWeight={"bold"}
          paddingRight={"0.5rem"}
        >
          Humidity
          <br />
          {weatherInfo?.main?.humidity}%
        </Text>
      </Box>
      <Box minH={"100px"}>
        <Text
          minH={"inherit"}
          display={"flex"}
          alignItems={"center"}
          alignContent={"center"}
          justifyContent={"center"}
          fontSize={["xl", "3xl"]}
          fontWeight={"bold"}
          paddingRight={"0.5rem"}
        >
          Visibility
          <br />
          {weatherInfo?.visibility} metres
        </Text>
      </Box>
    </SimpleGrid>
  );
};

export default Weather;

import React from "react";

const ImageComponent = ({ src }) => {
  return (
    <img
      src={src}
      onError={(e) => console.log("Image Error: ", e, "src ", src)}
    />
  );
};

export default ImageComponent;

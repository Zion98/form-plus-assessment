import React from "react";
import styled from "styled-components";
const Card = ({ item }) => {
  const {name,description}=item
 
  return (
    <CardWrapper className="w-80 h-48">
      <div className="px-4 py-4 pb-8">
        <h2 className="font-bold main-text my-2">{name}</h2>
        <p className="mini-text text-sm">{description}</p>
      </div>

      <div className="useContainer px-4 py-2">
        <p className="use-temp text-sm">Use Template</p>
      </div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  position:relative;

  .main-text {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  .mini-text {
    font-size: 0.9rem;
  }

  .main-text,
  .mini-text {
    color: #333447;
  }

  .useContainer {
    position:absolute;
    width:100%;
    bottom:1rem;
    color: #08bd37;
    background: #f9f9f9;
  }
`;

export default Card;

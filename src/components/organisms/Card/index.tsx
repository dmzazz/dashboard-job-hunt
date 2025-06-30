import React, { FC } from "react";

interface CardProps {
    title: string
    number: any
}

const Card: FC<CardProps> = ({title, number}) => {
  return (
    <div className="border rounded-lg p-5 shadow-md">
      <h2>{title}</h2>
      <p className="">{number}</p>
    </div>
  );
};

export default Card;

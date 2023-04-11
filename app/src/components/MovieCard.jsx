import React from 'react';
import Card from '@mui/material/Card';

const MovieCard = ({ data }) => {
  return (
    <div className="m-4">
      <Card sx={{ maxWidth: 400, maxHeight: 400 }}>
        <h1 className="mt-4 underline underline-offset-4">{data.title}</h1>
        <div style={{ 'text-align': '-webkit-center' }}>
          <img src={data.image} width={250} height={250} className="flex" />
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;

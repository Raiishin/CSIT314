import React from 'react';
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="m-4">
      <Card sx={{ maxWidth: 400, maxHeight: 400 }}>
        <h1 className="mt-4 underline underline-offset-4">{data.title}</h1>
        <div style={{ 'text-align': '-webkit-center' }}>
          <div onClick={() => navigate(`/movie/${data.id}`)}>
            <img src={data.image} width={250} height={250} className="flex" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MovieCard;

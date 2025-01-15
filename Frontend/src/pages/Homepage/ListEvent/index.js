import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ListEvent = ({ eventList }) => {
  const history = useHistory();
  return (
    <div>
      <p> Sự kiện sắp tới</p>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          padding: "50px 20px",
        }}
      >
        {eventList.map((event, index) => (
          <Card sx={{ maxWidth: 345 }} key={index}>
            <CardMedia
              sx={{ height: 140 }}
              image={event.hinhAnh}
              title={event.tenSukien}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {event.tenSukien}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => history.push(`/detail/${event.maSukien}`)}
              >
                Xem chi tiết
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListEvent;

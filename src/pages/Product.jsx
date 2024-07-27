import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Avatar,
  Card,
  CardContent,
  Box,
} from "@mui/joy";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import axios from "axios";

const Product = () => {
  const [productDetails, setProductDetails] = useState([]);

  const product = {
    name: "",
    image: "",
    description: "",
    specs: {
      ram: "",
      processor: "",
      storage: "",
      camera: "",
      battery: "",
      os: "",
    },
  };
  const params = useParams();

  useEffect(() => {
    const getCellphoneData = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/cellphones/${params.id}`,
        method: "get",
      });
      setProductDetails(response.data);
    };
    getCellphoneData();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        marginTop: 10,
      }}
    >
      <Avatar
        src={productDetails.image}
        sx={{ width: "100%", height: "auto", maxWidth: 360, marginBottom: 2 }}
      />
      <Typography
        variant="h4"
        component="h1"
        sx={{ marginBottom: 1, textAlign: "center" }}
      >
        {productDetails.name}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2, textAlign: "center" }}>
        {productDetails.description}
      </Typography>
      <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
        ${productDetails.price}
      </Typography>
      <Card
        variant="outlined"
        sx={{ width: "100%", padding: 2, marginBottom: 2 }}
      >
        <CardContent>
          <Typography variant="h6" component="h2" sx={{ marginBottom: 1 }}>
            Specifications
          </Typography>
          <Grid container spacing={1}>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Brand:
              </Typography>
              <Typography variant="body2">{productDetails.brand}</Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Processor:
              </Typography>
              <Typography variant="body2">
                {productDetails.processor}
              </Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                RAM:
              </Typography>
              <Typography variant="body2">{productDetails.ram} GB</Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Storage:
              </Typography>
              <Typography variant="body2">
                {productDetails.storage} GB
              </Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Weight:
              </Typography>
              <Typography variant="body2">{productDetails.weight} g</Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Display:
              </Typography>
              <Typography variant="body2">{productDetails.display}</Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Resolution:
              </Typography>
              <Typography variant="body2">
                {productDetails.resolution}
              </Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Cameras:
              </Typography>
              <Typography variant="body2">{productDetails.cameras}</Typography>
            </Grid>
            <Grid item="true" xs={6}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Battery:
              </Typography>
              <Typography variant="body2">
                {productDetails.battery} mAh
              </Typography>
            </Grid>
            <Grid item="true" xs={12}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Operating System:
              </Typography>
              <Typography variant="body2">
                {productDetails.operating_system}
              </Typography>
            </Grid>
            <Grid item="true" xs={12}></Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ArrowBackIcon />
        <Link style={{ textDecoration: "none" }} to={"/"}>
          Back
        </Link>
      </Box>
    </Container>
  );
};

export default Product;

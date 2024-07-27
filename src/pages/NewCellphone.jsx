import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Input,
  FormControl,
  FormLabel,
} from "@mui/joy";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

const NewCellphone = () => {
  const [productCreated, setProductCreated] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Iphone 11",
    description: "the best one",
    operating_system: "ios",
    image: "www.iphone.com",
    brand: "Apple",
    price: "100",
    processor: "A10",
    ram: "8",
    storage: "64gb",
    weight: "200",
    display: "oled",
    resolution: "1024",
    cameras: "4",
    battery: "3000",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/client/add`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: formData.name,
          description: formData.description,
          operating_system: formData.operating_system,
          image: formData.image,
          brand: formData.brand,
          price: formData.price,
          processor: formData.processor,
          ram: formData.ram,
          storage: formData.storage,
          weight: formData.weight,
          display: formData.display,
          resolution: formData.resolution,
          cameras: formData.cameras,
          battery: formData.battery,
        },
      });
      console.log("Cellphone created:", response.data);
      navigate("/");
    } catch (error) {
      console.log(`Error creating the cellphone`, error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Add new Cellphone
      </Typography>

      <Card
        variant="outlined"
        sx={{ width: "100%", padding: 2, marginBottom: 2 }}
      >
        <CardContent>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <ArrowBackIcon />
              <Link
                style={{ textDecoration: "none", color: "#5d24dd" }}
                to={"/"}
              >
                Back
              </Link>
            </Box>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                label="Name"
                variant="outlined"
                placeholder="Iphone 11"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                label="Description"
                variant="outlined"
                placeholder="Top 10 cellphones selled in Latinamerica"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                multiline="true"
                rows={4}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Operating System</FormLabel>
              <Input
                label="Operating System"
                variant="outlined"
                name="operating_system"
                placeholder="ios"
                value={formData.operating_system || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Image</FormLabel>
              <Input
                label="Image URL"
                variant="outlined"
                name="image"
                placeholder="image.url"
                value={formData.image || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Brand</FormLabel>
              <Input
                label="Brand"
                variant="outlined"
                placeholder="Apple"
                name="brand"
                value={formData.brand || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Price</FormLabel>
              <Input
                label="Price"
                variant="outlined"
                name="price"
                placeholder="100 (number)"
                type="number"
                value={formData.price || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Processor</FormLabel>
              <Input
                label="Processor"
                variant="outlined"
                placeholder="A10"
                name="processor"
                value={formData.processor || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>RAM</FormLabel>
              <Input
                label="RAM (GB)"
                variant="outlined"
                name="ram"
                placeholder="8"
                type="number"
                value={formData.ram || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Storage</FormLabel>
              <Input
                label="Storage (GB)"
                variant="outlined"
                name="storage"
                placeholder="6"
                type="number"
                value={formData.storage || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Weight</FormLabel>
              <Input
                label="Weight (g)"
                variant="outlined"
                name="weight"
                placeholder="200 (g)"
                type="number"
                value={formData.weight || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Display</FormLabel>
              <Input
                label="Display"
                variant="outlined"
                placeholder="6.1 inches OLED"
                name="display"
                value={formData.display || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Resolution</FormLabel>
              <Input
                label="Resolution"
                variant="outlined"
                placeholder="2532 x 1170"
                name="resolution"
                value={formData.resolution || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Cameras</FormLabel>
              <Input
                label="Cameras"
                variant="outlined"
                name="cameras"
                placeholder="4"
                value={formData.cameras || ""}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              {" "}
              <FormLabel>Battery</FormLabel>
              <Input
                label="Battery (mAh)"
                variant="outlined"
                name="battery"
                placeholder="3095"
                type="number"
                value={formData.battery || ""}
                onChange={handleChange}
              />
            </FormControl>
            <Button variant="solid" color="success" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewCellphone;

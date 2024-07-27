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

const EditProduct = () => {
  const [product, setProduct] = useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    operating_system: "",
    image: "",
    brand: "",
    price: "",
    processor: "",
    ram: "",
    storage: "",
    weight: "",
    display: "",
    resolution: "",
    cameras: "",
    battery: "",
  });

  useEffect(() => {
    const getCellphoneData = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/cellphones/${params.id}`,
        method: "get",
      });
      setProduct(response.data);
      setFormData({
        name: response.data.name,
        description: response.data.description,
        operating_system: response.data.operating_system,
        image: response.data.image,
        brand: response.data.brand,
        price: response.data.price,
        processor: response.data.processor,
        ram: response.data.ram,
        storage: response.data.storage,
        weight: response.data.weight,
        display: response.data.display,
        resolution: response.data.resolution,
        cameras: response.data.cameras,
        battery: response.data.battery,
      });
    };
    getCellphoneData();
  }, []);

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
        url: `${import.meta.env.VITE_API_URL}/client/${params.id}`,
        method: "patch",
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
      console.log("Product updated:", response.data);
      navigate("/");
    } catch (error) {
      console.log(`Error updating the product`, error);
    }
  };

  return (
    <>
  
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
          Edit Product
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
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ArrowBackIcon />
                <Link style={{ textDecoration: "none" }} to={"/"}>
                  Back
                </Link>
              </Box>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  label="Name"
                  variant="outlined"
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
    </>
  );
};

export default EditProduct;

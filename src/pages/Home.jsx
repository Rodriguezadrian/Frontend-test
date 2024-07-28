import React, { useState, useEffect } from "react";
import {
  Sheet,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  AspectRatio,
  Box,
  Stack,
  Chip,
  Input,
  Select,
  Option,
} from "@mui/joy";
import axios from "axios";
import TitleApp from "../components/TitleApp";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const logs = useSelector((state) => state.logs);
  const [cellphones, setCellPhones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [productDeleted, setProductDeleted] = useState(false);
  const [products, setProducts] = useState([]);
  const [cellphonesFiltered, setCellPhonesFiltered] = useState([]);

  const items_Per_Page = 3;
  const totalPages = Math.ceil(cellphonesFiltered.length / items_Per_Page);
  const paginatedPhones = cellphonesFiltered.slice(
    (currentPage - 1) * items_Per_Page,
    currentPage * items_Per_Page
  );

  const emptyItems =
    Math.ceil(paginatedPhones.length / items_Per_Page) * items_Per_Page;

  useEffect(() => {
    const getCellphones = async () => {
      try {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/cellphones`,
          method: "get",
        });
        setCellPhones(response.data);
        setProducts(response.data);
        setCellPhonesFiltered(response.data);
      } catch (error) {
        console.error("Error fetching cellphones:", error);
      }
    };
    getCellphones();
    setProductDeleted(false);
  }, [productDeleted]);

  useEffect(() => {
    handleSearchChange({ target: { value: inputValue } });
  }, [cellphones, inputValue, selectedBrand]);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    filterProducts(value, selectedBrand);
    setCurrentPage(1);
  };

  const handleBrandSelect = (e, value) => {
    setSelectedBrand(value);
    filterProducts(inputValue, value);
    setCurrentPage(1);
  };

  const filterProducts = (searchValue, brand) => {
    const filtered = cellphones.filter(
      (p) =>
        p.name.toUpperCase().includes(searchValue.toUpperCase()) &&
        (brand ? p.brand === brand : true)
    );
    setCellPhonesFiltered(filtered);
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCellPhones(cellphones.filter((product) => product.id !== id));
      setProductDeleted(true);
      console.log("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const uniqueBrands = [...new Set(products.map((product) => product.brand))];

  return (
    <>
      <Sidebar />
      <Sheet
        sx={{
          maxWidth: 1200,
          margin: "auto",
          display: "flex",
          minHeight: "80dvh",
          alignItems: "center",
          flexDirection: "column",
          background: "transparent",
        }}
      >
        <TitleApp />
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 1100,
          }}
        >
          <Input
            placeholder="Search products"
            type="text"
            value={inputValue}
            onChange={handleSearchChange}
            sx={{ marginRight: 2 }}
          />
          <Select
            placeholder="Select brand"
            value={selectedBrand}
            onChange={handleBrandSelect}
            sx={{ width: 200 }}
          >
            <Option value="">All Brands</Option>
            {uniqueBrands.map((brand, index) => (
              <Option key={index} value={brand}>
                {brand}
              </Option>
            ))}
          </Select>
        </Box>
        {paginatedPhones.length === 0 ? (
          <Typography marginBottom={40} level="h3" sx={{ marginTop: 2 }}>
            No products found.
          </Typography>
        ) : (
          ""
        )}
        <Grid alignItems={"center"} container spacing={2}>
          {paginatedPhones.map((phone) => (
            <Grid key={phone.id} item="true" xs={12} sm={6} md={4}>
              <Card
                sx={{
                  width: 320,
                  bgcolor: "#ebe8ff",
                  boxShadow: "lg",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "xl",
                  },
                }}
              >
                <Link to={`/cellphones/${phone.id}`}>
                  <AspectRatio ratio="4/3">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      loading="lazy"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </AspectRatio>
                </Link>
                <CardContent>
                  <Typography level="h2" fontSize="xl" fontWeight="bold" mb={1}>
                    {phone.name}
                  </Typography>
                  <Typography level="body2" mb={2}>
                    {phone.brand}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      level="h5"
                      fontWeight="bold"
                      sx={{
                        color: "primary.main",
                        fontSize: "1.5rem",
                      }}
                    >
                      ${phone.price}
                    </Typography>
                    <Chip
                      variant="soft"
                      color="success"
                      size="sm"
                      sx={{ borderRadius: "sm" }}
                    >
                      In Stock
                    </Chip>
                  </Stack>
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link to={`/edit/${phone.id}`}>
                      <Button
                        variant="solid"
                        className="button-navbar"
                        fullWidth
                        sx={{
                          borderRadius: "md",
                          fontWeight: 600,
                        }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Link>
                      <Button
                        onClick={() => handleDeleteProduct(phone.id)}
                        variant="solid"
                        color="danger"
                        fullWidth
                        sx={{
                          borderRadius: "md",
                          fontWeight: 600,
                        }}
                      >
                        Delete
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
          
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            disabled={currentPage === 1}
            className="button-navbar"
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Previous
          </Button>
          <Typography sx={{ mx: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            disabled={currentPage === totalPages}
            className="button-navbar"
            onClick={() => handleChangePage(currentPage + 1)}
          >
            Next
          </Button>
        </Box>
      </Sheet>
    </>
  );
}

export default Home;

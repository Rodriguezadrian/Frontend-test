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
} from "@mui/joy";
import axios from "axios";
import TitleApp from "../components/TitleApp";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { storeInfo } from "../redux/logsSlice";
import { useDispatch, useSelector } from "react-redux";

function Home() {
  const logs = useSelector((state) => state.logs);
  const [cellphones, setCellPhones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [product, setProduct] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);
  const dispatch = useDispatch();

  const items_Per_Page = 3;
  const totalPages = Math.ceil(cellphones.length / items_Per_Page);
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const paginatedPhones = cellphones.slice(
    (currentPage - 1) * items_Per_Page,
    currentPage * items_Per_Page
  );

  const emptyItems =
    Math.ceil(paginatedPhones.length / items_Per_Page) * items_Per_Page;

  useEffect(() => {
    const getCellphones = async () => {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/cellphones`,
        method: "get",
      });
      setCellPhones(response.data);
    };
    getCellphones();
    setProductDeleted(false);
  }, [productDeleted]);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/client/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(product.filter((product) => product.id !== id));
      setProductDeleted(dispatch(storeInfo(response.data.cellphoneDeleted)));
      console.log("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
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
                        color="primary"
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
          {emptyItems > 0 &&
            Array.from({ length: emptyItems }).map((_, index) => (
              <Grid key={`empty-${index}`} item="true" xs={12} sm={6} md={4} />
            ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            Previous
          </Button>
          <Typography sx={{ mx: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            disabled={currentPage === totalPages}
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

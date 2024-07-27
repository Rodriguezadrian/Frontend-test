import React, { useEffect, useState } from "react";
import { Sheet, Typography, List, ListItem, ListItemContent } from "@mui/joy";
import { Link } from "react-router-dom";

function Logs() {
  const [deletedProducts, setDeletedProducts] = useState([]);

  useEffect(() => {
    // Aquí deberías cargar los logs de productos eliminados
    // Por ejemplo, desde una API o desde el estado global
    fetchDeletedProducts();
  }, []);

  const fetchDeletedProducts = async () => {
    // Implementa la lógica para obtener los productos eliminados
    // Por ahora, usaremos datos de ejemplo
    const exampleData = [
      { id: 1, name: "Producto 1", deletedAt: new Date().toISOString() },
      { id: 2, name: "Producto 2", deletedAt: new Date().toISOString() },
    ];
    setDeletedProducts(exampleData);
  };

  return (
    <Sheet
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 2,
        p: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      <Typography level="h4" component="h1" sx={{ mb: 2 }}>
        Registro de Productos Eliminados
      </Typography>
      <List>
        {deletedProducts.map((product) => (
          <ListItem key={product.id}>
            <ListItemContent>
              <Typography level="body1">
                {product.name} - Eliminado el:{" "}
                {new Date(product.deletedAt).toLocaleString()}
              </Typography>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
      <Link to={"/"}>Back</Link>
    </Sheet>
  );
}

export default Logs;

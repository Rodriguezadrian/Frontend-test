import React, { useState } from "react";
import { LinearProgress, Box, Typography } from "@mui/joy";
import axios from "axios";

function DatabaseProgress() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  const handleDatabaseOperation = async (operation) => {
    setIsLoading(true);
    setProgress(0);
    setStatusMessage(
      operation === "delete"
        ? "Borrando base de datos..."
        : "Cargando base de datos..."
    );

    try {
      // Simular progreso
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 200)); // Esperar 200ms entre cada actualización
      }

      if (operation === "delete") {
        await axios.delete(`${import.meta.env.VITE_API_URL}/deleteDatabase`);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/loadDatabase`);
      }

      setStatusMessage(
        operation === "delete"
          ? "Base de datos borrada con éxito"
          : "Base de datos cargada con éxito"
      );
    } catch (error) {
      console.error(`Error en operación de base de datos: ${operation}`, error);
      setStatusMessage(`Error en la operación: ${error.message}`);
    } finally {
      setIsLoading(false);
      setProgress(100);
      // Resetear después de 3 segundos
      setTimeout(() => {
        setProgress(0);
        setStatusMessage("");
      }, 3000);
    }
  };

  return (
    <Box>
      {/* Tus otros componentes */}

      <Button onClick={() => handleDatabaseOperation("delete")}>
        Borrar Base de Datos
      </Button>
      <Button onClick={() => handleDatabaseOperation("load")}>
        Cargar Base de Datos
      </Button>

      {isLoading && (
        <Box sx={{ width: "100%", mt: 2 }}>
          <LinearProgress
            determinate
            value={progress}
            sx={{
              "--LinearProgress-radius": "0px",
              "--LinearProgress-progressThickness": "24px",
              "--LinearProgress-thickness": "24px",
            }}
          />
          <Typography level="body-sm" sx={{ mt: 1 }}>
            {statusMessage}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default DatabaseProgress;

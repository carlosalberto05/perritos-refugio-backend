import express, { Request, Response } from "express";

// Se utiliza 'process.env.PORT' para el despliegue en producción
// y un puerto por defecto (3001) para desarrollo.
const PORT = process.env.PORT || 3001;

//Inicializa la aplicación de Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Ruta de ejemplo
app.get("/", (req: Request, res: Response) => {
  // Respuesta JSON estándar para chequear que el servidor esté vivo
  res.status(200).json({
    status: "ok",
    message: "Backend service is running",
    timeStamp: new Date().toISOString(),
  });
});

// =================================================================
// Arranque del Servidor
// =================================================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
  console.log("Ambiente:", process.env.NODE_ENV || "development");
});

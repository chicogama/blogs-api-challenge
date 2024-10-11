import express from "express";
import { routes } from "./routes";

export const app = express();

app.use(express.json());

app.use(routes);

// Não remova esse endpoint para o avaliador funcionar
app.get("/", (_request, response) => {
    return response.send();
});

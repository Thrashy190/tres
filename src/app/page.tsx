"use client";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { getItems } from "@/db/functions";
import Product from "@/interface/product";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Nombre",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Descripcion",
    width: 150,
    editable: true,
  },
  {
    field: "brand",
    headerName: "Marca",
    width: 150,
    editable: true,
  },
  {
    field: "price",
    headerName: "Precio",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "pizza",
    description: "Producto 1",
    brand: "Marca 1",
    price: 1000,
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    setProducts(await getItems());
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="flex items-center p-12">
      <div className="lg:grid lg:grid-cols-12 flex flex-col-reverse gap-10">
        <div className="lg:col-span-10 grid gap-10">
          <div className="flex flex-col gap-2">
            <div className="w-full flex gap-2">
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                type="number"
              />
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Marca"
                variant="outlined"
              />
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Precio"
                variant="outlined"
                type="number"
              />
            </div>

            <TextField
              id="outlined-basic"
              multiline
              rows={4}
              label="Descripcion"
              variant="outlined"
            />
          </div>
          <h1 className="text-2xl text-white">Productos</h1>
          <div>
            <DataGrid
              rows={products}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </div>
        </div>
        <div className="w-full">
          <Stack spacing={2} direction="column" style={{ height: "100%" }}>
            <Button
              fullWidth
              variant="contained"
              size="medium"
              style={{ width: "100%" }}
            >
              Agregar
            </Button>
            <Button variant="contained" size="medium" style={{ width: "100%" }}>
              Buscar
            </Button>
            <Button variant="contained" size="medium" style={{ width: "100%" }}>
              Eliminar
            </Button>
          </Stack>
        </div>
      </div>
    </main>
  );
}

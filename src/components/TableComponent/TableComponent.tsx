import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

// Definimos el tipo de los datos
interface DataItem {
  folio: number;
  fecha: string;
  cliente: string;
  campaña: string;
  producto: string;
  precio: number;
}

// Simulación de API con datos de ejemplo
const fetchData = async (): Promise<DataItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { folio: 1001, fecha: "2024-02-01", cliente: "Empresa A", campaña: "Promo 1", producto: "Producto X", precio: 199.99 },
        { folio: 1002, fecha: "2024-02-02", cliente: "Empresa B", campaña: "Promo 2", producto: "Producto Y", precio: 299.99 },
        { folio: 1003, fecha: "2024-02-03", cliente: "Empresa C", campaña: "Promo 3", producto: "Producto Z", precio: 399.99 },
      ]);
    }, 1000);
  });
};

const TableComponent: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});

  // Obtener datos de la API simulada
  useEffect(() => {
    fetchData().then((result) => setData(result));
  }, []);

  // Definimos las columnas con tipado correcto
  const columns: ColumnDef<DataItem>[] = useMemo(
    () => [
      {
        accessorKey: "folio",
        header: "Folio",
        cell: (info) => info.getValue<number>(),
      },
      {
        accessorKey: "fecha",
        header: "Fecha",
        cell: (info) => new Date(info.getValue<string>()).toLocaleDateString(),
      },
      {
        accessorKey: "cliente",
        header: "Cliente",
        cell: (info) => info.getValue<string>(),
      },
      {
        accessorKey: "campaña",
        header: "Campaña",
        cell: (info) => info.getValue<string>(),
      },
      {
        accessorKey: "producto",
        header: "Producto",
        cell: (info) => info.getValue<string>(),
      },
      {
        accessorKey: "precio",
        header: "Precio",
        cell: (info) => `$${info.getValue<number>().toFixed(2)}`,
      },
    ],
    []
  );

  // Configuración de la tabla con los modelos de ordenamiento y filtrado
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: Object.entries(filters).map(([id, value]) => ({ id, value })),
    },
    onColumnFiltersChange: (updater) => {
      setFilters((prev) => (typeof updater === "function" ? updater(prev) : updater));
    },
  });

  return (
    <div className="p-4">
      {data.length === 0 ? (
        <p className="text-center p-4">Cargando datos...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-gray-200">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-2 border cursor-pointer"
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                      </div>
                    )}
                    <input
                      type="text"
                      className="w-full mt-1 px-1 text-sm border"
                      placeholder={`Filtrar ${header.column.columnDef.header}`}
                      onChange={(e) => setFilters((prev) => ({ ...prev, [header.column.id]: e.target.value }))}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;

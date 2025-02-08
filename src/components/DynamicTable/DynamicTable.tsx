import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

// 🔹 Función de filtro dinámica
const filterDynamic = (row: any, id: string, filterValue: any) => {
  const rowValue = row.original?.[id];

  if (rowValue === undefined || rowValue === null) return false;

  // Filtrar por STRING
  if (typeof rowValue === "string") {
    return rowValue.toLowerCase().includes(filterValue.toLowerCase());
  }

  // Filtrar por NÚMERO
  if (typeof rowValue === "number") {
    if (typeof filterValue === "number") return rowValue === filterValue;
    if (filterValue?.min !== undefined && filterValue?.max !== undefined) {
      return rowValue >= filterValue.min && rowValue <= filterValue.max;
    }
  }

  // Filtrar por FECHA
  if (rowValue instanceof Date || !isNaN(Date.parse(rowValue))) {
    const dateValue = new Date(rowValue).getTime();
    if (typeof filterValue === "string") {
      return dateValue === new Date(filterValue).getTime();
    }
    if (filterValue?.min && filterValue?.max) {
      return dateValue >= new Date(filterValue.min).getTime() &&
             dateValue <= new Date(filterValue.max).getTime();
    }
  }

  // Filtrar por BOOLEANO
  if (typeof rowValue === "boolean" && typeof filterValue === "boolean") {
    return rowValue === filterValue;
  }

  return false;
};

// 🔹 Definición de columnas
const columns: ColumnDef<any>[] = [
  { header: "Nombre", accessorKey: "name", filterFn: filterDynamic },
  { header: "Edad", accessorKey: "age", filterFn: filterDynamic },
  { header: "Fecha de Nacimiento", accessorKey: "birthdate", filterFn: filterDynamic },
  { header: "Activo", accessorKey: "isActive", filterFn: filterDynamic },
];

// 🔹 Datos de ejemplo
const defaultData = [
  { name: "Juan Pérez", age: 28, birthdate: "1995-06-15", isActive: true },
  { name: "María López", age: 35, birthdate: "1988-03-22", isActive: false },
  { name: "Carlos García", age: 40, birthdate: "1983-09-10", isActive: true },
];

const DynamicTable = () => {
  const [data] = useState(defaultData);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filterValues },
  });

  // 🔹 Manejar cambio en los filtros
  const handleFilterChange = (columnId: string, value: any) => {    
    setFilterValues((prev) => ({ ...prev, [columnId]: value }));
    table.getColumn(columnId)?.setFilterValue(value);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Tabla Dinámica con Filtros</h2>

      {/* 🔹 Controles de Filtro */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por Nombre"
          className="border p-2"
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <input
          type="number"
          placeholder="Filtrar por Edad"
          className="border p-2"
          onChange={(e) => handleFilterChange("age", Number(e.target.value))}
        />
        <input
          type="date"
          className="border p-2"
          onChange={(e) => handleFilterChange("birthdate", e.target.value)}
        />
        <select
          className="border p-2"
          onChange={(e) => handleFilterChange("isActive", e.target.value === "true")}
        >
          <option value="">Activo/Inactivo</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      {/* 🔹 Tabla */}
      <table className="border-collapse w-full border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;

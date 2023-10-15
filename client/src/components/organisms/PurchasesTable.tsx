import { useContext } from "react";
import { SimulationContext } from "../../context/simulatorContext";
import {
  createColumnHelper,
  useReactTable,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Purchase } from "../../types/models";
import Button from "../atoms/Button";

const columnHelper = createColumnHelper<Purchase>();

function PurchasesTable() {
  const { simulationData, isLoading, calculateTotalTrees, deletePurchase } =
    useContext(SimulationContext);

  const data: Purchase[] = simulationData?.purchases || [];

  const columns = [
    columnHelper.accessor("id", {
      id: "row",
      header: () => <span>#</span>,
      cell: (info) => <div>{info.row.index + 1}</div>,
    }),
    columnHelper.accessor("monthYear", {
      header: () => <span>Month & Year</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("numberOfTrees", {
      header: () => <span>Number of Trees</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor((row) => row.id, {
      id: "actions",
      header: () => null,
      cell: (info) => (
        <Button
          label="Delete"
          onClick={() => deletePurchase(info.row.original.id)}
          className="p-2 bg-red-500 text-white rounded"
        />
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const totalTrees = calculateTotalTrees();

  return (
    <div className="p-2">
      {isLoading || !simulationData ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow-md mb-5">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="py-2 px-4 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-200">
            <tr>
              <th colSpan={2}></th>
              <th className="py-2 px-4 text-start">Total: {totalTrees}</th>
              <th colSpan={2}></th>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

export default PurchasesTable;

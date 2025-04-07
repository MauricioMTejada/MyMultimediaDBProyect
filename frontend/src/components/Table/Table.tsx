// src/components/Table/Table.tsx
import React, { useCallback } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { useAppSelector } from "../../hooks";
import useTableData from "../../hooks/useTableData";
import { getTableHeaders } from "../../utils/tableUtils";
import { useLocation } from "react-router-dom";

const Table: React.FC = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const location = useLocation();

    const headers = useCallback(() => getTableHeaders(location.pathname, isLoggedIn), [location.pathname, isLoggedIn]);
    const combinedData = useTableData(location.pathname);
    // console.log("Table.tsx: ", combinedData); // Imprimir los encabezados para depuración

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers()} />
                <TableBody data={combinedData} headers={headers()} />
            </table>
        </div>
    );
};

export default Table;

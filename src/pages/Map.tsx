import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Typography } from "@mui/material";
import { db } from "../config/.firebaseSetup"
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {TableModal} from "../components/TableModal";


export interface tableState {
    available: boolean
    leavingTime: string
    plugs: number
    tableNumber: string
    seats: number
}

export const MapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [tables, setTables] = useState<tableState[]>([] as tableState[])
    const [selectedTable, setSelectedTable] = useState<tableState>({} as tableState)

    useEffect(() => {
        getDocs(collection(db, "tables"))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data() as tableState }));
               setTables(newData);
            })
    }, []);

    return <div>
        {
            tables && tables.map(table => {
                return (
                    <Button onClick={() => {
                        setSelectedTable(table)
                        setIsOpen(true)
                    }}>{table.tableNumber}</Button>
                )
            })
        }
        <TableModal isOpen={isOpen} setIsOpen={setIsOpen} selectedTable={selectedTable}></TableModal>
    </div>
}
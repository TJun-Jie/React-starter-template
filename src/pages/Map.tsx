import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Box, Grid, Typography } from "@mui/material";
import { db } from "../config/.firebaseSetup"
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {TableModal} from "../components/TableModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaPlug} from "react-icons/fa";

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
    //population script
    const func = async () => {

        await addDoc(collection(db, "tables") ,{
            available: true,
            leavingTime: "1400",
            pax: 4,
            plugs: 2,
            seats: 4,
            tableNumber: "30"
        });

    }
    // %4 == 1  // % 
    return <Box sx={{ padding: 2}}>
        <Typography variant="h5" >
            Central Library Level 3
        </Typography>
        <Box display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
    >
        <Box width={500} sx={{ padding: 10}}>
            {
                tables && tables.sort((table1, table2) => parseInt(table1.tableNumber) > parseInt(table2.tableNumber) ? 1 : -1).map(table => {
                    return (
                        <Button
                            onClick={() => {
                            setSelectedTable(table)
                            setIsOpen(true)
                        }}
                            sx={{border: "1px solid black", margin: 1, ml: (parseInt(table.tableNumber) % 2 === 1) ? 1 : 10,  backgroundColor: table.available ? "#A2E4B8" : "#FF7276"}}
                        startIcon={(table.plugs > 0) ? <FaPlug/> : ""}
                        >{table.tableNumber}</Button>       
                    )
                })
            }
        </Box>
        <TableModal isOpen={isOpen} setIsOpen={setIsOpen} selectedTable={selectedTable}></TableModal>
    </Box>
    </Box>
}
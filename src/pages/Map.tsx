import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';

import {Box, Typography, CircularProgress, Alert, Snackbar, LinearProgress} from "@mui/material";
import { db } from "../config/.firebaseSetup"
import { collection, addDoc, getDocs, Timestamp} from "firebase/firestore";
import {TableModal} from "../components/TableModal";
import {FaPlug} from "react-icons/fa";

export interface tableState {
    available: boolean
    leavingTime: string
    plugs: number
    tableNumber: string
    seats: number
    pax: number
    tableId: string
    noiseComplaint: number
    reports: [
        description: string,
        timestamp: Timestamp
    ]
}

export const MapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [tables, setTables] = useState<tableState[]>([] as tableState[])

    const [progress, setProgress] = useState<number>(0);
    const [selectedTable, setSelectedTable] = useState<tableState>({} as tableState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshData, setRefreshData] = useState<boolean>(true);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);

    const getData = () => {

        getDocs(collection(db, "tables"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), tableId : doc.id}));
               let notAvailable = querySnapshot.docs
               .map((doc) => ({...doc.data() as tableState}));
               notAvailable = notAvailable.filter(table => !table.available);
               setProgress((notAvailable.length/newData.length) * 100);
               // @ts-ignore
                setTables(newData);
                setIsLoading(false);
                setRefreshData(false);
            })
    }

    useEffect(() => {
        if (refreshData) {
            getData();
        }
    }, [refreshData]);
    //population script
    const func = async () => {

        await addDoc(collection(db, "tables"), {
            available : true,
            leavingTime : "1400",
            pax : 4,
            plugs : 2,
            seats : 4,
            tableNumber : "30"
        });

    }

    return (
        isLoading ?
            <Box sx={ { marginTop : "30px" } }>
            <CircularProgress/>
            </Box>
            :
        <Box sx={{ pt: 2}}>
        <Typography variant="h5" >
            Central Library Level 3
        </Typography>
        <Box sx={{mt:5, ml:10, mr:10}}>
        <LinearProgress variant="determinate" value= {progress} sx={{height:30}}/>
        </Box>
        <Box display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="80vh"
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
        <TableModal isOpen={ isOpen } setIsOpen={ setIsOpen } selectedTable={ selectedTable } setRefreshData={setRefreshData} setSnackBarOpen={setSnackBarOpen}></TableModal>
                <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
                    <Alert onClose={() => setSnackBarOpen(false)} severity="success" sx={{ width: '100%' }}>
                        Complaint Submitted
                    </Alert>
                </Snackbar>
    </Box>
    </Box>
    )
}
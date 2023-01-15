import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {Box, CircularProgress, Typography} from "@mui/material";
import {db} from "../config/.firebaseSetup"
import {addDoc, collection, getDocs} from "firebase/firestore";
import {TableModal} from "../components/TableModal";


export interface tableState {
    available: boolean
    leavingTime: string
    plugs: number
    tableNumber: string
    seats: number
    pax: number
    tableId: string
    noiseComplaint: number
}

export const MapPage = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [tables, setTables] = useState<tableState[]>([] as tableState[])
    const [selectedTable, setSelectedTable] = useState<tableState>({} as tableState);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [refreshData, setRefreshData] = useState<boolean>(true);

    const getData = () => {

        getDocs(collection(db, "tables"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => (
                        { ...doc.data(), tableId : doc.id }
                    ));
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
            <Box sx={ { padding : 3 } }>
                <Typography variant="h5">
                    Central Library Level 3
                </Typography>
                <Box sx={ { padding : 2 } }>
                    {
                        tables && tables.sort((table1, table2) => parseInt(table1.tableNumber) > parseInt(table2.tableNumber) ? 1 : -1).map(table => {
                            return (
                                <Button
                                    onClick={ () => {
                                        setSelectedTable(table)
                                        setIsOpen(true)
                                    } }
                                    sx={ {
                                        border : "1px solid black",
                                        margin : 1,
                                        backgroundColor : table.available ? "#A2E4B8" : "#FF7276"
                                    } }
                                >{ table.tableNumber }</Button>
                            )
                        })
                    }
                </Box>
                <TableModal isOpen={ isOpen } setIsOpen={ setIsOpen } selectedTable={ selectedTable } setRefreshData={setRefreshData}></TableModal>
            </Box>
    )

}
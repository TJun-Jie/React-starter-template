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
    const [tables, setTables] = useState<tableState>({} as tableState)

    useEffect(() => {
        getDocs(collection(db, "tables"))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data() as tableState }));
                // @ts-ignore
                setTables(newData);
            })
    }, []);
    const navigate = useNavigate();

    return <div>
        <Button onClick={() => setIsOpen(true)}>1A</Button>
        <Button>1B</Button>
        <Button>1C</Button>
        <Button>1D</Button>
        <TableModal isOpen={isOpen} setIsOpen={setIsOpen}></TableModal>
    </div>
}
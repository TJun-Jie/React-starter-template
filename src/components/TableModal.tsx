import {Box, Typography} from "@mui/material";
import React from "react";
import Modal from "@mui/material/Modal";
import {FaPlug} from "react-icons/fa";
import {AiFillClockCircle, AiOutlineBorderlessTable} from "react-icons/ai";
import {MdEventSeat} from "react-icons/md";
import {TbMoodSad, TbMoodSmile} from "react-icons/tb";
import {tableState} from "../pages/Map";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../config/.firebaseSetup";
import Button from "@mui/material/Button";

const style = {
    position : "absolute" as "absolute",
    top : "50%",
    left : "50%",
    transform : "translate(-50%, -50%)",
    bgcolor : "white",
    border : "2px",
    boxShadow : 24,
    p : 4,
    borderRadius : 5,
    padding : 0,
};

interface TableModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTable: tableState;
    setRefreshData: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableModal = ({
                               isOpen,
                               setIsOpen,
                               selectedTable,
                                setRefreshData
                           }: TableModalProps) => {

    const onClickHandler = () => {
        const values = {
            available: selectedTable.available,
            leavingTime: selectedTable.leavingTime,
            plugs: selectedTable.plugs,
            pax: selectedTable.pax,
            seats: selectedTable.seats,
            tableNumber: selectedTable.tableNumber,
            noiseComplaint: selectedTable.noiseComplaint ? selectedTable.noiseComplaint+ 1 : 1
            }
        updateDoc(doc(db, "tables", selectedTable.tableId), values)
            .then(docRef => {
                setRefreshData(true)
            }).catch(err => {
            console.log(err)
        })
    }
    return (
        //got 4 fields
        <Modal
            open={ isOpen }
            onClose={ () => setIsOpen(false) }
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={ style }>
                <Box
                    display="flex"
                    sx={ {
                        alignItems : "center",
                        flexWrap : "wrap",
                        justifyContent : "center",
                        paddingBottom : "20px",
                        paddingTop : "20px",
                        paddingLeft: 10,
                        paddingRight: 10,
                        bgcolor : selectedTable.available ? "#A2E4B8" : "#FF7276",
                        borderTopLeftRadius : "20px",
                        borderTopRightRadius : "20px",

                    } }
                >
                    <AiOutlineBorderlessTable/>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"
                        fontWeight="bold"
                        sx={ { marginLeft : "10px" } }
                    >
                        Table { selectedTable.tableNumber }
                    </Typography>
                </Box>
                <Box
                    sx={ {
                        bgcolor : "#E8E9EB",
                        borderBottomLeftRadius : "20px",
                        borderBottomRightRadius : "20px",
                        paddingTop : "20px",
                        paddingBottom : "20px"

                    } }
                >
                    <Box
                        display="flex"
                        sx={ {
                            alignItems : "center",
                            flexWrap : "wrap",
                            justifyContent : "center",

                        } }
                    >
                        <FaPlug/>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={ { marginLeft : "10px" } }
                        >
                            Plugs : { selectedTable.plugs }
                        </Typography>
                    </Box>
                    <Box
                        display="flex"
                        sx={ {
                            alignItems : "center",
                            flexWrap : "wrap",
                            justifyContent : "center",
                        } }
                    >
                        <MdEventSeat/>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={ { marginLeft : "10px" } }
                        >
                            Seats : { selectedTable.seats }
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        sx={ {
                            alignItems : "center",
                            flexWrap : "wrap",
                            justifyContent : "center",
                        } }
                    >
                        { selectedTable.available ? <TbMoodSmile/> : <TbMoodSad/> }
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={ { marginLeft : "10px" } }
                        >
                            { selectedTable.available ? "Available!" : "Not available" }
                        </Typography>
                    </Box>
                    { !selectedTable.available ? <Box
                        display="flex"
                        sx={ {
                            alignItems : "center",
                            flexWrap : "wrap",
                            justifyContent : "center",
                        } }
                    >
                        <AiFillClockCircle/>

                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={ { marginLeft : "10px" } }
                        >
                            Available at:{ " " }
                            { selectedTable.available ? "-" : selectedTable.leavingTime }
                        </Typography>
                    </Box> : "" }
                    {
                        !selectedTable.available ?   <Box
                            display="flex"
                            sx={ {
                                alignItems : "center",
                                flexWrap : "wrap",
                                justifyContent : "center",
                            } }>
                            <Typography
                                id="modal-modal-title"
                                variant="h6"
                                component="h2"
                                sx={ { marginLeft : "10px" } }
                            >
                                Noise Complaint : { selectedTable.noiseComplaint }
                            </Typography>

                        </Box> : ""
                    }
                    {
                        !selectedTable.available ?   <Box
                            display="flex"
                            sx={ {
                                alignItems : "center",
                                flexWrap : "wrap",
                                justifyContent : "center",
                                marginTop: 1
                            } }>
                            <Button variant="contained" onClick={onClickHandler}>Too Loud!</Button>

                        </Box> : ""
                    }


                </Box>
            </Box>
        </Modal>
    );
};

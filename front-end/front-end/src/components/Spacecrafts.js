import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Backdrop, Box,
    Button,
    Fade, Grid, Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Spacecrafts = () => {
    const {id}=useParams();
    const [spacecrafts,setSpacecrafts]=useState([]);
    const [isEditing,setIsEditing]=useState(false);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [spacecraft,setSpacecraft]=useState({name:'',maxSpeed:'',mass:'',astronautId:id});
    const [count,setCount]=useState(0);


    const handleModalOpen = () => {
        setIsModalOpened(true);

    };

    const handleInputChange = (e) => {
        setSpacecraft({...spacecraft, [e.target.name]:e.target.value});
    }

    const handleModalClose = () => {
        setIsModalOpened(false);
        setIsEditing(false);
    };

    const handleEditItem = (row) => {
        const item=(spacecrafts.find(row2=>row2.id===row.id));
        setSpacecraft({
            id:item.id,
            name:item.name,
            maxSpeed:item.maxSpeed,
            mass:item.mass,
            astronautId: id
        })
        setIsEditing(true);
        handleModalOpen();
    }

    const handleDeleteItem = (row) => {
        const item=(spacecrafts.find(row2=>row2.id===row.id));
        axios.delete(`http://localhost:8080/spacecraft/${item.id}`)
            .then(() => {
                console.log('Deleted item!');
                setCount(count+1);

            })
            .catch((error) => {
                console.log('Error:',error);

            })
    }

    const handleEdit = () => {
        axios.put(`http://localhost:8080/spacecraft/${spacecraft.id}`,spacecraft)
            .then(() =>{
                setCount(count+1);
                console.log('Spacecraft:',spacecraft);
                handleModalClose();
            })
            .catch(error => {
                console.log('Error',error);
            })

    }

    const handleAstronaut = () => {
        axios.post('http://localhost:8080/spacecraft',spacecraft)
            .then(res => {
                setCount(count+1);
                handleModalClose()
            })
            .catch(error => {
                console.log('Error',error);
            })

    }

    const handleAddSpacecraft = () => {
        setSpacecraft({name:'',maxSpeed:'',mass:'',astronautId: id});
        setIsEditing(false)
        handleModalOpen()
    }
    useEffect(() => {
        axios.get(`http://localhost:8080/spacecraft`)
            .then(res => {
                setSpacecrafts(res.data);
            })
    },[count])
    return (
        <>
            <div className={"container"}>
                <h1 className="header">Spacecrafts</h1>
                <Button variant={"contained"} onClick={handleAddSpacecraft}>Add spacecraft</Button>
                {spacecrafts ? <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Spacecraft</TableCell>
                                    <TableCell align="right">Max speed</TableCell>
                                    <TableCell align="right">Mass</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {spacecrafts.filter(row => {return row.astronautId !== id;}).map((row) => {
                                    return(
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.maxSpeed}</TableCell>
                                        <TableCell align="right">{row.mass}</TableCell>
                                        <TableCell align={"right"} >
                                            <Button variant="contained" sx={{mr:1}} onClick={()=> handleEditItem(row)}>Edit</Button>
                                            <Button variant="contained" color="error" sx={{mr:1}} onClick={()=> handleDeleteItem(row)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </> : null}

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={isModalOpened}
                    onClose={handleModalClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={isModalOpened}>
                        <Box sx={style}>
                            <div className="modal-header">Add astronaut</div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        value={spacecraft.name}
                                        onChange={handleInputChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="maxSpeed"
                                        label="maxSpeed"
                                        name="maxSpeed"
                                        value={spacecraft.maxSpeed}
                                        onChange={handleInputChange}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="mass"
                                        label="mass"
                                        name="mass"
                                        value={spacecraft.mass}
                                        onChange={handleInputChange}
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} direction={"row"} justify={"center"} alignItems={"center"}>
                                    {isEditing ? <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleEdit}
                                        >
                                            Edit astronaut
                                        </Button> :
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            onClick={handleAstronaut}
                                        >
                                            Add spacecraft
                                        </Button>}

                                </Grid>


                            </Grid>

                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default Spacecrafts;
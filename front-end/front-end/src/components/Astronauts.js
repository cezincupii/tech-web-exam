import './style.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Backdrop, Box,
    Button,
    Fade, Grid,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {Link} from "react-router-dom";

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

const Astronauts = () => {
    const [astronauts,setAstronauts]=useState([]);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isEditing,setIsEditing]=useState(false);
    const [astronaut,setAstronaut]=useState({name:'',role:''});
    const [count,setCount]=useState(0);


    const handleModalOpen = () => {
        setIsModalOpened(true);
    };

    const handleInputChange = (e) => {
        setAstronaut({...astronaut, [e.target.name]:e.target.value});
    }

    const handleModalClose = () => {
        setIsModalOpened(false);
        setIsEditing(false);
    };

    const handleEditItem = (row) => {
        const item=(astronauts.find(row2=>row2.id===row.id));
        setAstronaut({
            id:item.id,
            name:item.name,
            role:item.role
        })
        setIsEditing(true);
        handleModalOpen();
    }

    const handleDeleteItem = (row) => {
        const item=(astronauts.find(row2=>row2.id===row.id));
        axios.delete(`http://localhost:8080/astronaut/${item.id}`)
            .then(() => {
                console.log('Deleted item!');
                setCount(count+1);

            })
            .catch((error) => {
                console.log('Error:',error);

            })
    }

    const handleEdit = () => {
        axios.put(`http://localhost:8080/astronaut/${astronaut.id}`,astronaut)
            .then(() =>{
                setCount(count+1);

                handleModalClose();
            })
            .catch(error => {
                console.log('Error',error);
            })

    }

    const handleAstronaut = () => {
        axios.post('http://localhost:8080/astronaut',astronaut)
            .then(res => {
                setCount(count+1);
                handleModalClose()
            })
            .catch(error => {
                console.log('Error',error);
            })

    }

    const handleAddAstronaut = () => {
        setAstronaut({name:'',role:''});
        setIsEditing(false)
        handleModalOpen()
    }


    useEffect(() => {
        axios.get('http://localhost:8080/astronaut')
            .then(res => {
                setAstronauts(res.data);
                console.log('Astronauts:',res.data);
            })
    },[count])

    return (
        <div className={"container"}>
        <h1 className="header">Astronauts</h1>
            <Button variant={"contained"} onClick={handleAddAstronaut}>Add astronaut</Button>
            {astronauts ? <>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Astronaut</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {astronauts.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.role}</TableCell>
                                    <TableCell align={"right"} >
                                        <Link to={`/spacecrafts/${row.id}`}>
                                        <Button variant="contained" sx={{mr:1}}>Spacecrafts</Button> </Link>
                                        <Button variant="contained" sx={{mr:1}} onClick={()=> handleEditItem(row)}>Edit</Button>
                                        <Button variant="contained" color="error" sx={{mr:1}} onClick={()=> handleDeleteItem(row)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
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
                                        value={astronaut.name}
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
                                        id="role"
                                        label="Role"
                                        name="role"
                                        value={astronaut.role}
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
                                            Add astronaut
                                        </Button>}

                                </Grid>


                            </Grid>

                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
export default Astronauts;
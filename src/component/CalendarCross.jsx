import React, { useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TextField } from '@mui/material';

const localizer = momentLocalizer(moment);

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


const CalendarCross = () => {
    const [openEvent, setOpenEvent] = React.useState(false);
    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);

    const [openSlot, setOpenSlot] = React.useState(false);
    const handleCloseSlot = () => setOpenSlot(false);

    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [title, setTitle] = useState('');
    const [startDateTime, setStartDateTime] = useState('');
    const [endDateTime, setEndDateTime] = useState('');

    const handleSelect = ({ start = startDateTime, end = endDateTime }) => {
        if (title.length > 0) {
            setEvents([...events, { start, end, title }]);
            setTitle('')
            handleCloseSlot();
        }
    };

    const handleOpenSlot = ({ start, end }) => {
        setOpenSlot(true)
        setStartDateTime(start);
        setEndDateTime(end);
    };

    const handleDeleteEvent = (eventToDelete) => {
        const updatedEvents = events.filter((event) => event !== eventToDelete);
        setEvents(updatedEvents);
        setSelectedEvent(null);
        handleCloseEvent();
    };

    useEffect(() => {
        if (selectedEvent) {
            handleOpenEvent();
        }
    }, [selectedEvent])

    console.log(events);
    return (
        <>
            <div style={{ fontSize: '25px', backgroundColor: 'darkviolet', color: 'white', padding: '10px', fontWeight: '600', marginBottom: '20px' }}>calendar CROSS</div>
            <div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable={true}
                    onSelectSlot={handleOpenSlot}
                    style={{ height: '90vh' }}
                    onSelectEvent={event => { setSelectedEvent(event) }}
                />
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openEvent}
                onClose={handleCloseEvent}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openEvent}>
                    <Box sx={style}>
                        <Typography>From here the added slot can be deleted</Typography>
                        <Button variant='outlined' size='small' onClick={() => handleDeleteEvent(selectedEvent)}>Delete</Button>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openSlot}
                onClose={handleCloseSlot}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openSlot}>
                    <Box sx={style}>
                        <Typography variant='h6'>Add title or task</Typography>
                        <br />
                        <TextField placeholder='Ttile' value={title} variant="standard" onChange={(e) => setTitle(e.target.value)} style={{ width: '100%' }} />
                        <br />
                        <br />
                        <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                            <Button variant='contained' size="small" onClick={handleSelect}>Add</Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default CalendarCross
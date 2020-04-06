import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
/* import DialogContentText from '@material-ui/core/DialogContentText'; */
import DialogTitle from '@material-ui/core/DialogTitle';


export default function AddCar () {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand: '', model: '', color: '', fuel: '', year: '', price: '' 
    })

    const handleClickOpen = () => {
      setOpen(true)
    };

    const handleCancel = () => {
      setCar ({
        brand: '', model: '', color: '', fuel: '', year: '', price: '' 
    })
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    }
  

    return(
        <div>
        <Button 
        variant="outlined" 
        color="primary" 
        onClick={handleClickOpen}>
        New Car
        </Button>

        <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new car</DialogTitle>
        <DialogContent>
{/*            <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
           </DialogContentText> */}
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Brand"
            value={car.brand}
            onChange={(e) => inputChanged (e)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Model"
            value={car.model}
            onChange={(e) => inputChanged (e)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Color"
            value={car.color}
            onChange={(e) => inputChanged (e)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Fuel Type"
            value={car.fuel}
            onChange={(e) => inputChanged (e)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Year"
            value={car.year}
            onChange={(e) => inputChanged (e)}
            fullWidth
        />
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Price (€)"
            value={car.price}
            onChange={(e) => inputChanged (e)}
            fullWidth
        />
        </DialogContent>
  
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

        </div>
    )
}
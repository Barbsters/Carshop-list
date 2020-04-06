import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCar from './AddCar';
import Editcar from './Editcar';

export default function Carlist() {

    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false); // showing only if deleteCarRow is confirmed //default snackbar is hidden
    const [msg, setMsg] = useState('');

    useEffect(() => getCars(),[])

    /* same as:
    useEffect(() => {
        getCars(),
    } ,[])
    */

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err))
    }

    const deleteCar = (link) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
        fetch(link, {
            method: 'DELETE'}) 
        .then(_ => getCars())
        .then(_ => {
            setMsg('Car deleted') 
            setOpen(true)
        })
        .catch(err => console.error(err))
        }     
    }

    const addCar = (car) => {
        console.log(car)
        fetch('https://carstockrest.herokuapp.com/cars', 
        {method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify(car)
        })
        .then(_ => getCars())
        .then(_ => {
            setMsg('New car added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }



    const updateCar = (link, car) => {
        fetch(link,
            {
                method: 'PUT',
                headers: { 'Content-Type':'application/json'},
                body: JSON.stringify(car)
            })
            .then(_ => getCars())
            .then(_ => {
                setMsg('Car information upadated');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns =  [
        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Color',
            accessor: 'color'
        },
        {
            Header: 'Fuel Type',
            accessor: 'fuel'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Price (€)',
            accessor: 'price'
        },
        {
            filterable: false,
            Cell: row => (
                <Editcar updateCar={updateCar} car={row.original} />)
        },
        {
            minWidth: 60,
            sortable: false,
            filterable: false,
            accessor: '_link.self.href',
             
            Cell: row => (
                <Button 
                size="small" 
                color="secondary" 
                onClick={() => deleteCar(row.value)}>Delete</Button>
            )
        }
    ]

    return (
        <div>
            <AddCar addCar={addCar} getCars={getCars} />
            <ReactTable className="-striped -highlight"
            data={cars} 
            columns={columns} 
            filterable={true} 
            defaultPageSize={10}
      /*       SubComponent={row => {
                return (
                  <div>
                    You can put any component you want here, even another React Table! You
                    even have access to the row-level data if you need! Spark-charts,
                    drill-throughs, infographics... the possibilities are endless!
                  </div>
                )
              }} */ //TRY subcomponent looks cool!!
            />
           
            <Snackbar 
            open={open} 
            autoHideDuration={3000}
            onClose={handleClose}
            message={msg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            />
        </div>
    );
}
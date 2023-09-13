const express = require('express');
const app = express();
const path = require('path')
const mongoose = require('mongoose');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')));
const port = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/search",(req,res)=>{
    console.log("search")
    console.log("gaurav")
    res.render("search")
})
app.get("/bus",(req,res)=>{
    res.render("bus")
})

app.listen(port,(req,res)=>{
    console.log("connected succesfully")
})

app.post('/search', async (req, res) => {
    const search = req.body.search;
    const destination = req.body.destination;

    try {
        const results = await BusDetailDB.find({
            $and: [
                { 'busStops.address': search },
                { 'busStops.address': destination }
            ]
        },'-i');

        // Now 'results' contains documents where both 'search' and 'destination' are present in 'busStops'
        console.log(results);

        // Render the results to a view or send them as JSON response
        res.render("bus", { results });
    } catch (err) {
        console.error('Error searching bus details:', err);
        // Handle the error
        res.status(500).send('Error searching bus details');
    }
});











app.get('/map/show/:id',async (req,res)=>{
    let {id} = req.params;
    let obj = await BusDetailDB.findById(id);
    res.render('map',{obj});
})




























// mongodb
mongoose.connect('mongodb://127.0.0.1:27017/buses').
then(()=>{
    console.log('DB CONNECTED');})
.catch((err)=>{
    console.log('error');
})
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 



// bus schema

const busStopSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    coOrdinates: {
        type: {
            longitude: Number,
            latitude: Number
        },
        required: true
    }
});

const BusDetails = new mongoose.Schema({
    BusNo: {
        type: String,
        required: true
    },
    DriverName: {
        type: String,
        required: true
    },
    ConductorName: {
        type: String,
        required: true
    },
    SeatsAvailable: {
        type: Number,
        required: true,
        min: 0,
        max: 40
    },
   
    busStops: [busStopSchema]
});
const BusDetailDB = mongoose.model('BusDetailDB', BusDetails);
/*
// dummy data
const dummyData = [
    {
        BusNo: 'UP850001',
        DriverName: 'Gaurav',
        ConductorName: 'Dev',
        SeatsAvailable: 10,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.9924,
                    latitude: 27.1204
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.7587,
                    latitude: 27.1840
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850002',
        DriverName: 'John',
        ConductorName: 'Alice',
        SeatsAvailable: 8,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.8258,
                    latitude: 27.5188
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.6174,
                    latitude: 27.7256
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850003',
        DriverName: 'Emily',
        ConductorName: 'Michael',
        SeatsAvailable: 12,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.6809,
                    latitude: 27.4706
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.4330,
                    latitude: 27.7556
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850004',
        DriverName: 'David',
        ConductorName: 'Sophia',
        SeatsAvailable: 9,
        busStops: [
            {
                address: 'farah',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.5423,
                    latitude: 27.6285
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.3035,
                    latitude: 27.8906
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850005',
        DriverName: 'Olivia',
        ConductorName: 'William',
        SeatsAvailable: 11,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.4202,
                    latitude: 27.9500
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.2404,
                    latitude: 28.0870
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850006',
        DriverName: 'Liam',
        ConductorName: 'Mia',
        SeatsAvailable: 7,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.3122,
                    latitude: 28.0409
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.1234,
                    latitude: 28.2173
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850007',
        DriverName: 'Noah',
        ConductorName: 'Ava',
        SeatsAvailable: 6,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.2019,
                    latitude: 28.3438
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.0433,
                    latitude: 28.5014
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850008',
        DriverName: 'Emma',
        ConductorName: 'James',
        SeatsAvailable: 8,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 77.0908,
                    latitude: 28.6369
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 77.0038,
                    latitude: 28.7594
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850009',
        DriverName: 'Isabella',
        ConductorName: 'Benjamin',
        SeatsAvailable: 9,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 76.9402,
                    latitude: 28.8824
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 76.8754,
                    latitude: 28.9851
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    },
    {
        BusNo: 'UP850010',
        DriverName: 'Sophia',
        ConductorName: 'Alexander',
        SeatsAvailable: 10,
        busStops: [
            {
                address: 'Agra',
                coOrdinates: {
                    longitude: 77.9606,
                    latitude: 27.1767
                }
            },
            {
                address: 'mathura',
                coOrdinates: {
                    longitude: 76.8255,
                    latitude: 29.0857
                }
            },
            {
                address: 'kosikalan',
                coOrdinates: {
                    longitude: 76.7743,
                    latitude: 29.1852
                }
            },
            {
                address: 'Palwal',
                coOrdinates: {
                    longitude: 77.3602,
                    latitude: 28.1487
                }
            }
        ]
    }
];

// Insert the dummy data into the database
BusDetailDB.insertMany(dummyData)
    .then((result) => {
        console.log('Dummy data added:', result);
    })
    .catch((error) => {
        console.error('Error adding dummy data:', error);
    });

*/
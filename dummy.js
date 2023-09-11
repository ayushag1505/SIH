
// Dummy data for bus stops
const busStopsData = [
  {
    address: 'Bhawgan Talkies',
    coOrdinates: {
      longitude: 27.2104,
      latitude: 78.0051
	  // 27.2104° N, 78.0051
    }
  },
  {
    address: 'ISBT Agra',
    coOrdinates: {
      longitude: 27.209525,
      latitude: 77.978357
    }
  },
	{
		address:'Sikandra Agra',
		coOrdinates:{
			longitude:27.215970,
			latitude:77.949518
		}
	}
];

// Dummy data for bus details
const dummyBusDetails = {
  BusNo: 'UP80XXXXXX',
  DriverName: 'Rupesh Kumar',
  ConductorName: 'Rajendra Kumar',
  ConductorMobile: 8006000412,
  SeatsAvailable: 40,
  busStops: busStopsData
};

// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
const coordlist = [];
var stop_value = 0;

const send_data = async function() {

  json_type = coordlist.map(points => {
    return{
    "timestamp": points[0].toString(),
    "latitude" : points[1].toString(),
    "longitude" : points[2].toString()
    }
    
  });
  // const myJSON = JSON.stringify(json_type);
  // console.log(json_type)
  
  json_type.forEach(tiny => {
   axios.post('http://localhost:8000/analyse', json_type[0])
                .then(res => console.log(res))
  });

  
        }

const start = document.querySelector("#start");
const end = document.querySelector("#end");


const getGPS = function () {
    setInterval(() => {
        if (!stop_value) {
            navigator.geolocation.getCurrentPosition(
                data => {
                    console.log(data);
                    // var d = new Date(0);
                    // d.setUTCSeconds(Math.floor(data.timestamp / 1000));
                    coordlist.push([data.timestamp, data.coords.latitude, data.coords.longitude]);
                    window.localStorage.setItem("coordinates", JSON.stringify(coordlist))
                },
                error => console.log(error),
                {
                    enableHighAccuracy: true
                });
        }
    }, 1000);
};
const stopGPS = function () {
    stop_value = 1;
}
start.addEventListener("click", getGPS);
end.addEventListener("click", stopGPS);

const download = function (data) {

    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob)
    console.log(url);
    const a = document.createElement('a')
    a.setAttribute('href', url)

    a.setAttribute('download', 'download.csv');
    a.click();
    a.innerText = 'CSV';
    // document.body.appendChild(a);
}
const get = async function () {
    var csv_data = coordlist.map(function (d) {
        return d.join();
    }).join('\n');
    download(csv_data);
}

const btn = document.getElementById('action');
btn.addEventListener('click', get);

const send_btn = document.getElementById('send');
send_btn.addEventListener('click', send_data);





/* react app

function App() {

  useEffect(()=>{
    axios.get('http://localhost:8000/api/todo')
    .then(res=>{
      console.log(res.data)
    })
  });
//post
  const send_data = () =>{
    axios.post('http://localhost:8000/api/analyse', {'timestamp': 'india', 'latitude': '34.3', 'longtitude': '34.566'})
    .then(res => console.log(res))
  }

  return (
      <div className='App list-group-item justify-content-center align-items-center mx-auto' style={{"width": "400px", "backgroundColor": "white", "marginTop": "15px"}}>
      <h1 className='card text-white bg-primary mb-2' styleName="max-width:20rem;">Driving Behavior Analysis</h1>
        <button id="start" type="button" className="card btn btn-outline-success btn-lg mb-3" style={{'borderRadius': '50px'}}>Start Tracking</button>
        <button id="end" type="button" className="card btn btn-outline-danger btn-lg mb-3" style={{'borderRadius': '50px'}}>End Tracking</button>
        <button id="action" type='button' className="card mb-3" style={{'borderRadius': '50px'}}>Download csv</button>
      
      </div>

      
  );
}

export default App;
*/
import React, { useState,useEffect }  from 'react';
import "./App.css"

function App() {

  const [date, setDate] = useState();
  const [dataJson, setDataJson] = useState();
  const [loading,setLoading] = useState(false);



  const searchGoogleSheet = async () => {
    setLoading(true);
    var dateFormat=date.substring(8,10)+"/"+date.substring(5,7)+"/"+date.substring(2,4);
    const url =  `https://sheetdb.io/api/v1/55j66u9s8a4l2/search?Booking%20date%20in%20DDMMYY=${dateFormat}`
    //  console.log(dateFormat)
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    setLoading(false);
    if(data.length > 0){
      setDataJson(data);
      
    }else{
      setDataJson();
    }
  };

  
  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary sec">
        <div className="container-fluid justify-content-center fw-bold">
          <a className="navbar-brand" href="#">
            Coimbatore Conference Hall Status
          </a>
        </div>
      </nav>

      <section className="searchDateBox">
        <div className="container">
        <form>
            <div className="row form-group">
                <div className="col-sm-4">
                    <div className="input-group date" id="datepicker">
                        <input onChange={e=>setDate(e.target.value)} type="date" className="form-control"/>
                
                    </div>
                </div>
                <div className="col-sm-4">
                <button
            onClick={searchGoogleSheet}
            disabled={loading}
            type="button"
            className="btn btn-primary"
          >
            Check Status
          </button>
                </div>
            </div>
            
        </form>

          
        </div>
      </section>




      <section className="table">
        {/* <div className="container"> */}
        <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">S.No.</th>
      <th scope="col">Booking Date <br></br>(DD/MM/YY)</th>
      <th scope="col">Time From <br></br> (HHMM)</th>
      <th scope="col">Time To <br></br> (HHMM)</th>
      <th scope="col">Departure Hall <br></br> Status</th>
      <th scope="col">Booked For</th>
      
    </tr>
  </thead>
  {dataJson && <tbody>
  {Object.keys(dataJson).map((id,index)=>{
      return(
        <tr key={id}>
          <th scope="row">{index+1}</th>
          <td>{dataJson[id]["Booking date in DDMMYY"]}</td>
          <td>{dataJson[id]["Time From (HHMM)"]} Hrs</td>
          <td>{dataJson[id]["Time To (HHMM)"]} Hrs</td>
          <td>{dataJson[id]["Departure Hall"]}</td>
          <td>{dataJson[id]["Booked For"]}</td>
          
        </tr>
      )
    })}
  </tbody>}
</table>
        {/* </div> */}
      </section>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import DisplayAllUser from './component/displayAllUser';
import Header from './header';


const url = 'http://localhost:8900/addUser';
const userUrl = 'http://localhost:8900/showUser';


function Home(props) {
    const [userID, setUserID] = useState(null);
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [mobile, setMobile] = useState(null);
    let [nameError, setNameError] = useState();
    let [addressError, setAddressError] = useState();
    let [mobileError, setMobileError] = useState();

    const onNameChange = (e) => {
        setName(e.target.value);
        (e.target.value).length <= 2 ? setNameError("minimum 2 characters") : setNameError("");
    }
    const onMobileChange = (e) => {
        setMobile(e.target.value);
        (e.target.value).length != 10 ? setMobileError("10 no.") : setMobileError("");
    }
    const onAddressChange = (e) => {
        setAddress(e.target.value);
        (e.target.value).length <= 5 ? setAddressError("minimum 5 characters") : setAddressError("");
    }

    const handleSubmit = () => {
        if (nameError || addressError || mobileError) {
            alert("User data cannot be added");
        }
        else if (name && address && mobile) {
            axios.post(url, { name, mobile, address })
                .then((response) => setUserID(response.data._id));
            alert("User data succesfully added");
        }
        else {
            alert("User data cannot be added");
        }
    }

    const handleClick = () => {
        axios.get(userUrl)
            .then((response) => { setUserData(response.data) })
    }
   
   
    return (
        <>
            <Header />
            <br />
            <div className="row">
                <div className="col-sm-4">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input id="name" type="text" className="form-control" placeholder="Enter name" onChange={onNameChange} />
                            {nameError && <span style={{ color: "red" }}>{nameError}</span>}
                        </div>
                        <div className="form-group">
                            <label >Mobile no.:</label>
                            <input id="mobile" type="text" className="form-control" placeholder="Enter mobile no." onChange={onMobileChange} />
                            {mobileError && <span style={{ color: "red" }}>{mobileError}</span>}
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <input id="address" type="text" className="form-control" placeholder="Enter address" onChange={onAddressChange} />
                            {addressError && <span style={{ color: "red" }}>{addressError}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <br />

                <div className="col-sm-8">
                    <button onClick={handleClick}>View All</button>
                    {userData && <DisplayAllUser display = {handleClick} user={userData} />}
                </div>
            </div>
        </>
    )
}
export default Home;
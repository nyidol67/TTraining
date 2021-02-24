import React, {useState } from 'react';
import axios from 'axios';
import DisplayAllUser from './component/displayAllUser';

const url = 'http://localhost:8900/addUser';
const userUrl = 'http://localhost:8900/showUser';

function Home() {
    const [userID, setUserID] = useState(null);
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState(null);
    const [address, setAddress] = useState(null);
    const [mobile, setMobile] = useState(null);
    let [nameError, setNameError] = useState("");
    let [addressError, setAddressError] = useState("");
    let [mobileError, setMobileError] = useState("");

    const onNameChange=(e)=>{
        setName(e.target.value);
        (e.target.value).length <= 2 ? setNameError("minimum 2 characters"):setNameError("");
    }
    const onMobileChange=(e)=>{
        setMobile(e.target.value);
        (e.target.value).length != 10 ? setMobileError("10 no."):setMobileError("");
    }
    const onAddressChange=(e)=>{
        setAddress(e.target.value);
        (e.target.value).length <= 5 ? setAddressError("minimum 5 characters"):setAddressError("");
    }
    const handleSubmit = (event) => {

        if (nameError=="" || addressError=="" || mobileError=="") {
            alert("User data cannot be added");
        }
        else {
            axios.post(url, { name, mobile, address })
                .then((response) => setUserID(response.data._id));
            alert("User data succesfully added");

        }
    }
    function handleClick() {
        axios.get(userUrl)
            .then((response) => { setUserData(response.data) })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Name:
                <input id="name" name="name" type="text" onChange={onNameChange} />
                    {nameError && <span style={{ color: "red" }}>{nameError}</span>}
                </label>
                <label >Mobile:
                <input id="mobile" name="mobile" type="text" onChange={onMobileChange} />
                    {mobileError && <span style={{ color: "red" }}>{mobileError}</span>}
                </label>
                <label >Address:
                <input id="address" name="address" type="text" onChange={onAddressChange} />
                    
                    {addressError && <span style={{ color: "red" }}>{addressError}</span>}
                </label>
                <input type="submit" value="Submit" />
            </form>

            <br />

            <button onClick={handleClick}>View All</button>
            {userData && <DisplayAllUser user={userData} />}
        </>
    )

}
export default Home;
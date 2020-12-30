import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import Popup from "./Popup";
import {
  buildHourOptions,
  buildMinuteOptions,
  getIsoDate,
  pad,
  _baseURL,
} from "./Utils";
import orderBy from "lodash/orderBy";
import useTable from "./useTable";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import SimpleDialog from "./SimpleDialog";

const UsersQueue = () => {
  const headCells = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "username", label: "User name" },
    { id: "email", label: "Email", disableSorting: true },
    { id: "action", label: "Action", disableSorting: true },
  ];

  const useStyles = makeStyles((theme) => ({
    table: {
      marginTop: theme.spacing(3),
      "& thead th": {
        fontWeight: "600",
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
      },
      "& tbody td": {
        fontWeight: "300",
      },
      "& tbody tr:hover": {
        backgroundColor: "#fffbf2",
        cursor: "pointer",
      },
    },
  }));

  const classes = useStyles();
  const [records, setRecords] = useState([
    {
      id: 1,
      firstName: "Tann",
      lastName: "Gounin",
      username: "tgounin0",
      email: "tgounin0@wordpress.com",
      passsword: "yJG2MuL5piY",
    },
    {
      id: 2,
      firstName: "Elana",
      lastName: "Ricioppo",
      username: "ericioppo1",
      email: "ericioppo1@timesonline.co.uk",
      passsword: "S7p9ReUoQe",
    },
    {
      id: 3,
      firstName: "Bentlee",
      lastName: "Decourt",
      username: "bdecourt2",
      email: "bdecourt2@about.me",
      passsword: "MWU9hc",
    },
    {
      id: 4,
      firstName: "Hyacintha",
      lastName: "Choudhury",
      username: "hchoudhury3",
      email: "hchoudhury3@va.gov",
      passsword: "kRtWP1",
    },
    {
      id: 5,
      firstName: "Ari",
      lastName: "Spedroni",
      username: "aspedroni4",
      email: "aspedroni4@sun.com",
      passsword: "o78ibUPPmDlZ",
    },
    {
      id: 6,
      firstName: "Abelard",
      lastName: "Rodriguez",
      username: "arodriguez5",
      email: "arodriguez5@shutterfly.com",
      passsword: "g2jd4AwfpA",
    },
    {
      id: 7,
      firstName: "Ikey",
      lastName: "Latek",
      username: "ilatek6",
      email: "ilatek6@berkeley.edu",
      passsword: "GAsgPpKvJx",
    },
    {
      id: 8,
      firstName: "Justis",
      lastName: "Habbeshaw",
      username: "jhabbeshaw7",
      email: "jhabbeshaw7@simplemachines.org",
      passsword: "GN2aQt3ZPq",
    },
    {
      id: 9,
      firstName: "Maddie",
      lastName: "Bayne",
      username: "mbayne8",
      email: "mbayne8@constantcontact.com",
      passsword: "H1GmQcyG6",
    },
    {
      id: 10,
      firstName: "Gerrie",
      lastName: "Rulton",
      username: "grulton9",
      email: "grulton9@reverbnation.com",
      passsword: "tcwp6oONe",
    },
  ]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(records, headCells, filterFn); 

  const location = useLocation();

  const [users, setUser] = useState([]);
  const [salonUserId, setsalonUserId] = useState(0);
  const [userName, setuserName] = useState(0);

  const [hourValues, sethourValues] = useState(buildHourOptions());
  const [hourSelValue, sethourSelValue] = useState(0);

  const [minuteValues, setminuteValues] = useState(buildMinuteOptions());
  const [minuteSelValue, setminuteSelValue] = useState(0);

  const [isDisplay, setisDisplay] = useState(false);

  const [addEdit, setaddEdit] = useState(1);

  const [salonQueueId, setsalonQueueId] = useState(1);

  const [showPopup, setshowPopup] = useState(false);
  const [salonUserPopupData, setsalonUserPopupData] = useState({
    username: "",
    createdTime: "",
    arriveTime: "",
  });

  /* For dialog */
  const [openPopup, setOpenPopup] = useState(false);
  const [userPopupData, setuserPopupData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    debugger;
    if (location.state) {
      setsalonUserId(+location.state[0]);
      setuserName(location.state[1]);
    }
  }, [location.state]);

  //"${_baseURL}/GetSalonUsers/2020-12-25T00:00:00"
  const loadUsers = async () => {
    try {
      let d = new Date();
      let currentTitme = d.toISOString();
      const result = await axios.get(
        `${_baseURL}/GetSalonUsers/${currentTitme}`
      );
      setUser(result.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserInQueue = () => {
    let user_selected = users.find((x) => x.salonUserId === salonUserId);
    if (user_selected) return true;
    return false;
  };

  const deleteUserFromQueue = async (salonUserId) => {
    try {
      await axios.delete(`${_baseURL}/RemoveUserFromQueue/${salonUserId}`);
      setaddEdit(1); //for add
      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const hourChange = (e) => {
    sethourSelValue(e.target.value);
  };

  const minuteChange = (e) => {
    setminuteSelValue(e.target.value);
  };

  const saveUserToQueue = async () => {
    debugger;

    let hour = pad(hourSelValue);
    let minute = pad(minuteSelValue);
    let dtISO = getIsoDate(hour, minute);

    const salonQueue = {
      //SalonQueueId: 0,
      SalonUserId: salonUserId,
      ArriveTime: dtISO,
    };

    let lnk = `${_baseURL}/AddUserToQueue`;
    if (addEdit === 1) {
      try {
        await axios.post(lnk, salonQueue);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        lnk = `${_baseURL}/UpdateUserInQueue/${salonQueueId}`;

        await axios.put(lnk, salonQueue);
      } catch (error) {
        console.error(error);
      }
    }

    loadUsers();
  };

  const addUser = () => {
    debugger;
    sethourSelValue(0);
    setminuteSelValue(0);

    setaddEdit(1);
    setisDisplay(true);
  };

  const updateUser = (salonUserId) => {
    debugger;

    let user_selected = users.find((x) => x.salonUserId === salonUserId);
    setsalonQueueId(user_selected.salonQueueId);

    let time = user_selected.arriveTime.split(" ")[1];
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];

    sethourSelValue(hour);
    setminuteSelValue(minute);

    setaddEdit(2);
    setisDisplay(true);
  };

  const hide = () => {
    setisDisplay(false);
  };

  const displayPopup = (salonUserId) => {
    debugger;
    setshowPopup(true);
    let user_selected = users.find((x) => x.salonUserId === salonUserId);
    const data = {
      username: user_selected.userName,
      createdTime: user_selected.createdTime,
      arriveTime: user_selected.arriveTime,
    };

    setsalonUserPopupData(data);
  };

  const displayDialog = (id) => 
  {
     setOpenPopup(true);
     let user_selected = records.find(x=> x.id === id);
     const data = {
      firstName: user_selected.firstName,
      lastName: user_selected.lastName,
    };
    setuserPopupData(data);
  }  

  const togglePopup = () => {
    setshowPopup(!showPopup);
  };

  const demoEdit = () => {
    alert("demoEdit");
  };

  const populateTable = (user, index) => (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td onClick={() => displayPopup(user.salonUserId)}>{user.salonUserId}</td>
      <td onClick={() => displayPopup(user.salonUserId)}>{user.userName}</td>
      <td onClick={() => displayPopup(user.salonUserId)}>
        {user.userFirstName}
      </td>
      <td onClick={() => displayPopup(user.salonUserId)}>{user.createdTime}</td>
      <td onClick={() => displayPopup(user.salonUserId)}>{user.arriveTime}</td>
      <td>
        {user.salonUserId === salonUserId ? (
          <Link
            to="#"
            className="btn btn-primary mr-2"
            onClick={() => updateUser(user.salonUserId)}
          >
            Edit
          </Link>
        ) : (
          ""
        )}
      </td>
      <td>
        {user.salonUserId === salonUserId ? (
          <Link
            to="#"
            className="btn btn-primary mr-2"
            onClick={() => deleteUserFromQueue(user.salonUserId)}
          >
            Delete
          </Link>
        ) : (
          ""
        )}
      </td>
    </tr>
  );

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h1 className="text-center mb-4">Hello, {userName} </h1>
        <h2 className="text-center mb-4">Users in Queue</h2>

        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell onClick={() => displayDialog(item.id)}>{item.firstName}</TableCell>
                <TableCell onClick={() => displayDialog(item.id)}>{item.lastName}</TableCell>
                <TableCell onClick={() => displayDialog(item.id)}>{item.username}</TableCell>
                <TableCell onClick={() => displayDialog(item.id)}>{item.email}</TableCell>
                <TableCell>
                  <Link
                    to="#"
                    className="btn btn-primary mr-2"
                    onClick={() => demoEdit()}
                  >
                    Edit
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />

        <table className="table border shadow w-auto">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">User Name</th>
              <th scope="col">First Name</th>
              <th scope="col">Created Time</th>
              <th scope="col">Arrived Time</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return populateTable(user, index);
            })}
          </tbody>
        </table>

        {!checkUserInQueue() ? (
          <Link
            to="#"
            className="btn btn-primary mr-2"
            onClick={() => addUser()}
          >
            Add
          </Link>
        ) : (
          ""
        )}

        {isDisplay && (
          <React.Fragment>
            <div className="mt-4">
              <label className="mr-2">Hours</label>

              <select
                className="mr-2"
                value={hourSelValue}
                onChange={hourChange}
              >
                {hourValues.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <label className="mr-2">Minutes</label>
              <select
                className="mr-2"
                value={minuteSelValue}
                onChange={minuteChange}
              >
                {minuteValues.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <Link
                to="#"
                className="btn btn-primary mr-2"
                onClick={() => saveUserToQueue()}
              >
                Save
              </Link>

              <Link
                to="#"
                className="btn btn-primary mr-2"
                onClick={() => hide()}
              >
                Hide
              </Link>
            </div>
          </React.Fragment>
        )}

        <SimpleDialog
          title="Salon Details"
          openPopup={openPopup}          
          userPopupData= {userPopupData}
          setOpenPopup={setOpenPopup}
        ></SimpleDialog>

        {showPopup ? (
          <Popup
            salonUserPopupData={salonUserPopupData}
            closePopup={togglePopup}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default UsersQueue;

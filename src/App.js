import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Components/Asserts/css/font-awesome.min.css";
import UserCard from "./Components/Card/userCard";
import axios from "axios";
import Pagination from "./Components/Pagination/Pagination";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import NavBar from "./Components/NavBar/Navbar";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  let [gender, setGender] = useState("");
  const [usernameStart, setUserNameStart] = useState("");

  let url =
    "https://randomuser.me/api/?format=pretty&page=0&results=6&inc=name,location,email,login,dob,phone,picture,nat,gender";

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  }
  const makeUrl = (count = 6) => {
    if (gender !== "")
      url = `https://randomuser.me/api/?format=pretty&page=${page}&results=${count}&inc=name,location,email,login,dob,phone,picture,nat,gender&gender=${gender}`;
    else
      url = `https://randomuser.me/api/?format=pretty&page=${page}&results=${count}&inc=name,location,email,login,dob,phone,picture,login,nat,gender`;
    return url;
  };

  const updateGender = (g) => {
    setGender(g);
    url =
      `https://randomuser.me/api/?format=pretty&page=${page}&results=6&inc=name,location,email,login,dob,phone,picture,nat,gender` +
      (g !== "" ? `&gender=${g}` : "");
    setPage(1);
    makeUrl();
    sessionStorage.clear();
    // getUsers();
  };

  function range(start, stop, array) {
    var a = [array[start++]];
    while (start < stop) {
      a.push(array[start++]);
    }
    return a;
  }

  const searchUser = async (usernameStart) => {
    setUserNameStart(usernameStart);
    if (usernameStart === "") {
      getUsers();
    }
    try {
      const response = await axios.get(makeUrl(5000));
      let tempData = response.data.results.filter((item) =>
        `${item.name.first} ${item.name.last}`
          .toLowerCase()
          .startsWith(usernameStart)
      );
      let len = tempData.length;
      for (let i = 0; i <= len; i += 6) {
        let key = `${i / 6}`;
        let tempPageData = range(key, key + 6 < len ? key + 6 : len, tempData);
        sessionStorage.setItem(`${page}`, JSON.stringify(tempPageData));
        setPage(page + 1);
      }
      setData(JSON.parse(sessionStorage.getItem(page)));
      setPage(1);
      return;
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getUsers = async () => {
    if (usernameStart !== "") {
      searchUser(usernameStart);
    }
    let key = `${page}`;
    try {
      if (!sessionStorage.getItem(key)) {
        const response = await axios.get(makeUrl());
        sessionStorage.setItem(
          key,
          JSON.stringify([...(await response).data.results])
        );
        setData((await response).data.results);
        return;
      }
      setData(JSON.parse(sessionStorage.getItem(key)));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    sessionStorage.clear();
    getUsers();
  }, []);

  return (
    <>
      <NavBar
        usernameStart={usernameStart}
        searchUser={searchUser}
        setGender={setGender}
        updateGender={updateGender}
        setUserNameStart={setUserNameStart}
      />

      {data ? (
        <div className="container">
          {loading && (
            <span className="float align-middle">
              <div
                className="position-absolute top-50 start-50 translate-middle spinner-border"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </span>
          )}
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="item">
              {(provided) => (
                <ul
                  className="item row text-center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {data.map((item, index) => (
                    <Draggable
                      key={item.login.uuid}
                      draggableId={item.login.uuid}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          id={String(item.login.uuid)}
                          className="col-md-4 col-lg-4 col-sm-6"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <UserCard user={item} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <nav aria-label="Page navigation example">
            <Pagination page={page} setPage={setPage} getUsers={getUsers} />
          </nav>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

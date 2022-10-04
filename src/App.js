import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "./Components/Asserts/css/font-awesome.min.css";
import UserCard from "./Components/Card/userCard";
import axios from "axios";
import Pagination from "./Components/Pagination/Pagination";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setData(items);
  }
  const url = `https://randomuser.me/api/?format=pretty&page=${page}&results=6&inc=gender,name,location,email,dob,phone,picture,login`;

  const getUsers = async () => {
    let key = `${page}`;
    try {
      if (!sessionStorage.getItem(key)) {
        const response = await axios.get(url);
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
    getUsers();
  }, []);
  return (
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
  );
}

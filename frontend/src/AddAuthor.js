import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilSquare } from '@fortawesome/free-solid-svg-icons'


const AddAuthor = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [authorId, setAuthorId] = useState(null);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    refreshAuthors();
  }, []);

  const refreshAuthors = () => {
    API.get("/author/")
      .then((res) => {
        setAuthors(res.data);
        // setName(res[0].name)
        // setSurname(res[0].Surname)
        // setMovieId(res[0].id)
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(localStorage.getItem('token')) var auth = 'Token '+localStorage.getItem('token');
    else var auth = "";
    let item = { name, surname };
    API.post("/author/", item, {headers: {Authorization: auth}}).then(() => refreshAuthors()).catch(function(error) {
        if(error.response.data.detail) alert(error.response.data.detail);
        else alert("Заполните все поля");
    });
  };

  const onUpdate = (id) => {
    if(localStorage.getItem('token')) var auth = 'Token '+localStorage.getItem('token');
    else var auth = "";
    let item = { name, surname };
    API.patch(`/author/${id}/`, item, {headers: {Authorization: auth}}).then((res) => refreshAuthors()).catch(function(error) {
        if(error.response.data.detail) alert(error.response.data.detail);
        else alert("Заполните все поля");
    });
  };

  const onDelete = (id) => {
    if(localStorage.getItem('token')) var auth = 'Token '+localStorage.getItem('token');
    else var auth = "";
    API.delete(`/author/${id}/`, {headers: {Authorization: auth}}).then((res) => refreshAuthors()).catch(function(error) {
        alert(error.response.data.detail);
    });
  };

  function selectAuthor(id) {
    let item = authors.filter((author) => author.id === id)[0];
    setName(item.name);
    setSurname(item.surname);
    setAuthorId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Автор</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{authorId} Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите Фамилию"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>


            <div className="float-right">
              <Button
                variant="primary"
                type="submit"
                onClick={onSubmit}
                className="mx-2"
              >
                Добавить
              </Button>
              <Button
                variant="primary"
                type="button"
                onClick={() => onUpdate(authorId)}
                className="mx-2"
              >
                Изменить
              </Button>
            </div>
          </Form>
        </div>
        <div className="col-md-8 m">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Имя</th>
                <th scope="col">Фамилия</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author, index) => {
                return (
                  <tr key="">
                    <th scope="row">{author.id}</th>
                    <td>{author.name}</td>
                    <td>{author.surname}</td>
                    <td>
                      <FontAwesomeIcon icon={faPencilSquare}  onClick={() => selectAuthor(author.id)} />
                      <FontAwesomeIcon icon={faTrash}  onClick={() => onDelete(author.id)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;


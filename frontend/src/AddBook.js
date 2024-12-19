import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilSquare } from '@fortawesome/free-solid-svg-icons'


const AddBook = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [authorId, setAuthorId] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    refreshBooks();
  }, []);

  const refreshBooks = () => {
    API.get("/author/")
      .then((res) => {
        setAuthors(res.data);
      })
      .catch(console.error);

    API.get("/book/")
      .then((res) => {
        setBooks(res.data);
      })
      .catch(console.error);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(!authorId) {
      alert('Выберите автора');
      return;
    }
    if(localStorage.getItem('token')) var auth = 'Token '+localStorage.getItem('token');
    else var auth = "";
    let item = { title, year, author: authorId };
    API.post("/book/", item, {headers: {Authorization: auth}}).then(() => refreshBooks()).catch(function(error) {
        if(error.response.data.detail) alert(error.response.data.detail);
        else alert("Заполните все поля");
    });
  };

  const onUpdate = (id) => {
    if(!authorId) { alert('Выберите автора'); return; }
    if(localStorage.getItem('token')) var auth = 'Token '+localStorage.getItem('token');
    else var auth = "";
    let item = { title, year, author: authorId };
    API.patch(`/book/${id}/`, item, {headers: {Authorization: auth}}).then((res) => refreshBooks()).catch(function(error) {
        if(error.response.data.detail) alert(error.response.data.detail);
        else alert("Заполните все поля");
    });
  };

  const onDelete = (id) => {
    if(localStorage.getItem('token')) var auth = 'Token '+localStorage.getItem('token');
    else var auth = "";
    API.delete(`/book/${id}/`, {headers: {Authorization: auth}}).then((res) => refreshBooks()).catch(function(error) {
        alert(error.response.data.detail);
    });
  };

  function selectBook(id) {
    let item = books.filter((book) => book.id === id)[0];
    setTitle(item.title);
    setYear(item.year);
    setAuthorId(item.author);
    setBookId(item.id);
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <h3 className="float-left">Книга</h3>
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>{bookId} Название</Form.Label>
              <Form.Control
                type="text"
                required="required" 
                placeholder="Введите Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Год издания</Form.Label>
              <Form.Control
                required="required"
                type="text"
                placeholder="Введите Год издания"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
            
           <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Автор</Form.Label>
              <div><select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
              <option value="">---Выбор Автора---</option>
              {authors.map((author, index) => {
                return (
                  <option value={author.id}>{author.name} {author.surname}</option>
                );
              })}
              </select></div>
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
                onClick={() => onUpdate(bookId)}
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
                <th scope="col">Название</th>
                <th scope="col">Год Издания</th>
                <th scope="col">Автор</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                return (
                  <tr key="">
                    <th scope="row">{book.id}</th>
                    <td>{book.title}</td>
                    <td>{book.year}</td>
                    <td>{book.author_name} {book.author_surname}</td>
                    <td>
                      <FontAwesomeIcon icon={faPencilSquare}  onClick={() => selectBook(book.id)} />
                      <FontAwesomeIcon icon={faTrash}  onClick={() => onDelete(book.id)} />
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

export default AddBook;


import { useState, useEffect } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import API from "./API";



const Login = ({ onAdd }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = () => {
    setToken(localStorage.getItem('token'));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let item = { username: name, password: surname };
    API.post("/token/", item)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        refreshToken();
      })
      .catch(function(error) {
        alert('Ошибка авторизации');
      });
  };

  const onLogout = () => {
    localStorage.setItem('token', '');
    refreshToken();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="float-left">Авторизация</h3>
          
          {localStorage.getItem('token') ? (
              <Button
                variant="primary"
                type="button"
                onClick={() => onLogout()}
                className="mx-2"
              >
                Выход
              </Button>       
           ):(
          <Form onSubmit={onSubmit} className="mt-4">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Логин</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите Логин"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Параль</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите Пароль"
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
                Вход
              </Button>
            </div>
          </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;


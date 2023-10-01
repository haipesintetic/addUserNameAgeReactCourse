import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from '../Helpers/Wrapper';
function AddUser(props) {
  const [enteredUsename, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();
  function addUserHandler(event) {
    event.preventDefault();
    if (enteredUsename.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age(non-empty values)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a age(>0)",
      });
      return;
    }

    props.onAddUser(enteredUsename, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  }
  function usernameChangeHandler(event) {
    setEnteredUsername(event.target.value);
  }
  function ageChangeHandler(event) {
    setEnteredAge(event.target.value);
  }
  function errorHandler() {
    setError(null);
  }
  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username </label>
          <input
            id="username"
            type="text"
            value={enteredUsename}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age(Years) </label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}
export default AddUser;

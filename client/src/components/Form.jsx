import React from "react";
import { useState, useEffect } from "react";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

import css from "../styles/Form.module.css";


export default function Form() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    lifeExpectancyMin: "",
    lifeExpectancyMax: "",
    img: "",
    temperament: "",
  });
  const [error, setError] = useState({
    name: "",
    height: "",
    weight: "",
    lifeExpectancy: "",
    temperament: "",
    submit: "",
  });
  const [correct, setCorrect] = useState({
    disable: true,
  });

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleSelect(e) {
    let theTemperaments;
    if (input.temperament !== "") {
      theTemperaments = input.temperament + ", " + e.target.value;
    } else {
      theTemperaments = e.target.value;
    }
    setInput({
      ...input,
      temperament: theTemperaments,
    });
    setError(
      validate({
        ...input,
        temperament: theTemperaments,
      })
    );
    // console.log(input.temperament);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    setCorrect({ disable: false });
    if (error.submit !== "we ok to submit") {
      return;
    }
    let dog = {
      name: input.name,
      height: `${input.heightMin} - ${input.heightMax}`,
      weight: `${input.weightMin} - ${input.weightMax}`,
      lifeExpectancy: `${input.lifeExpectancyMin} - ${input.lifeExpectancyMax} years`,
      img: input.img,
      temperament: input.temperament,
    };
    dispatch(postDog(dog));
    console.log(dog);
    alert("dogs created!");
    setInput({
      name: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      lifeExpectancyMin: "",
      lifeExpectancyMax: "",
      img: "",
      temperament: "",
    });
    navigate('/home')
  };
  let handleDeleteTemp = () => {
    setInput({
      ...input,
      temperament: "",
    });
    setError(
      validate({
        ...input,
        temperament: "",
      })
    );
  };

  let validate = (input) => {
    let error = {};
    let nameVal = /^[a-zA-Z\s]*$/;
    if (!input.name || input.name.length > 40 || nameVal.test(input.name) === false) {
      error.name = "A Name is required, (max 40 char)";
    } else {
      error.name = "good";
    }
    if (
      !input.heightMin ||
      !input.heightMax ||
      input.heightMin < 0 ||
      input.heightMin > 100 ||
      input.heightMax < 0 ||
      input.heightMax > 100 ||
      input.heightMin >= input.heightMax
    ) {
      error.height = "heightMin y heigthMax";
    } else {
      error.height = "good";
    }
    if (
      !input.weightMin ||
      !input.weightMax ||
      input.weightMin < 0 ||
      input.weightMin > 100 ||
      input.weightMax < 0 ||
      input.weightMax > 100 ||
      input.weightMin >= input.weightMax
    ) {
      error.weight = "weightMin y weightMax";
    } else {
      error.weight = "good";
    }
    if (
      !input.lifeExpectancyMin ||
      !input.lifeExpectancyMax ||
      input.lifeExpectancyMin < 0 ||
      input.lifeExpectancyMin > 100 ||
      input.lifeExpectancyMax < 0 ||
      input.lifeExpectancyMax > 100 ||
      input.lifeExpectancyMin >= input.lifeExpectancyMax
    ) {
      error.lifeExpectancy = "lifeExpectancyMin y lifeExpectancyMax";
    } else {
      error.lifeExpectancy = "good";
    }
    if (!input.img) {
      error.img = "An Image is required";
    } else {
      error.img = "good";
    }
    if (!input.temperament.length) {
      error.temperament = "A temperament must be chosen";
    } else {
      error.temperament = "good";
    }
    if (
      error.name === "good" &&
      error.height === "good" &&
      error.weight === "good" &&
      error.lifeExpectancy === "good" &&
      error.temperament === "good"
    ) {
      error.submit = "we ok to submit";
    }
    // console.log(error);
    return error;
  };

  return (
    <div className={css.back}>
      <Nav />
      
      <div className={css.container}>
        <div className={css.org}>
          
      <div>
        <h1>Create Your Own Dog!</h1>
      </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={css.formCont}>
              <div className={css.divisorL}>
                <div className={css.input}>
                  <label className={css.title}>Name:</label>
                  <input
                    placeholder="Perreque de Barrio..."
                    className={css.inputName}
                    type={"text"}
                    name={"name"}
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <br />
                  {correct.disable === false ? (
                    <p
                      className={css.bullet}
                      style={
                        error.name === "good"
                          ? { backgroundColor: "rgb(147, 255, 147)" }
                          : { backgroundColor: "rgb(255, 117, 117)" }
                      }
                    >
                      A Name is required, (max 40 char, Only Letters)
                    </p>
                  ) : (
                    <br />
                  )}

                </div>

                <div className={css.temperaments}>
                  <h4>Select temperaments Below</h4>
                  <select
                    className={css.select}
                    onChange={(e) => handleSelect(e)}
                  >
                    <option value="All">Select Temperament!</option>
                    {temperaments?.map((e) => {
                      return (
                        <option key={e.id} value={e.name} name={e.name}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                  {correct.disable === false ? (
                    <p
                      className={css.bullet}
                      style={
                        error.temperament === "good"
                          ? { backgroundColor: "rgb(147, 255, 147)" }
                          : { backgroundColor: "rgb(255, 117, 117)" }
                      }
                    >
                      A temperament must be chosen
                    </p>
                  ) : (
                    <br />
                  )}

                  {input.temperament ? <h4 className={css.minmax}>Temperaments Chosen</h4> : <p></p>}
                  {input.temperament && (
                    <div>
                      <div>
                        {input.temperament && (
                          <p className={css.minmax}>Your dog is : {input.temperament}</p>
                        )}
                        <button
                          className={css.reset}
                          onClick={() => handleDeleteTemp()}
                        >
                          Reset Temperaments
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={css.divisor}>
                <div className={css.inputR}>
                  <label className={css.title}>Height :</label>
                  <div>
                  <label className={css.minmax}>Min </label>
                    <input
                      className={css.inputNumbers}
                      placeholder="01"
                      type={"number"}
                      name={"heightMin"}
                      value={input.heightMin}
                      onChange={(e) => handleChange(e)}
                    />
                    <label> - </label>
                    <input
                      className={css.inputNumbers}
                      placeholder="99"
                      type={"number"}
                      name={"heightMax"}
                      value={input.heightMax}
                      onChange={(e) => handleChange(e)}
                    />
                    <label className={css.minmax}> Max</label>
                  </div>
                  

                  {correct.disable === false ? (
                    <p
                      className={css.bullet}
                      style={
                        error.height === "good"
                          ? { backgroundColor: "rgb(147, 255, 147)" }
                          : { backgroundColor: "rgb(255, 117, 117)" }
                      }
                    >
                      You must set your dog's height!{" "}
                    </p>
                  ) : (
                    <br />
                  )}

                </div>

                <div className={css.inputR}>
                  <label className={css.title}>Weight :</label>
                  <div>
                    <label className={css.minmax}>Min </label>
                    <input
                      className={css.inputNumbers}
                      placeholder="01"
                      type={"number"}
                      name={"weightMin"}
                      value={input.weightMin}
                      onChange={(e) => handleChange(e)}
                    />
                    <label> - </label>
                    <input
                      className={css.inputNumbers}
                      placeholder="99"
                      type={"number"}
                      name={"weightMax"}
                      value={input.weightMax}
                      onChange={(e) => handleChange(e)}
                    />
                    <label className={css.minmax}> Max</label>

                  </div>
                  {correct.disable === false ? (
                    <p
                      className={css.bullet}
                      style={
                        error.weight === "good"
                          ? { backgroundColor: "rgb(147, 255, 147)" }
                          : { backgroundColor: "rgb(255, 117, 117)" }
                      }
                    >
                      You must set your dog's weight!{" "}
                    </p>
                  ) : (
                    <br />
                  )}

                </div>

                <div className={css.inputR}>
                  <label className={css.title}>Life Expectancy :</label>
                  <div>
                  <label className={css.minmax}>Min </label>
                    <input
                      className={css.inputNumbers}
                      placeholder="01"
                      type={"number"}
                      name={"lifeExpectancyMin"}
                      value={input.lifeExpectancyMin}
                      onChange={(e) => handleChange(e)}
                    />
                    <label> - </label>
                    <input
                      className={css.inputNumbers}
                      placeholder="99"
                      type={"number"}
                      name={"lifeExpectancyMax"}
                      value={input.lifeExpectancyMax}
                      onChange={(e) => handleChange(e)}
                    />
                    <label className={css.minmax}> Max</label>
                  </div>
                  {correct.disable === false ? (
                    <p
                      className={css.bullet}
                      style={
                        error.lifeExpectancy === "good"
                          ? { backgroundColor: "rgb(147, 255, 147)" }
                          : { backgroundColor: "rgb(255, 117, 117)" }
                      }
                    >
                      You must set your dog's Life Expectancy!{" "}
                    </p>
                  ) : (
                    <br />
                  )}
                </div>
                <div className={css.inputR}>
                  <label className={css.title}>Image:</label>
                  <div>
                    <input
                      placeholder="Your Image Link!"
                      className={css.inputName}
                      type={"text"}
                      name={"img"}
                      value={input.img}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  {/* {error.img && <p className="validate-form">{error.img}</p>} */}
                  {correct.disable === false ? (
                    <p
                      className={css.bullet}
                      style={
                        error.img === "good"
                          ? { backgroundColor: "rgb(147, 255, 147)" }
                          : { backgroundColor: "rgb(255, 117, 117)" }
                      }
                    >
                      An Image is required!
                    </p>
                  ) : (
                    <br />
                  )}
                </div>
              </div>
            </div>
            <br />

            <input
              className={css.btn}
              type={"submit"}
              value={"CREATE"}
              style={
                error.submit === "we ok to submit"
                  ? { color: "rgb(0, 0, 0)" }
                  : { color: "rgb(68, 64, 64)" }
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
}

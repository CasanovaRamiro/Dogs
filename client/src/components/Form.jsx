import React from "react";
import { useState, useEffect } from "react";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";

export default function Form() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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
  const [error, setError] = useState({});

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
    console.log(input.temperament);
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!error.submit) {
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
  };
  let handleDeleteTemp = () => {
    setInput({
      ...input,
      temperament: "",
    });
    setError(
      validate({
        ...input,
        temperament: '',
      })
    );
  };

  let validate = (input) => {
    let error = {};
    if (!input.name || input.name.length > 40) {
      error.name = "A Name is required, (max 40 char)";
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
    }
     if (
      !input.lifeExpectancyMin ||
      !input.lifeExpectancyMax ||
      input.lifeExpectancyMin < 0 ||
      input.lifeExpectancyMin > 100 ||
      input.lifeExpectancyMax < 0 ||
      input.lifeExpectancyMax > 100 ||
      input.lifeExpectancyMin >= input.weightMax
    ) {
      error.lifeExpectancy = "lifeExpectancyMin y lifeExpectancyMax";
    } 
     if (!input.img) {
      error.img = "An Image is required";
    } 
     if (!input.temperament.length) {
      error.temperament = "A temperament must be chosen";
    } 
    if (!error.name && !error.height && !error.weight && !error.lifeExpectancy && !error.temperament ){
      error.submit = "we ok to submit";
    }
    console.log(error);
    return error;
  };

  return (
    <div>
      <Nav />

      <div>
        <h1>Create Recipe</h1>
      </div>
      <div>
        <br />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name:</label>
            <input
              type={"text"}
              name={"name"}
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* {error.name && <p>{error.name}</p>} */}
          <div>
            <label>height:</label>
            <input
              type={"number"}
              name={"heightMin"}
              value={input.heightMin}
              onChange={(e) => handleChange(e)}
            />
            <input
              type={"number"}
              name={"heightMax"}
              value={input.heightMax}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* {error.dishRes && <p className="validate-form">{error.dishRes}</p>} */}

          <div className="form-input">
            <label className="l">weight:</label>
            <input
              type={"number"}
              name={"weightMin"}
              value={input.weightMin}
              onChange={(e) => handleChange(e)}
            />
            <input
              type={"number"}
              name={"weightMax"}
              value={input.weightMax}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* {error.dishScore && (
             <p className="validate-form">{error.dishScore}</p>
          )} */}

          <div className="form-input">
            <label className="l">lifeExpectancy :</label>
            <input
              type={"number"}
              name={"lifeExpectancyMin"}
              value={input.lifeExpectancyMin}
              onChange={(e) => handleChange(e)}
            />
            <input
              type={"number"}
              name={"lifeExpectancyMax"}
              value={input.lifeExpectancyMax}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* {error.healthyScore && (
            <p className="validate-form">{error.healthyScore}</p>
          )} */}

          <div>
            <label>Image:</label>
            <input
              type={"text"}
              name={"img"}
              value={input.img}
              onChange={(e) => handleChange(e)}
            />
          </div>
          {/* {error.img && <p className="validate-form">{error.img}</p>} */}

          <div>
            <h4>Select temperaments Below</h4>
          </div>
          <select onChange={(e) => handleSelect(e)}>
            <option value="All">Select Temperament!</option>
            {temperaments?.map((e) => {
              return (
                <option key={e.id} value={e.name} name={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          {/* {error.diets && <p className="validate-form">{error.diets}</p>} */}
          {input.temperament ? (
            <div>
              <h4>Diets Chosen</h4>
            </div>
          ) : (
            <p></p>
          )}
          {input.temperament && (
            <div>
              <div>
                <button onClick={() => handleDeleteTemp()}>
                  Reset Temperaments
                </button>
                {input.temperament && (
                  <div>
                    <p>Your dog is: {input.temperament}</p>
                  </div>
                )}
                {/* {input.temperament?.split(' ', ',').map((e) => (
                  <div key={e}>
                    <p>{e}</p>
                    {/* <button onClick={() => handleDeleteDiet(e)}>X</button> */}
                {/* </div> */}
                {/* ))} */}
              </div>
            </div>
          )}

          <br />

          <input
            className="button medium regular orange"
            type={"submit"}
            value={"CREATE"}
          />
        </form>
      </div>
    </div>
  );
}

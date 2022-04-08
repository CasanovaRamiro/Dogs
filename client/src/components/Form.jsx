import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getTemperaments, postDog } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";

export default function Form() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

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
  // const [error, setError] = useState({});

  let handleChange = (e) => {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // setError(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
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
    console.log(input.temperament);
  }

  
  let handleSubmit = (e) => {
    e.preventDefault();
    // if (!error.submit) {
    //   return;
    // }
    let dog = {
      name: input.name,
      height: `${input.heightMin} - ${input.heightMax}`,
      weight: `${input.weightMin} - ${input.weightMax}`,
      lifeExpectancy:`${input.lifeExpectancyMin} - ${input.lifeExpectancyMax} years`,
      img: input.img,
      temperament: input.temperament
    }
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
  // let handleDeleteDiet = (e) => {
  //   setInput({
  //     ...input,
  //     diets: input.diets.filter((d) => d !== e),
  //   });
  //   setError(
  //     validate({
  //       ...input,
  //       diets: input.diets.filter((d) => d !== e),
  //     })
  //   );
  // };

  // let validate = (input) => {
  //   let error = {};
  //   if (!input.name || input.name.length > 40) {
  //     error.name = "A Name is required, (max 40 char)";
  //   } else if (!input.dishRes) {
  //     error.dishRes = "A Resume is required";
  //   } else if (
  //     !input.dishScore ||
  //     input.dishScore < 0 ||
  //     input.dishScore > 100
  //   ) {
  //     error.dishScore = "A Score from 0 to a 100 is required";
  //   } else if (
  //     !input.healthyScore ||
  //     input.healthyScore < 0 ||
  //     input.healthyScore > 100
  //   ) {
  //     error.healthyScore = "A Health Score from 0 to a 100 is required";
  //   } else if (!input.stepByStep[0]) {
  //     error.stepByStep = "A Step is required";
  //   } else if (!input.img) {
  //     error.img = "An Image is required";
  //   } else if (!input.diets.length) {
  //     error.diets = "A Diet must be chosen";
  //   }else { error.submit = "we ok to submit";}
  //   console.log(error)
  //   return error;
  // };

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
          {/* <div >
            {diets.map((e) => (
              <div >
                <label key={e.name}>
                  <input
                    type="checkbox"
                    name={e.name}
                    value={e.name}
                    onChange={(e) => handleCheckBox(e)}
                  />
                  {e.name}
                </label>
              </div>
            ))}
          </div> */}
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
          {/* {input.diets ? (
            <div>
              <h4>Diets Chosen</h4>
            </div>
          ) : (
            <p></p>
          )}
          {input.diets && (
            <div className="bullet-container-chosen">
              <div>
                {input.diets?.map((e) => (
                  <div className="diet-bullets-chosen" key={e}>
                    <p>{e}</p>
                    <button onClick={() => handleDeleteDiet(e)}>X</button>
                  </div>
                ))}
              </div>
            </div>
          )} */}

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

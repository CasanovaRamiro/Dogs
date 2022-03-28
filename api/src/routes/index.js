const { Router } = require('express');
const { API_KEY } = process.env;
const axios = require('axios')
const { Dog, Temperament } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getDogsFromApi = async () => {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    //   console.log(await apiUrl.data.results.analyzedInstructions);
    const info = await apiUrl.data.map((e) => {
      return {
        id: e.id,
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        lifeExpectancy: e.life_span,
        img: e.image.url,
        temperament : e.temperament,
      };
    });
    return info;
  };
  const getDogsFromDb = async () => {
    return await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  };
  
  const getAllDogs = async () => {
    const dogsFromApi = await getDogsFromApi();
    const dogsFromDb = await getDogsFromDb();
    const allDogs = dogsFromApi.concat(dogsFromDb);
    return allDogs;
  };

  const getAllTemperaments = async () => {
    const apiTemperaments = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
      );
    const  temperamentsFilter= apiTemperaments.data.map(e => e.temperament)
    //   obj.temperament.replaceAll(/,/ig, '').split(' ')
    // const blabla= apiTemperaments.data.map(e => e.temperament)
    // const temperaments = apiTemperaments.data.map(e => {console.log(e.temperament); return e.temperament.replaceAll(/,/ig, '').split(' ')})
    // const temperamentsFFilter =temperamentsFilter.map(e => e?.replaceAll(/,/ig, ''))
    const temperaments =temperamentsFilter.map(e => e?.split(' '))
    // console.log(temperaments)
    temperaments.forEach((e) => {e?.map(e=>{
        e = e.replace(/,/i, '')
        
      Temperament.findOrCreate({
        where: { name: e },
      });
    })
    
    });
    const temperamentTypes = await Temperament.findAll();
    // console.log(temperamentTypes);
    return temperamentTypes ;
  };
  



  router.get("/temperament", async (req, res) => {
    let temperaments = await getAllTemperaments();
    res.status(200).send(temperaments);
  });

// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
// [ ] GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos

module.exports = router;

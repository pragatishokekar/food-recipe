// import React, { useState } from 'react'
// import { useParams } from 'react-router-dom'

// const Mealinfo = () => {
//     const {mealid} = useParams();
//     const [info, setInfo] = useState()
//     console.log(mealid);

//     const getInfo = async () =>{
//         const get =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
//         const jsonData = await get.json();
//         console.log(jsonData.meals[0]);
//         setInfo(jsonData.meals[0])
//     }
//     if(info != ""){
//         getInfo()
//     }
//   return (
//      <div>
//         { !info ? "Data Not Found" : 
//         <div className='mealInfo'> 
//      <img src={info.strMealThumb}/>
//      <div className='info'>
//         <h1>Recipe Detail</h1>
//         <button>{info.strMeal}</button>
//         <h3>Intruction's</h3>
//         <p>{info.strInstructions}</p>
//      </div>
//     </div>
//     }
//      </div>
     
//   )
// }

// export default Mealinfo
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Mealinfo = () => {
    const { mealid } = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
                const jsonData = await response.json();
                console.log("Received mealid:", mealid); // Log mealid
                console.log("API Response:", jsonData); // Log the full API response

                if (jsonData.meals && jsonData.meals.length > 0) {
                    setInfo(jsonData.meals[0]);
                } else {
                    setError("Data Not Found");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        getInfo();
    }, [mealid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className='mealInfo'>
                <img src={info.strMealThumb} alt={info.strMeal} />
                <div className='info'>
                    <h1>Recipe Detail</h1>
                    <button>{info.strMeal}</button>
                    <h3>Instructions</h3>
                    <p>{info.strInstructions}</p>
                </div>
            </div>
        </div>
    );
};

export default Mealinfo;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pokemon = () => {
    const [num, setNum] = useState();
    const [name, setName] = useState();
    const [moves, setMoves] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
                setName(res.data.name);
                setMoves(res.data.moves.length);
                console.log(res.data.moves);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, [num]); // tambahkan num sebagai dependensi agar useEffect hanya dipanggil ketika num berubah

    return (
        <>
            <h1>You Choose <span>{num}</span> Value </h1>
            <h1>My Name is <span>{name}</span> </h1>
            <h1>I Use <span>{moves}</span> </h1>

            <select name="" id="" value={num} onChange={(event) => {
                setNum(event.target.value);
            }}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <h1>Pokemon</h1>

            <h1 >Profile</h1>
            <h1>
                {Array.map((element) => {
                return element.name;
                })}
            </h1>
        </>
    )
}


const Array = [
    {
        name: "Asep",
        Job: 'FrontEnd',
        Pengalaman: '5 tahun',
    },
    {
        name: "Udin",
        Job: 'Backend',
        Pengalaman: '5 tahun',
    },
]

export default Pokemon;

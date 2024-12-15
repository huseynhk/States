import React, { useState } from "react";
import { pokemonList } from "./Datas";

function PokemonTeamManager() {
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem("pokemonTeam");
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  const addPokemonToTeam = (pokemon) => {
    if (!team.some((item) => item.id === pokemon.id)) {
      const newPokemon = { ...pokemon, nickname: pokemon.name, count: 1 };
      const updatedTeam = [...team, newPokemon];
      setTeam(updatedTeam);
      localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
    } else {
      alert(`${pokemon.name} is already in your team!`);
    }
  };

  const deletePokemon = (id) => {
    const updatedTeam = team.filter((pokemon) => pokemon.id !== id);
    setTeam(updatedTeam);
    localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
  };

  const incrementPokemonCount = (id) => {
    const updatedTeam = team.map((pokemon) =>
      pokemon.id === id ? { ...pokemon, count: pokemon.count + 1 } : pokemon
    );
    setTeam(updatedTeam);
    localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
  };

  const decrementPokemonCount = (id) => {
    const updatedTeam = team.map((pokemon) =>
      pokemon.id === id && pokemon.count > 1
        ? { ...pokemon, count: pokemon.count - 1 }
        : pokemon
    );
    setTeam(updatedTeam);
    localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
  };

  const totalPokemon = team.reduce((sum, pokemon) => sum + pokemon.count, 0);

  return (
    <div
      style={{ maxWidth: "1000px", margin: "15px auto", textAlign: "center", backgroundColor:"#ceebfe" }}
    >
      <h1>Pokémon Team Manager</h1>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              margin: "10px",
              width: "170px",
              height: "250px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
            }}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              style={{ width: "100px", height: "100px", objectFit: "contain" }}
            />
            <h4>{pokemon.name}</h4>
            <button
              onClick={() => addPokemonToTeam(pokemon)}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Add to Team
            </button>
          </div>
        ))}
      </div>

      <h3 className="mt-2">Your Pokémon Team</h3>
      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {team.map((pokemon) => (
          <li
            key={pokemon.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #aba8a8",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <h6>{pokemon.nickname}</h6>
            </div>

            <div className="d-flex align-items-center">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => decrementPokemonCount(pokemon.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#f8b600",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                >
                  -
                </button>
                <h6 style={{ minWidth: "18px", marginTop: "3px" }}>
                  {pokemon.count}
                </h6>
                <button
                  onClick={() => incrementPokemonCount(pokemon.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => deletePokemon(pokemon.id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                className="mx-3"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total Pokémon in Team: {totalPokemon}</h3>
      <div className="my-4">
        <h4 className="mb-3">Individual Pokémon Count</h4>
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th scope="col">Nickname</th>
              <th scope="col">Count</th>
              <th scope="col">Label</th>
            </tr>
          </thead>
          <tbody>
            {team.map((pokemon) => (
              <tr key={pokemon.id} className="fw-bold">
                <td className="text-success">{pokemon.nickname}</td>
                <td className="text-danger">{pokemon.count}</td>
                <td>{pokemon.count > 1 ? "Pokémons" : "Pokémon"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PokemonTeamManager;

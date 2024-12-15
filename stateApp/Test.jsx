import React, { useState } from "react";

const pokemonList = [
  { id: 1, name: "Pikachu", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { id: 2, name: "Bulbasaur", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
  { id: 3, name: "Charmander", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
  { id: 4, name: "Squirtle", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
  { id: 5, name: "Eevee", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" },
];

function PokemonTeamManager() {
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem("pokemonTeam");
    return savedTeam ? JSON.parse(savedTeam) : [];
  });
  const [editingId, setEditingId] = useState(null);
  const [nickname, setNickname] = useState("");
  const [imageURL, setImageURL] = useState("");

  const addPokemonToTeam = (pokemon) => {
    if (!team.some((item) => item.id === pokemon.id)) {
      const newPokemon = { ...pokemon, nickname: pokemon.name };
      const updatedTeam = [...team, newPokemon];
      setTeam(updatedTeam);
      localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam));
    } else {
      alert(`${pokemon.name} is already in your team!`);
    }
  };

  const startEditingNickname = (id, currentNickname, currentImage) => {
    setEditingId(id);
    setNickname(currentNickname);
    setImageURL(currentImage);
  };

  const updatePokemon = (id) => {
    const updatedTeam = team.map((pokemon) =>
      pokemon.id === id ? { ...pokemon, nickname, image: imageURL } : pokemon
    );
    setTeam(updatedTeam);
    localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam)); 
    setEditingId(null);
    setNickname("");
    setImageURL("");
  };

  const deletePokemon = (id) => {
    const updatedTeam = team.filter((pokemon) => pokemon.id !== id);
    setTeam(updatedTeam);
    localStorage.setItem("pokemonTeam", JSON.stringify(updatedTeam)); 
  };

  const totalPokemon = team.length;

  return (
    <div style={{ maxWidth: "1000px", margin: "15px auto", textAlign: "center" }}>
      <h1>Pokémon Team Manager</h1>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              margin: "10px",
              width: "175px",
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
              <span>
                {editingId === pokemon.id ? (
                  <span>
                    <button
                      onClick={() => updatePokemon(pokemon.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Save
                    </button>
                    {/* <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Nickname"
                      style={{
                        marginLeft: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <input
                      type="text"
                      value={imageURL}
                      onChange={(e) => setImageURL(e.target.value)}
                      placeholder="Image URL"
                      style={{
                        marginLeft: "10px",
                        padding: "5px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    /> */}
                  </span>
                ) : (
                  pokemon.nickname
                )}
              </span>
            </div>

            <div>
              {/* {editingId !== pokemon.id && (
                <button
                  onClick={() =>
                    startEditingNickname(pokemon.id, pokemon.nickname, pokemon.image)
                  }
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                >
                  Edit Nickname & Image
                </button>
              )} */}
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
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total Pokémon in Team: {totalPokemon}</h3>
    </div>
  );
}

export default PokemonTeamManager;

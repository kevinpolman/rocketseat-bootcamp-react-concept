import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const addRepository = await api.post("/repositories", {
      title: "Umbriel",
      url: "https://github.com/rocketseat/umbriel",
      techs: ["Node.js", "ReactJS"],
    });

    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    const deleteRepo = api.delete(`/repositories/${id}`);

    const newRepositories = repository.filter(
      (repository) => repository.id !== id
    );

    setRepository(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map((repository) => (
          <>
            <li>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

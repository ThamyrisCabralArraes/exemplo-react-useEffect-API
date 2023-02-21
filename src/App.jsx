import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [respositories, setRespositories] = useState([]);
  const [classb, setClassb] = useState([]);

  useEffect(() => {
    const feachData = async () => {
      const response = await fetch('http://api.github.com/users/ThamyrisCabralArraes/repos');
      const data = await response.json();

      setRespositories(data);
    };
    feachData();
  }, []);

  const handleFavorite = (id) => {
    const newRepo = respositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRespositories(newRepo);
    handleFav(newRepo);
  };

  const handleFav = (newRepo) => {
    const filterRepos = newRepo.filter((filterRepo) => {
      return filterRepo.favorite && filterRepo;
    });
    console.log(filterRepos);
    setClassb(filterRepos.map((item) => <li key={item.id}>{item.name}</li>));
  };

  return (
    <div className='App'>
      <ul>
        {respositories.map((repo) => (
          <li key={repo.id}>
            {repo.name} {repo.favorite && <span className='fave'>check</span>}{' '}
            <button
              className={'none'}
              onClick={() => handleFavorite(repo.id)}
            >
              Favoritar
            </button>
          </li>
        ))}{' '}
      </ul>
      <div>
        <h1>Favoritos</h1>
        <ul>{classb}</ul>
      </div>
    </div>
  );
}

export default App;

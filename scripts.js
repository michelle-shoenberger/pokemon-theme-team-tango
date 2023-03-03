const baseURL = "https://pokeapi.co/api/v2/";

const tryCatchFetch = async (url) => {
  try {
    console.log('fetching')
    let response = await fetch(url);
    let data = await response.json();
    return data
  }
  catch (error) {
    throw error
  }
};

const fetchTeam = async (type) => {
  console.log(type)
  return tryCatchFetch(baseURL + 'type/' + type.toString())
}

const fetchPoke = async (url) => {
  return tryCatchFetch(url)
}

// event listenter
const btn = document.getElementById('catch')
btn.addEventListener('click', async () => {
  // random number to pick type - 0-19
  let typePoke = Math.floor(Math.random()*17 + 1)
  let data = await fetchTeam(typePoke)
  let team = []
  for (let j=0; j<6; j++) {
    team.push(data.pokemon[Math.floor(Math.random()*(data.pokemon.length - 1) + 1)])
  }
  for (let i=0; i<team.length; i++) {
    let poke = await fetchPoke(team[i].pokemon.url)
    console.log(poke)
    // create img element
    let image = document.createElement('img')
    image.src = poke.sprites.back_default
    image.classList = "img-fluid"
    console.log(`${i}`)
    console.log(document.getElementById(`${i}`))
    let parent = document.getElementById(`${i}`)
    if (parent.childElementCount) {
      console.log('child')
      parent.removeChild(parent.lastChild)
    }
    parent.appendChild(image);
  }

})
let state = {
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""
  }
};

const formEl = document.querySelector ('#select-state-form');
console.log("inside FormEl:", formEl);

formEl.addEventListener("submit", (event) => {
  console.log("click is working");
  event.preventDefault();

  const stateInput = formEl.querySelector("#select-state");
  console.log("stateInput: ", stateInput.value);
  
  const url = `https://api.openbrewerydb.org/breweries?by_state=${stateInput.value}`;
  
  fetch(url) 
  .then ((res) => res.json())
  .then((beerState) => {
    console.log("inside FETCH beerState: ", beerState);
  
  });
 formEl.reset();

} )


function renderBreweriesList() {
  console.log("Inside renderBreweriesList: ", state.breweries);


  for (let i = 0; i < state.breweries.length; i++) {
    stateBrew = state.breweries[i];
    console.log("stateBrew: ", stateBrew);
  }
}

renderBreweriesList();

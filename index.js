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
  
    state.breweries = beerState;
    renderFiltersSection ()

    renderBreweriesList();

    // renderAsideElement(newState);

  });
 formEl.reset();

} )

const mainEl = document.querySelector("main");


function renderBreweriesList() {
  console.log("Inside renderBreweriesList: ", state.breweries);

  const h1El = document.createElement ("h1");
  h1El.innerText = "List of Breweries";
  mainEl.append(h1El);
  
  const headerEl = document.createElement ("header");
  headerEl.className = "search-bar";
  mainEl.append(headerEl);
  
  const searchBreweriesForm = document.createElement("form");
  searchBreweriesForm.id = "search-breweries-form";
  searchBreweriesForm.autocomplete = "off";
  
  const searchLabelEl = document.createElement ("label");
  searchLabelEl.setAttribute = ("for", "search-breweries");
  const labelH2El = document.createElement ("h2");
  labelH2El.innerText = "Search breweries: ";
  searchLabelEl.append(labelH2El);
  const inputLabelEl = document.createElement ("input");
  inputLabelEl.id = 'search-breweries';
  inputLabelEl.name = 'search-breweries';
  inputLabelEl.type = 'text';
  
  searchBreweriesForm.append(searchLabelEl, inputLabelEl);
  headerEl.append(searchBreweriesForm);
  
  const articleEl = document.createElement('article');
  
  const breweriesListUlEl = document.createElement('ul');
  breweriesListUlEl.className = "breweries-list";
  articleEl.append(breweriesListUlEl);
  
  console.log("here", state.breweries.length);

  for (let i = 0; i < state.breweries.length; i++) {
    stateBrew = state.breweries[i];
    console.log("stateBrew: ", stateBrew);
    
    let breweryType = stateBrew.brewery_type;
  
  const breweriesListLiEl = document.createElement('li');
  breweriesListUlEl.append(breweriesListLiEl);
  
  const h2El = document.createElement('h2');
  h2El.innerText = stateBrew.name;
  breweriesListLiEl.append(h2El);


  const divEL = document.createElement('div');
  divEL.innerText = stateBrew.brewery_type;
  divEL.className = "type";
  divEL.innerText = "micro";
  breweriesListLiEl.append(divEL);
  
  const addressSection = document.createElement('section');
  addressSection.className = "address";

  const h3AddressEl = document.createElement('h3');
  h3AddressEl.innerText = stateBrew.address_3;
  
  const firstLineAddressEl = document.createElement('p');
  firstLineAddressEl.innerText = stateBrew.street; 
  const townAddressEl = document.createElement('p');
  const strongEl = document.createElement('strong');
  strongEl.innerText = stateBrew.city + " , " + stateBrew.postal_code;
  townAddressEl.append(strongEl);
  addressSection.append(h3AddressEl, firstLineAddressEl, townAddressEl);
  breweriesListLiEl.append(addressSection);
  
  const phoneSectionEl = document.createElement('section');
  phoneSectionEl.className = "phone";
  const phoneEl= document.createElement('h3')
  phoneEl.innerText = stateBrew.phone;
  const numberEl = document.createElement("p");
  numberEl.innerText = "N/A";
  phoneSectionEl.append(phoneEl, numberEl);
  breweriesListLiEl.append(phoneSectionEl);
  
  const linkSectionEl = document.createElement('section');
  linkSectionEl.className = "link";
  const linkEl = document.createElement('a');
  linkEl.href = "stateBrew.website_url"; 
  linkEl.target = "_blank";
  linkEl.innerText = "Visit Website"
  linkSectionEl.append(linkEl);
  breweriesListLiEl.append(linkSectionEl);

}
mainEl.append(articleEl); 

console.log("articleEl:" ,articleEl);

}

// renderBreweriesList();

function renderFiltersSection () { 
const filtersAsideSectionEl = document.createElement('aside')
filtersAsideSectionEl.className = "filters-section";
mainEl.append(filtersAsideSectionEl);

const filterByH2El = document.createElement("h2");
filterByH2El.innerText = "Filter By: ";
filtersAsideSectionEl.append(filterByH2El);

const filterByTypeFormEl = document.createElement("form");
filterByTypeFormEl.id = "filter-by-type-form";
filterByTypeFormEl.setAttribute("autocomplete", "off");
filtersAsideSectionEl.append(filterByTypeFormEl);

const labelEl = document.createElement ("label");
labelEl.setAttribute("for", "filter-by-type");
 const typeOfBreweryH3El = document.createElement("h3");
 typeOfBreweryH3El.innerText = "Type of Brewery";
labelEl.append(typeOfBreweryH3El);
filterByTypeFormEl.append(labelEl);

const selectEl = document.createElement("select");
selectEl.addEventListener("change", (event) => {


});

selectEl.setAttribute("name", "filter-by-type");
selectEl.setAttribute('id', 'filter-by-type');
const optionTypeEl = document.createElement('option');
optionTypeEl.innerText = "Select a type... ";
optionTypeEl.value = " ";
const optionMicroEl = document.createElement('option');
optionMicroEl.innerText = "Micro";
optionMicroEl.value = "micro";
const optionRegionalEl = document.createElement('option');
optionRegionalEl.innerText = "Regional";
optionRegionalEl.value = "regional";
const optionBrewpubEl = document.createElement('option');
optionBrewpubEl.innerText = "Brewpub";
optionBrewpubEl.value = "brewpub";

selectEl.append(optionTypeEl, optionMicroEl, optionRegionalEl, optionBrewpubEl);
filterByTypeFormEl.append(selectEl);
filtersAsideSectionEl.append(filterByTypeFormEl);
}



// /// need the elements for the main 

// function renderUserResult() {
// const filtersAsideSectionEl = document.createElement('aside')
// filtersAsideSectionEl.className = "filters-section";

// mainEl.append(filtersAsideSectionEl, listSectionEL)

// 

// const filterByCityDivEl = document.createElement ('div');
// filterByCityDivEl.className = "filter-by-city-heading";
// const citiesEl = document.createElement('h3');
// citiesEl.innerText = "Cities";
// buttonClearEl = document.createElement('button');
// buttonClearEl.className = "clear-all-btn";
// buttonClearEl.innerText = "clear all";
// filterByCityDivEl.append(citiesEl, buttonClearEl);
// filtersAsideSectionEl.append(filterByCityDivEl);

// const filterByCityFormEl = document.createElement ('form');
// filterByCityFormEl.id = "filter-by-city-form";
// const inputChardonEl = document.createElement ('input');
// inputChardonEl.type = "checkbox";
// inputChardonEl.name = "chardon";
// inputChardonEl.value = "chardon";
// const labelChardonEl = document.createElement ("label");
// labelChardonEl.setAttribute = ("for", "chardon");
// labelChardonEl.innerText = "Chardon";
// const inputCincinnatiEl = document.createElement('input');
// inputCincinnatiEl.type = "checkbox";
// inputCincinnatiEl.name = "cincinnati";
// inputCincinnatiEl.value = "cincinnati";
// const labelCincinnatiEl = document.createElement ('label');
// labelCincinnatiEl.setAttribute = "cincinnati";
// labelCincinnatiEl.innerText = "Cincinnati";

// filterByCityFormEl.append(inputChardonEl, labelChardonEl, inputCincinnatiEl, labelCincinnatiEl);
// filtersAsideSectionEl.append(filterByCityFormEl)

// }

// renderUserResult()

// // const listSectionEL = document.createElement("aside");
// // listSectionEL.className = "list-section";

// function renderAsideList( ) {
// }
 


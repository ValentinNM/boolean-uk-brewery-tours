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


function capitalizeFirstLetter(string) { 
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const formEl = document.querySelector ('#select-state-form');

// function listenToSelectStateForm() { 

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const stateInput = formEl.querySelector("#select-state");
    // console.log("stateInput: ", stateInput.value);
    
    const url = `https://api.openbrewerydb.org/breweries?by_state=${stateInput.value}`;
    
    fetch(url) 
  fetch(url) 
    fetch(url) 
    .then ((res) => res.json())
    .then((beerState) => {
    
      // state = { 
      //   ...state,
      //   breweries: beerState // breweriesData 
      //   },

      state.breweries = beerState;
      console.log("Inside GET fetch: ", state);

      renderFiltersSection(),
  
      renderBreweriesList()
      renderingFilteringByCity()
  
  
    });
    formEl.reset();
    
  });

// }


const mainEl = document.querySelector("main");


function renderBreweriesList() {

  // mainEl.innerHTML = '';

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
  
  let filteredBreweries = state.breweries; //  
  const filters = state.filters;


  if (filters.type !== "") { 
    filteredBreweries = state.breweries.filter(
      (brewery) => {
        console.log(brewery["brewery_type"], filters.type)
        brewery["brewery_type"] === filters.type
      }
    );
  }

  // if (filters.city.length !== 0) {
  //   filteredBreweries = state.breweries.filter((brewery) => 
  //   filters.city.includes(brewery.city.toLowerCase())
  //   );
  // }
   

  // console.log("here", state.breweries, state.filters);

  for (let i = 0; i < filteredBreweries.length; i++) {
    stateBrew = filteredBreweries[i];
    console.log("brewery: ", stateBrew);
    
    let breweryType = stateBrew.brewery_type;
  
  const breweriesListLiEl = document.createElement('li');
  breweriesListUlEl.append(breweriesListLiEl);
  
  const h2El = document.createElement('h2');
  h2El.innerText = stateBrew.name;
  breweriesListLiEl.append(h2El);


  const divEL = document.createElement('div');
  divEL.innerText = stateBrew.brewery_type;
  divEL.className = "type";
  // divEL.innerText = "micro";
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

// console.log("articleEl:" ,articleEl);

}



// function renderSelectedFilteredInput () { 

// }


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

  const filterByValueType = event.target.value;

  // state = {
  //   ... state,
  //   filters: "new one",
  // }
  // console.log("Inside select listener: ", state);

  state.filters.type = filterByValueType;
  console.log("state:", state);

  renderBreweriesList();

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

function renderingFilteringByCity () { 

  // console.log("inside renderingFilteringByCity: ",renderingFilteringByCity);
  const filterSection = renderFiltersSection();
  mainEl.append(filterSection);

  // console.log("state brew inside renderingFilteringByCity: ", stateBrew);

  const filtersAsideSectionEl = document.querySelector(".filters-section")
  mainEl.append(filtersAsideSectionEl);


  const filterByCityDivEl = document.createElement ('div');
  filterByCityDivEl.className = "filter-by-city-heading";
  const citiesEl = document.createElement('h3');
  citiesEl.innerText = "Cities";
  const buttonClearEl = document.createElement('button');
  buttonClearEl.className = "clear-all-btn";
  buttonClearEl.innerText = "clear all";
  filterByCityDivEl.append(citiesEl, buttonClearEl);
  filtersAsideSectionEl.append(filterByCityDivEl);

// for loop to go through each city of our result options

const filterByCityFormEl = document.createElement ('form');
filterByCityFormEl.id = "filter-by-city-form";
const inputChardonEl = document.createElement ('input');
inputChardonEl.type = "checkbox";
inputChardonEl.name = "chardon";
inputChardonEl.value = "chardon";
const labelChardonEl = document.createElement ("label");
labelChardonEl.setAttribute = ("for", "chardon");
labelChardonEl.innerText = "Chardon"; // stateBrew.city;
const inputCincinnatiEl = document.createElement('input');
inputCincinnatiEl.type = "checkbox";
inputCincinnatiEl.name = "cincinnati";
inputCincinnatiEl.value = "cincinnati";
const labelCincinnatiEl = document.createElement ('label');
labelCincinnatiEl.setAttribute = "cincinnati";
labelCincinnatiEl.innerText = "Cincinnati";

filterByCityFormEl.append(inputChardonEl, labelChardonEl, inputCincinnatiEl, labelCincinnatiEl);
filtersAsideSectionEl.append(filterByCityFormEl);


}


// function main() { 
//   listenToSelectedStateForm ();
//   console.log("listenToSelectedStateForm", listenToSelectedStateForm);
// }
// main ()
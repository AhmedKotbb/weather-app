'use strict'; //to enable strict mode 
import { fetchData, url } from "./api.js";
import * as module from "./module.js" 

export const error404 = function(){}

const addEventOnElements = function(elements, eventType, callback){
    for(const element of elements){
        element.addEventListener(eventType, callback)
    }
}

const searchView = document.querySelector("[data-search-view]");
const searchTogglers = document.querySelectorAll("[data-search-toggler]");

const toggleSearch = () => searchView.classList.toggle('active');
addEventOnElements(searchTogglers, 'click', toggleSearch);

// search integration
const searchField = document.querySelector("[data-search-field]");
const searchResult = document.querySelector("[data-search-result]");

let searchTimeOut = null;
const searchTimeOutDuration = 500;

searchField.addEventListener('input', function(){
    searchTimeOut ?? clearTimeout(searchTimeOut);
    if(!searchField.value){
        searchResult.classList.remove('active');
        searchResult.innerHTML = '';
        searchField.classList.remove('searching');
    }else{
        searchField.classList.add('searching');
    }

    if(searchField.value){
        searchTimeOut = setTimeout(()=>{
            fetchData(url.geo(searchField.value), function(locations){
                searchField.classList.remove('searching');
                searchResult.classList.add('active');
                searchResult.innerHTML = `
                <ul class="view-list" data-search-list></ul>
                `
                const items = [];
                for(const{ name, lat, lon, country, state } of locations){
                    const searchItem = document.createElement('li');
                    searchItem.classList.add('view-item');
                    searchItem.innerHTML = `
                    <span class="m-icon">location_on</span>
                    <div>
                        <p class="item-title">${name}</p>
                        <p class="lable-2 item-subtitle">${state || ''} ${country}</p>
                    </div>
                    <a href="#/weather?lat=${lat}&lon=${lon}" class="item-link has-state" 
                    aria-label="${name} weather"
                    data-search-toggler></a>
                    `
                    searchResult.querySelector('[data-search-list]').appendChild(searchItem);
                    items.push(searchItem.querySelector('[data-search-toggler]'))
                }
            });
        }, searchTimeOutDuration)
    }
});

const container = document.querySelector('[data-container]');
const loading = document.querySelector('[data-loading]');
const currentLocationBtn = document.querySelector('[data-current-location-btn]');

export const updateWeather = function(lat, lon){
}
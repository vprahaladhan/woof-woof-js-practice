let allPups = [];
const url = 'http://localhost:3000/pups';

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded!!');
  fetch(url)
    .then(response => response.json())
    .then(pups => {
      allPups = pups;
      displayPups(pups);
    });
  
  document.getElementById('good-dog-filter').addEventListener('click', () => {
    document.getElementById('dog-bar').innerHTML = '';
    document.getElementById('dog-info').innerHTML = '';
    let goodDogFilter = document.getElementById('good-dog-filter').innerText;
    goodDogFilter = goodDogFilter.includes('OFF') ?  goodDogFilter.replace('OFF', 'ON') : goodDogFilter.replace('ON', 'OFF');
    document.getElementById('good-dog-filter').innerText = goodDogFilter;
    goodDogFilter.includes('ON') ?  displayPups(allPups.filter(pup => pup.isGoodDog)) : displayPups(allPups); 
  });
});

const displayPups = pups => {
  pups.forEach(pup => {
    const span = document.createElement('span');
    span.innerText = pup.name;
    document.getElementById('dog-bar').appendChild(span);

    span.addEventListener('click', () => {
      const dogInfo = document.getElementById('dog-info');
      dogInfo.innerHTML = '';
      const dogImage = document.createElement('img');
      dogImage.src = pup.image;
      const dogName = document.createElement('p');
      dogName.innerText = pup.name;
      const toggle = document.createElement('button');
      toggle.innerText = `${pup.isGoodDog ? 'Bad' : 'Good'} Dog`;

      dogInfo.appendChild(dogImage);
      dogInfo.appendChild(dogName);
      dogInfo.appendChild(toggle);

      toggle.addEventListener('click', event => {
        event.preventDefault();
        pup.isGoodDog = !pup.isGoodDog;
        toggle.innerText = `${pup.isGoodDog ? 'Bad' : 'Good'} Dog`;
        fetch(`${url}/${pup.id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({ isGoodDog: pup.isGoodDog})
        });
      });
    });
  })
};
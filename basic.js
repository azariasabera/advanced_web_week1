let breedNames = ['havanese', 'poodle', 'labrador', 'dalmatian', 'bulldog'];
let container = document.querySelector('.container');

// lets create five wiki items
function createWikiItem(breedName, text, imageURL) {
    let wikiItem = document.createElement('div');
    wikiItem.classList.add('wiki-item');

    let header = document.createElement('h1');
    header.classList.add('wiki-header');
    header.innerText = breedName;
 
    let wikiContent = document.createElement('div');
    wikiContent.classList.add('wiki-content');

    let wikiText = document.createElement('p');
    wikiText.classList.add('wiki-text');
    wikiText.innerText = text;

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    let img = document.createElement('img');
    img.classList.add('wiki-img');
    img.src = imageURL;

    imgContainer.appendChild(img);
    wikiContent.appendChild(wikiText);
    wikiContent.appendChild(imgContainer);
    wikiItem.appendChild(header);
    wikiItem.appendChild(wikiContent);

    container.appendChild(wikiItem);
}

async function fetchDogImage(breedName) {
    let imageURL = 'https://dog.ceo/api/breed/' + breedName + '/images/random';
    //let imageURL = 'https://dog.ceo/api/breed/${breedName}/images/random';
    let response = await fetch(imageURL);
    let data = await response.json();

    return data.message;
}


async function fetchWikiText(breedName) {
    let wikiURL = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + breedName;
    let response = await fetch(wikiURL);
    let data = await response.json();

    return data.extract;
}

async function generateWikiItems() {
    for (let i = 0; i < breedNames.length; i++) {
        let breedName = breedNames[i].charAt(0).toUpperCase() + breedNames[i].slice(1);
        let text = await fetchWikiText(breedNames[i]);
        let imageURL = await fetchDogImage(breedNames[i]);
        createWikiItem(breedName, text, imageURL);
    }
   //createWikiItem('Havanese', 'The Havanese is a breed of dog that is native to Cuba and is known for its silky coat and friendly disposition.', 'https://images.unsplash.com/photo-1560807707-9b1b3e4fbae9');
}

generateWikiItems();
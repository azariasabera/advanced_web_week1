let allWikiItems = document.getElementById('all-wiki-items');

// lets create five wiki items
function createWikiItem(breedName, text, imageURL) {
console.log('I am here2');
    let wikiItem = document.createElement('div');
    wikiItem.classList.add('wiki-item');

    let header = document.createElement('h1');
    header.classList.add('wiki-header');
    header.innerText = "Breed " + breedName;
 
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
    wikiItem.appendChild(content);

    allWikiItems.appendChild(wikiItem);
}

let breedInfo = [];

async function fetchDogImage() {
    let url = 'https://dog.ceo/api/breeds/image/random';
    let response = await fetch(url);
    let data = await response.json();

    // check if the breed name is valid
    let breedName = data.message.split('/')[4];
    let promise = await fetchWikiText(breedName);
    if (!promise) {
        fetchDogImage();
        return;
    }

    breedInfo.push({
        breedName: breedName.charAt(0).toUpperCase() + breedName.slice(1),
        imageURL: data.message,
        text: promise
        });
    //console.log(breedInfo);
}


async function fetchWikiText(breedName) {
    console.log(breedName);
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + breedName;
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data.extract;
    } catch (error) {
        //console.log(error);
        return false;
    }
}

async function generateWikiItems() {
    let fetchPromises = [];
    for (let i = 0; i < 5; i++) {
        fetchPromises.push(fetchDogImage());
    }
    await Promise.all(fetchPromises); // waits for all promises to resolve

    console.log(breedInfo);
    breedInfo.forEach(breed => {
        console.log('I am here' + breedInfo.length);
        createWikiItem(breed.breedName, breed.text, breed.imageURL);
    });
}

generateWikiItems();


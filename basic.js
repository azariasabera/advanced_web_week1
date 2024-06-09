let COUNT = 5; // number of wiki items to generate
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

let breedInfo = [];

async function fetchDogImage() {
    let breedName = null;
    let wikiText = null;
    let imageURL = null;
    let maxTries = 5;

    while(!wikiText && maxTries) {
        let url = 'https://dog.ceo/api/breeds/image/random';
        let response = await fetch(url);
        let data = await response.json();

        breedName = data.message.split('/')[4];
        imageURL = data.message;
        wikiText = await fetchWikiText(breedName);
        maxTries--;
    }

    return{
        breedName: breedName.charAt(0).toUpperCase() + breedName.slice(1),
        imageURL: imageURL,
        text: wikiText
    };
}


async function fetchWikiText(breedName) {
    breedName = breedName.split('-').join(' ');
    let url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + breedName;
    try {
        let response = await fetch(url);

        if(response.status !== 200) throw new Error({msg: "Data not found!", breedName});

        let data = await response.json();
        return data.extract;
    } catch (error) {
        console.log({error});
        return false;
    }
}

async function generateWikiItems() {
    // let fetchPromises = [];
    for (let i = 0; i < COUNT; i++) {
        // fetchPromises.push(fetchDogImage());
        fetchDogImage().then(breed => {
            createWikiItem(breed.breedName, breed.text, breed.imageURL);
        });
    }
    // breedInfo = await Promise.all(fetchPromises); // waits for all promises to resolve
    // console.log(breedInfo);
    // breedInfo.forEach();
}

generateWikiItems();
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
//sözlük kapsayıcısı
const dictionaryContainer = document.getElementById("dictionary");
//aranan kelime
const wordText = document.getElementById("word-text");
//kelimenin tanımı
const definitionText = document.getElementById("definition-text");
// search düğmesi
const searchButton = document.getElementById("search-button");
//kelimenin türü
const wordType = document.getElementById("word-type");
const synonyms = document.getElementById("synonyms");
const definition = document.getElementById("definition");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputWord = document.getElementById("word-input").value;
  fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0].meanings);





      data[0].meanings.map((dataItem, i)=>{
        console.log(dataItem[i])
        wordText.innerText = data.word;
        definitionText.innerText = dataItem.meanings[i].definitions[0].definition;
        wordType.innerText = dataItem.meanings[i].partOfSpeech;
        synonyms.innerText = dataItem.meanings[i].synonyms[0];
      })
      // wordText.innerText = data[0].word;
      // definitionText.innerText = data[0].meanings[0].definitions[0].definition;
      // wordType.innerText = data[0].meanings[0].partOfSpeech;
      // synonyms.innerText = data[0].meanings[0].synonyms[0];
    })
    .catch((error) => {error, 
      wordText.innerText = "there is no such word 😔";
      definition.innerText = "";
    });
});

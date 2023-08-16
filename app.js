const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const dictionary = document.getElementById("dictionary");
const definitionText = document.getElementById("definition-text");
const wordText = document.getElementById("word-text");
const btn = document.getElementById("btn");
const partOfSpeech=document.getElementById("part-of-speech");
const synonyms=document.getElementById("synonyms");
const definition= document.getElementById("definition")

btn.addEventListener("click", (e) => {
    e.preventDefault()
  let inputWord = document.getElementById("word-input").value;
  fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {wordText.innerText=data[0].word;
    definitionText.innerText=data[0].meanings[0].definitions[0].definition;
    partOfSpeech.innerText=data[0].meanings[0].partOfSpeech;
    synonyms.innerText=data[0].meanings[0].synonyms[0];
})
   .catch((error)=>{wordText.innerText="there is no such word 😔";
    definition.innerText="";

   });
});

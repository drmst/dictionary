const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
//sözlük kapsayıcısı
const dictionaryContainer = document.getElementById("dictionary");
// search düğmesi
const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputWord = document.getElementById("word-input").value;
  dictionaryContainer.innerText = "";
  fetch(`${URL}${inputWord}`).then((res) =>
    res
      .json()
      .then((data) => {
        data.map((words) => {
          const wordCard = document.createElement("div");
          wordCard.classList.add("word-card");
          dictionaryContainer.appendChild(wordCard);
          //create word container
          const wordContainer = document.createElement("div");
          wordContainer.classList.add("word");
          //create word text
          const wordText = document.createElement("p");
          wordText.classList.add("word-text");
          wordText.innerText = words.word;
          //append wordText to wordContainer
          wordContainer.appendChild(wordText);
          //append wordContainer to dictionaryContainer
          wordCard.appendChild(wordContainer);
          //create definitionContainer div
          const definitionContainer = document.createElement("div");
          definitionContainer.classList.add("definition-container");
          wordCard.appendChild(definitionContainer);
          // create phonetic p
          const phonetic = document.createElement("p");
          phonetic.classList.add("phonetic");
          phonetic.innerText = words.phonetic;
          definitionContainer.appendChild(phonetic);
          //create meanings
          const meanings = document.createElement("div");
          meanings.classList.add("meanings");
          definitionContainer.appendChild(meanings);

          words.meanings.map((meaning) => {
            const partOfSpeech = document.createElement("p");
            partOfSpeech.classList.add("part-of-speech");
            partOfSpeech.innerText = meaning.partOfSpeech;
            meanings.appendChild(partOfSpeech);

            const definition = document.createElement("div");
            definition.classList.add("definition");
            meanings.appendChild(definition);
            meaning.definitions.map((def) => {
              const definitionExplanation = document.createElement("p");
              definitionExplanation.classList.add("definition-explanation");
              definitionExplanation.innerText = def.definition;
              definition.appendChild(definitionExplanation);
              //synonym
              // const synonyms = document.createElement("div");
              // synonyms.classList.add("synonyms");
              // synonyms.appendChild(definitionExplanation);
              // if (def.synonyms.length>0) {
              //   //
              //   console.log(def.synonyms);
              // }

              // })
            });
          });
        });
      })
      .catch((error) => {
        console.log("HATA ŞUDUR" + error);
      })
  );
});

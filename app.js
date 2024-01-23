const URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
//sözlük kapsayıcısı
const dictionaryContainer = document.getElementById("dictionary");
// search düğmesi
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputWord = document.getElementById("word-input").value.toLowerCase();
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
          if (words.hasOwnProperty("phonetic")) {
            const phonetic = document.createElement("p");
            phonetic.classList.add("phonetic");
            phonetic.innerText = words.phonetic;
            definitionContainer.appendChild(phonetic);
          }

          //create meanings
          const meanings = document.createElement("div");
          meanings.classList.add("meanings");
          definitionContainer.appendChild(meanings);

          words.meanings.map((meaning) => {
            const partOfSpeech = document.createElement("p");
            partOfSpeech.classList.add("part-of-speech");
            partOfSpeech.innerText = meaning.partOfSpeech;
            meanings.appendChild(partOfSpeech);

            const synonymContainer = document.createElement("div");
            synonymContainer.classList.add("synonym-container");
            meanings.appendChild(synonymContainer);

            meaning.synonyms.map((synonym) => {
              const synonymWord = document.createElement("p");
              synonymWord.innerText = synonym + "*";
              synonymContainer.appendChild(synonymWord);
            });

            const definition = document.createElement("div");
            definition.classList.add("definition");
            meanings.appendChild(definition);
            meaning.definitions.map((def) => {
              const definitionCard = document.createElement("div");
              definitionCard.classList.add("definition-card");
              definition.appendChild(definitionCard);

              const definitionExplanation = document.createElement("p");
              definitionExplanation.classList.add("definition-explanation");
              definitionExplanation.innerText = def.definition;
              definitionCard.appendChild(definitionExplanation);
              if (def.hasOwnProperty("example")) {
                const definitionExample = document.createElement("p");
                definitionExample.classList.add("definition-example");
                definitionExample.innerText = def.example;
                definitionCard.appendChild(definitionExample);
              }
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
        dictionaryContainer.innerText = "";
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.innerText = "There is no such word 😔";
        dictionaryContainer.appendChild(errorMessage);
      })
  );
});

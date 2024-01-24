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
            const phoneticAudioContainer = document.createElement("div");
            phoneticAudioContainer.classList.add("phonetic-audio-con");
            definitionContainer.appendChild(phoneticAudioContainer);

            const phonetic = document.createElement("p");
            phonetic.classList.add("phonetic");
            phonetic.innerText = words.phonetic;
            phoneticAudioContainer.appendChild(phonetic);

            const audio = document.createElement("audio");
            audio.controls = true;
            phoneticAudioContainer.appendChild(audio);

            const audioSource = document.createElement("source");
            audioSource.src = words.phonetics[0].audio;
            audioSource.type = "audio/ogg";
            audio.appendChild(audioSource);
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

            if (meaning.synonyms.length > 0) {
              const synonymContainer = document.createElement("div");
              synonymContainer.classList.add("synonym-container");
              meanings.appendChild(synonymContainer);

              const synonymText = document.createElement("p");
              synonymText.classList.add("synonym-text");
              synonymText.innerText = "Synonyms:";
              synonymContainer.appendChild(synonymText);

              const synonymWordContainer = document.createElement("div");
              synonymWordContainer.classList.add("synonym-word-container");
              synonymContainer.appendChild(synonymWordContainer);

              meaning.synonyms.map((synonym) => {
                const synonymWord = document.createElement("p");
                synonymWord.classList.add("synonym-word");
                synonymWord.innerText = synonym;
                synonymWordContainer.appendChild(synonymWord);
              });
            }

            const definition = document.createElement("div");
            definition.classList.add("definition");
            meanings.appendChild(definition);
            meaning.definitions.map((def) => {
              const definitionCard = document.createElement("div");
              definitionCard.classList.add("definition-card");
              definition.appendChild(definitionCard);

              const definitionExplanation = document.createElement("p");
              definitionExplanation.classList.add("definition-explanation");
              definitionExplanation.innerText = `- ${def.definition}`;
              definitionCard.appendChild(definitionExplanation);
              if (def.hasOwnProperty("example")) {
                const definitionExample = document.createElement("p");
                definitionExample.classList.add("definition-example");
                definitionExample.innerText = def.example;
                definitionCard.appendChild(definitionExample);
              }
            });
          });

          dictionaryContainer.classList.add("dictionary");
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

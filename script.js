// "https://rickandmortyapi.com/api/character";

let currentPageUrl = "https://rickandmortyapi.com/api/character"; //let pq a variavél pode ser mudada, então quando carregar a pagina vai ter esse valor a url, porem conforme for mudando as paginas, essa variavél vai receber  "novas urls"

window.onload = async () => {
  //window.loado toda vez que a pagina for carregada, vai chamar essa função
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a pagina !");
  }

  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");

  nextButton.addEventListener("click", loadNextPage); //addEventListener monitora eventos dentro do elemento  nextbutton
  backButton.addEventListener("click", loadPreviousPage); //addEventListener monitora eventos dentro do elemento  backButtonn
};

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = ""; //Limpar os resultados anteriores

  try {
    const response = await fetch(url);
    const responseJson = await response.json(); //tranformando em Json

    responseJson.results.forEach((character) => {
      //construindo os cards atraves da api

      const card = document.createElement("div"); //criando um novo elemento dentro da html
      card.style.backgroundImage = `url(${character.image})`;
      //`url('https://rickandmortyapi.com/api/character/avatar/${character.image.replace(
      //`url('${currentPageUrl}/avatar/${character.image.replace(/\D/g, "")}.jpeg')`;
      // expressão regexp
      card.className = "cards";

      const characterNameBg = document.createElement("div"); //criando uma dive para onde vai ficar os nomes dos personagens
      characterNameBg.className = "character-name-bg"; //adicionando uma classe para a div

      const characterName = document.createElement("span"); // criando um span para os nomes dos personagens
      characterName.className = "character-name"; //adcionando uma classe para o span
      characterName.innerText = `${character.name}`; //inserindo o nome dos personagens atraves da api

      characterNameBg.appendChild(characterName); //inserindo div's filhos dentro da div pai <div characternamebg> <div charactername ></div> </div>
      card.appendChild(characterNameBg); //<div card> <div characternamebg> <div charactername ></div> </div> </div>

      //----- Criando a função ao clicar no card abrir o modal
      card.onclick = () => {
        //selecionando o modal
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible"; //deixando o visivel

        const modalContent = document.getElementById("modal-content"); //selecionando o modal-content
        modalContent.innerHTML = ""; //limpando o conteudo do modal

        //--------cirando elementos para o modal------------

        const characterImage = document.createElement("div"); //Pegando a imagem do personagem
        characterImage.style.backgroundImage = `url('https://rickandmortyapi.com/api/character/avatar/${character.image.replace(
          /\D/g,
          ""
        )}.jpeg')`;
        characterImage.className = "character-image"; //criando a classe character-image dentro da div

        const name = document.createElement("span"); //Pegando o nome do personagem na API
        name.className = "character-details";
        name.innerText = `Name: ${character.name}`;

        const characterSpecies = document.createElement("span"); //Pegando a Especie(Humano ou outro tipo) do personagem na API
        characterSpecies.className = "character-details";
        characterSpecies.innerText = `Species: ${character.species}`;

        const characterGender = document.createElement("span"); //Pegando o genero do personagem na API
        characterGender.className = "character-details";
        characterGender.innerText = `Gender: ${character.gender}`;

        const characterStatus = document.createElement("span"); //Pegando o Status(VIVO ou Morto) do personagem na API
        characterStatus.className = "character-details";
        characterStatus.innerText = `Status: ${character.status}`;

        const characterOrigin = document.createElement("span"); //Pegando a origin do personagem na API
        characterOrigin.className = "character-details";
        characterOrigin.innerText = `Origin: ${character.origin.name}`;

        modalContent.appendChild(characterImage); //colocando as div filhos dentro da div pai que é modal contente
        modalContent.appendChild(name);
        modalContent.appendChild(characterSpecies);
        modalContent.appendChild(characterGender);
        modalContent.appendChild(characterStatus);
        modalContent.appendChild(characterOrigin);
      };

      mainContent.appendChild(card); // <div main-content > <div card> <div characternamebg> <div charactername ></div> </div> </div> </div>
    });

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    // Desabilita o botão "Próxima Página" se não houver uma próxima página
    nextButton.disabled = !responseJson.info.next;
    nextButton.style.visibility = responseJson.info.next ? "visible" : "hidden"; // Esconde o botão se não houver próxima página disponível

    // Desabilita o botão "Página Anterior" se estiver na primeira página
    backButton.disabled = !responseJson.info.prev;
    backButton.style.visibility = responseJson.info.prev ? "visible" : "hidden"; // Esconde o botão se não houver página anterior disponível

    currentPageUrl = url;
  } catch (error) {
    alert("Erro ao carregar os personagens !");
    console.log(error);
  }
}

async function loadNextPage() {
  if (!currentPageUrl) return; // Se a URL da página atual não estiver definida, interrompe a execução da função.

  try {
    const response = await fetch(currentPageUrl); // Faz uma requisição HTTP para a URL da página atual
    const responseJson = await response.json(); // Converte a resposta da API para um objeto JSON.

    await loadCharacters(responseJson.info.next); // Chama a função loadCharacters passando a URL da próxima página.
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a próxima página !"); // Caso ocorra um erro, exibe um alerta para o usuário.
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return; // Se a URL da página atual não estiver definida, interrompe a execução da função.

  try {
    const response = await fetch(currentPageUrl); // Faz uma requisição HTTP para a URL da página atual.
    const responseJson = await response.json(); // Converte a resposta da API para um objeto JSON.

    await loadCharacters(responseJson.info.prev); // Chama a função loadCharacters passando a URL da página anterior.
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar a página anteiror!"); // Caso ocorra um erro, exibe um alerta para o usuário.
  }
}

function hideModal() {
  const modal = document.getElementById("modal"); // Obtém o elemento do modal pelo ID.
  modal.style.visibility = "hidden"; // Oculta o modal alterando sua visibilidade para "hidden".(escondido)
}

const ulHTML = document.getElementById("listaDeMusica")

var listaDeMusica =
    [
        {
            imagem: "musica-smells-like-teen-spirit-de-nirvana-og.webp",
            titulo: "Smells Like Teen Spirit",
            audio: "16-bits-musica-294099.mp3"
        },

        {
            imagem: "png-clipart-marilia-mendonca-brazil-music-musica-sertaneja-infiel-oscar-arm-lyrics.png",
            titulo: "Infiel",
            audio: "16-bits-musica-294099.mp3"
        },

        {
            imagem: "1cb6b038ad909da30403a996fa0089c7.avif",
            titulo: "Vida Loka",
            audio: "16-bits-musica-294099.mp3"
        },

        {
            imagem: "gonzaga.jpg",
            titulo: "Asa Branca",
            audio: "16-bits-musica-294099.mp3"
        },

        {
            imagem: "download.jpg",
            titulo: "Hear Me Now",
            audio: "16-bits-musica-294099.mp3"
        },

        {
            imagem: "1200px-Toquinho-75_(27422146651).jpg",
            titulo: "Aquarela do Brasil",
            audio: "16-bits-musica-294099.mp3"
        }
    ]

async function montarLista(lista) {

    var musicas = await fetch("https://musicas-bbhn.onrender.com/musica")
    var listaDeMusica = await musicas.json()

    var listaPronta = lista || listaDeMusica

    ulHTML.innerHTML = ""

    listaPronta.forEach((musica, id) => {
        var li = document.createElement("li")
        li.innerHTML =
            `
            <div>
                <img src="${musica.imagem}" alt="">
                <h2>${musica.titulo}</h2>
            </div>
            <a href="">
                <audio id="meuAudio" controls>
                    <source src="${musica.audio}" type="audio/mpeg">
                </audio>
            </a>
            <button class="excluir"><img src="excluir.png" alt="" onclick="excluirMusica(${musica.id})"></button>
                `

        ulHTML.appendChild(li)

    })

}

montarLista()

function pesquisarMusica() {

    var nome = document.getElementById("pesquisar")

    var listaFiltrada = listaDeMusica.filter(musica => musica.titulo.includes(nome.value))
    montarLista(listaFiltrada)

}

function adicionarMusica() {

    const input = document.getElementById("pesquisar")
    const musica = input.value.trim()

    if (musica) {
        listaDeMusica.push({ titulo: musica })
        alert("Musica adicionada!")
        montarLista(listaDeMusica)

    }

    else {
        alert("Por favor, insira o nome de uma música.")
    }

}

async function excluirMusica(index){

    let req=await fetch("http://localhost:1234/musica/"+index,
        {method:"DELETE"})
    montarLista()
}

/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto questi commenti.
- Pattern fondamentale: stato -> render() -> eventi.
  Tutto cio' che vedi a schermo dipende dallo stato.
  Gli eventi modificano lo stato e poi chiamano render().
- Apri index.html nel browser. Apri la console (DevTools) per gli errori.
- Cerca su MDN solo i concetti dichiarati come "cerca tu":
  localStorage, Blob/URL.createObjectURL, FileReader.
  Tutto il resto e' stato visto in settimana.
- Niente AI per generare codice. Niente template scaricati.
*/


/* STATO
   In cima al file definisci poche variabili globali:
   - un array di oggetti come dato principale (es. libri, ricette, film, ...)
   - una variabile per il filtro corrente
   - una variabile per l'ordinamento corrente
   - una variabile per la stringa di ricerca corrente
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const form = document.querySelector('#viniliForm')
const statistiche = document.querySelector('.statistiche')
const lista = document.querySelector('.lista')
const dark = document.querySelector('#dark')
const search = document.querySelector('#search');
const filter = document.querySelector('#filter');
const sort = document.querySelector('#sort');

let vinili = [
    {
        id: 1,
        album: "Thriller",
        artista: "Michael Jackson",
        anno: 1982,
        stato: "Acquistato",
    },
    {
        id: 2,
        album: "Hybrid Theory",
        artista: "Linkin park",
        anno: 2000,
        stato: "Da acquistare",

    },
    {
        id: 3,
        album: "The Dark Side of the Moon",
        artista: "Pink Floyd",
        anno: 1973,
        stato: "Da acquistare",
    }
];
let filtroCorrente = "Tutti";
let ordinamentoCorrente = "titolo";
let ricercaCorrente = "";

/* RENDER()
   Una sola funzione che ridipinge la lista. A ogni chiamata:
   1) parte dall'array completo,
   2) filtra,
   3) ordina,
   4) svuota il container DOM,
   5) ricrea gli elementi DOM per gli oggetti risultanti.
   Aggiorna anche conteggi e statistiche.
   Salva lo stato in localStorage in fondo a render() (cerca tu come funziona).
*/

/* SCRIVI QUI LA TUA RISPOSTA */
const render = () => {
    let listaFiltrata = [...vinili]; //mi copio la lista originale con spread per lavorarci senza modificarla

    //FILTRO
    if (filtroCorrente !== "Tutti") {
        listaFiltrata = listaFiltrata.filter(
            (v) => v.stato === filtroCorrente
        );
    }

    //RICERCA
    if (ricercaCorrente !== "") {
        listaFiltrata = listaFiltrata.filter((v) =>
            v.album.toLowerCase().includes(ricercaCorrente.toLowerCase()) ||
            v.artista.toLowerCase().includes(ricercaCorrente.toLowerCase())
        );
    }
    //ORDINAMENTO
    if (ordinamentoCorrente === "anno") {
        listaFiltrata.sort((a, b) => a.anno - b.anno);
    } else {
        listaFiltrata.sort((a, b) =>
            a.album.localeCompare(b.album)
        );
    }
    lista.innerHTML = "";

    //Creazione delle card
    listaFiltrata.forEach((vinile) => {
        const card = document.createElement("div");
        card.classList.add("card");
        if (vinile.stato === "Acquistato") {
            card.style.borderLeftColor = "green";
        } else {
            card.style.borderLeftColor = "gold";
        };

        //INFO
        const info = document.createElement("div");
        info.classList.add("info");
        const titolo = document.createElement("h3");
        titolo.textContent = vinile.album;
        const artista = document.createElement("p");
        artista.textContent = `${vinile.artista} - ${vinile.anno}`;
        info.appendChild(titolo);
        info.appendChild(artista);

        //ACTIONS, BADGE, BUTTON
        const actions=document.createElement("div");
        actions.classList.add("actions")

        const badge = document.createElement("span");
        badge.classList.add("badge");
        if (vinile.stato === "Acquistato") {
            badge.classList.add("green");
        } else {
            badge.classList.add("gold");
        }
        badge.textContent = vinile.stato;

        const toggle = document.createElement("button");
        toggle.classList.add("toggle");
        toggle.dataset.id = vinile.id;
        toggle.textContent = "Cambia stato";

        const modifica = document.createElement("button");
        modifica.classList.add("modifica");
        modifica.dataset.id = vinile.id;
        modifica.textContent = "Modifica";

        const deleteButton=document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.dataset.id=vinile.id;
        deleteButton.textContent="Elimina";

        actions.appendChild(badge);
        actions.appendChild(toggle);
        actions.appendChild(modifica);
        actions.appendChild(deleteButton);

        card.appendChild(info);
        card.appendChild(actions);

        lista.appendChild(card);
    });

    //STATISTICHE


    const totale = statistiche.querySelector('#totale');
    const acquistati=statistiche.querySelector('#acquistati');
    const daAcquistare=statistiche.querySelector('#daAcquistare');
    const barraPercentuale=statistiche.querySelector('#barraPercentuale');

    const acquistatiNumber = vinili.filter((v) => 
    v.stato==="Acquistato").length;
    const daAcquistareNumber = vinili.filter((v)=>
    v.stato==="Da acquistare").length;
    const percentuale = Math.round((acquistatiNumber/vinili.length)*100);

    console.log(totale);
    //Adesso aggiorno il DOM
    totale.textContent=vinili.length;
    acquistati.textContent=acquistatiNumber;
    daAcquistare.textContent=daAcquistareNumber;
    barraPercentuale.style.width=percentuale+"%";

}
/* FORM CON VALIDAZIONE
   addEventListener("submit") sul form.
   event.preventDefault().
   Leggi i valori con .value.trim().
   Se uno dei campi obbligatori e' vuoto, mostra errore e return.
   Altrimenti push allo stato, form.reset(), render().
   Id univoco con Date.now().
*/

/* SCRIVI QUI LA TUA RISPOSTA */
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titolo = document.querySelector("#titolo").value.trim();
    const autore = document.querySelector("#autore").value.trim();
    const anno = document.querySelector("#anno").value.trim();
    const stato = document.querySelector("#stato").value;

    if (!titolo || !autore || !anno) {
        alert("Compila tutti i campi");
        return;
    }
    const nuovoVinile = {
        id: Date.now(),
        album: titolo,
        artista: autore,
        anno: Number(anno),
        stato: stato
    };
    vinili.push(nuovoVinile);
    form.reset();
    render();
});
/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */
lista.addEventListener("click", (event) => {
    const id = Number(event.target.dataset.id);
    //ELIMINA
    if (event.target.classList.contains("delete")) {
        const index = vinili.findIndex ((v)=>
        v.id===id);
        vinili.splice(index, 1);
        render();
    }
    //MODIFICA
    if (event.target.classList.contains("modifica")) {
        const nuovoTitolo = prompt("Nuovo titolo");
        if (!nuovoTitolo) return;
        const vinile = vinili.find((v) =>
            v.id === id);
        vinile.album = nuovoTitolo;
        render();
    }

    //CAMBIO STATO
    if (event.target.classList.contains("toggle")) {
        const vinile = vinili.find((v) =>
            v.id === id
        );
        if (vinile.stato === "Acquistato") {
            vinile.stato = "Da acquistare";
        } else {
            vinile.stato = "Acquistato";
        }
        render();
    }
});
/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
search.addEventListener("input", (e) => {
    ricercaCorrente = e.target.value;
    render();
});

//FILTER
filter.addEventListener("change", (e) => {
    filtroCorrente = e.target.value;
    render();
});

//SORT
sort.addEventListener("change", (e) => {
    ordinamentoCorrente = e.target.value;
    render();
});
/* NOTIFICHE TEMPORANEE
   Funzione notifica(testo) che imposta il testo del <div id="notifica">,
   lo mostra (display: block), poi dopo 3000ms (setTimeout) lo nasconde.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* TEMA CHIARO/SCURO
   Un button che chiama document.body.classList.toggle("dark").
   In CSS scrivi le regole opposte (es. body.dark { background: #111; ... }).
*/

/* SCRIVI QUI LA TUA RISPOSTA */
dark.addEventListener("click", function () {
    document.body.classList.toggle("darkMode");
    if (document.body.classList.contains("darkMode")) {
        dark.textContent = "Tema chiaro";
    } else {
        dark.textContent = "Tema scuro";
    }
});

render()
/* PERSISTENZA — localStorage (cerca tu su MDN)
   - In fondo a render(), salva lo stato:
       localStorage.setItem("dati", JSON.stringify(stato));
   - All'avvio, prima della prima render(), carica:
       const salvato = localStorage.getItem("dati");
       if (salvato) stato = JSON.parse(salvato);
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* RIORDINO ↑ ↓
   Due button su ogni elemento. Click su ↑ scambia con il precedente nell'array,
   ↓ con il successivo. Event delegation. Poi render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* ESPORTAZIONE / IMPORTAZIONE JSON (cerca tu su MDN)
   - Esporta: crea un Blob con JSON.stringify(stato), genera un URL con
     URL.createObjectURL e simula il click su un <a download>.
   - Importa: <input type="file"> + FileReader per leggere il contenuto come
     testo, JSON.parse, sostituisci lo stato, render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* STATISTICHE GRAFICHE
   Almeno due indicatori: contatori grandi e/o barre orizzontali
   (<div> con width: X% in base al dato). Aggiorna dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* MULTI-VISTA — lista / card / tabella
   Una variabile globale "vista" che render() legge per decidere quale HTML
   produrre. Tre button cambiano "vista" e chiamano render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* CATEGORIE
   Aggiungi un campo categoria nello schema. Nel form un <select> per sceglierla.
   In render(), raggruppa con reduce in { categoria: [elementi] } e disegna un
   header per categoria con sotto la lista di quella categoria.
*/

/* SCRIVI QUI LA TUA RISPOSTA */
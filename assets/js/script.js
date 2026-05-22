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
const form = document.querySelector('.form')
const controlli = document.querySelector('.controlli')
const statistiche = document.querySelector('.statistiche')
const lista = document.querySelector('.lista')
const dark = document.querySelector('#dark')

let vinili = [
    {
        id:1,
        album: "Thriller",
        artista: "Michael Jackson",
        anno: 1982,
        stato: "Acquistato",
    },
    {
        id:2,
        album: "Hybrid Theory",
        artista: "Linkin park",
        anno: 2000,
        stato: "Da acquistare",

    },
    {
        id:3,
        album: "The Dark Side of the Moon",
        artista: "Pink Floyd",
        anno: 1973,
        stato:"Da acquistare",
    }
] ;
let filtroCorrente = "Tutti" ;
let ordinamentoCorrente = "titolo" ;
let ricercaCorrente = "" ;

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
    lista.innerHTML="";
    listaFiltrata.forEach((vinile) => {
        const card = document.createElement("div");
        card.classList.add("card");
        if (vinile.stato==="letto") {
            card.style.borderLeftColor="green";
        } else {
            card.style.borderLeftColor="gold";
        }
        card.innerHTML=`<div class ="prodotto">
        <h3>${vinile.album}</h3>
        <p>${vinile.artista}-${vinile.anno}</p>
        </div>
        <div class="status">
        <span class="badge">${vinile.stato}</span>
        <button>Modifica</button>
        <button>Elimina</button>
        </div>` ;
        lista.appendChild(card);
    }) 
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
form.addEventListener ("submit", (event) => {
    event.preventDefault();
    const titolo = document.getElementById("titolo").value.trim();
    const autore = document.getElementById("autore").value.trim();
    const anno = document.getElementById("anno").value.trim();
    const stato = document.getElementById("stato").value;

    if (!titolo || !autore || !anno) {
        alert("Compila tutti i campi");
        return;
    }
    const newVinile = {
        id:
    }
})

/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */


/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

/* SCRIVI QUI LA TUA RISPOSTA */


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
        dark.textContent="Tema chiaro";
    } else {
        dark.textContent="Tema scuro";
    }
});

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
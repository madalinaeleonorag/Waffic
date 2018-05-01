<template>
  <v-layout>
    <v-container fluid>
<h2><p> Tutorial de utilizare a aplicației </p></h2>
<p>
Încă din pagina principală a aplicației, prezentă în Figura 52, vizitatorului i se oferă posibilitatea de a intra în cont sau crea un cont nou, de a vedea abonamentele, trimite un contact, citi știrile în domeniu sau vizualiza ghidul pentru utilizarea aplicației. Accesarea unei astfel de funcționalități se face prin apăsarea butonului corespondent din meniul lateral. De asemenea, în subsolul paginii se pot vizualiza Termenii și condițiile, Politica de confidențialitate și Drepturile de autor, urmând aceeași procedură. 
</p><p>
<img :src="require('../assets/Help/1.png')"/>
</p><p>
Apăsarea butonului de ”Intră în cont / Creează cont nou” conduce la fereastra din Figura 53, ce oferă posibilitatea utilizatorului să intre în contul personal prin completarea câmpurilor ”Email” și ”Parolă”, să își creeze un cont nou apăsând butonul de ”Cont nou” sau să recupereze parola, urmând să introducă în câmpul din Figura 57, adresa electronică aferentă contului pentru care se dorește recuperarea parolei.
</p><p>
<img :src="require('../assets/Help/2.png')"/>
</p><p>
Intrarea în cont se poate face doar cu date valide. Din această cauză, există corectare automată pentru câmpurile cărora le este necesar. Un exemplu de eroare obținută pentru completarea incorectă a unui câmp este evidențiat în Figura 54. Adresei electronice îi este necesară prezența semnului ”@” și a punctului de legătură cu domeniul, pentru a putea fi declarată validă. 
</p><p>
<img :src="require('../assets/Help/3.png')"/>
</p><p>
În cazul în care adresa electronică este corect formată, însă inexistentă în baza de date, se va primi o eroare precum în Figura 55.
</p><p>
<img :src="require('../assets/Help/4.png')"/>
</p><p>
În cazul în care adresa electronică este validă, însă parola este incorectă, se va primi eroarea din Figura 55 în care se specifică acest aspect
</p><p>
<img :src="require('../assets/Help/5.png')"/>
</p><p>
<img :src="require('../assets/Help/6.png')"/>
</p><p>
Pașii de recuperare a parolei sunt:
-	Introducerea adresei electronice pentru care se dorește recuperarea parolei (în cazul în care aceasta nu există în baza de date, se va primi o eroare precum în Figura 55)
-	Primirea unui mesaj cu instrucțiunile de recuperare a parolei pe adresa electronică
</p><p>
<img :src="require('../assets/Help/7.png')"/>
</p><p>
-	Introducerea unei noi parole aleasă de către utilizator. La acest pas se ajunge apăsând pe referința oferită automat în mesajul primit. Acesta poate vedea ce parolă introduce prin apăsarea iconiței alăturate câmpului de ”Parolă nouă”, vizibil în Figura 59.
</p><p>
<img :src="require('../assets/Help/8.png')"/>
</p><p>
-	După introducerea unei noi parole și salvarea acesteia prin apăsarea butonului ”Save”, acesta este înștiințat că schimbarea parolei a fost efectuată cu succes și se poate întoarce la autentificare cu noua parolă.
</p><p>
<img :src="require('../assets/Help/9.png')"/>
</p><p>
Apăsarea butonului ”Cont nou” duce la apariția ferestrei din Figura 61, unde i se solicită noului utilizator să introducă adresa electronică, numele, prenumele, localitatea, data nașterii și parola contului. Pentru parola contului este necesară introducerea de două ori, pentru a se verifica corectitudinea acesteia. 
</p><p>
<img :src="require('../assets/Help/10.png')"/>
</p><p>
	Câmpurile considerate obligatorii pentru crearea contului sunt adresa electronică și parola. În cazul omiterii completării acestora, noul utilizator va fi notificat precum în Figura 62. Dacă acesta apasă pe butonul ”Înregistrare” cu omiterea acestor câmpuri, va fi notificat iar înregistrarea nu va avea loc. În cazul în care se dorește anularea acțiunii de creare a unui cont nou, acesta poate apăsa butonul ”Înapoi”.
</p><p>
<img :src="require('../assets/Help/11.png')"/>
</p>
    </v-container>
  </v-layout>
</template>

<style>
img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
</style>
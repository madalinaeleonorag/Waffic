<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list dense>
        <template v-for="item in items">
                <v-layout
                  row
                  v-if="item.heading"
                  align-center
                  :key="item.heading"
                >
                  <v-flex xs6>
                    <v-subheader v-if="item.heading">
                      {{ item.heading }}
                    </v-subheader>
                  </v-flex>
                  <v-flex xs6 class="text-xs-center">
                  </v-flex>
                </v-layout>
                <v-list-group
                  v-else-if="item.children"
                  v-model="item.model"
                  :key="item.text"
                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                  append-icon=""
                >
                  <v-list-tile slot="activator">
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ item.text }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile
                    v-for="(child, i) in item.children"
                    :key="i"
                    @click=""
                  >
                    <v-list-tile-action v-if="child.icon">
                      <v-icon>{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ child.text }}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
                <v-list-tile v-else @click="" :key="item.text">
                  <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      {{ item.text }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
</template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="teal darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">WAFFIC</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Caută locația"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-menu offset-y>
         <v-btn slot="activator"> AN
          </v-btn>
          <v-list>
            <v-list-tile :value="ani" v-for="(event,index) in events" :key="index" @click="">
             <v-list-tile-title>
              {{ani}}
             </v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>
          <v-menu offset-y>
         <v-btn slot="activator"> LUNA
          </v-btn>
          <v-list>
            <v-list-tile v-for="month in months" :key="month.nume" @click="">
             <v-list-tile-title>
                {{month.nume}}
             </v-list-tile-title>
            </v-list-tile>
          </v-list>
         </v-menu>


<!-- ISTORIC CONT + ADD LOCATII FAVORITE -->

ISTORIC CONT + ADD LOCATII FAVORITE

<v-list two-line>
  <v-list-tile avatar v-for="(event,index) in events" :key="index">
    <v-list-tile-content>
      <v-list-tile-title>
        {{event.titlu}}
      </v-list-tile-title>
      <v-list-tile-sub-title v-html="event.descriere">
      </v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action>
      <v-list-tile-action-text>
        {{event.data | longtimeago}}
      </v-list-tile-action-text>
      <v-icon :class="{'green--text':event.prezenta, 'red--text':!event.prezenta}" @click="event.prezenta=!event.prezenta">
        {{event.prezenta ? 'star' : 'star_border'}}
      </v-icon>
    </v-list-tile-action>
  </v-list-tile>
</v-list>


      </v-container>
    </v-content>
    <v-btn
      fab
      bottom
      right
      color="teal"
      dark
      fixed
      @click.stop="dialog = true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <!--  CONT NOU -->
        <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title" 
        >
          Creare cont nou
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Nume de utilizator"
                  color="teal"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Nume"
                required
                color="teal"
                hint="Numele de familie"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Prenume"
                color="teal"
                required
              ></v-text-field>
            </v-flex>
               <v-flex xs6>
              <v-text-field
                placeholder="Parolă"
                required
                color="teal"
                hint="Minim 8 caractere"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Repetă parolă"  
                required             
                color="teal" 
                hint="Repetă parola pentru siguranță"
              ></v-text-field>
            </v-flex>
              <v-flex xs12>
            Data nașterii:
            </v-flex>
            <v-flex xs4>
              <v-text-field
                placeholder="Zi"  
                required             
                color="teal" 
                hint="Ziua nașterii"
              ></v-text-field>
            </v-flex>
              <v-flex xs4>
              <v-text-field
                placeholder="Lună"  
                required             
                color="teal" 
                hint="Luna nașterii"
              ></v-text-field>
            </v-flex>
                        <v-flex xs4>
              <v-text-field
                placeholder="An"  
                required             
                color="teal" 
                hint="Anul nașterii"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
                color="teal"
                required
                hint="Adresa de poștă electronică"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
            <input type="checkbox" v-model="agree"/> Accept Termenii și condițiile de utilizare
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="teal" @click="termeni = true">Termeni și condiții</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click=" (login=true) && (dialog = false)">Am deja cont</v-btn>
          <v-btn flat @click="dialog = false">Anulare</v-btn>
          <v-btn flat color="teal" @click="(continuare = true) && (dialog=false)">Continuare</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- LOGIN -->
    <v-dialog v-model="login" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title" 
        >
          Intră în cont
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  placeholder="Nume de utilizator"
                  color="teal"
                ></v-text-field>
              </v-layout>
            </v-flex>
               <v-flex xs12>
              <v-text-field
                placeholder="Parolă"
                required
                color="teal"
                hint="Minim 8 caractere"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="(recoverpsw = true)&&(login=false)">Am uitat parola</v-btn>
          <v-btn flat @click="login = false">Anulare</v-btn>
          <v-btn flat color="teal" @click="(login = false)">Intră în cont</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- RECUPEREAZA PAROLA -->
        <v-dialog v-model="recoverpsw" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title" 
        >
          Recuperează parola
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  placeholder="Nume de utilizator"
                  color="teal"
                ></v-text-field>
              </v-layout>
            </v-flex>
               <v-flex xs12>
              <v-text-field
                placeholder="Care este luna nașterii?"
                required
                color="teal"
                hint="Doar cifre"
              ></v-text-field>
            </v-flex>
               <v-flex xs12>
              <v-text-field
                placeholder="Care este anul nașterii?"
                required
                color="teal"
                hint="Doar cifre"
              ></v-text-field>
            </v-flex>
              <v-flex xs12>
              <v-text-field
                placeholder="Care este adresa de email a contului?"
                required
                color="teal"
                hint="Este obligatorie extensia @"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="teal" @click="(login=true)&&(recoverpsw = false)">Mi-am amintit parola</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="recoverpsw = false">Anulare</v-btn>
          <v-btn flat color="teal" @click="(recoverpsw1 = true)&&(recoverpsw = false)">Continuă</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- TERMENI SI CONDITII -->
    <v-dialog v-model="termeni" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title"
        >
          Termeni și condiții de utilizare
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>

TERMENI SI CONDITII
           </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="termeni = false">Înapoi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- CONFIDENTIALITATE -->
<v-dialog v-model="confidențialitate" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title"
        >
          Politica de confidențialitate
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
<p><b>1. Politica prelucrarii datelor cu caracter personal</b></p>
SC Waffic SRL in calitate de autor, propietar si administrator al site-ului web www.waffic.ro, respecta caracterul privat si securitatea prelucrarii datelor cu caracter personal al fiecarei persoane care acceseaza site-ul web in vederea obținerii de informații.
<br>In conformitate cu dispozitiile Legii nr. 677/2001 pentru protectia persoanelor cu privire la prelucrarea datelor cu caracter personal si libera circulatie a acestor date si ale Legii nr. 506/2004 privind prelucrarea datelor cu caracter personal si protectia vietii private, Waffic are obligatia de a administra in conditii de siguranta si numai pentru scopurile prezentate mai jos, datele personale care ne sunt furnizate.
<br>Societatea noastra se obliga sa pastreze confidentialitatea datelor personale furnizate prin intermediul site-ului www.waffic.ro, asa cum prevad dispozitiile legii 677/2001 cu modificarile ulterioare privind protectia datelor personale.
<br>In conformitate cu dispozitiile Legii nr. 677/2001, persoanele inregistrate, in caliatate de persoane vizate, au urmatoarele drepturi:
<br>- Dreptul la informare (art.12)
<br>- Dreptul de acces la date cu caracter personal (art.13);
<br>- Dreptul de interventie asupra datelor cu caracter personal (art.14);
<br>- Dreptul de opozitie (art.15);
<br>- Dreptul de a nu fi supus unei decizii individuale (art.17);
<br>- Dreptul de a se adresa justitiei (art.18).
<br>Orice informatie furnizata de dumneavoastra va fi considerata si va reprezenta consimtamintul dumneavoastra expres ca datele dumneavoastra personale sa fie folosite de Waffic in conformitate cu scopurile mentionate mai jos.
<br>Daca doriti ca datele dumneavoastra personale sa fie actualizate sau scoase din baza de date, ori aveti intrebari legate de confidentialitatea datelor, ne puteti contacta / notifica oricand utilizand datele de contact existente pe site.
<br>Daca nu doriti ca datele dumneavoastra sa fie colectate, va rugam sa nu ni le furnizati.
<br><br><p><b>2. Scopul colectarii datelor</b></p>
- oferirea serviciilor solicitate de dumneavoastra;
<br>- transmiterii de oferte, mesaje publicitare si de marketing;
<br>- pentru activitati specifice departamentului Resurse Umane, in situatia in care sunteti interesati sa faceti parte din echipa Waffic si ati trimis un CV, catre departamentul Resurse Umane, prin intermediul site-ului.
<br>Waffic nu va dezvalui unei terte parti niciuna dintre datele dumneavoastra (informatii personale sau informatii optionale) fara acordul dumneavoastra, cu exceptia cazului in care avem convingerea, de buna credinta, ca legislatia ne impune acest lucru sau ca acest lucru este necesar pentru protejarea drepturilor sau a proprietatii societatii noastre.
<br><br><p><b>3. Securitatea datelor colectate si procesate</b></p>
Waffic utilizeaza metode si tehnologii de securitate avansate, impreuna cu politici stricte aplicate salariatilor si procedurilor de lucru, incluzand audit-ul periodic pentru a proteja datele cu caracter personal, colectate si procesate conform prevederilor legale in vigoare.
<br>Echipamentul de tip server pe care este gazduit site-ul web prin intermediul caruia colectam date cu caracter personal este protejat atat la accesul fizic cat si la accesul de la distanta (limitat), fiind instalat intr-un centru de date si supus periodic unui audit de securitate.
<br>Depunem toate eforturile rezonabile, justificate comercial pentru a va proteja datele cu caracter personal colectate, analizam noile tehnologii in domeniu si, atunci si daca este cazul, le aplicam in vederea upgrade-ului sistemelor noastre de securitate.
<br><br><p><b>4. Definitii</b></p>
<b>Date cu caracter personal</b>: Orice informatii referitoare la o persoana fizica identificata sau identificabila; o persoana identificabila este acea persoana care poate fi identificata, direct sau indirect, in mod particular prin referire la un numar de identificare ori la unul sau la mai multi factori specifici identitatii sale fizice, fiziologice, psihice, economice, culturale sau sociale.
<br><b>Prelucrarea datelor cu caracter personal</b>: Orice operatiune sau set de operatiuni care se efectueaza asupra datelor cu character personal, prin mijloace automate sau neautomate, cum ar fi colectarea, inregistrarea, organizarea, stocarea, adaptarea ori modificarea, extragerea, consultarea, utilizarea, dezvaluirea catre terti prin transmitere, diseminare sau in orice alt mod, alaturarea ori combinarea, blocarea, stergerea sau distrugerea.
<br><b>Stocarea</b>: Pastrarea pe orice fel de suport a datelor cu caracter personal culese.
<br><b>Operator</b>: Orice persoana fizica sau juridica, de drept privat ori de drept public, inclusiv autoritatile publice, institutiile si structurile teritoriale ale acestora, care stabileste scopul si mijloacele de prelucrare a datelor cu caracter personal.
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="confidențialitate = false">Înapoi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- DREPTURI DE AUTOR -->
    <v-dialog v-model="drepturiautor" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title"
        >
          Politica privind drepturile de autor
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
<p><b>Waffic</b> respectă  drepturile de proprietate intelectuală ale altora și solicită utilizatorilor serviciilor să facă același lucru. Dacă credeți că un anumit conținut, care apare pe hărțile rutiere în timp real ale Waffic, încalcă drepturile de autor pe care le dețineți sau le reprezentați, puteți trimite o notificare scrisă, în conformitate cu prevederile Digital Millennium Copyright Act ("DMCA").</p>
<br>Pentru eficiență, notificarea dumneavoastră privind  încălcarea presupusă trebuie să includă următoarele informații:
<br>- O semnătură fizică sau electronică a unei persoane autorizate să acționeze în numele proprietarului unui drept exclusiv care se presupune că a fost încălcat;
<br>- Identificarea operei protejate prin drepturi de autor, despre care se susține că a fost încălcată prin utilizarea site-ului web sau dacă mai multe lucrări protejate prin drepturi de autor sunt acoperite printr-o singură notificare, o listă reprezentativă a acestor lucrări;
<br>- Identificarea materialului despre care se presupune că încalcă sau care face obiectul unei activități care încalcă drepturile și că accesul la acesta este dezactivat și informații suficient de rezonabile pentru a permite Waffic să localizeze materialul, inclusiv identificatorul exact al resurselor (Uniform Resource Identifier) ​​sau coordonatele pe hărțile Serviciului în care ați descoperit locul de muncă protejat prin drepturi de autor susținând că a fost încălcat;
<br>- Informații suficiente pentru a permite Waffic să vă contacteze, cum ar fi o adresă, un număr de telefon și, dacă este disponibil, o adresă de poștă electronică la care puteți fi contactat;
<br>- O declarație conform căreia aveți convingerea că utilizarea materialului în modul în care se plânge nu este autorizată de proprietarul drepturilor de autor, de agentul său sau de lege;
<br>- O declarație conform căreia informațiile din notificare sunt corecte și sub sancțiunea pedepsei cu privire la faptul că sunteți autorizat să acționați în numele proprietarului unui drept exclusiv despre care se presupune că a fost încălcat.
<br><br>După primirea comunicării, Waffic vă poate solicita să furnizați informații suplimentare, înainte de a elimina orice conținut afișat pe site, pe care Waffic îl consideră necesar pentru a respecta prevederile DMCA.
<br><br><p><b>Contra-notificare</b></p>
Puteți să trimiteți o contra-notificare agentului pentru drepturile de autor. Pentru a fi eficient, contranotificarea dvs. trebuie să fie o comunicare scrisă furnizată agentului pentru drepturile de autor care include în mod substanțial următoarele:
<br>- Semnătura dvs. fizică sau electronică;
<br>- Identificarea materialului la care a fost dezactivat accesul și locația la care a apărut materialul înainte de accesul la acesta a fost dezactivată.
<br>- O declarație sub sancțiunea sperjurului că aveți o credință de bună credință că materialul a fost dezactivat ca urmare a unei greșeli sau a unei identificări greșite a materialului care urmează să fie dezactivat;
<br>- Numele dvs., adresa și numărul de telefon și o declarație conform căreia sunteți de acord cu jurisdicția Curții Districtuale Federale.
<br><br>După primirea unei contranotificări, Waffic va furniza cu promptitudine persoanei care a trimis notificarea privind încălcarea drepturilor de autor cu o copie a contranotificării și va informa acea persoană că Waffic va înlocui materialul eliminat sau va înceta să dezactiveze accesul la materialul respectiv.
<br><br><p><b>Declarații false</b></p>
În conformitate cu dispozițiile DMCA, orice persoană care prezintă în mod deliberat o eroare materială: (1) că materialul încalcă sau (2) materialul a fost eliminat sau dezactivat din greșeală sau prin identificarea greșită, va fi răspunzător pentru orice daune, inclusiv costurile și onorariile avocaților.
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="drepturiautor = false">Înapoi</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- ADAUGA ABONAMENT (PAS2 - INREGISTRARE) -->
    <v-dialog v-model="continuare" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title"
        >
          Adaugă un abonament
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
ABONAMENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
ABONAMENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
ABONAMENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
ABONAMENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
ABONAMENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
ABONAMENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="(abonament = true)&&(continuare=false)">Adaugă</v-btn>
          <v-btn flat color="teal" @click="(login= true)&&(continuare=false)">Continuă fără abonament</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- FORMULAR ADAUGARE ABONAMENT (FORMA DE PLATA) -->
    <v-dialog v-model="abonament" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title"
        >
        Formular de plată
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
            ascascsdc
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="(continuare=true)&&(abonament = !abonament)">Anulare</v-btn>
          <v-btn flat color="teal" @click="(login=true)&&(abonament = !abonament)">Adaugă</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- AFISARE NOUA PAROLA -->
    <v-dialog v-model="recoverpsw1" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title"
        >
        Noua ta parolă este
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
            {{pswnew}}
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="(recoverpsw1=false)">Ieșire</v-btn>
          <v-btn flat color="teal" @click="(login=true)&&(recoverpsw1 = false)">Continuă către autentificare</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
<!-- FOOTER -->
      <v-footer app font-size="3px">
          <v-spacer></v-spacer>
&#169; Creat de<v-btn href="https://www.facebook.com/mdx.madalinaeleonora" target="_blank" flat color="teal">Mădălina-Eleonora Gheorghe</v-btn>
 - <v-btn flat color="teal" @click="drepturiautor = true">Drepturi de autor</v-btn>
 - <v-btn flat color="teal" @click="termeni = true">Termeni și condiții</v-btn>
 - <v-btn flat color="teal" @click="confidențialitate = true">Politica de confidențialitate</v-btn>
         <v-spacer></v-spacer>
      </v-footer>
  </v-app>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'profil',
    data: () => ({
      dialog: false,
      dialog2: false,
      agree: false,
      login: false,
      payment: false,
      continuare: false,
      termeni: false,
      recoverpsw: false,
      confidențialitate: false,
      drepturiautor: false,
      pswnew:'parola noua aici',
      recoverpsw1: false,
      abonament: false,
      drawer: null,
      years: [],
      months: [
        { nume: 'January' },
        { nume: 'February' },
        { nume: 'March' },
        { nume: 'April' },
        { nume: 'May' },
        { nume: 'June' },
        { nume: 'July' },
        { nume: 'August' },
        { nume: 'September' },
        { nume: 'October' },
        { nume: 'November' },
        { nume: 'December' }
      ],

      events: [
        {
          titlu: 'titlu1',
          avatar: 'http://lorempixel.com/100/100/',
          descriere: 'asdhihdckeckj',
          data: new Date('2017-04-11T10:20:30Z'),
          prezenta: true
        },
        {
          titlu: 'titlu2',
          avatar: 'http://lorempixel.com/100/100/',
          descriere: '<b>asdhihdckeckj bsdfjbhsdhfskkkf</b>',
          data: new Date((new Date()).setDate(25)),
          prezenta: false
        },
        {
          titlu: 'titlu3',
          avatar: 'http://lorempixel.com/100/100/',
          descriere: 'asdhihdckeckj',
          data: new Date('2017-07-11T10:20:30Z'),
          prezenta: true
        },
        {
          titlu: 'titlu4',
          avatar: 'http://lorempixel.com/100/100/',
          descriere: 'asdhihdckeckj',
          data: new Date(),
          prezenta: true
        }
      ],
      items: [{
          icon: 'account_circle',
          text: 'Intră în cont',
          ceva: 'login'
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Detalii cont',
          model: false,
          children: [{
              icon: 'person',
              text: 'Date personale'
            },
            {
              icon: 'alarm_on',
              text: 'Alarme stabilite'
            },
            {
              icon: 'mode_edit',
              text: 'Modifică parola'
            },
            {
              icon: 'directions',
              text: 'Istoric rute'
            },
            {
              icon: 'favorite',
              text: 'Locații preferate'
            },
            {
              icon: 'add_shopping_cart',
              text: 'Abonamente'
            }
          ]
        },
        {
          icon: 'chat',
          text: 'Contact'
        },
        {
          icon: 'announcement',
          text: 'Știri'
        },
        {
          icon: 'help',
          text: 'Ajutor'
        },
        {
          icon: 'block',
          text: 'Ieșire cont'
        }
      ]
    }),
computed : {
  ani () {
      let ani = []
      this.events.forEach((event, index) => {
        let an = event.data.getFullYear()
        if (!ani.includes(an)) {
          ani.push(an)
        }
      })
      return ani
    }
},
filters: {
  longtimeago (date) {
    return moment(date).fromNow()
  }
},
props: {
      source: String
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
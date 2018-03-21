<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed :clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading">
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
            append-icon="">
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
              @click="">
              <v-list-tile-action v-if="child.icon">
                <v-icon>
                  {{ child.icon }}
                </v-icon>
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
              <v-icon>
                {{ item.icon }}
              </v-icon>
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
      fixed>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer">
        </v-toolbar-side-icon>
        <span class="hidden-sm-and-down">WAFFIC</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Caută locația"
        class="hidden-sm-and-down">
      </v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-list two-line>
          <v-menu offset-y>
            <v-btn slot="activator"> AN
            </v-btn>
            <v-list>
              <v-list-tile @click="filter.an = null">
                <v-list-tile-title>
                  All years
                  <template v-if="filter.an === null">
                    &#10004;
                  </template>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-list>
              <v-list-tile v-for="an in ani" :key="an" @click="filter.an = an">
                <v-list-tile-title>
                  {{an}}
                  <template v-if="an === filter.an">
                    &#10004;
                  </template>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu offset-y>
            <v-btn slot="activator"> LUNA </v-btn>
            <v-list>
              <v-list-tile @click="filter.luna = null">
                <v-list-tile-title>
                  All months
                  <template v-if="filter.luna === null">
                    &#10004;
                  </template>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
            <v-list>
              <v-list-tile v-for="(month,index) in months" :key="index" @click="filter.luna = index">
                <v-list-tile-title>
                  {{month.nume}}
                  <template v-if="index === filter.luna">
                    &#10004;
                  </template>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu
            ref="menu1"
            lazy
            :close-on-content-click="false"
            v-model="menu1"
            transition="scale-transition"
            offset-y
            :nudge-right="40"
            :return-value.sync="date1">
            <v-text-field
              slot="activator"
              label="Data de start"
              v-model="date1"
              readonly>
            </v-text-field>
            <v-date-picker v-model="date1" no-title scrollable @change="$refs.menu1.save(date1)">
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="menu2"
            lazy
            :close-on-content-click="false"
            v-model="menu2"
            transition="scale-transition"
            offset-y
            :nudge-right="40"
            :return-value.sync="date2">
            <v-text-field
              slot="activator"
              label="Data de final"
              v-model="date2"
              readonly>
            </v-text-field>
            <v-date-picker v-model="date2" @change="$refs.menu2.save(date2)" no-title scrollable>
              <v-spacer></v-spacer>
            </v-date-picker>
          </v-menu>
          <v-btn @click.native="filter.luna = null, filter.an = null, date1 = null, date2 = null "> RESET
          </v-btn>
          <v-list-tile avatar v-for="(event,index) in filterEvents" :key="index" >
            <v-list-tile-avatar>
              <img :src="event.avatar">
            </v-list-tile-avatar>
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
      @click.stop="dialog = true">
      <v-icon>
        add
      </v-icon>
    </v-btn>

    <!--  CONT NOU -->

    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="teal py-4 title">
          Creare cont nou
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt="">
                </v-avatar>
                <v-text-field
                  placeholder="Nume de utilizator"
                  color="teal">
                </v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Nume"
                required
                color="teal"
                hint="Numele de familie">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Prenume"
                color="teal"
                required>
                </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Parolă"
                required
                color="teal"
                hint="Minim 8 caractere">
                </v-text-field>
            </v-flex>
            <v-flex xs6>
              <v-text-field
                placeholder="Repetă parolă"
                required
                color="teal"
                hint="Repetă parola pentru siguranță">
                </v-text-field>
            </v-flex>
            <v-flex xs12>
              Data nașterii:
            </v-flex>
            <v-flex xs4>
              <v-text-field
                placeholder="Zi"
                required
                color="teal"
                hint="Ziua nașterii">
                </v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                placeholder="Lună"
                required
                color="teal"
                hint="Luna nașterii">
                </v-text-field>
            </v-flex>
            <v-flex xs4>
              <v-text-field
                placeholder="An"
                required
                color="teal"
                hint="Anul nașterii">
                </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
                color="teal"
                required
                hint="Adresa de poștă electronică">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <input type="checkbox" v-model="agree"/> Accept Termenii și condițiile de utilizare
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="teal" @click="termeni = true">
            Termeni și condiții
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click=" (login=true) && (dialog = false)">
            Am deja cont
          </v-btn>
          <v-btn flat @click="dialog = false">
            Anulare
          </v-btn>
          <v-btn flat color="teal" @click="(continuare = true) && (dialog=false)">
            Continuare
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- LOGIN -->

    <v-dialog v-model="login" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title">
          Intră în cont
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  placeholder="Nume de utilizator"
                  color="teal">
                  </v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-text-field
                  placeholder="Parolă"
                  required
                  color="teal"
                  hint="Minim 8 caractere">
                  </v-text-field>
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
          class="teal py-4 title">
          Recuperează parola
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-text-field
                  placeholder="Nume de utilizator"
                  color="teal">
                  </v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                placeholder="Care este luna nașterii?"
                required
                color="teal"
                hint="Doar cifre">
                </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                placeholder="Care este anul nașterii?"
                required
                color="teal"
                hint="Doar cifre">
                </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                placeholder="Care este adresa de email a contului?"
                required
                color="teal"
                hint="Este obligatorie extensia @">
                </v-text-field>
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

    <v-dialog v-model="termeni" fullscreen>
      <v-card>
        <v-card-title
          class="teal py-4 title">
          Termeni și condiții de utilizare
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <b><p>Bine ați venit la Waffic</p></b><br>
              Acești Termeni de utilizare ("Termeni") vă guvernează drepturile și obligațiile privind utilizarea Software-ului <b>Waffic</b> ("Software") și a serviciului (denumite în cele mai multe cazuri " Serviciul ") pe Internet sau în mass-media celulară. Acești Termeni constituie un acord pe deplin obligatoriu între Waffic (inclusiv filialele sale). Prin urmare, vă recomandăm să citiți cu atenție acești Termeni.
              Folosind serviciul Waffic, indicați acordul dvs. pentru acești termeni: <br>
              - Politica de confidențialitate a Waffic  ("Politica de confidențialitate") și<br>
              - Politica privind drepturile de autor a Waffic  ("Politica privind drepturile de autor"),
              toți aceștia fiind parte integrantă a acestor Termeni.<br><br>
              Dacă nu sunteți de acord cu acești Termeni sau cu oricare dintre părțile sale, atunci trebuie să vă abțineți de la utilizarea Serviciului. <br>
              <br><p><b>Puncte cheie</b></p>
              Următoarele puncte-cheie ale Termenilor sunt evidențiate aici doar pentru comoditatea dvs. Aceste puncte cheie nu sunt făcute în locul termenilor deplini și prezența acestora în această secțiune nu înseamnă că acestea sunt destinate să înlocuiască sau să înlocuiască orice alți termeni sau condiții furnizate de Waffic.<br>
              <br>1. <b>Informațiile rutiere</b><br><br>
              Informațiile furnizate de Serviciu nu sunt destinate să înlocuiască informațiile furnizate pe șosea, cum ar fi direcția de deplasare, restricțiile bazate pe timp, restricțiile pe bandaje, blocajele rutiere, semnele de circulație, semafoarele, instrucțiunile poliției etc.<br>
              <br>2. <b>Călătoriți cu grijă</b><br><br>
              Acționați întotdeauna vigilent în funcție de condițiile rutiere și în conformitate cu legile privind traficul. Este strict interzis să trimiteți actualizări de trafic (cum ar fi actualizări privind accidentele rutiere și congestionarea traficului) sau să interacționați non-verbal cu Serviciul sau să utilizați Serviciul într-o manieră non-verbală pentru orice alt scop decât navigarea în timpul conducerii. Actualizările de trafic sau rapoartele non-verbale pe care doriți să le trimiteți Serviciului pot fi trimise numai după ce ați oprit autovehiculul într-o locație adecvată permisă de lege. În mod alternativ, astfel de actualizări pot fi trimise de un alt pasager decât șoferul, cu condiția ca acesta să nu interfereze cu parcursul de conducere și să nu distragă atenția conducătorului auto pe șosea.<br>
              <br>3. <b>Actualizări necontinuale</b><br><br>
              Informațiile furnizate de Serviciu provin de la alți utilizatori ai Serviciului. Aceste informații sunt fluctuante intrinsec și pot fi inexacte, incomplete sau depășite. Waffic nu oferă nicio garanție pentru credibilitatea sau fiabilitatea acestor informații.<br>
              <br>4. <b>Serviciu bazat pe locație</b><br><br>
              Unele caracteristici ale Serviciului utilizează informații detaliate privind locația și traseul, de exemplu sub formă de semnale GPS și alte informații trimise de dispozitivul dumneavoastră pe care este activată aplicația Waffic. Aceste caracteristici nu pot fi furnizate fără a utiliza această tehnologie. Rețineți, după cum este descris în detaliu în Politica de confidențialitate .<br>
              <br><b>(I)</b> Waffic utilizează informațiile despre locație și de ruta dvs. pentru a crea un istoric detaliat al localizării tuturor călătoriilor făcute atunci când utilizați Serviciul. Waffic folosește această istorie pentru a vă oferi Serviciu, pentru a îmbunătăți calitatea Serviciului pe care îl oferă dvs. și tuturor utilizatorilor săi și pentru a îmbunătăți acuratețea datelor sale de cartografiere și de navigare. Acest istoric este asociat cu contul dvs. și cu numele de utilizator (dacă ați ales să configurați un nume de utilizator). Acest istoric este reținut de Waffic pentru o perioadă limitată de timp și în conformitate cu Politica de confidențialitate.  <br>
              <b>(II)</b> Wafic vă permite să utilizați serviciul dacă doriți sau nu să vă configurați un nume de utilizator. Dacă alegeți să utilizați Serviciul fără a configura un nume de utilizator, puteți face acest lucru prin sări peste stadiul de configurare a numelui de utilizator. Waffic va conecta în continuare toate informațiile dvs. cu contul dvs. și un identificator unic generat de Waze în conformitate cu Politica de confidențialitate. Rețineți că pentru a accesa anumite caracteristici ale Serviciului (de exemplu, istoricul rutelor, destinații favorite), va trebui să configurați un nume de utilizator.<br>
              <br><p><b>Reclame </b></p> Anunțurile terță parte pot apărea periodic în cadrul Serviciului. <br>
              <br><p><b>Conexiunea la Internet</b></p>
              Este necesară pentru a utiliza Serviciul și eventualele costuri asociate (de exemplu, cheltuieli de transfer de date mobile) generate de utilizarea de către dvs. a Serviciului sunt responsabilitatea dvs. exclusivă și sunt efectuate exclusiv pe cheltuiala dumneavoastră . Transmiterea și primirea de actualizări în timp real către și de la serviciu necesită o conexiune online (de exemplu, Wi-Fi, 3G, 4G) între dispozitivul dvs. mobil și Internet.Cheltuielile unei astfel de conexiuni sunt cele prescrise în acordul dintre dvs. și furnizorul de servicii de comunicații (cum ar fi compania dvs. de telefonie mobilă) și în conformitate cu termenii de plată aplicabili.<br>
              <br><p><b>Software gratuit</b></p><br> Serviciul utilizează Software pentru afișarea hărților, actualizări și informații despre drum. În ceea ce privește unele dispozitive de telefonie mobilă care rulează Software-ul, Software-ul este un software gratuit. În astfel de cazuri, puteți redistribui Software-ul sau îl puteți modifica în conformitate cu Licența Publică GNU Generală publicată de Fundația pentru Software Liber, indiferent dacă este versiunea 2.0 a licenței sau orice versiune ulterioară aleasă de dvs. Pentru informații suplimentare, consultați Licența publică generală GNU. Serviciul, baza sa de date, mărcile comerciale ale Waffic, designul hărților serviciului și fișierele vocale integrate în Software.<br>
              <br><p><b>Vârsta ta</b></p> Serviciul este destinat utilizării de către utilizatorii care au vârsta legală necesară pentru a deține un permis de conducere. În orice caz, conturile utilizatorilor cu vârsta sub 13 ani vor fi anulate și șterse de Waze, după primirea notificării.<br>
              <br><p><b>Confidențialitate</b></p> Confidențialitatea dvs. este importantă pentru noi. În timpul utilizării Serviciului, informațiile personale pot fi furnizate de dvs. sau colectate de Waffic, așa cum este detaliat în Politica de confidențialitate. Politica de confidențialitate explică practicile noastre referitoare la utilizarea informațiilor dvs. personale și vă cerem să citiți cu atenție o astfel de Politică de confidențialitate. Prin acceptarea acestor Termeni, prin prezenta sunteți de acord cu colectarea, stocarea și utilizarea informațiilor dvs. personale de către Waffic, sub rezerva acestei secțiuni, a Politicii de confidențialitate și a tuturor legilor și regulamentelor aplicabile.
              <br><br><p><b>LICENȚĂ</b></p>
              Waffic vă acordă astfel o licență revocabilă, gratuită, neexclusivă, limitată în timp, netransferabilă, pentru a utiliza Serviciul (inclusiv Software-ul) în scopuri necomerciale, sub rezerva acestor Termeni.
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

    <v-dialog v-model="confidențialitate" fullscreen>
      <v-card>
        <v-card-title
          class="teal py-4 title">
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

    <v-dialog v-model="drepturiautor" fullscreen>
      <v-card>
        <v-card-title
          class="teal py-4 title">
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
          class="teal py-4 title">
          Ce îți oferă abonamentul?
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <!-- TEXT ABNAMENTE  -->
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="teal" @click="(abonamentplata = true)&&(continuare=false)">Adaugă</v-btn>
          <v-btn flat color="teal" @click="(login= true)&&(continuare=false)">Continuă fără abonament</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- FORMULAR ADAUGARE ABONAMENT (FORMA DE PLATA) -->

    <v-dialog v-model="abonamentplata" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title">
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
          <v-btn flat color="teal" @click="(continuare=true)&&(abonamentplata = !abonamentplata)">Anulare</v-btn>
          <v-btn flat color="teal" @click="(login=true)&&(abonamentplata = !abonamentplata)">Adaugă</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- AFISARE NOUA PAROLA -->

    <v-dialog v-model="recoverpsw1" width="800px">
      <v-card>
        <v-card-title
          class="teal py-4 title">
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
import moment from "moment";
export default {
  name: "profil",
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
    pswnew: "parola noua aici",
    recoverpsw1: false,
    abonamentplata: false,
    drawer: null,
    years: [],
    date1: null,
    menu1: false,
    date2: null,
    menu2: false,
    filter: {
      an: null,
      luna: null
    },
    months: [
      { clickable: false, nume: "January" },
      { clickable: false, nume: "February" },
      { clickable: false, nume: "March" },
      { clickable: false, nume: "April" },
      { clickable: false, nume: "May" },
      { clickable: false, nume: "June" },
      { clickable: false, nume: "July" },
      { clickable: false, nume: "August" },
      { clickable: false, nume: "September" },
      { clickable: false, nume: "October" },
      { clickable: false, nume: "November" },
      { clickable: false, nume: "December" }
    ],
    abonament: [
      {
        titlu: "Locații favorite",
        descriere: "Poți salva mai mult de o locație favorită, pe care o poți accesa instant și activa ca următoarea destinație direct de pe pagina principală."
      },
      {
        titlu:"Reclame?",
        descriere: "Din păcate, reclamele sunt esențiale pentru a putea menține aplicația activă, însă poți contribui prin activarea abonamentului la buna funcționare a aplicației și nu vei mai fi deranjat de reclame."
      },
      {
        titlu:"Istoric extins",
        descriere: "Vrei să vezi destinațiile tale de când ai accesat prima oară aplicația și până astăzi? În acest caz, activarea abonamentului îți oferă un astfel de beneficiu."
      },
      {
        titlu:"Modifică-ți datele oricând",
        descriere: "Ai posibilitatea de modifica orice informație din contul tău oriunde ai fi și oricând ai nevoie."
      }
    ],
    items: [
      {
        icon: "account_circle",
        text: "Intră în cont",
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Detalii cont",
        model: false,
        children: [
          {
            icon: "person", text: "Date personale"
          },
          {
            icon: "alarm_on", text: "Alarme stabilite"
          },
          {
            icon: "mode_edit", text: "Modifică parola"
          },
          {
            icon: "directions", text: "Istoric rute"
          },
          {
            icon: "favorite", text: "Locații preferate"
          },
          {
            icon: "add_shopping_cart", text: "Abonamente"
          }
        ]
      },
      {
        icon: "chat", text: "Contact"
      },
      {
        icon: "announcement", text: "Știri"
      },
      {
        icon: "help", text: "Ajutor"
      },
      {
        icon: "block", text: "Ieșire cont"
      }
    ]
  }),
  computed: {
    events () {
      return this.$store.getters.events
    },
    ani () {
      let ani = []
      this.events.forEach((event, index) => {
        let an = event.data.getFullYear()
        if (!ani.includes(an)) {
          ani.push(an)
        }
      })
      return ani
    },
    filterEvents () {
      return this.events.filter(event => {
        const an = event.data.getFullYear()
        const month = event.data.getMonth()
        let matchingYears = true
        let matchingMonths = true
        let dupadata = true
        let inaintedata = true
        let betweendata = true
        if (this.filter.an || this.filter.luna) {
          matchingYears = this.filter.an ? this.filter.an === an : true
          matchingMonths = this.filter.luna ? this.filter.luna === month : true
        } else if (this.date1 || this.date2) {
          const data = moment(event.data)
          const dupa = moment(this.date1)
          const inainte = moment(this.date2)
          if (dupa === null && inainte) {
            inaintedata = inainte ? data.isSameOrBefore(inainte) : true
          } else if (dupa && inainte === null) {
            dupadata = dupa ? data.isSameOrAfter(dupa) : true
          } else if (dupa && inainte) {
            betweendata = (inainte && dupa) ? data.isBetween(dupa, inainte, null, '[]') : true
          }
        }
        return matchingYears && matchingMonths && inaintedata && dupadata && betweendata
      })
    }
  },
  filters: {
    longtimeago(date) {
      return moment(date).fromNow();
    }
  },
  props: {
    source: String
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
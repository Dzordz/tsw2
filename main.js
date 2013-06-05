// sortowanie kart wedlug kolorow, dalej wedlug wartosci
// funkcja jako zwykla funkcja
var s = function(b,a){
  if (a.suit === 'S' && b.suit !== 'S'){
    return 1;
  } else if (a.suit !== 'S' && b.suit === 'S'){
    return -1;
  } else if (a.suit === 'H' && b.suit !== 'H'){
    return 1;
  } else if (a.suit !== 'H' && b.suit === 'H'){
    return -1;
  } else if (a.suit === 'D' && b.suit !== 'D'){
    return 1
  } else if (a.suit !== 'D' && b.suit === 'D'){
    return -1;
  } else if (a.suit === b.suit){
    if (a.num === 'A') {
      return 1;
    } else if (b.num === 'A'){
      return -1;
    } else if (a.num === 'K'){
      return 1;
    } else if (b.num === 'K'){
      return -1;
    } else if (a.num === 'Q'){
      return 1;
    } else if (b.num === 'Q'){
      return -1;
    } else if (a.num === 'J'){
      return 1;
    } else if (b.num === 'J'){
      return -1;
    } else if (a.num > b.num){
      return 1;
    } else {
      return -1;
    }
  }
}

//liczenie wyniku
//funckaj jako funkcja
var score = function (c,trm,dbl,trc,vul){
  //c - wysokosc kontraktu
  //trm - atut
  //dbl - czy byla kontra (0/1/2 - bez/kontra/rekontra)
  //trc - ilosc lew
  //czy grajacy byl VUL

  /*
    DO UZUPELNIENIA
  */
}

// tasowanie talii kart
// funkcja jako metoda
var shuffle = function(){
  var x,y,tmp;
  for (var i = 0; i<1000; i++){
    x = Math.floor(Math.random() * 10000) % 52;
    y = Math.floor(Math.random() * 100) % 52;
    tmp = this[x];
    this[x] = this[y];
    this[y] = tmp;
  }
}
Array.prototype.shuffle = shuffle;

// zliczamy punkty w danej rece
// funkcja jako metoda
var points = function(){
  var p = 0;
  this.forEach(function(e,i,a){
    if (e.num === 'A'){
      p+=4;
    } else if (e.num === 'K'){
      p+=3;
    } else if (e.num === 'Q'){
      p+=2;
    } else if (e.num === 'J'){
      p++;
    }
  });
  return p;
}
Array.prototype.points = points;

// tablica do przechowywania talii kart
var t = [];

// konstruktor karty
// karta ma kolor i wartosc
var Card = function (i){
  var num;
  var suit;
  this.suit = i/13 < 1 ? 'S' : i/13 <2 ? 'H' : i/13 <3 ? 'D' : 'C';
  this.num = i%13===0 ? 'A' : i%13===1 ? 'K' : i%13===11 ? 'Q' : i%13===12 ? 'J' : i%13;
}

// wypelniamy talie kartami
for (var i=0; i<52; i++){
  var c = new Card(i);
  t.push(c);
}

// tasujemy talie
t.shuffle();

// tablice dla kazdego z 4 graczy, gracze oznaczani kierunkami North, West, South oraz East
var handN = [];
var handS = [];
var handW = [];
var handE = [];

// rozdajemy talie 
for (var i = 0; i<13; i++){
  handN.push(t[i]);
  handS.push(t[i+13]);
  handW.push(t[i+26]);
  handE.push(t[i+39]);
}

//VUL - zalozenia premiowe
//0 - NOTVUL
//1 - VUL
var nsvul = Math.floor(Math.random()*100) % 2;
var ewvul = Math.floor(Math.random()*10000) % 2;

// ukladamy karty kazdemu graczowi
handN.sort(s);
handS.sort(s);
handW.sort(s);
handE.sort(s);

// testowo drukujemy karty graczy N i S
console.log("VUL: NS: " + nsvul + " EW: " + ewvul);
handN.forEach (function (e){
  console.log(e.suit + " " + e.num);
});
console.log("Points: " + handN.points());
console.log("");
handS.forEach (function (e){
  console.log(e.suit + " " + e.num);
});
console.log("Points: " + handS.points());




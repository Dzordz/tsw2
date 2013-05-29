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

var t = [];

var Card = function (i){
  var num;
  var suit;
  this.suit = i/13 < 1 ? 'S' : i/13 <2 ? 'H' : i/13 <3 ? 'D' : 'C';
  this.num = i%13===0 ? 'A' : i%13===1 ? 'K' : i%13===11 ? 'Q' : i%13===12 ? 'J' : i%13;
}

for (var i=0; i<52; i++){
  var c = new Card(i);
  t.push(c);
}

t.shuffle();

var handN = [];
var handS = [];
var handW = [];
var handE = [];

for (var i = 0; i<13; i++){
  handN.push(t[i]);
  handS.push(t[i+13]);
  handW.push(t[i+26]);
  handE.push(t[i+39]);
}

handN.sort(s);
handS.sort(s);
handW.sort(s);
handE.sort(s);

handN.forEach (function (e,i,a){
  console.log(e.suit + " " + e.num);
});
console.log("");
handS.forEach (function (e,i,a){
  console.log(e.suit + " " + e.num);
});




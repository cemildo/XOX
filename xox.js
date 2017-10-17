
/**
 * 3 e 3 luk bir array
 * her bir karedeki datayi tutmak icin
 * ilk basta her bir karenin icine bosluklar atiyoruz ("")
 */
var data = [
  ["","",""],
  ["","",""],
  ["","",""],
];
/**
 * bu variable i, bilgisayar "O" koyarken bizi 1 saniye bekletiyor
 * o sirada oyuncu herhangi bir yere X koyamasin diye kontrol etmek icin
 * kullanacaz.
 */
var canInput = true;

/**
 * burdaki yapi diagonal horizontal ve vertical butun oyunu bitiren
 * eslendirmeleri tutuyor. datanin icindeki herhangi bir 3 lu alltaki arrayle
 * eslesirse youn bitiyor.
 */
var successCases = [
      [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]], [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]],
      [[0,0],[1,1],[2,2]], [[0,2],[1,1],[2,0]],
    ];

/**
 * otomatik olarak table olusturup dom a yapistiriyoruz jquery yardimiyla
 */
function draw(){
  var table = '<table id="xox_table">';
    for(var i = 0; i < data.length; i++) {
        table += '<tr>';
        for(var j = 0; j < data[i].length; j++) {
           table += '<td id="'+i+'_'+j+'">&nbsp;</td>';
        }
        table += '</tr>';
    }
   table += '</table>';
   $('#xox').html(table);
}

/**
 * gonderilen maximum (limit) sayisina kadar
 * herahngi bir numara secip bize geri veriyor
 * @param {number} limit
 */
function random(limit){
    return Math.floor(Math.random()* limit);
}

/**
 * burda her tiklamadan sonra oyunun bitip bitmedigini kontrol ediyor.
 */
function check(){
    var countForX, countForY;
    outerLoop:for(var i = 0; i < successCases.length; i++) {
       countForO = 0;
       countForX = 0;
       for(var j = 0; j < successCases[i].length; j++) {
          for(var k = 0; k < 1; k++) {
             if(data[successCases[i][j][0]][successCases[i][j][1]] === 'X'){
                 countForO++;
                 if(countForO === 3) { break outerLoop; }
             } else { countForO = 0; }
             if(data[successCases[i][j][0]][successCases[i][j][1]] === 'O'){
                 countForX++;
                 if(countForX === 3) { break outerLoop; }
             } else { countForX = 0; }
          }
       }
    }

    if(countForO === 3) {
      countForO = 0;
      $('#result').html("Tebrikler kazandiniz!").css('background','orange');
      return true;
    }
    if(countForX === 3) {
      countForX = 0;
      $('#result').html("Kaybettiniz!").css('background','red');
      return true;
    }
    return false;
}

/**
 * bilgisayarin otamatik olarak O koymasi burda gerceklesiyor
 */
function computerInput(){
    var emptyCells = [];
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < 3; j++) {
           if(!data[i][j]){
              emptyCells.push([i,j]);
           }
        }
    }
    var cellId = emptyCells[random(emptyCells.length)];
    // burdaki if statement eger tiklanilan yer bos ise
    // oraya eleman koyabiliyor.
    if (data[cellId[0]][cellId[1]] === ""){
      data[cellId[0]][cellId[1]] = 'O';
      $("#" + cellId[0]+'_'+cellId[1]).html('O');
    }

    // artik O konuldu X koymasina izin ver
    canInput = true;
    check();
}

function setListeners(){
  $('#new-game').on('click', function(){
    init();
  });

  $('#xox_table td').on('click', function(e){
      var id = e.target.id;
      var coordinates = id.split('_');
      var x = coordinates[0];
      var y = coordinates[1];
      // kontrol et eger sira sendeyse X koy
      if (canInput === true) {
        // burda x in koyulmasini engelle
        canInput = false;
        // eger tiklanan yer bos ise oraya eleman koy
        if(data[x][y] === "") {
          data[x][y] = 'X';
          $('#'+ id).html('X');
        }
        // oyun bittimi diye kontrol et bitmemisse bilgisayar oyansin
        if(!check()){
          setTimeout(computerInput, 1000);
        }
      }
  });
}

/**
 * oyunun basladigi yer
 */
function init(){
  // X koymasina izin ver
  canInput = true;
  // ilk table i ciz
  draw();
  // tikladigimda functiyonlarin calismasi icin
  // jquery kullanarak eventler ekliyoruz tiklanmasini istedigimiz
  // elemanlara
  setListeners();
  // data yi bastaki haline set et
  data = [
    ["","",""],
    ["","",""],
    ["","",""],
  ];
  // sonucun yazildigi yeri ilk haline dondur
  // ilk olarak icerigini temizle html("")
  // sonrada background colorunu beyaza cevir
  $('#result').html("").css('background','white');
}


/**
 * bu functiyon yukarda tanimlandi, bilgisayar buraya
 * gelince init functiyonunu cagiriyor ve oyunu baslatiyor
 */
init();

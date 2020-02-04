let ranonew;
let counter = 0;
let arrteam1 = [];
let arrteam2 = [];
let arrteam1runs = [];
let arrteam1runsperplayer = [];
let arrteam2runsperplayer = [];
let arrteam2runs = [];
let chooseplayercount = 0;
let currentplayer = "";
let totalballs = 60;
let team1 = false;
let team2 = false;
let team1score=0;
let team2score=0;
let playersteam1 = [
  { player: "player1", score: null },
  { player: "player2", score: null },
  { player: "player3", score: null },
  { player: "player4", score: null },
  { player: "player5", score: null },
  { player: "player6", score: null },
  { player: "player7", score: null },
  { player: "player8", score: null },
  { player: "player9", score: null },
  { player: "player10", score: null }
];
let playersteam2 = [
    { player: "player1", score: null },
    { player: "player2", score: null },
    { player: "player3", score: null },
    { player: "player4", score: null },
    { player: "player5", score: null },
    { player: "player6", score: null },
    { player: "player7", score: null },
    { player: "player8", score: null },
    { player: "player9", score: null },
    { player: "player10", score: null }
  ];

function checktimelimit(val)
{
    setTimeout(()=>{
        if (val=='1')
        {
            document.getElementById("btn1").disabled = true;
            team1=true;
            if (team2==false)
            {
                document.getElementById("btn2").disabled = false;
                totalballs = 60;
                chooseplayercount=0;
            }
            team1score=arrteam1.reduce(getSum, 0);
            let x="<label>TotalScore: </label>"+arrteam1.reduce(getSum, 0);
            
            document.getElementById('score1').innerHTML=x;
        }
        else{
            document.getElementById("btn2").disabled = true;
            team2=true;
            if (team1==false)
            {
                document.getElementById("btn1").disabled = false;
                totalballs = 60;
                chooseplayercount=0;
            }
            team2score=arrteam2.reduce(getSum, 0);
            let x="<label>TotalScore: </label>"+arrteam2.reduce(getSum, 0);
            
            document.getElementById('score2').innerHTML=x;
        }
       
        checkresult();
    },60000)
}

function randomnum() {
  ranonew = Math.floor(Math.random() * 7);
  console.log(ranonew);
}

function team1scores(val) {
    if (chooseplayercount==0)
    {
        checktimelimit(val);
        
    }
  let teamname = "team1";
  if (chooseplayercount < 10) {
  currentplayer = playersteam1[chooseplayercount].player;
  document.getElementById("team1spanpl").innerHTML = currentplayer;
  }

 
  if (totalballs != 0) {
    counter = counter + 1;
    document.getElementById("btn2").disabled = true;
    randomnum();

    arrteam1.push(ranonew);
    arrteam1runsperplayer.push(ranonew);
    if (counter == 6 || ranonew == 0) {
      //arrteam2runsperover.push(arrteam1.reduce(getSum, 0))
      document.getElementById(
        currentplayer + teamname
      ).innerHTML = ' - '+arrteam1runsperplayer.reduce(getSum, 0);
      arrteam1runs.push(arrteam1runsperplayer.reduce(getSum, 0));
      playersteam1[chooseplayercount].score=arrteam1runsperplayer.reduce(getSum, 0);
      arrteam1runsperplayer = [];
      chooseplayercount = chooseplayercount + 1;
      if (chooseplayercount < 10) {
      currentplayer = playersteam1[chooseplayercount].player;
      document.getElementById("team1spanpl").innerHTML = currentplayer;
      }
      counter=0;
      //console.log(currentplayer);
    }
    totalballs = totalballs - 1;

    console.log(arrteam1);
    console.log(arrteam1runsperplayer);
    if (chooseplayercount > 9) {
      totalballs = 0;
    }

    document.getElementById("team1span").innerHTML = arrteam1.reduce(getSum, 0);
    let countout = 0;
    arrteam1.forEach(ele => {
      if (ele == 0) {
        countout = countout + 1;
        if (countout == 10) {
          totalballs = 0;
          document.getElementById("btn1").disabled = true;
          document.getElementById("btn2").disabled = false;
          checkresult();
        }
      }
    });
  } else {
    team1 = true;
    document.getElementById("btn1").disabled = true;
    team1score=arrteam1.reduce(getSum, 0);
    let x="<label>TotalScore: </label>"+arrteam1.reduce(getSum, 0);
    
    document.getElementById('score1').innerHTML=x;
    // document.getElementById("btn2").disabled=false;
    if (team2 == false) {
      document.getElementById("btn2").disabled = false;
      totalballs = 60;
      chooseplayercount=0;
    } else {
      document.getElementById("result").disabled = false;
    }
    // if (team2==false)
    // {
    //     document.getElementById("btn2").disabled="false";
    //     totalballs=18;
    // }
  }
}
function getSum(total, num) {
  return total + num;
}

function checkresult() {
  if (
    document.getElementById("btn1").disabled == true &&
    document.getElementById("btn2").disabled == true
  ) {
    document.getElementById("result").disabled = false;
  }
}
function team2scores(val) {

    let teamname = "team2";
    if (chooseplayercount==0)
    {
        checktimelimit(val);
        
    }
    if (chooseplayercount < 10) {
    currentplayer = playersteam2[chooseplayercount].player;
    document.getElementById("team2spanpl").innerHTML = currentplayer;
    }

  if (totalballs != 0) {
      counter=counter+1;
    document.getElementById("btn1").disabled = true;
    randomnum();
    arrteam2.push(ranonew);
    arrteam2runsperplayer.push(ranonew);
    if (counter == 6 || ranonew == 0) {
      //arrteam2runsperover.push(arrteam1.reduce(getSum, 0))
      document.getElementById(
        currentplayer + teamname
      ).innerHTML = ' - '+arrteam2runsperplayer.reduce(getSum, 0);
      arrteam2runs.push(arrteam2runsperplayer.reduce(getSum, 0));
      playersteam2[chooseplayercount].score=arrteam2runsperplayer.reduce(getSum, 0);
      arrteam2runsperplayer = [];
      chooseplayercount = chooseplayercount + 1;
      if (chooseplayercount < 10) {
      currentplayer = playersteam2[chooseplayercount].player;
      document.getElementById("team2spanpl").innerHTML = currentplayer;
      }
      counter=0;
      //console.log(currentplayer);
    }
    totalballs = totalballs - 1;

    console.log(arrteam2);
    console.log(arrteam2runsperplayer);
    if (chooseplayercount > 9) {
      totalballs = 0;
    }
    document.getElementById("team2span").innerHTML = arrteam2.reduce(getSum, 0);
    let countout2 = 0;
    arrteam2.forEach(ele => {
      if (ele == 0) {
        countout2 = countout2 + 1;
        if (countout2 == 10) {
          totalballs = 0;
          document.getElementById("btn2").disabled = true;
          document.getElementById("btn1").disabled = false;
          checkresult();
        }
      }
    });
  } else {
    team2 = true;
    document.getElementById("btn2").disabled = true;
    team2score=arrteam2.reduce(getSum, 0);
    let x="<label>TotalScore: </label>"+arrteam2.reduce(getSum, 0);
    
    document.getElementById('score2').innerHTML=x;
    if (team1 == false) {
      document.getElementById("btn1").disabled = false;
      totalballs = 60;
      chooseplayercount=0;
    } else {
      document.getElementById("result").disabled = false;
    }
    // if (team1==false)
    // {
    //     document.getElementById("btn1").disabled="false";
    //     totalballs=18;
    // }
  }
}

function display() {
  let winner = "";
  let maxscore="";
  let manofthematch="";
  let tm1 = arrteam1.reduce(getSum, 0);
  let tm2 = arrteam2.reduce(getSum, 0);
  console.log(tm1,tm2);

  if (tm1 > tm2) {
    winner = "team1";
    

    maxscore=Math.max(...arrteam1runs);

    playersteam1.forEach((ele)=>
    {
        if (ele.score===maxscore)
        {
            manofthematch=ele.player;
        }
    })
  } 
  else {
    winner = "team2";
    maxscore=Math.max(...arrteam2runs);

    playersteam2.forEach((ele)=>
    {
        if (ele.score===maxscore)
        {
            manofthematch=ele.player;
        }
    })
  }

  localStorage.setItem("winner", winner);
  localStorage.setItem("manofthematch", manofthematch);
  self.location = "result.html";
  //alert("the winner is"+winner);
}


let ranonew;
let counter=0;
let arrteam1=[];
let arrteam2=[];
let arrteam1runsperover=[];
let arrteam2runsperover=[];
let totalballs=18;
let team1=false;
let team2=false;
let playersteam1=['player1','player2','player3','player4','player5']
function randomnum()
{
    ranonew = Math.floor(Math.random() * 7);
    console.log(ranonew);
}



function team1score()
{
   
counter=counter+1;
    if (totalballs!=0)
    {

        document.getElementById("btn2").disabled=true;
randomnum();

arrteam1.push(ranonew);
totalballs=totalballs-1;

console.log(arrteam1);


document.getElementById("team1span").innerHTML = arrteam1.reduce(getSum, 0);
let countout=0;
arrteam1.forEach((ele)=>
{
    if (ele==0)
    {
        countout=countout+1;
        if (countout==5)
        {
            totalballs=0; 
            document.getElementById("btn1").disabled=true;
            document.getElementById("btn2").disabled=false;
            checkresult();
        }
    }
})
}
else{
    team1=true;
    document.getElementById("btn1").disabled=true;
   // document.getElementById("btn2").disabled=false;
    if (team2==false)
        {
            document.getElementById("btn2").disabled=false;
            totalballs=18;
        }
        else
        {
            document.getElementById("result").disabled=false;
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

  function checkresult()
  {
      if (document.getElementById("btn1").disabled==true && document.getElementById("btn2").disabled==true)
      {
        document.getElementById("result").disabled=false;
      }
  }
function team2score()
{
    
    
        if (totalballs!=0)
        {
    
            document.getElementById("btn1").disabled=true;
    randomnum();
    arrteam2.push(ranonew);
    totalballs=totalballs-1;
    
    console.log(arrteam2);
    document.getElementById("team2span").innerHTML = arrteam2.reduce(getSum, 0);
    let countout2=0;
arrteam2.forEach((ele)=>
{
    if (ele==0)
    {
        countout2=countout2+1;
        if (countout2==5)
        {
            totalballs=0; 
            document.getElementById("btn2").disabled=true;
            document.getElementById("btn1").disabled=false;
            checkresult();
        }
    }
})
    }
    else{
        team2=true;
        document.getElementById("btn2").disabled=true;
        if (team1==false)
        {
            document.getElementById("btn1").disabled=false;
            totalballs=18;
        }
        else
        {
            document.getElementById("result").disabled=false;
        }
        // if (team1==false)
        // {
        //     document.getElementById("btn1").disabled="false";
        //     totalballs=18;
        // }
        
}

}

function display()
{
    let winner="";
let tm1=document.getElementById("team1span").innerHTML;
let tm2=document.getElementById("team2span").innerHTML;

if (+tm1>+tm2)
{
winner="team1";
}
else{
    winner="team2";
}

localStorage.setItem("winner", winner);
self.location="result.html";
//alert("the winner is"+winner);
}
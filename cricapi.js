console.log("***************************************************************************");
console.log("***Assignment -- Backend Web Test- Backend - Node / Php / MySql / Oracle***");
console.log("***************************************************************************");




const fetch = require('sync-fetch');


let settings = { method: "Get" };


let leagues = fetch("https://cricket.sportmonks.com/api/v2.0/leagues?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX",settings).json()
//console.log(leagues.data);


let fixtures = fetch( "https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX",settings).json()
//console.log(fixtures.data);


result={
    "leagues":[]
}

for(var i=0; i<leagues.data.length; i++){
//    console.log(leagues.data[i]['id']);
    console.log("League Name: "+leagues.data[i]['name']);
    for(var j=0; j<fixtures.data.length;j++){
        if(leagues.data[i]['id'] == fixtures.data[j]['league_id']){
            
//            console.log("League id matched :"+leagues.data[i]['id']);
            
            console.log("\nMatch Details ");
//            console.log("\nLocal Team ID "+fixtures.data[i]['localteam_id']);
            
            
            console.log("Match : "+getTeamName(fixtures.data[i]['localteam_id'])+" vs "+getTeamName(fixtures.data[i]['visitorteam_id']));
            console.log("Venue :"+getVenueById(fixtures.data[i]['venue_id']));
            
            getPlayersFromTeam(fixtures.data[i]['id'],fixtures.data[i]['localteam_id'],fixtures.data[i]['visitorteam_id']);
            
            if(fixtures.data[i]['winner_team_id']!=null){
                
                console.log("\nWinner :"+getTeamName(fixtures.data[i]['winner_team_id']));
                if(fixtures.data[i]['localteam_id']==fixtures.data[i]['winner_team_id']){
                    console.log("Looser :"+getTeamName(fixtures.data[i]['visitorteam_id']));
                }
                else{
                    console.log("Loser :"+getTeamName(fixtures.data[i]['localteam_id']));
                }
                
                
                console.log("\nMan of the Match :"+getPlayerNameById(fixtures.data[i]['man_of_match_id']));
                
            }else{
                console.log("\nWinner : Not Available");
                console.log("\nLooser : Not Available");
                console.log("\nMan of the match : Not Available");
            }
            
            console.log("Result :"+fixtures.data[i]['note']);
            
//            console.log("Visitor Team ID "+fixtures.data[i]['visitorteam_id']);
            
            
        }
    }
}
console.log("Result is :  "+JSON.stringify(result))




function getTeamName(id){
    return fetch("https://cricket.sportmonks.com/api/v2.0/teams/"+id+"?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX", settings).json().data.name;
}


function getPlayerNameById(playerid){
    return fetch(" https://cricket.sportmonks.com/api/v2.0/players/"+playerid+"?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX", settings).json().data.fullname;
}

function getVenueById(venueid){
    return fetch("https://cricket.sportmonks.com/api/v2.0/venues/"+venueid+"?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX", settings).json().data.name;
}


function getPlayersFromTeam(id,localteamid,visitorteamid){
    let lineup = fetch("https://cricket.sportmonks.com/api/v2.0/fixtures/"+id+"?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX&include=lineup", settings).json().data['lineup'];
    
    let localteam=fetch("https://cricket.sportmonks.com/api/v2.0/teams/"+localteamid+"?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX").json().data;
    
    
    console.log("\nLocal Team Name : "+localteam.name);
    
    if(localteam.national_team == true){
    console.log("Country : "+localteam.name);
    }else{
        console.log("Country : World");
    }
    console.log("\nPlayers");
    for(var i=0; i<lineup.length;i++){
        
        if(lineup[i]['lineup']['team_id']==localteamid){
            console.log(lineup[i]['fullname']);
        }
    }
    
    
    let visitorteam=fetch("https://cricket.sportmonks.com/api/v2.0/teams/"+visitorteamid+"?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX").json().data;
    
    console.log("\n\nVisitor Team Name : "+visitorteam.name);
    
    if(visitorteam.national_team == true){
    console.log("Country : "+visitorteam.name);
    }else{
        console.log("Country : World");
    }
    
    console.log("\nPlayers");
    for(var i=0; i<lineup.length;i++){
        
        if(lineup[i]['lineup']['team_id']==visitorteamid){
            console.log(lineup[i]['fullname']);
        }
    }
   
//    for(var i=0; i<squad.length;i++){
//        console.log(squad['firstname'] +" "+squad["lastname"]);
//    }   
}


//fetch(url, settings)
//    .then(res => res.json())
//    .then((json) => {
//        // do something with JSON
//    console.log(json);
//    console.log("\n\n____\n\n");
//    gotData(json);
//    
//    
////    for(i = 0; i < json['data'].length; i++) {
////        console.log("country id "+json['data'][i]['country_id']);
////        
////    }
//    });
//
//
//function gotData(data){
//    console.log("Got Data")
//    console.log(data)
//}
//
//  
//
//let url1 = "https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=QwzyeLkJNdNEiyK3k1F6Rm0Iw5HK9BZdjRwCyZ9o6UlFPnHIX4Y3WCLQFykX";
//
//let settings1 = { method: "Get" };
//
//fetch(url1, settings1)
//    .then(res => res.json())
//    .then((json) => {
//        // do something with JSON
//    console.log(json);
//    });
const https = require('https');
const key = 'AIzaSyCxvZxiF9fmoLW-KyPpEeqUKqSRWVQlRMc';
const locs = [
  {name:'Central Library', query:'Saranathan College Library'},
  {name:'Auditorium', query:'Saranathan College Auditorium'},
  {name:'CSE Labs', query:'Saranathan College CSE Labs'},
  {name:'Cafeteria', query:'Saranathan College Cafeteria'},
  {name:'Hostel Blocks', query:'Saranathan College Hostel'},
  {name:'Boys Hostel', query:'Boys Hostel Saranathan College'},
  {name:'Admin Block', query:'Saranathan College Administrative Block'},
  {name:'Sports Complex', query:'Saranathan College Sports Complex'},
  {name:'Bus Parking', query:'Saranathan College Bus Parking'}
];
function geocode(address){
  const params = new URLSearchParams({address, key}).toString();
  return new Promise((resolve,reject)=>{
    https.get(`https://maps.googleapis.com/maps/api/geocode/json?${params}`, res=>{
      let body='';
      res.on('data', chunk=>body += chunk);
      res.on('end', ()=>{
        try{ resolve(JSON.parse(body)); }catch(err){ reject(err); }
      });
    }).on('error', reject);
  });
}
(async function(){
  for(const loc of locs){
    const query = `${loc.query}, Saranathan College of Engineering, Tiruchirappalli, Tamil Nadu, India`;
    try{
      const data = await geocode(query);
      console.log('---', loc.name, '---');
      console.log('query:', query);
      console.log('status:', data.status);
      if(data.results && data.results[0]){
        const r = data.results[0];
        console.log('formatted:', r.formatted_address);
        console.log('lat:', r.geometry.location.lat, 'lng:', r.geometry.location.lng);
      } else {
        console.log('no result');
      }
    } catch(e){
      console.error('ERROR', loc.name, e.message);
    }
    console.log('');
  }
})();
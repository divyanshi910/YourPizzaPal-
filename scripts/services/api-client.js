// Network Call Code
const URL='https://raw.githubusercontent.com/divyanshi910/pizza.json/refs/heads/main/pizza.json';
//const URL = 'https://github.com/Skill-risers/pizzajson/blob/main/pizza.json';

export async function doNetworkCall(){
    try{
    const response = await fetch(URL); //block
    const object = await response.json(); //Block
    return object; //wrap promise
    }
    catch(err){
        console.log('Some Problem in API Call',err);
        throw err;
    }
//    const URL='https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json'
   //     const promise = fetch(URL); 
//    console.log('Promise is',promise);
//     promise.then(response=>{
//         console.log(response);
//        const promise2= response.json(); //deserialization(JSOn to Object)
//        promise2.then(data=>console.log('Data is',data))
//        .catch(e=>console.log('JSON parse Error',e))
    
//     }).catch(err=>{
//         console.log('Error',err);
//     });
    
}
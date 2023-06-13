import axios from "axios";

const API_KEY = "*******";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  // console.log(response.data);
  const token = response.data.idToken;

  // console.log("The Token is : " + token)

  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

// export async function getAddress(lat,lng){
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
//   const response = await fetch(url);

//   if(!response.ok){
//     throw new Error("Failed to fetch address!")
//   }

//   const data = await response.json()
//   console.log(data)
//   const address = data.results[0];
//   // console.log(address)
//   return address;

// }

// import axios from "axios";

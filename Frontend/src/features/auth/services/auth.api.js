// This file contains API calls related to authentication, such as login and registration.

import axios from "axios";

// Function to handle user registration
// THis method is good but , write a code batter and clean we need to pproce another way to send data to backend and handle response in frontend
// export async function Register({username,email,password}) {
//     try { const response = await axios.post('http://localhost:3000/api/auth/register', {
//         username,
//         email,
//         password
//     },{
//         withCredentials: true
//     })
//     return response.data;
//     }catch(error){
//         console.error("Registration failed:", error);
//     }
// }

// // Function to handle user login

// export async function Login({email,password}) {
//     try {
//         const response = await axios.post('/api/login', {
//             email,
//             password
//         }, {
//             withCredentials: true
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Login failed:", error);
//     }
// }

// // Function to handle user logout
// export async function Logout() {
//     try {
//         const response = await axios.post('http://localhost:3000/api/auth/logout', {}, {
//             withCredentials: true
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Logout failed:", error);
//     }
// }

// // Function getMe

// export async function getMe() {
//     try {
//         const response = await axios.get('http://localhost:3000/api/auth/get-me', {
//             withCredentials: true
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch user information:", error);
//     }
// }


// This correct clean approch to send data to backend and handle response in frontend

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

/**
 * Register user
 */
export async function register({ username, email, password }) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Login user
 */
export async function login({ email, password }) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Logout user
 */
export async function logout() {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get current logged-in user
 */
export async function getMe() {
  try {
    const response = await api.get("/get-me");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user information:", error.response?.data || error.message);
    throw error;
  }
}
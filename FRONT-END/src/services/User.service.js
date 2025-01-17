import { updateToken } from '../utils/updateToken';
import { extraConfig } from './serviceApiGeneral.config';
//import { googleUser } from "./serviceGoogle.config";-

//*--------------------- USER ----------------------------

//! --------
//? REGISTER
//! --------

export const registerUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('/users/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

// export const registerUserWithGoogle = async (formData) => {
//   const APIGeneral = extraConfig();
//   return APIGeneral.post("/users/register/registerGoogle", formData)
//     .then((res) => res)
//     .catch((error) => error);
// };

// export const registerGoogle = async (token) => {
//   const APIGeneral = googleUser(token);

//   return APIGeneral.then((res) => res).catch((error) => error);
//};

//! ----------------------------
//? VERIFY CODE - CHECK NEW USER
//! ----------------------------

export const checkCodeConfirmationUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('users/check', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? RESEND CODE
//! -----------

export const resendCodeConfirmationUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('/users/resend', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------
//? AUTOLOGIN
//! ---------

export const autologinUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('users/login/autologin', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! -----
//? LOGIN
//! -----

export const loginUserService = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.post('users/login', formData)
    .then((res) => res)
    .catch((error) => error);
};

//! ---------------
//? FORGOT PASSWORD
//! ---------------

export const forgotPasswordUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch('/users/forgotpassword', formData)
    .then((res) => res)
    .catch((error) => error);
};

//*--------------------------------------------------------------------------------
//*---------------------------------- CON AUTH -------------------------------------
//*--------------------------------------------------------------------------------

//! ---------------
//? CHANGE PASSWORD
//! ---------------

export const changePasswordUserToken = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch('/users/changepassword', formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? UPDATE USER
//! -----------

export const updateUser = async (formData) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch('users/update/update', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! -----------
//? DELETE USER
//! -----------

export const deleteUser = async () => {
  const APIGeneral = extraConfig();
  return APIGeneral.delete('/users/', {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//* GET USER ------------------------------
// //! -----------
// //? GET BY NAME
// //! -----------
// export const getUserByName = async (userName) => {
//   const APIGeneral = extraConfig();
//   return APIGeneral.get(`/users/byName/${userName}`)
//     .then((res) => res)
//     .catch((error) => error);
// };

//! ---------
//? GET BY ID
//! ---------
export const getById = async (id) => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/users/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

// //! -------
// //? GET ALL
// //! -------
export const getAll = async () => {
  const APIGeneral = extraConfig();
  return APIGeneral.get(`/users/`)
    .then((res) => res)
    .catch((error) => error);
};

// //!-------- ADD FAVS ---------------

// export const addFavComment = async (idComment) => {
//   const APIGeneral = extraConfig();
//   return APIGeneral.patch(`/users/likeComment/${idComment}`)
//     .then((res) => res)
//     .catch((error) => error);
//};
//!-------
//? FOLLOW
//!-------

export const followUserToggle = async (idUserToFollow) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/users/follow/${idUserToFollow}`)
    .then((res) => res)
    .catch((error) => error);
};

//!----
//? BAN
//!----

export const bannedToggle = async (idUserToBan) => {
  const APIGeneral = extraConfig();
  return APIGeneral.patch(`/users/ban/${idUserToBan}`)
    .then((res) => res)
    .catch((error) => error);
};

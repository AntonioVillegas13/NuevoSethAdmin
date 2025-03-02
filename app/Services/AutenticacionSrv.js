import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail,deleteUser, onAuthStateChanged } from "firebase/auth";


// export const VerificarRol=(){
//   const 
// }
export const RecuperarUsuario= async(fnsetId)=>{
  const auth = getAuth();
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("-------------------------Funcion Recuperar Usuario")
      const uid = user.uid;

     
      console.log("UID",uid)
      fnsetId(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

}

export const Eliminar=()=>{
  const auth=getAuth();
  const user=auth.currentUser;
  deleteUser(user).then(() => {
    console.log("usuario eliminado")
  }).catch((error) => {
    // An error ocurred
    console.log("Eroror",error)
    // ...
  });
}


export const Ingresar = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("correcto ingreso", user)
      global.userIdLogin=user.uid
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });

}



export const cerrarSesion = () => {

  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Cierre Exitoso")
  }).catch((error) => {
    // An error happened.
    console.log("Error al cerrar")
  });


}

export const CrearUsuario = async(email, password) => {

  const auth = getAuth();
 await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("usuario Creado:", user.uid)
      global.userId=user.uid
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error al crear usuario:", errorMessage)
      // ..
    });
}

export const ResetContraseña = (email) => {

  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      console.log("todo bbine")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

}
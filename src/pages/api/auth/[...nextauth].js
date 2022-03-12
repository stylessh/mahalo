import NextAuth from "next-auth";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";

import firebase from "firebase/app";
import "firebase/firestore";

const firestore = (firebase.apps[0] ?? firebase.initializeApp()).firestore();

export default NextAuth({
  providers: [],
  adapter: FirebaseAdapter(firestore),
});

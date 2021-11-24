import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
connectFirestoreEmulator(db, "localhost", 8080);

const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5002);

export const storage = getStorage(app);
connectStorageEmulator(storage, "localhost", 9199);

export const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:5001");

export interface Movie {
  id: string;
  title: string;
  poster: string;
  plot: string;
  actors: string[];
  genres: string[];
  rated: string;
  year: string;
  country: string;
  director: string;
}

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const q = query(
      collection(db, "movies"),
      orderBy("year", "desc"),
      limit(16)
    );
    const unsubscribe = onSnapshot(
      q,
      (moviesSnapshot) => {
        setMovies(
          moviesSnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                title: doc.data().title,
                plot: doc.data().plot,
                poster: doc.data().poster,
              } as Movie)
          )
        );
      },
      (error) => {
        console.error("Error occurred fetching movies: " + error.message);
        setError("Error loading movies");
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return { movies, error };
};

/**
 * Load a movie record by id
 * @param id
 */
export const useMovie = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMovie = async (id: string) => {
      setLoading(true);
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      setLoading(false);
      if (!docSnap.exists()) {
        setMovie(null);
      } else {
        setMovie(docSnap.data() as Movie);
      }
    };
    getMovie(id).then();
  }, [id]);

  return [movie, loading];
};

/**
 * Adds a new suggestion
 * @param name
 */
export const addSuggestion = async (name: string) => {
  return await addDoc(collection(db, "suggestions"), { name });
};

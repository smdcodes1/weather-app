import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useAuth } from "./AuthContext";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState([]);
  const {user}= useAuth();
//   const [user, setUser] = useState(null);

  /* ---------------- AUTH SESSION ---------------- */
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data.session?.user ?? null);
//     });

//     const { data: listener } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user ?? null);
//       }
//     );

//     return () => listener.subscription.unsubscribe();
//   }, []);

  /* ---------------- FETCH FAVOURITES ---------------- */
  useEffect(() => {
    if (!user) {
      setFavourites([]);
      return;
    }

    fetchFavourites();
  }, [user]);

  const fetchFavourites = async () => {
    const { data, error } = await supabase
      .from("favourites")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setFavourites(data);
  };

  /* ---------------- TOGGLE FAVOURITE ---------------- */
  const setFavourite = async (country) => {
    if (!user) return;

    const exists = favourites.find(
      (f) => f.country_code === country.cca3
    );

    if (exists) {
      // Remove favourite
      await supabase
        .from("favourites")
        .delete()
        .eq("country_code", country.cca3);

      setFavourites((prev) =>
        prev.filter((f) => f.country_code !== country.cca3)
      );
    } else {
      // Add favourite
      const { data, error } = await supabase
        .from("favourites")
        .insert({
          user_id: user.id,
          country_code: country.cca3,
          country_name: country.name.common,
          flag_url: country.flags.png,
        })
        .select()
        .single();

      if (!error) setFavourites((prev) => [data, ...prev]);
    }
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, setFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

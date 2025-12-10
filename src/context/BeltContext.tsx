"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSupabase } from "../components/SupabaseProvider";
import { useAuth } from "./AuthContext";

interface BeltContextType {
  belt: string | null;
  level: number;
  refreshBelt: () => Promise<void>;
}

const BeltContext = createContext<BeltContextType>({
  belt: null,
  level: 0,
  refreshBelt: async () => {},
});

export const BeltProvider = ({ children }: { children: ReactNode }) => {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [belt, setBelt] = useState<string | null>(null);
  const [level, setLevel] = useState<number>(0);

  const fetchBelt = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("user_belts")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (data) {
      setBelt(data.belt_color);
      setLevel(data.level);
    }
  };

  useEffect(() => {
    fetchBelt();
  }, [user]);

  return (
    <BeltContext.Provider value={{ belt, level, refreshBelt: fetchBelt }}>
      {children}
    </BeltContext.Provider>
  );
};

export const useBelt = () => useContext(BeltContext);

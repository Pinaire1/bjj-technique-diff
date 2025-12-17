"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

// shadcn components
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Icons
import { PlusCircle, ChevronRight, LogIn } from "lucide-react";

interface Technique {
  id: string;
  name: string;
  description: string | null;
}

export default function Home() {
  const router = useRouter();

  const [techniques, setTechniques] = useState<Technique[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("techniques").select("*");
      setTechniques(data || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="p-8 space-y-10 max-w-5xl mx-auto">
      {/* HERO */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-4xl font-bold tracking-tight">
            Jiu-Jitsu{" "}
            <span
              className="bg-clip-text text-transparent font-bold"
              style={{
                backgroundImage: `linear-gradient(
                  to right,
                  #e5e7eb 0%,
                  #e5e7eb 16.6%,
                  #3b82f6 16.6%,
                  #3b82f6 33.3%,
                  #8b5cf6 33.3%,
                  #8b5cf6 50%,
                  #b45309 50%,
                  #b45309 66.6%,
                  #000000 66.6%,
                  #000000 83.3%,
                  #dc2626 83.3%,
                  #dc2626 100%
                )`,
              }}
            >
              Curriculum
            </span>
          </h1>

          {/* SIGN IN BUTTON */}
          <Button
            variant="outline"
            onClick={() => router.push("/login")}
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </div>


        <p className="text-muted-foreground text-lg max-w-3xl">
          Explore techniques, track your progress, and study smarter.
        </p>
      </section>

      {/* TECHNIQUE LIST */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Your Techniques</h2>
          <Button variant="secondary">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Technique
          </Button>
        </div>

        {/* LOADING SKELETONS */}
        {loading && (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && techniques.length === 0 && (
          <Card className="p-6 text-center">
            <p className="text-muted-foreground">
              No techniques added yet.
            </p>
          </Card>
        )}

        {/* TECHNIQUE GRID */}
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {techniques.map((t) => (
            <Card
              key={t.id}
              className="transition hover:shadow-lg border border-border/60"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  {t.name}
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {t.description || "No description provided."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

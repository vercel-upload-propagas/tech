import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground">404</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Post não encontrado
          </p>
          <Button asChild className="mt-8">
            <Link href="/">Voltar para Home</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

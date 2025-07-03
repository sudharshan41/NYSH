import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4">
        <p className="text-center text-sm text-muted-foreground">
          &copy; 2025 Sudharshan | GBB Innovations | All Rights Reserved.
        </p>
        <Button asChild size="sm" variant="outline">
          <Link href="https://sudharshan18.netlify.app/" target="_blank" rel="noopener noreferrer">
            Connect with the Developer
          </Link>
        </Button>
      </div>
    </footer>
  );
}

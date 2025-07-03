export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex items-center justify-center">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {currentYear} Community Hub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

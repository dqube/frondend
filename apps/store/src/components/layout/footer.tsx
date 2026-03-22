export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} ModernStores. All rights reserved.</p>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-40 text-center">
      <h1 className="font-heading text-4xl">Page not found.</h1>
      <p className="mt-4 text-muted">This page may not be ready yet, or the link may be out of date.</p>
      <div className="mt-8"><Button href="/" variant="dark">Back to home</Button></div>
    </Container>
  );
}

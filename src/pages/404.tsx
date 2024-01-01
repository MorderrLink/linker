import Link from "next/link";
import Container from "~/components/Container";
import { Button } from "~/components/ui/button";

export default function Custom404() {
    return (
      <Container direction="col">
        <div className="flex flex-col gap-3 w-screen h-screen items-center justify-center">
          <h1 className="text-2xl font-semibold text-neutral-300">404 - page not found</h1>
          <Button variant={"outline"} className="bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-200"> <Link href={'/'}>Home</Link> </Button>
        </div>
      </Container>
    )
  }
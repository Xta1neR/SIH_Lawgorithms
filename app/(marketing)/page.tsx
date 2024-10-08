import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignUpButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[50vw] h-[50vw] max-w-[424px] max-h-[424px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image
          src="/bgHero.png"
          fill
          alt="Hero image"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-2xl font-bold text-teal-800 uppercase max-w-[480px] text-center">
            Learn, Practice and master the Indian Constitution.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                afterSignUpUrl="/learn"
                afterSignInUrl="/learn"
              >
                <Button size={"lg"} variant={"secondary"} className="w-full">Get Started</Button>
              </SignUpButton>

              <SignInButton
                mode="modal"
                afterSignUpUrl="/learn"
                afterSignInUrl="/learn"
              >
                <Button size={"lg"} variant={"secondaryOutline"} className="w-full">Already have an Account</Button>
              </SignInButton>

            </SignedOut>
            <SignedIn>
              <Button size="lg" variant={"secondaryOutline"} className="border border-gray-500 px-4 py-2 rounded">
                <Link href="/learn">
                  Start Learning Now !
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

import PlaygroundSection from "@/components/playground-section"
import MascotPortfolioHero from "@/components/ui/mascot-portfolio-hero"

export default function App() {
  return (
    <main>
      <MascotPortfolioHero
        index="K/F"
        discipline="Brand & growth"
        tagline="Brands, built as systems"
        collection={["Brand", "Growth"]}
        reel={["Beirut", "House of Prep"]}
        year="2026"
        initials="KF"
        badge="Say hi"
        line2="Karim"
        line3="Fattah"
        word="Build"
        verticalTag="Grow"
        bracketed="S"
        seekingLabel="Building*"
        seeking="Let's connect"
        href="mailto:karimfattah14@gmail.com"
        services={["Brand systems", "Growth strategy", "Design", "Speaking"]}
        figure={{
          head: "/mini-karim/head.webp",
          body: "/mini-karim/body.webp",
          aspect: 0.3608,
          headHeight: 51.705,
          bodyTop: 49.432,
          bodyHeight: 50.568,
          alt: "Mini Karim",
        }}
        greetings={[
          "Hi, I'm Karim!",
          "I build brands as systems.",
          "Scroll down. Let's play.",
          "Okay, you can stop poking me :)",
        ]}
      />
      <PlaygroundSection />
    </main>
  )
}

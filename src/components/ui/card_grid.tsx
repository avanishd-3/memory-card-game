import {
    Card,
    CardAction,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

function CardGrid({incrementCurrentScore, resetCurrentScore}: {incrementCurrentScore: () => void} & {resetCurrentScore: () => void}) {

    const numCards = 8; // Number of cards to display

    // Keep the same as public order
    // If using server, just read from /public instead of hardcoding paths
    // But using server prevents hosting on GitHub Pages
    const logoPaths = [
        "/Bun.svg",
        "/Convex.svg",
        "/Electron.svg",
        "/Fresh.svg",
        "/Hono.svg",
        "/JavaScript.svg",
        "/Next.js.svg",
        "/Node.js.svg",
        "/npm.svg",
        "/Playwright.svg",
        "/PostgreSQL.svg",
        "/React.svg",
        "/Supabase.svg",
        "/Svelte.svg",
        "/Tailwind.svg",
        "/TanStack.svg",
        "/tRPC.svg",
        "/TypeScript.svg",
        "/Vite.svg",
        "/Vitest.svg",
        "/VS Code.svg",
        "/Vue.svg",
        "/Zod.svg",
    ]

    function getRandomLogos(num: number): string[] {
        // Shuffle the logos and return the first num elements
        const shuffled = logoPaths.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    function getLogoName(logoPath: string): string {
        // Extract the logo name from the path
        return logoPath.split('/').pop()?.replace('.svg', '') ?? '';
    }

    // Assign each card a random logo svg from assets (shuffling makes sure no duplicate logos)
    const selectedLogos = getRandomLogos(numCards);

    const cards = selectedLogos.map((logo) => ({
        id: crypto.randomUUID(),
        logo: logo,
        title: getLogoName(logo) // Get logo name from svg path
    }));

    const [usedCards, setUsedCards] = useState([] as string[]);

    function handleClick({ title }: { title: string }) { // Extract title from card data

        // If correct card is clicked, increment score and update used cards list
        if (!usedCards.includes(title)) {
            incrementCurrentScore(); // Increment score if card is not used
            setUsedCards([...usedCards, title]); // Add card to used cards list

        } else { // Reset score and used cards list
            setUsedCards([]); // Reset used cards if card is already used
            resetCurrentScore(); // Reset score if card is already used
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {cards.map((card) => (
                // Want card to be clickable instead of using a button
                <Card
                    key={card.id}
                    className="cursor-pointer transition-transform duration-200 hover:scale-105 shadow hover:shadow-lg"
                    onClick={handleClick.bind(null, card)} // Pass card data to handleClick
                >
                    <CardAction>
                        <CardContent className="flex flex-col items-center">
                            <img
                                src={card.logo}
                                alt={`${card.title} card`}
                                className="w-20 h-20 mb-4 mx-auto"
                            />
                            {/* w-40 gives fixed width so all titles take up same space -> makes all card padding equal */}
                            <CardTitle className="text-center text-lg font-semibold w-40"> 
                                {card.title}
                            </CardTitle>
                        </CardContent>
                    </CardAction>
                </Card>
            ))}
        </div>
    );

}

export default CardGrid;

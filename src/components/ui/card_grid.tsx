import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";

function CardGrid({incrementCurrentScore}: {incrementCurrentScore: () => void}) {

    const numCards = 8; // Number of cards to display
    const cards = Array.from({ length: numCards }, (_, i) => `Card ${i + 1}`);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {cards.map((description, index) => (
                
                // Want card to be clickable instead of using a button
                <Card
                    key={index}
                    className="cursor-pointer transition-transform duration-200 hover:scale-105 shadow hover:shadow-lg"
                    onClick={incrementCurrentScore}
                >
                    <CardAction>
                        <CardContent>
                            <CardTitle>{description}</CardTitle>
                            <CardDescription>
                                This is a description for {description}.
                            </CardDescription>
                        </CardContent>
                    </CardAction>
                </Card>
            ))}
        </div>
    );

}

export default CardGrid;

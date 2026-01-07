import axios from "axios";
import { useEffect, useState } from "react";
import ExpandableCard from "./ExpandableCard";
import { getCards } from "../service/cardService";

export default function CardRowContainer() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const fetchedCards = await getCards();
      const data = Array.isArray(fetchedCards?.data) ? fetchedCards.data : [];
      setCards(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="w-full">
      <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar">
        {cards.map((p, i) => (
          <div
            key={p._id || i}
            className="snap-start shrink-0 first:ml-4 sm:first:ml-0 last:mr-4 sm:last:mr-0"
          >
            <ExpandableCard
              title={p.title}
              body={p.body}
              views={p.views}
              likes={p.likes}
              date={p.createdAt}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteCard, getCards } from "../service/cardService";

const CardDashboard = () => {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ title: "", body: "", likes: 0, views: 0 });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token"); // adjust if using cookies
    navigate("/");
  };

  // FETCH CARDS
  const fetchCards = async () => {
    try {
      setLoading(true);
      const fetchedCards = await getCards();
      const data = Array.isArray(fetchedCards?.data) ? fetchedCards.data : [];
      setCards(data);
      console.log(cards);
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

  // INPUT HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`/api/cards/${editingId}`, form);
        setEditingId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/v1/card", form);
      }

      setForm({ title: "", body: "" });
      fetchCards();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await deleteCard(id);

      fetchCards();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // EDIT
  const handleEdit = (card) => {
    setForm({ title: card.title, body: card.body  });
    setEditingId(card._id);
  };

  return (
    <div className="min-h-screen bg-neutral-900 p-8 text-red-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Card Dashboard</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-900 text-neutral-900 rounded"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-4 rounded mb-8 max-w-lg"
      >
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-neutral-900 border border-neutral-700 rounded"
          required
        />

        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-neutral-900 border border-neutral-700 rounded"
          required
        />

        <button className="bg-red-900 text-neutral-900 px-4 py-2 rounded">
          {editingId ? "Update Card" : "Create Card"}
        </button>
      </form>

      {/* CARD LIST */}
      {loading ? (
        <p>Loading cards...</p>
      ) : cards.length === 0 ? (
        <p>No cards found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card) => (
            <div key={card._id} className="bg-neutral-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm">{card.body}</p>

              <div className="text-xs mt-3">
                👍 {card.likes} | 👁 {card.views}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(card)}
                  className="px-3 py-1 bg-neutral-700 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(card._id)}
                  className="px-3 py-1 bg-red-900 text-neutral-900 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardDashboard;

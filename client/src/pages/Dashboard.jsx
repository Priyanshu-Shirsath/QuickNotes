import { useEffect, useState } from 'react';
import api from '../services/api';

function Dashboard() {
    const [title, setTitle] = useState("");

    const [content, setContent] = useState("");

    const [notes, setNotes] = useState([]);

    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);



    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                "/notes",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setNotes(response.data.notes);

        } catch (error) {
            console.log(error);
        }
    };

    const createNote = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/notes",
                {
                    title,
                    content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchNotes();

            setTitle("");

            setContent("");

            alert("Note added successfully!");

        } catch (error) {
            console.log(error);
            alert("Failed to add note. Try again!");
        }
    };

    const updateNote = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/notes/${editId}`,
                {
                    title,
                    content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchNotes();

            setTitle("");
            setContent("");
            setEditId(null);
             alert("Note updated successfully!"); 

        } catch (error) {
            console.log(error);
            alert("Failed to update note. Try again!");
        }
    };

    const deleteNote = async (id) => {
        try {
            const token =
                localStorage.getItem("token");

            await api.delete(
                `/notes/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            fetchNotes();
             alert("Note deleted successfully!"); 

        } catch (error) {
            console.log(error);
             alert("Failed to delete note. Try again!"); 

        }
    };

    const handleLogout = () => {

         const confirmLogout = window.confirm("Are you sure you want to logout?");
    
    if (confirmLogout) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

        localStorage.removeItem("token");

        window.location.href = "/login";
        alert("Logged out successfully!");
    };


    return (
        <div className="min-h-screen bg-gray-100 p-4">

            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">
                        QuickNotes
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="
                        bg-red-500
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                    >
                        Logout
                    </button>

                </div>

                <div
                    className="
                    bg-white
                    p-6
                    rounded-xl
                    shadow-md
                    mb-8
                "
                >

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                    "
                    />

                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        className="
                        w-full
                        border
                        p-3
                        rounded-lg
                        mb-4
                    "
                    />

                    <button
                        onClick={
                            editId
                                ? updateNote
                                : createNote
                        }
                        className="
                        bg-blue-500
                        text-white
                        px-6
                        py-2
                        rounded-lg
                    "
                    >
                        {editId
                            ? "Update Note"
                            : "Add Note"}
                    </button>

                </div>

                <h2 className="text-2xl font-bold mb-6">
                    My Notes
                </h2>

                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-6
                "
                >

                    {notes.map((note) => (

                        <div
                            key={note._id}
                            className="
                                        bg-white
                                        p-5
                                        rounded-xl
                                        shadow-md
                                        h-80
                                        flex
                                        flex-col
                                    "
                        >

                            <h3
                                className="
                                            text-xl
                                            font-bold
                                            mb-3
                                            wrap-break-word
                                            overflow-hidden
                                            line-clamp-2
                                            "
                            >
                                {note.title}
                            </h3>

                            <div
                                className="
                                            flex-1
                                            h-48
                                            overflow-y-auto
                                            overflow-x-hidden
                                            pr-2
                                            mb-4
                                        "
                            >
                                <p>
                                    {note.content}
                                </p>
                            </div>

                            <div className="flex gap-3 mt-auto">

                                <button
                                    onClick={() => {
                                        setTitle(note.title);
                                        setContent(note.content);
                                        setEditId(note._id);
                                    }}
                                    className="
                                                    bg-yellow-500
                                                    text-white
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                "
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        deleteNote(note._id)
                                    }
                                    className="
                                            bg-red-500
                                            text-white
                                            px-4
                                            py-2
                                            rounded-lg
                                        "
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
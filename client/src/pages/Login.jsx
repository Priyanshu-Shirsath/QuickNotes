import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users/login", {
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login successful");

            navigate("/dashboard");

        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-4xl font-bold text-center mb-2">
                    QuickNotes
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Welcome Back
                </p>

                <form
                    onSubmit={handelSubmit}
                    className="space-y-4"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="
                            w-full
                            border
                            rounded-lg
                            p-3
                            outline-none
                        "
                    />

                    <input
                         type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="
                            w-full
                            border
                            rounded-lg
                            p-3
                            pr-16
                            outline-none
                        "
                    />
                    <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            className="
                                absolute
                                right-146
                                top-104
                                -translate-y-1/2
                                text-sm
                                text-gray-500
                            "
                        >
                        {showPassword ? "Hide" : "Show"}
                    </button>

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-blue-500
                            text-white
                            p-3
                            rounded-lg
                        "
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-6">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="
                            text-blue-500
                            ml-2
                            font-semibold
                        "
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;
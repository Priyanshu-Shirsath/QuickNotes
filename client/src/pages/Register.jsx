import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);


    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/users/register",
                {
                    name,
                    email,
                    password
                }
            );

            alert(response.data.message);

            navigate("/login");

        } catch (error) {
            console.log(error);

            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

                <h1 className="text-4xl font-bold text-center mb-2">
                    QuickNotes
                </h1>

                <p className="text-center text-gray-500 mb-8">
                    Create your account
                </p>

                <form
                    onSubmit={handelSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
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
                                top-112 
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
                            bg-green-500
                            text-white
                            p-3
                            rounded-lg,
                        "
                        
                        
                    >
                        
                        Register
                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?

                    <Link
                        to="/login"
                        className="
                            text-blue-500
                            ml-2
                            font-semibold
                        "
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;
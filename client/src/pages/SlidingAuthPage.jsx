import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService, { AuthError, handleAuthError } from '../api/authService';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import '../css/SlidingAuth.css'; // Expecting this to be updated with theme variables
import { getBaseURL } from '@/api/apiService';

const SlidingAuthPage = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { login, isAuthLoading, isAuthenticated } = useAuth();

    // Component State
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Determine initial mode based on route
    useEffect(() => {
        if (location.pathname === '/signup') {
            setIsRightPanelActive(true);
        } else {
            setIsRightPanelActive(false);
        }
    }, [location.pathname]);

    // Form State
    const [signInData, setSignInData] = useState({ identifier: '', password: '' });
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        age: ''
    });

    // Redirect if already authenticated
    useEffect(() => {
        if (!isAuthLoading && isAuthenticated) {
            navigate('/home', { replace: true });
        }
    }, [isAuthenticated, isAuthLoading, navigate]);

    const handleSignInChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    const handleSignUpChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await login(signInData.identifier, signInData.password, rememberMe);
        } catch (err) {
            console.error('Login error:', err);
            const authError = err instanceof AuthError ? err : handleAuthError(err);
            toast.error(authError.message || 'Login failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await authService.register(
                signUpData.firstName,
                signUpData.lastName,
                signUpData.username,
                signUpData.email,
                signUpData.password,
                parseInt(signUpData.age)
            );
            toast.success('Registration successful! Please verify your email.');
            navigate('/verify-signup', { state: { email: signUpData.email } });
        } catch (err) {
            console.error('Registration error:', err);
            const message = err.response?.data?.message || err.message || 'Registration failed';
            toast.error(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleAuth = () => {
        const googleAuthUrl = `${getBaseURL()}/api/auth/google`;
        window.location.href = googleAuthUrl;
    };

    return (
        <div className="sliding-auth-wrapper">
            <div className={`sliding-auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">

                {/* Sign Up Container */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUp}>
                        <h1>Create Account</h1>
                        <button type="button" className="google-btn" onClick={handleGoogleAuth}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                        <span>or use your email for registration</span>

                        <div className="w-full flex gap-2">
                            <input
                                type="text"
                                placeholder="First Name"
                                name="firstName"
                                value={signUpData.firstName}
                                onChange={handleSignUpChange}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                name="lastName"
                                value={signUpData.lastName}
                                onChange={handleSignUpChange}
                                required
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={signUpData.username}
                            onChange={handleSignUpChange}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            name="age"
                            value={signUpData.age}
                            onChange={handleSignUpChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={signUpData.email}
                            onChange={handleSignUpChange}
                            required
                        />
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={signUpData.password}
                                onChange={handleSignUpChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="password-toggle"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <button type="submit" disabled={isSubmitting} style={{ marginTop: '10px' }}>
                            {isSubmitting ? 'Creating...' : 'Sign Up'}
                        </button>
                    </form>
                </div>

                {/* Sign In Container */}
                <div className="form-container sign-in-container">
                    <form onSubmit={handleSignIn}>
                        <h1>Sign in</h1>
                        <button type="button" className="google-btn" onClick={handleGoogleAuth}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                        <span>or use your account</span>
                        <input
                            type="text"
                            placeholder="Email or Username"
                            name="identifier"
                            value={signInData.identifier}
                            onChange={handleSignInChange}
                            required
                        />
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={signInData.password}
                                onChange={handleSignInChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="password-toggle"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between w-full mt-2 mb-4 px-1">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    style={{ width: 'auto', margin: 0 }}
                                />
                                <label htmlFor="rememberMe" className="text-xs text-gray-500 cursor-pointer select-none">Remember Me</label>
                            </div>
                            <a href="/forgot-password" style={{ margin: 0 }}>Forgot your password?</a>
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>

                {/* Overlay Container */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button
                                className="ghost"
                                id="signIn"
                                onClick={() => {
                                    setIsRightPanelActive(false);
                                    navigate('/login');
                                }}
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button
                                className="ghost"
                                id="signUp"
                                onClick={() => {
                                    setIsRightPanelActive(true);
                                    navigate('/signup');
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SlidingAuthPage;

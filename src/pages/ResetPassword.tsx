import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setIsLoading(false);
        if (error) {
            toast.error(error.message || "Failed to reset password.");
        } else {
            setSuccess(true);
            toast.success("Password reset successfully! Please sign in.");
            setTimeout(() => navigate("/sign-in"), 1500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="text-center text-green-600 font-medium py-8">Password reset successfully! Redirecting...</div>
                    ) : (
                        <form onSubmit={handleReset} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium">New Password</label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    required
                                    minLength={6}
                                    disabled={isLoading}
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-coral-peach hover:bg-coral-peach/90"
                                disabled={isLoading || password.length < 6}
                            >
                                {isLoading ? "Resetting..." : "Reset Password"}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ResetPassword; 
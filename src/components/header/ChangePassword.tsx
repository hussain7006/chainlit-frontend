import { useState } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// import { useAuth } from '@chainlit/react-client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authService } from '@/services/authService';

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    // if (newPassword.length < 8) {
    //   setError('Password must be at least 8 characters long');
    //   return;
    // }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      let response = await authService.changePassword({
        current_password: oldPassword,
        new_password: newPassword
      });
      console.log("response:", response);

      setSuccess(true);
      // Reset form
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      // Close dialog after 2 seconds
      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err: any) {
      console.log("Error changing password:", err);
      
      setError(err.message || err.detail || 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2 font-normal"
        // style={{ color: "hsl(var(--border))" }}
        >
          Change Password

        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <AnimatePresence>
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 px-6 animate-success-modal">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <CheckCircle2 className="w-20 h-20 text-green-500 relative z-10 animate-success-icon" />
              </div>
              <p className="mt-6 text-xl font-semibold text-green-600 animate-success-text">
                Password changed successfully!
              </p>
              <p className="mt-2 text-sm text-gray-500 animate-success-text">
                You can now use your new password to log in
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Change Password
                </DialogTitle>
                <DialogDescription>
                  Enter your current password and set a new one
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter your current password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                  />
                </div>
                {error && (
                  <div className="text-sm text-destructive mt-2">{error}</div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Saving...' : 'Save'}
                </Button>
              </DialogFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

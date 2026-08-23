import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, KeyRound, Check } from 'lucide-react';
import { eventsService } from '../services/eventsService';

export const AdminProfile = () => {
    const [profile, setProfile] = useState(eventsService.getAdminProfile());
    const [name, setName] = useState(profile.name || '');
    const [email, setEmail] = useState(profile.email || '');
    const [profileSuccess, setProfileSuccess] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        const updated = eventsService.updateAdminProfile({ name, email });
        setProfile(updated);
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' });

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setPasswordLoading(true);
        setTimeout(() => {
            const res = eventsService.changePassword(currentPassword, newPassword);
            setPasswordLoading(false);
            if (res.success) {
                setPasswordMessage({ type: 'success', text: 'Password updated successfully!' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordMessage({ type: 'error', text: res.message });
            }
        }, 300);
    };

    return (
        <div className="font-nunito space-y-7 max-w-4xl text-slate-700">
            <Helmet>
                <title>Profile &amp; Security | Maan Group Admin</title>
            </Helmet>

            <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-navy-900">Profile &amp; Security</h1>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Manage administrator credentials and password</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-medium">
                            <User size={16} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-navy-900">Admin Account</h3>
                            <p className="text-[11px] text-slate-400">Display name &amp; email</p>
                        </div>
                    </div>

                    {profileSuccess && (
                        <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-medium flex items-center gap-2 border border-emerald-200/60">
                            <Check size={15} /> Saved successfully!
                        </div>
                    )}

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-medium transition-colors shadow-2xs"
                        >
                            Save Details
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-xs space-y-5">
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-medium">
                            <KeyRound size={16} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-navy-900">Change Password</h3>
                            <p className="text-[11px] text-slate-400">Update login password</p>
                        </div>
                    </div>

                    {passwordMessage.text && (
                        <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 border ${
                            passwordMessage.type === 'success'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                                : 'bg-red-50 text-red-600 border-red-200/60'
                        }`}>
                            {passwordMessage.type === 'success' ? <Check size={15} /> : <span>⚠️</span>}
                            <span>{passwordMessage.text}</span>
                        </div>
                    )}

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Current Password *</label>
                            <input
                                type="password"
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">New Password *</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Min 6 chars"
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-600 mb-1">Confirm New Password *</label>
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-navy-900 focus:bg-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={passwordLoading}
                            className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-medium transition-colors shadow-2xs"
                        >
                            {passwordLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

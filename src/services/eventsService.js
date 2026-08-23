import { eventsData as initialEvents } from '../data/events';

const EVENTS_STORAGE_KEY = 'maangroup_events_data_v2';
const REGISTRATIONS_STORAGE_KEY = 'maangroup_registrations_data_v2';
const AUTH_STORAGE_KEY = 'maangroup_admin_session_v2';
const PROFILE_STORAGE_KEY = 'maangroup_admin_profile_v2';

export const DEFAULT_REGISTRATION_FIELDS = [
    { id: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Mohamed Salad' },
    { id: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'name@example.com' },
    { id: 'phone', label: 'Phone Number (WhatsApp)', type: 'tel', required: true, placeholder: '+252 61 XXX XXXX' },
    { id: 'organization', label: 'University / Organization', type: 'text', required: false, placeholder: 'e.g. Jamhuuriya University' },
];

const initializeEvents = () => {
    try {
        const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
        if (!stored) {
            const enriched = initialEvents.map(e => ({
                ...e,
                registrationEnabled: e.status === 'Upcoming',
                customFields: [
                    ...DEFAULT_REGISTRATION_FIELDS,
                    { id: 'field_experience', label: 'Experience Level / Major', type: 'text', required: false, placeholder: 'e.g. Computer Science Student' }
                ]
            }));
            localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(enriched));
            return enriched;
        }
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error loading events:', e);
        return initialEvents;
    }
};

const initializeRegistrations = () => {
    try {
        const stored = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
        if (!stored) {
            const defaultRegs = [
                {
                    id: 'M10201',
                    eventId: 1,
                    eventTitle: 'Personal Skills Development Planning: From Class to Career',
                    name: "A'nasir Omar Mohamed",
                    email: 'anasir.omar@example.com',
                    phone: '+252 61 391 2683',
                    organization: 'Jamhuuriya University (JUST)',
                    customResponses: {
                        'Department': 'Computer Application',
                        'Class / Year': 'CA227 (2025-2026)'
                    },
                    registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                    status: 'Confirmed',
                    isStarred: true
                },
                {
                    id: 'M10202',
                    eventId: 1,
                    eventTitle: 'Personal Skills Development Planning: From Class to Career',
                    name: 'Al-Hafid Ahmed Wehliye',
                    email: 'alhafid.w@example.com',
                    phone: '+252 61 036 5557',
                    organization: 'Benadir University',
                    customResponses: {
                        'Department': 'Computer Application',
                        'Class / Year': 'CA223 (2025-2026)'
                    },
                    registeredAt: new Date(Date.now() - 86400000).toISOString(),
                    status: 'Confirmed',
                    isStarred: false
                },
                {
                    id: 'M10203',
                    eventId: 2,
                    eventTitle: 'Empowering Somali Youth: Entrepreneurial Mindset & Development',
                    name: 'Aasiya Mohidin Yusuf',
                    email: 'aasiya.yusuf@example.com',
                    phone: '+252 61 241 4547',
                    organization: 'SIMAD University',
                    customResponses: {
                        'Department': 'Computer Application',
                        'Class / Year': 'CA2213 (2025-2026)'
                    },
                    registeredAt: new Date(Date.now() - 43200000).toISOString(),
                    status: 'Confirmed',
                    isStarred: false
                }
            ];
            localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(defaultRegs));
            return defaultRegs;
        }
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error loading registrations:', e);
        return [];
    }
};

const initializeProfile = () => {
    try {
        const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
        if (!stored) {
            const defaultProfile = {
                name: 'Mohamed Salad Ibrahim',
                email: 'admin@maangroup.so',
                role: 'Super Administrator',
                password: 'admin123',
                avatar: '/assets/logo.png',
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(defaultProfile));
            return defaultProfile;
        }
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error loading profile:', e);
        return {
            name: 'Mohamed Salad Ibrahim',
            email: 'admin@maangroup.so',
            role: 'Super Administrator',
            password: 'admin123'
        };
    }
};

export const eventsService = {
    getAllEvents() {
        return initializeEvents();
    },

    getEventById(id) {
        const events = this.getAllEvents();
        return events.find(e => e.id === parseInt(id) || e.id === id);
    },

    createEvent(eventData) {
        const events = this.getAllEvents();
        const newEvent = {
            id: Date.now(),
            title: eventData.title || 'Untitled Event',
            status: eventData.status || 'Upcoming',
            date: eventData.date || 'Upcoming',
            location: eventData.location || 'Mogadishu, Somalia',
            category: eventData.category || 'General',
            excerpt: eventData.excerpt || '',
            description: eventData.description || '',
            duration: eventData.duration || 'Full Day',
            registrationEnabled: eventData.registrationEnabled !== undefined ? eventData.registrationEnabled : (eventData.status === 'Upcoming'),
            customFields: eventData.customFields && eventData.customFields.length > 0 ? eventData.customFields : DEFAULT_REGISTRATION_FIELDS,
            organizer: {
                name: 'Maan Group',
                role: 'Strategic Advisor',
                logo: '/assets/logo.png',
                bio: 'Empowering minds through education and professional exposure.'
            },
            images: eventData.images && eventData.images.length > 0 ? eventData.images : ['/assets/events/ps1.jpeg'],
            hashtags: eventData.hashtags || ['#MaanGroup', '#Somalia']
        };

        const updated = [newEvent, ...events];
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('events_updated'));
        return newEvent;
    },

    updateEvent(id, updatedFields) {
        const events = this.getAllEvents();
        const index = events.findIndex(e => e.id === parseInt(id) || e.id === id);
        if (index === -1) return null;

        events[index] = {
            ...events[index],
            ...updatedFields
        };

        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
        window.dispatchEvent(new Event('events_updated'));
        return events[index];
    },

    deleteEvent(id) {
        const events = this.getAllEvents();
        const filtered = events.filter(e => e.id !== parseInt(id) && e.id !== id);
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new Event('events_updated'));
        return true;
    },

    getRegistrations() {
        return initializeRegistrations();
    },

    // Strict Validation: Cannot register for past event
    registerAttendee(registrationData) {
        const event = this.getEventById(registrationData.eventId);
        if (event && (event.status === 'Past Event' || event.registrationEnabled === false)) {
            throw new Error('Registration is closed. Attendees cannot register for past events.');
        }

        const regs = this.getRegistrations();
        const newReg = {
            id: 'M' + Math.floor(10000 + Math.random() * 90000),
            eventId: registrationData.eventId,
            eventTitle: event ? event.title : 'General Event',
            name: registrationData.name,
            email: registrationData.email,
            phone: registrationData.phone,
            organization: registrationData.organization || 'Independent',
            customResponses: registrationData.customResponses || {},
            registeredAt: new Date().toISOString(),
            status: 'Confirmed',
            isStarred: false
        };

        const updated = [newReg, ...regs];
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('registrations_updated'));
        return newReg;
    },

    updateRegistration(id, updatedFields) {
        const regs = this.getRegistrations();
        const index = regs.findIndex(r => r.id === id);
        if (index === -1) return null;

        regs[index] = {
            ...regs[index],
            ...updatedFields
        };

        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(regs));
        window.dispatchEvent(new Event('registrations_updated'));
        return regs[index];
    },

    toggleStarRegistration(id) {
        const regs = this.getRegistrations();
        const index = regs.findIndex(r => r.id === id);
        if (index === -1) return null;

        regs[index].isStarred = !regs[index].isStarred;
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(regs));
        window.dispatchEvent(new Event('registrations_updated'));
        return regs[index].isStarred;
    },

    deleteRegistration(id) {
        const regs = this.getRegistrations();
        const filtered = regs.filter(r => r.id !== id);
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new Event('registrations_updated'));
        return true;
    },

    getStats() {
        const events = this.getAllEvents();
        const regs = this.getRegistrations();
        const now = Date.now();
        const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

        const upcomingCount = events.filter(e => e.status === 'Upcoming').length;
        const pastCount = events.filter(e => e.status === 'Past Event').length;
        const recentRegs = regs.filter(r => new Date(r.registeredAt).getTime() >= oneWeekAgo).length;

        return {
            totalEvents: events.length,
            upcomingEvents: upcomingCount,
            pastEvents: pastCount,
            totalRegistrations: regs.length,
            recentRegistrations: recentRegs,
        };
    },

    getAdminProfile() {
        return initializeProfile();
    },

    updateAdminProfile(data) {
        const profile = this.getAdminProfile();
        const updated = {
            ...profile,
            ...data,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('profile_updated'));
        return updated;
    },

    changePassword(currentPassword, newPassword) {
        const profile = this.getAdminProfile();
        if (profile.password !== currentPassword) {
            return { success: false, message: 'Current password is incorrect' };
        }
        if (!newPassword || newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters long' };
        }

        profile.password = newPassword;
        profile.updatedAt = new Date().toISOString();
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
        window.dispatchEvent(new Event('profile_updated'));
        return { success: true, message: 'Password changed successfully' };
    },

    isAuthenticated() {
        try {
            return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
        } catch {
            return false;
        }
    },

    login(email, password) {
        const profile = this.getAdminProfile();
        if (
            email.trim().toLowerCase() === profile.email.trim().toLowerCase() &&
            password === profile.password
        ) {
            localStorage.setItem(AUTH_STORAGE_KEY, 'true');
            return { success: true };
        }
        return { success: false, message: 'Invalid admin email or password' };
    },

    logout() {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
};

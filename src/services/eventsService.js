import { eventsData as initialEvents } from '../data/events';

const EVENTS_STORAGE_KEY = 'maangroup_events_data_v1';
const REGISTRATIONS_STORAGE_KEY = 'maangroup_registrations_data_v1';
const AUTH_STORAGE_KEY = 'maangroup_admin_session_v1';

// Seed events if not in localStorage
const initializeEvents = () => {
    try {
        const stored = localStorage.getItem(EVENTS_STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialEvents));
            return initialEvents;
        }
        return JSON.parse(stored);
    } catch (e) {
        console.error('Error loading events:', e);
        return initialEvents;
    }
};

// Seed registrations
const initializeRegistrations = () => {
    try {
        const stored = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
        if (!stored) {
            const defaultRegs = [
                {
                    id: 'reg-1',
                    eventId: 1,
                    eventTitle: 'Personal Skills Development Planning: From Class to Career',
                    name: 'Abdirahman Ali',
                    email: 'abdirahman@example.com',
                    phone: '+252 61 555 1234',
                    organization: 'Jamhuuriya University',
                    registeredAt: new Date(Date.now() - 86400000 * 2).toISOString(),
                    status: 'Confirmed'
                },
                {
                    id: 'reg-2',
                    eventId: 2,
                    eventTitle: 'Empowering Somali Youth: Entrepreneurial Mindset & Development',
                    name: 'Fadumo Hassan',
                    email: 'fadumo.h@example.com',
                    phone: '+252 61 555 5678',
                    organization: 'Benadir University',
                    registeredAt: new Date(Date.now() - 86400000).toISOString(),
                    status: 'Confirmed'
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

export const eventsService = {
    // --- Events CRUD ---
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

    resetToDefault() {
        localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialEvents));
        window.dispatchEvent(new Event('events_updated'));
        return initialEvents;
    },

    // --- Registrations CRUD ---
    getRegistrations() {
        return initializeRegistrations();
    },

    registerAttendee(registrationData) {
        const regs = this.getRegistrations();
        const event = this.getEventById(registrationData.eventId);
        const newReg = {
            id: 'reg-' + Date.now(),
            eventId: registrationData.eventId,
            eventTitle: event ? event.title : 'General Event',
            name: registrationData.name,
            email: registrationData.email,
            phone: registrationData.phone,
            organization: registrationData.organization || 'Individual',
            registeredAt: new Date().toISOString(),
            status: 'Confirmed'
        };

        const updated = [newReg, ...regs];
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(updated));
        window.dispatchEvent(new Event('registrations_updated'));
        return newReg;
    },

    deleteRegistration(id) {
        const regs = this.getRegistrations();
        const filtered = regs.filter(r => r.id !== id);
        localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(filtered));
        window.dispatchEvent(new Event('registrations_updated'));
        return true;
    },

    // --- Auth Management ---
    isAuthenticated() {
        try {
            return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
        } catch {
            return false;
        }
    },

    login(email, password) {
        // Default credentials (can be customized)
        if (email.trim().toLowerCase() === 'admin@maangroup.so' && password === 'admin123') {
            localStorage.setItem(AUTH_STORAGE_KEY, 'true');
            return { success: true };
        }
        return { success: false, message: 'Invalid admin email or password' };
    },

    logout() {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
};

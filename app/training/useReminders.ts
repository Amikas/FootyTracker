import { useState, useEffect, useCallback } from 'react';
import { Reminder } from './types';

const STORAGE_KEY = 'footytracker_reminders';

export const useReminders = (userId: string) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    setNotificationPermission(permission);
    return permission;
  };

  // Load reminders and check notification permission
  useEffect(() => {
    const loadReminders = () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const allReminders: Reminder[] = JSON.parse(stored);
        setReminders(allReminders.filter(r => r.userId === userId));
      }
    };

    loadReminders();
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, [userId]);

  // Save a new reminder
  const saveReminder = useCallback((reminder: Omit<Reminder, 'id' | 'userId' | 'isCompleted' | 'createdAt'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: crypto.randomUUID(),
      userId,
      isCompleted: false,
      createdAt: new Date().toISOString(),
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    const existingReminders: Reminder[] = stored ? JSON.parse(stored) : [];
    const updatedReminders = [...existingReminders, newReminder];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReminders));
    setReminders(prev => [...prev, newReminder]);
    
    return newReminder;
  }, [userId]);

  // Delete a reminder
  const deleteReminder = useCallback((reminderId: string) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const existingReminders: Reminder[] = JSON.parse(stored);
    const updatedReminders = existingReminders.filter(r => r.id !== reminderId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReminders));
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  }, []);

  // Edit a reminder
  const editReminder = useCallback((reminderId: string, updates: Partial<Reminder>) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    const existingReminders: Reminder[] = JSON.parse(stored);
    const updatedReminders = existingReminders.map(r => 
      r.id === reminderId ? { ...r, ...updates } : r
    );
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReminders));
    setReminders(prev => prev.map(r => 
      r.id === reminderId ? { ...r, ...updates } : r
    ));
  }, []);

  // Check for due reminders
  const checkReminders = useCallback(() => {
    if (notificationPermission !== 'granted') return;    const now = new Date();
    const currentHour = now.getHours().toString().padStart(2, '0');
    const today = now.toISOString().split('T')[0];

    reminders.forEach(reminder => {
      if (!reminder.isCompleted && 
          reminder.date === today && 
          reminder.hour === currentHour) {
        new Notification('FootyTracker Reminder', {
          body: reminder.message || `Time for your ${reminder.type} reminder!`,
          icon: '/favicon.ico'
        });
        
        editReminder(reminder.id, { isCompleted: true });
      }
    });
  }, [reminders, notificationPermission, editReminder]);

  // Set up periodic reminder check
  useEffect(() => {
    checkReminders();
    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [checkReminders]);

  return {
    reminders,
    saveReminder,
    deleteReminder,
    editReminder,
    notificationPermission,
    requestNotificationPermission
  };
};
